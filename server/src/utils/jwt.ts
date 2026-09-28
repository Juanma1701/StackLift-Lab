import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d", algorithm: "HS256" });
}

export function verifyToken(token: string): { userId: string } {
  const payload = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }) as { userId: string; purpose?: string };

  if (payload.purpose) {
    throw new Error("Token no válido para autenticación de sesión");
  }

  return { userId: payload.userId };
}

export function signPendingTwoFactorToken(userId: string): string {
  return jwt.sign({ userId, purpose: "2fa_pending" }, JWT_SECRET, { expiresIn: "10m", algorithm: "HS256" });
}

export function verifyPendingTwoFactorToken(token: string): { userId: string } {
  const payload = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }) as { userId: string; purpose?: string };

  if (payload.purpose !== "2fa_pending") {
    throw new Error("Token inválido");
  }

  return { userId: payload.userId };
}