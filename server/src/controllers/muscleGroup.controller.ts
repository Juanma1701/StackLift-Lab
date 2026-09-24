import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";
import { assertDayOwner, assertMuscleGroupOwner } from "../middleware/ownership";

export async function createMuscleGroup(req: AuthRequest, res: Response) {
  await assertDayOwner(req.params.dayId, req.userId!);
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "El nombre del grupo es obligatorio" });

  const count = await prisma.muscleGroup.count({ where: { routineDayId: req.params.dayId } });

  const group = await prisma.muscleGroup.create({
    data: { name, routineDayId: req.params.dayId, order: count },
    include: { exercises: true },
  });

  res.status(201).json(group);
}

export async function deleteMuscleGroup(req: AuthRequest, res: Response) {
  await assertMuscleGroupOwner(req.params.id, req.userId!);
  await prisma.muscleGroup.delete({ where: { id: req.params.id } });
  res.json({ message: "Grupo muscular eliminado" });
}

export async function moveMuscleGroup(req: AuthRequest, res: Response) {
  const group = await assertMuscleGroupOwner(req.params.id, req.userId!);
  const { direction } = req.body as { direction: "up" | "down" };

  const sibling = await prisma.muscleGroup.findFirst({
    where: {
      routineDayId: group.routineDayId,
      order: direction === "up" ? { lt: group.order } : { gt: group.order },
    },
    orderBy: { order: direction === "up" ? "desc" : "asc" },
  });

  if (!sibling) return res.json({ message: "No se puede mover más en esa dirección" });

  await prisma.$transaction([
    prisma.muscleGroup.update({ where: { id: group.id }, data: { order: sibling.order } }),
    prisma.muscleGroup.update({ where: { id: sibling.id }, data: { order: group.order } }),
  ]);

  res.json({ message: "Orden actualizado" });
}