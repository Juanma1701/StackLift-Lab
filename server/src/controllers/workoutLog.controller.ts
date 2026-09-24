import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";
import { assertExerciseOwner, assertWorkoutLogOwner } from "../middleware/ownership";

interface SetInput {
  weight: number;
  reps: number;
}

// Registrar un nuevo log de entrenamiento para un ejercicio (peso + series + observaciones)
export async function createWorkoutLog(req: AuthRequest, res: Response) {
  await assertExerciseOwner(req.params.exerciseId, req.userId!);
  const { notes, sets } = req.body as { notes?: string; sets: SetInput[] };

  if (!sets || !Array.isArray(sets) || sets.length === 0) {
    return res.status(400).json({ message: "Debes registrar al menos una serie" });
  }

  const log = await prisma.workoutLog.create({
    data: {
      exerciseId: req.params.exerciseId,
      notes,
      sets: {
        create: sets.map((s, i) => ({
          setNumber: i + 1,
          weight: s.weight,
          reps: s.reps,
        })),
      },
    },
    include: { sets: true },
  });

  res.status(201).json(log);
}

// Último registro de un ejercicio (lo que se muestra como "peso actual")
export async function getLatestLog(req: AuthRequest, res: Response) {
  await assertExerciseOwner(req.params.exerciseId, req.userId!);

  const log = await prisma.workoutLog.findFirst({
    where: { exerciseId: req.params.exerciseId },
    orderBy: { performedAt: "desc" },
    include: { sets: { orderBy: { setNumber: "asc" } } },
  });

  res.json(log);
}

// Todos los registros de un ejercicio (usado por Historial/Progreso en Fase 4)
export async function listLogs(req: AuthRequest, res: Response) {
  await assertExerciseOwner(req.params.exerciseId, req.userId!);

  const logs = await prisma.workoutLog.findMany({
    where: { exerciseId: req.params.exerciseId },
    orderBy: { performedAt: "desc" },
    include: { sets: { orderBy: { setNumber: "asc" } } },
  });

  res.json(logs);
}

export async function deleteLog(req: AuthRequest, res: Response) {
  await assertWorkoutLogOwner(req.params.id, req.userId!);
  await prisma.workoutLog.delete({ where: { id: req.params.id } });
  res.json({ message: "Registro eliminado" });
}