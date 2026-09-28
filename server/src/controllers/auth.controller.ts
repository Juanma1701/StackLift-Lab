import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "../config/prisma";
import { signToken, signPendingTwoFactorToken, verifyPendingTwoFactorToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/auth";
import { sendVerificationEmail } from "../services/email.service";
import { generateTwoFactorSecret, getTwoFactorQrCodeDataUrl, verifyTwoFactorCode } from "../utils/twoFactor";
import { encrypt, decrypt } from "../utils/crypto";
import fs from "fs";
import path from "path";


const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "none" as const,
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const CLEAR_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "none" as const,
  secure: true,
};

const PENDING_2FA_TTL_MS = 10 * 60 * 1000; // 10 minutos
const PENDING_2FA_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "none" as const,
  secure: true,
  maxAge: PENDING_2FA_TTL_MS,
};
const CLEAR_PENDING_2FA_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "none" as const,
  secure: true,
};

const TRUSTED_DEVICE_TTL_MS = 60 * 24 * 60 * 60 * 1000; // 60 días
const TRUSTED_DEVICE_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "none" as const,
  secure: true,
  maxAge: TRUSTED_DEVICE_TTL_MS,
};

const EMAIL_VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 horas
const LOGIN_ATTEMPT_THRESHOLD = 5;
const LOCKOUT_DURATION_MS = 60 * 60 * 1000; // 1 hora

async function createAndSendVerificationEmail(user: { id: string; email: string }) {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = await bcrypt.hash(rawToken, 10);

  await prisma.emailVerificationToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_TTL_MS),
    },
  });

  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${rawToken}&uid=${user.id}`;
  await sendVerificationEmail(user.email, verifyUrl);
}

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: "Ese correo ya está registrado" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  await createAndSendVerificationEmail(user);

  res.status(201).json({
    message: "Cuenta creada. Revisa tu correo para verificar tu cuenta antes de iniciar sesión.",
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  if (user.lockedUntil && user.lockedUntil <= new Date()) {
    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lockedUntil: null },
    });
    user.failedLoginAttempts = 0;
    user.lockedUntil = null;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: { increment: 1 } },
    });

    if (updated.failedLoginAttempts >= LOGIN_ATTEMPT_THRESHOLD) {
      await prisma.user.update({
        where: { id: user.id },
        data: { lockedUntil: new Date(Date.now() + LOCKOUT_DURATION_MS) },
      });
    }

    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  if (user.failedLoginAttempts > 0) {
    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lockedUntil: null },
    });
  }

  if (!user.emailVerified) {
    return res.status(403).json({
      message: "Debes verificar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada o solicita un nuevo enlace.",
      code: "EMAIL_NOT_VERIFIED",
    });
  }

  // 2FA solo aplica a cuentas admin con 2FA activado.
  if (user.isAdmin && user.twoFactorEnabled) {
    const trustedToken = req.cookies?.trustedDevice;
    let isTrusted = false;

    if (trustedToken) {
      const devices = await prisma.trustedDevice.findMany({
        where: { userId: user.id, expiresAt: { gt: new Date() } },
      });

      for (const device of devices) {
        if (await bcrypt.compare(trustedToken, device.tokenHash)) {
          isTrusted = true;
          // Renovamos la vigencia: mientras sigas usando el mismo
          // dispositivo seguido, nunca vuelve a pedirte el código.
          await prisma.trustedDevice.update({
            where: { id: device.id },
            data: { lastUsedAt: new Date(), expiresAt: new Date(Date.now() + TRUSTED_DEVICE_TTL_MS) },
          });
          break;
        }
      }
    }

    if (!isTrusted) {
      const pendingToken = signPendingTwoFactorToken(user.id);
      res.cookie("pending2fa", pendingToken, PENDING_2FA_COOKIE_OPTIONS);
      return res.status(200).json({
        twoFactorRequired: true,
        message: "Ingresa el código de tu app de autenticación",
      });
    }
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date(), lastActiveAt: new Date() },
  });

  const token = signToken(user.id);
  res.cookie("token", token, COOKIE_OPTIONS);
  res.json({ id: user.id, name: user.name, email: user.email });
}

export async function verifyTwoFactorLogin(req: Request, res: Response) {
  const { code, rememberDevice } = req.body;
  const pendingToken = req.cookies?.pending2fa;

  if (!pendingToken) {
    return res.status(401).json({ message: "No hay una verificación en curso. Inicia sesión de nuevo." });
  }

  let payload: { userId: string };
  try {
    payload = verifyPendingTwoFactorToken(pendingToken);
  } catch {
    return res.status(401).json({ message: "La verificación expiró. Inicia sesión de nuevo." });
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
    return res.status(400).json({ message: "Verificación inválida" });
  }

  const secret = decrypt(user.twoFactorSecret);
  if (!verifyTwoFactorCode(secret, code)) {
    return res.status(401).json({ message: "Código incorrecto" });
  }

  res.clearCookie("pending2fa", CLEAR_PENDING_2FA_COOKIE_OPTIONS);

  if (rememberDevice) {
    const rawDeviceToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = await bcrypt.hash(rawDeviceToken, 10);

    await prisma.trustedDevice.create({
      data: {
        userId: user.id,
        tokenHash,
        userAgent: req.headers["user-agent"]?.slice(0, 255) ?? null,
        expiresAt: new Date(Date.now() + TRUSTED_DEVICE_TTL_MS),
      },
    });

    res.cookie("trustedDevice", rawDeviceToken, TRUSTED_DEVICE_COOKIE_OPTIONS);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date(), lastActiveAt: new Date() },
  });

  const token = signToken(user.id);
  res.cookie("token", token, COOKIE_OPTIONS);
  res.json({ id: user.id, name: user.name, email: user.email });
}

export async function setupTwoFactor(req: AuthRequest, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  if (user.twoFactorEnabled) {
    return res.status(400).json({ message: "El 2FA ya está activado" });
  }

  const secret = generateTwoFactorSecret();
  await prisma.user.update({ where: { id: user.id }, data: { twoFactorSecret: encrypt(secret) } });

  const qrCodeDataUrl = await getTwoFactorQrCodeDataUrl(user.email, secret);
  res.json({ qrCodeDataUrl, secret });
}

export async function confirmTwoFactor(req: AuthRequest, res: Response) {
  const { code } = req.body;
  const user = await prisma.user.findUnique({ where: { id: req.userId } });

  if (!user?.twoFactorSecret) {
    return res.status(400).json({ message: "Primero genera un código QR" });
  }
  const secret = decrypt(user.twoFactorSecret);
  if (!verifyTwoFactorCode(secret, code)) {
    return res.status(401).json({ message: "Código incorrecto" });
  }

  await prisma.user.update({ where: { id: user.id }, data: { twoFactorEnabled: true } });
  res.json({ message: "2FA activado correctamente" });
}

export async function disableTwoFactor(req: AuthRequest, res: Response) {
  const { code } = req.body;
  const user = await prisma.user.findUnique({ where: { id: req.userId } });

  if (!user?.twoFactorEnabled || !user.twoFactorSecret) {
    return res.status(400).json({ message: "El 2FA no está activado" });
  }
  const secret = decrypt(user.twoFactorSecret);
  if (!verifyTwoFactorCode(secret, code)) {
    return res.status(401).json({ message: "Código incorrecto" });
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { twoFactorEnabled: false, twoFactorSecret: null },
    }),
    prisma.trustedDevice.deleteMany({ where: { userId: user.id } }),
  ]);

  res.json({ message: "2FA desactivado. También se olvidaron todos los dispositivos de confianza." });
}

export async function listTrustedDevices(req: AuthRequest, res: Response) {
  const devices = await prisma.trustedDevice.findMany({
    where: { userId: req.userId, expiresAt: { gt: new Date() } },
    orderBy: { lastUsedAt: "desc" },
    select: { id: true, userAgent: true, createdAt: true, lastUsedAt: true, expiresAt: true },
  });
  res.json(devices);
}

export async function revokeTrustedDevice(req: AuthRequest, res: Response) {
  const { id } = req.params;
  await prisma.trustedDevice.deleteMany({ where: { id, userId: req.userId } });
  res.json({ message: "Dispositivo revocado" });
}

export async function verifyEmail(req: Request, res: Response) {
  const { token } = req.params;
  const { uid } = req.query;

  if (!token || !uid || typeof uid !== "string") {
    return res.status(400).json({ message: "Enlace inválido" });
  }

  const candidates = await prisma.emailVerificationToken.findMany({
    where: { userId: uid, usedAt: null, expiresAt: { gt: new Date() } },
  });

  let matched: (typeof candidates)[number] | null = null;
  for (const c of candidates) {
    if (await bcrypt.compare(token, c.tokenHash)) {
      matched = c;
      break;
    }
  }

  if (!matched) {
    return res.status(400).json({ message: "Enlace inválido o expirado" });
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: uid }, data: { emailVerified: true } }),
    prisma.emailVerificationToken.update({ where: { id: matched.id }, data: { usedAt: new Date() } }),
  ]);

  res.json({ message: "Correo verificado correctamente. Ya puedes iniciar sesión." });
}

export async function resendVerificationEmail(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "El correo es obligatorio" });

  const user = await prisma.user.findUnique({ where: { email } });

  if (user && !user.emailVerified) {
    await createAndSendVerificationEmail(user);
  }

  res.json({ message: "Si el correo existe y no está verificado, se envió un nuevo enlace" });
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("token", CLEAR_COOKIE_OPTIONS);
  res.json({ message: "Sesión cerrada" });
}

export async function me(req: AuthRequest, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  prisma.user.update({ where: { id: user.id }, data: { lastActiveAt: new Date() } }).catch(() => {});

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    emailVerified: user.emailVerified,
    isAdmin: user.isAdmin,
    twoFactorEnabled: user.twoFactorEnabled,
  });
}

export async function updateProfile(req: AuthRequest, res: Response) {
  const { name } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ message: "El nombre no puede estar vacío" });

  const user = await prisma.user.update({
    where: { id: req.userId },
    data: { name },
  });

  res.json({ id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl });
}

export async function uploadAvatar(req: AuthRequest, res: Response) {
  if (!req.file) return res.status(400).json({ message: "No se recibió ninguna imagen" });

  const existing = await prisma.user.findUnique({ where: { id: req.userId } });
  if (existing?.avatarUrl) {
    const oldPath = path.join(__dirname, "../../uploads", path.basename(existing.avatarUrl));
    fs.unlink(oldPath, () => {});
  }

  const uploadsDir = path.join(__dirname, "../../uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const ext = req.file.mimetype === "image/png" ? ".png" : req.file.mimetype === "image/webp" ? ".webp" : ".jpg";
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  fs.writeFileSync(path.join(uploadsDir, filename), req.file.buffer);

  const user = await prisma.user.update({
    where: { id: req.userId },
    data: { avatarUrl: `/uploads/${filename}` },
  });

  res.json({ id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl });
}