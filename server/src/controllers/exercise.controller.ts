import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";
import { assertMuscleGroupOwner, assertExerciseOwner } from "../middleware/ownership";
import fs from "fs";
import path from "path";

export async function createExercise(req: AuthRequest, res: Response) {
  await assertMuscleGroupOwner(req.params.muscleGroupId, req.userId!);
  const { name, targetSets, targetReps, targetWeight } = req.body;
  if (!name) return res.status(400).json({ message: "El nombre del ejercicio es obligatorio" });

  const count = await prisma.exercise.count({ where: { muscleGroupId: req.params.muscleGroupId } });

  const exercise = await prisma.exercise.create({
    data: {
      name,
      targetSets: targetSets || 3,
      targetReps: targetReps || 10,
      targetWeight: targetWeight ?? null,
      muscleGroupId: req.params.muscleGroupId,
      order: count,
    },
  });

  res.status(201).json(exercise);
}

export async function updateExercise(req: AuthRequest, res: Response) {
  const existing = await assertExerciseOwner(req.params.id, req.userId!);
  const { name, targetSets, targetReps, targetWeight } = req.body;

  const exercise = await prisma.exercise.update({
    where: { id: req.params.id },
    data: { name, targetSets, targetReps, targetWeight },
  });

  // Si se actualizó la meta de peso, la propagamos a otros ejercicios con el mismo nombre
  // dentro de la misma rutina (mismo movimiento repetido en varios días), sin tocar sus registros.
  if (targetWeight !== undefined) {
    const muscleGroup = await prisma.muscleGroup.findUnique({
      where: { id: existing.muscleGroupId },
      include: { routineDay: true },
    });

    if (muscleGroup) {
      await prisma.exercise.updateMany({
        where: {
          id: { not: exercise.id },
          name: { equals: exercise.name, mode: "insensitive" },
          muscleGroup: { routineDay: { routineId: muscleGroup.routineDay.routineId } },
        },
        data: { targetWeight },
      });
    }
  }

  res.json(exercise);
}

export async function deleteExercise(req: AuthRequest, res: Response) {
  await assertExerciseOwner(req.params.id, req.userId!);
  await prisma.exercise.delete({ where: { id: req.params.id } });
  res.json({ message: "Ejercicio eliminado" });
}

export async function moveExercise(req: AuthRequest, res: Response) {
  const exercise = await assertExerciseOwner(req.params.id, req.userId!);
  const { direction } = req.body as { direction: "up" | "down" };

  const sibling = await prisma.exercise.findFirst({
    where: {
      muscleGroupId: exercise.muscleGroupId,
      order: direction === "up" ? { lt: exercise.order } : { gt: exercise.order },
    },
    orderBy: { order: direction === "up" ? "desc" : "asc" },
  });

  if (!sibling) return res.json({ message: "No se puede mover más en esa dirección" });

  await prisma.$transaction([
    prisma.exercise.update({ where: { id: exercise.id }, data: { order: sibling.order } }),
    prisma.exercise.update({ where: { id: sibling.id }, data: { order: exercise.order } }),
  ]);

  res.json({ message: "Orden actualizado" });
}

export async function uploadExerciseImage(req: AuthRequest, res: Response) {
  await assertExerciseOwner(req.params.id, req.userId!);
  if (!req.file) return res.status(400).json({ message: "No se recibió ninguna imagen" });

  const existing = await prisma.exercise.findUnique({ where: { id: req.params.id } });
  if (existing?.imageUrl) {
    const oldPath = path.join(__dirname, "../../uploads", path.basename(existing.imageUrl));
    fs.unlink(oldPath, () => {});
  }

  const exercise = await prisma.exercise.update({
    where: { id: req.params.id },
    data: { imageUrl: `/uploads/${req.file.filename}` },
  });

  res.json(exercise);
}

export async function deleteExerciseImage(req: AuthRequest, res: Response) {
  const existing = await assertExerciseOwner(req.params.id, req.userId!);

  if (existing.imageUrl) {
    const oldPath = path.join(__dirname, "../../uploads", path.basename(existing.imageUrl));
    fs.unlink(oldPath, () => {});
  }

  const exercise = await prisma.exercise.update({
    where: { id: req.params.id },
    data: { imageUrl: null },
  });

  res.json(exercise);
}