import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import { sendPasswordResetEmail } from "../services/email.service";

const RESET_TOKEN_TTL_MS = 30 * 60 * 1000;

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "El correo es obligatorio" });

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = await bcrypt.hash(rawToken, 10);

    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS) },
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}&uid=${user.id}`;
    await sendPasswordResetEmail(user.email, resetUrl);
  }

  // misma respuesta exista o no el usuario, para no filtrar correos registrados
  res.json({ message: "Si el correo existe, se envió un enlace de recuperación" });
}

export async function resetPassword(req: Request, res: Response) {
  const { uid, token, newPassword } = req.body;
  if (!uid || !token || !newPassword) {
    return res.status(400).json({ message: "Datos incompletos" });
  }

  const candidates = await prisma.passwordResetToken.findMany({
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

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.$transaction([
    prisma.user.update({ where: { id: uid }, data: { password: hashed } }),
    prisma.passwordResetToken.update({ where: { id: matched.id }, data: { usedAt: new Date() } }),
  ]);

  res.json({ message: "Contraseña actualizada" });
}