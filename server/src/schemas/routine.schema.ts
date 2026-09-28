import { z } from "zod";

export const routineNameSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(60),
  template: z.record(z.string(), z.array(z.string())).optional(),
});

export const muscleGroupSchema = z.object({
  name: z.string().trim().min(2, "El nombre del grupo es obligatorio").max(40),
});

export const exerciseSchema = z.object({
  name: z.string().trim().min(2, "El nombre del ejercicio es obligatorio").max(60),
  targetSets: z.number().int().min(1).max(20).optional(),
  targetReps: z.number().int().min(1).max(100).optional(),
  targetWeight: z.number().min(0, "El peso meta no puede ser negativo").max(1000).nullable().optional(),
});

export const workoutLogSchema = z.object({
  notes: z.string().max(300).optional(),
  sets: z
    .array(
      z.object({
        weight: z.number().min(0, "El peso no puede ser negativo").max(1000),
        reps: z.number().int().min(0).max(200),
      })
    )
    .min(1, "Debes registrar al menos una serie"),
});

export const moveDirectionSchema = z.object({
  direction: z.enum(["up", "down"], { message: "Dirección inválida" }),
});

export const copyDaySchema = z.object({
  sourceDayOfWeek: z.number().int().min(1, "Día inválido").max(7, "Día inválido"),
  targetDayOfWeek: z.number().int().min(1, "Día inválido").max(7, "Día inválido"),
  force: z.boolean().optional(),
});

export const assignTemplateSchema = z.object({
  templateId: z.string().trim().min(1, "templateId es obligatorio"),
});