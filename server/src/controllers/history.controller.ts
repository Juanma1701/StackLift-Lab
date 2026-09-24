import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";
import { assertRoutineOwner } from "../middleware/ownership";
import { toLocalDateKey } from "../utils/dateKey";

// Agrupa todos los WorkoutLog de una rutina por fecha, con el detalle de cada ejercicio ese día
export async function getRoutineHistory(req: AuthRequest, res: Response) {
  await assertRoutineOwner(req.params.routineId, req.userId!);

  const logs = await prisma.workoutLog.findMany({
    where: {
      exercise: {
        muscleGroup: { routineDay: { routineId: req.params.routineId } },
      },
    },
    orderBy: { performedAt: "desc" },
    include: {
      sets: { orderBy: { setNumber: "asc" } },
      exercise: { include: { muscleGroup: true } },
    },
  });

  const grouped = new Map<string, any[]>();
  for (const log of logs) {
    const dateKey = toLocalDateKey(log.performedAt);
    if (!grouped.has(dateKey)) grouped.set(dateKey, []);
    grouped.get(dateKey)!.push({
      id: log.id,
      exerciseName: log.exercise.name,
      muscleGroupName: log.exercise.muscleGroup.name,
      sets: log.sets,
      notes: log.notes,
    });
  }

  const result = Array.from(grouped.entries()).map(([date, entries]) => ({ date, entries }));
  res.json(result);
}