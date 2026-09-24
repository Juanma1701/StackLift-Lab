import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    return res.status(409).json({ message: "Ya existe un registro con ese valor único (ej. correo repetido)" });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
    return res.status(404).json({ message: "El recurso solicitado no existe" });
  }

  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Error interno del servidor" });
}