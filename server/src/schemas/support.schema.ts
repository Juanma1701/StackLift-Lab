import { z } from "zod";

export const createTicketSchema = z.object({
  email: z.string().trim().email("Correo electrónico inválido"),
  subject: z.string().trim().min(2, "El asunto es obligatorio").max(100),
  message: z.string().trim().min(5, "Cuéntanos un poco más").max(1000),
});

export const createAuthenticatedTicketSchema = z.object({
  type: z.enum(["bug", "idea", "other"]).default("other"),
  subject: z.string().trim().min(2, "El asunto es obligatorio").max(100),
  message: z.string().trim().min(5, "Cuéntanos un poco más").max(1000),
});