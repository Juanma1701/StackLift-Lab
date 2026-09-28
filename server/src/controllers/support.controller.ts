import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";

export async function createTicket(req: Request, res: Response) {
  const { email, subject, message } = req.body;

  await prisma.supportTicket.create({
    data: { email, subject, message },
  });

  res.status(201).json({ message: "Recibimos tu mensaje. Te contactaremos pronto." });
}

export async function createAuthenticatedTicket(req: AuthRequest, res: Response) {
  const { subject, message, type } = req.body;

  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  await prisma.supportTicket.create({
    data: { userId: user.id, email: user.email, subject, message, type },
  });

  res.status(201).json({ message: "Gracias, recibimos tu reporte." });
}