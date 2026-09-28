import { Request, Response, NextFunction } from "express";
import { fileTypeFromBuffer } from "file-type";

const ALLOWED_REAL_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function validateImageContent(req: Request, res: Response, next: NextFunction) {
  if (!req.file) {
    return res.status(400).json({ message: "No se recibió ninguna imagen" });
  }

  const detected = await fileTypeFromBuffer(req.file.buffer);

  if (!detected || !ALLOWED_REAL_TYPES.includes(detected.mime)) {
    return res.status(400).json({ message: "El archivo no es una imagen válida" });
  }

  next();
}