import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";

export async function exportUserData(req: AuthRequest, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { name: true, email: true, createdAt: true },
  });

  const routines = await prisma.routine.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "asc" },
    include: {
      days: {
        orderBy: { dayOfWeek: "asc" },
        include: {
          muscleGroups: {
            orderBy: { order: "asc" },
            include: {
              exercises: {
                orderBy: { order: "asc" },
                include: {
                  logs: {
                    orderBy: { performedAt: "asc" },
                    include: { sets: { orderBy: { setNumber: "asc" } } },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const exportData = {
    exportedAt: new Date().toISOString(),
    user,
    routines: routines.map((r) => ({
      name: r.name,
      createdAt: r.createdAt,
      days: r.days.map((d) => ({
        dayOfWeek: d.dayOfWeek,
        muscleGroups: d.muscleGroups.map((g) => ({
          name: g.name,
          exercises: g.exercises.map((ex) => ({
            name: ex.name,
            targetSets: ex.targetSets,
            targetReps: ex.targetReps,
            targetWeight: ex.targetWeight,
            logs: ex.logs.map((log) => ({
              performedAt: log.performedAt,
              notes: log.notes,
              sets: log.sets.map((s) => ({ weight: s.weight, reps: s.reps })),
            })),
          })),
        })),
      })),
    })),
  };

  const filename = `gym-tracker-export-${new Date().toISOString().split("T")[0]}.json`;
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Type", "application/json");
  res.json(exportData);
}