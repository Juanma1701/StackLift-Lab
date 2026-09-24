import { Request, Response } from "express";
import crypto from "crypto";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";

export async function generateShareLink(req: AuthRequest, res: Response) {
  const token = crypto.randomBytes(16).toString("hex");
  await prisma.user.update({
    where: { id: req.userId },
    data: { shareToken: token },
  });
  res.json({ token });
}

export async function revokeShareLink(req: AuthRequest, res: Response) {
  await prisma.user.update({
    where: { id: req.userId },
    data: { shareToken: null },
  });
  res.json({ message: "Enlace revocado" });
}

export async function getShareStatus(req: AuthRequest, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { shareToken: true },
  });
  res.json({ token: user?.shareToken ?? null });
}

// Ruta pública — sin requireAuth. Solo expone datos agregados, nunca email ni avatar.
export async function getPublicProgress(req: Request, res: Response) {
  const { token } = req.params;

  const user = await prisma.user.findUnique({
    where: { shareToken: token },
    select: { id: true, name: true },
  });

  if (!user) {
    return res.status(404).json({ message: "Enlace no válido" });
  }

  const now = new Date();
  const allLogs = await prisma.workoutLog.findMany({
    where: { exercise: { muscleGroup: { routineDay: { routine: { userId: user.id } } } } },
    select: { performedAt: true },
  });
  const trainedDays = new Set(allLogs.map((l) => l.performedAt.toISOString().split("T")[0]));

  const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const monthlyWorkouts = Array.from(trainedDays).filter((d) => d.startsWith(currentYearMonth)).length;

  function isWeekend(date: Date) {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  while (isWeekend(cursor)) cursor.setDate(cursor.getDate() - 1);
  while (trainedDays.has(cursor.toISOString().split("T")[0])) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
    while (isWeekend(cursor)) cursor.setDate(cursor.getDate() - 1);
  }

  const exercises = await prisma.exercise.findMany({
    where: {
      muscleGroup: { routineDay: { routine: { userId: user.id } } },
      targetWeight: { not: null },
    },
    include: {
      logs: { orderBy: { performedAt: "asc" }, include: { sets: true } },
    },
  });

  const recentPRs: { exerciseName: string; weight: number; performedAt: Date }[] = [];
  for (const ex of exercises) {
    if (ex.logs.length < 2) continue;
    const [latest, ...rest] = [...ex.logs].reverse();
    const latestWeight = latest.sets[0]?.weight ?? 0;
    const previousMax = rest.reduce((max, l) => Math.max(max, l.sets[0]?.weight ?? 0), 0);
    if (latestWeight > previousMax) {
      recentPRs.push({ exerciseName: ex.name, weight: latestWeight, performedAt: latest.performedAt });
    }
  }
  recentPRs.sort((a, b) => b.performedAt.getTime() - a.performedAt.getTime());

  const progress = exercises
    .filter((ex) => ex.logs.length > 0)
    .map((ex) => {
      const currentWeight = ex.logs[ex.logs.length - 1].sets[0]?.weight ?? 0;
      const percent = Math.min(100, (currentWeight / ex.targetWeight!) * 100);
      return {
        exerciseName: ex.name,
        currentWeight,
        targetWeight: ex.targetWeight!,
        percent,
        history: ex.logs.map((log) => ({
          date: log.performedAt,
          weight: log.sets[0]?.weight ?? 0,
        })),
      };
    })
    .sort((a, b) => b.percent - a.percent);

  res.json({
    name: user.name.split(" ")[0], // solo el primer nombre
    streak,
    monthlyWorkouts,
    recentPRs: recentPRs.slice(0, 3).map((p) => ({ exerciseName: p.exerciseName, weight: p.weight })),
    progress,
  });
}