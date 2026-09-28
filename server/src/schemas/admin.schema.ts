import { z } from "zod";

export const unlockAccountSchema = z.object({
  email: z.string().trim().email("Correo electrónico inválido"),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100).optional(),
  emailVerified: z.boolean().optional(),
});

export const adminMessageSchema = z.object({
  subject: z.string().trim().min(2, "El asunto es obligatorio").max(150),
  message: z.string().trim().min(5, "El mensaje es demasiado corto").max(2000),
});