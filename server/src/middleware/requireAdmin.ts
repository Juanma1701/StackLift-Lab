import { Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "./auth";

export async function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });

  if (!user?.isAdmin) {
    return res.status(403).json({ message: "No autorizado" });
  }

  next();
}