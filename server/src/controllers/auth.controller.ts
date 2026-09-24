import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import { signToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/auth";
import fs from "fs";
import path from "path";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

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

  const token = signToken(user.id);
  res.cookie("token", token, COOKIE_OPTIONS);
  res.status(201).json({ id: user.id, name: user.name, email: user.email });
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

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = signToken(user.id);
  res.cookie("token", token, COOKIE_OPTIONS);
  res.json({ id: user.id, name: user.name, email: user.email });
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("token");
  res.json({ message: "Sesión cerrada" });
}

export async function me(req: AuthRequest, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json({ id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl });
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

  const user = await prisma.user.update({
    where: { id: req.userId },
    data: { avatarUrl: `/uploads/${req.file.filename}` },
  });

  res.json({ id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl });
}