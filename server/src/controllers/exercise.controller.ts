import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";
import { assertMuscleGroupOwner, assertExerciseOwner, assertTrashedExerciseOwner } from "../middleware/ownership";
import { TRASH_RETENTION_MS } from "../config/trash";
import { saveUpload, deleteUpload } from "../utils/storage";

export async function createExercise(req: AuthRequest, res: Response) {
  await assertMuscleGroupOwner(req.params.muscleGroupId, req.userId!);
  const { name, targetSets, targetReps, targetWeight } = req.body;
  if (!name) return res.status(400).json({ message: "El nombre del ejercicio es obligatorio" });

  const count = await prisma.exercise.count({
    where: { muscleGroupId: req.params.muscleGroupId, deletedAt: null },
  });

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

  const exercise = await prisma.exercise.update({
    where: { id: req.params.id },
    data: { deletedAt: new Date() },
  });

  res.json({
    message: "Ejercicio movido a la papelera. Se elimina definitivamente en 72 horas.",
    deletedAt: exercise.deletedAt,
  });
}

export async function listExerciseTrash(req: AuthRequest, res: Response) {
  const cutoff = new Date(Date.now() - TRASH_RETENTION_MS);

  const exercises = await prisma.exercise.findMany({
    where: {
      deletedAt: { not: null, gt: cutoff },
      muscleGroup: { routineDay: { routine: { userId: req.userId } } },
    },
    orderBy: { deletedAt: "desc" },
    include: {
      muscleGroup: {
        select: {
          name: true,
          routineDay: {
            select: { dayOfWeek: true, routine: { select: { name: true } } },
          },
        },
      },
    },
  });

  const withContext = exercises.map((ex) => ({
    id: ex.id,
    name: ex.name,
    deletedAt: ex.deletedAt,
    expiresAt: new Date(ex.deletedAt!.getTime() + TRASH_RETENTION_MS),
    muscleGroupName: ex.muscleGroup.name,
    routineName: ex.muscleGroup.routineDay.routine.name,
    dayOfWeek: ex.muscleGroup.routineDay.dayOfWeek,
  }));

  res.json(withContext);
}

export async function restoreExercise(req: AuthRequest, res: Response) {
  await assertTrashedExerciseOwner(req.params.id, req.userId!);

  const exercise = await prisma.exercise.update({
    where: { id: req.params.id },
    data: { deletedAt: null },
  });

  res.json({ message: "Ejercicio restaurado", exercise });
}

export async function permanentlyDeleteExercise(req: AuthRequest, res: Response) {
  await assertTrashedExerciseOwner(req.params.id, req.userId!);
  await prisma.exercise.delete({ where: { id: req.params.id } });
  res.json({ message: "Ejercicio eliminado definitivamente" });
}

export async function moveExercise(req: AuthRequest, res: Response) {
  const exercise = await assertExerciseOwner(req.params.id, req.userId!);
  const { direction } = req.body as { direction: "up" | "down" };

  const sibling = await prisma.exercise.findFirst({
    where: {
      muscleGroupId: exercise.muscleGroupId,
      deletedAt: null,
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

  const filename = await saveUpload(req.file);

  const exercise = await prisma.exercise.update({
    where: { id: req.params.id },
    data: {
      imageUrl: `/uploads/${filename}`,
      imageSource: "user",
      imageLicenseAuthor: null,
      imageLicenseUrl: null,
      imageSourceUrl: null,
    },
  });

  if (existing?.imageUrl && existing.imageSource === "user") {
    await deleteUpload(existing.imageUrl);
  }

  res.json(exercise);
}

export async function deleteExerciseImage(req: AuthRequest, res: Response) {
  const existing = await assertExerciseOwner(req.params.id, req.userId!);

  const exercise = await prisma.exercise.update({
    where: { id: req.params.id },
    data: { imageUrl: null, imageSource: null, imageLicenseAuthor: null, imageLicenseUrl: null, imageSourceUrl: null },
  });

  if (existing.imageUrl && existing.imageSource === "user") {
    await deleteUpload(existing.imageUrl);
  }

  res.json(exercise);
}

export async function getExerciseImageTemplates(req: AuthRequest, res: Response) {
  const { q } = req.query;

  const templates = await prisma.exerciseImageTemplate.findMany({
    where: q
      ? { exerciseName: { contains: String(q).toLowerCase().trim(), mode: "insensitive" } }
      : undefined,
    take: 12,
    orderBy: { createdAt: "desc" },
  });

  res.json(templates);
}

export async function assignTemplateImage(req: AuthRequest, res: Response) {
  await assertExerciseOwner(req.params.id, req.userId!);
  const { templateId } = req.body;

  const template = await prisma.exerciseImageTemplate.findUnique({ where: { id: templateId } });
  if (!template) return res.status(404).json({ message: "Plantilla no encontrada" });

  const exercise = await prisma.exercise.update({
    where: { id: req.params.id },
    data: {
      imageUrl: template.imageUrl,
      imageSource: "template",
      imageLicenseAuthor: template.licenseAuthor,
      imageLicenseUrl: template.licenseAuthorUrl,
      imageSourceUrl: template.sourceUrl,
    },
  });

  res.json(exercise);
}