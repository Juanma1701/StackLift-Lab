import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";
import { assertRoutineOwner } from "../middleware/ownership";
import { COMMON_EXERCISES_BY_MUSCLE_GROUP } from "../data/commonExercises";

export async function listRoutines(req: AuthRequest, res: Response) {
  const routines = await prisma.routine.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, updatedAt: true },
  });
  res.json(routines);
}

export async function createRoutine(req: AuthRequest, res: Response) {
  const { name, template } = req.body as {
    name: string;
    template?: Record<number, string[]>; // { 1: ["Pecho", "Tríceps"], 2: [], ... }
  };
  if (!name) return res.status(400).json({ message: "El nombre es obligatorio" });

  const routine = await prisma.routine.create({
    data: {
      name,
      userId: req.userId!,
      days: {
        create: [1, 2, 3, 4, 5].map((dayOfWeek) => ({
          dayOfWeek,
          muscleGroups: {
            create: (template?.[dayOfWeek] ?? []).map((groupName, order) => ({
              name: groupName,
              order,
              exercises: {
                create: (COMMON_EXERCISES_BY_MUSCLE_GROUP[groupName] ?? []).map((ex, exOrder) => ({
                  name: ex.name,
                  order: exOrder,
                })),
              },
            })),
          },
        })),
      },
    },
    include: { days: { include: { muscleGroups: { include: { exercises: true } } } } },
  });

  res.status(201).json(routine);
}

export async function getRoutine(req: AuthRequest, res: Response) {
  await assertRoutineOwner(req.params.id, req.userId!);

  const routine = await prisma.routine.findUnique({
    where: { id: req.params.id },
    include: {
      days: {
        orderBy: { dayOfWeek: "asc" },
        include: {
          muscleGroups: {
            orderBy: { order: "asc" },
            include: { exercises: { orderBy: { order: "asc" } } },
          },
        },
      },
    },
  });

  res.json(routine);
}

export async function renameRoutine(req: AuthRequest, res: Response) {
  await assertRoutineOwner(req.params.id, req.userId!);
  const { name } = req.body;
  const routine = await prisma.routine.update({
    where: { id: req.params.id },
    data: { name },
  });
  res.json(routine);
}

export async function deleteRoutine(req: AuthRequest, res: Response) {
  await assertRoutineOwner(req.params.id, req.userId!);
  await prisma.routine.delete({ where: { id: req.params.id } });
  res.json({ message: "Rutina eliminada" });
}

export async function copyDay(req: AuthRequest, res: Response) {
  await assertRoutineOwner(req.params.id, req.userId!);

  const { sourceDayOfWeek, targetDayOfWeek } = req.body;

  if (!sourceDayOfWeek || !targetDayOfWeek) {
    return res.status(400).json({ message: "Debes indicar el día origen y el día destino" });
  }
  if (sourceDayOfWeek === targetDayOfWeek) {
    return res.status(400).json({ message: "El día origen y destino no pueden ser el mismo" });
  }

  const sourceDay = await prisma.routineDay.findUnique({
    where: { routineId_dayOfWeek: { routineId: req.params.id, dayOfWeek: sourceDayOfWeek } },
    include: { muscleGroups: { include: { exercises: true }, orderBy: { order: "asc" } } },
  });

  if (!sourceDay) {
    return res.status(404).json({ message: "El día origen no existe" });
  }

  const targetDay = await prisma.routineDay.findUnique({
    where: { routineId_dayOfWeek: { routineId: req.params.id, dayOfWeek: targetDayOfWeek } },
  });

  if (!targetDay) {
    return res.status(404).json({ message: "El día destino no existe" });
  }

  const updatedTargetDay = await prisma.$transaction(async (tx) => {
    // Borra lo que ya había en el día destino (cascada borra sus exercises)
    await tx.muscleGroup.deleteMany({ where: { routineDayId: targetDay.id } });

    // Recrea cada grupo muscular y sus ejercicios, copiando también imageUrl
    for (const group of sourceDay.muscleGroups) {
      await tx.muscleGroup.create({
        data: {
          routineDayId: targetDay.id,
          name: group.name,
          order: group.order,
          exercises: {
            create: group.exercises.map((ex) => ({
              name: ex.name,
              imageUrl: ex.imageUrl,
              targetSets: ex.targetSets,
              targetReps: ex.targetReps,
              order: ex.order,
            })),
          },
        },
      });
    }

    return tx.routineDay.findUnique({
      where: { id: targetDay.id },
      include: { muscleGroups: { include: { exercises: true }, orderBy: { order: "asc" } } },
    });
  });

  res.json(updatedTargetDay);
}