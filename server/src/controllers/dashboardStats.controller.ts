import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";
import { toLocalDateKey } from "../utils/dateKey";

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

interface GoalEntry {
  exerciseName: string;
  percent: number;
  currentWeight: number;
  targetWeight: number;
  mostRecent: Date;
}

// Días con al menos un registro en un mes dado, para pintar el calendario
export async function getCalendarMonth(req: AuthRequest, res: Response) {
  const year = Number(req.params.year);
  const month = Number(req.params.month); // 1-12

  const start = new Date(Date.UTC(year, month - 1, 1) - 24 * 60 * 60 * 1000);
  const end = new Date(Date.UTC(year, month, 1) + 24 * 60 * 60 * 1000);

  const logs = await prisma.workoutLog.findMany({
    where: {
      exercise: { muscleGroup: { routineDay: { routine: { userId: req.userId } } } },
      performedAt: { gte: start, lt: end },
    },
    select: { performedAt: true },
  });

  const monthPrefix = `${year}-${String(month).padStart(2, "0")}`;
  const daysWithLogs = Array.from(
    new Set(
      logs
        .map((l) => toLocalDateKey(l.performedAt))
        .filter((key) => key.startsWith(monthPrefix))
    )
  );

  res.json({ daysWithLogs });
}

// Racha (días hábiles consecutivos), volumen de la semana y el ejercicio más cerca de su meta
export async function getDashboardStats(req: AuthRequest, res: Response) {
  const now = new Date();

  const allLogs = await prisma.workoutLog.findMany({
    where: { exercise: { muscleGroup: { routineDay: { routine: { userId: req.userId } } } } },
    select: { performedAt: true },
  });
  const trainedDays = new Set(allLogs.map((l) => toLocalDateKey(l.performedAt)));

  const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const monthlyWorkouts = Array.from(trainedDays).filter((d) => d.startsWith(currentYearMonth)).length;

  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  while (isWeekend(cursor)) cursor.setDate(cursor.getDate() - 1);

  while (trainedDays.has(toLocalDateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
    while (isWeekend(cursor)) cursor.setDate(cursor.getDate() - 1);
  }

  const exercises = await prisma.exercise.findMany({
    where: { muscleGroup: { routineDay: { routine: { userId: req.userId } } } },
    include: { logs: { orderBy: { performedAt: "desc" }, include: { sets: true }, take: 20 } },
  });

  const recentPRs: { exerciseName: string; weight: number; performedAt: Date }[] = [];
  for (const ex of exercises) {
    if (ex.logs.length < 2) continue;
    const [latest, ...rest] = ex.logs;
    const latestWeight = latest.sets[0]?.weight ?? 0;
    const previousMax = rest.reduce((max, l) => Math.max(max, l.sets[0]?.weight ?? 0), 0);
    if (latestWeight > previousMax) {
      recentPRs.push({ exerciseName: ex.name, weight: latestWeight, performedAt: latest.performedAt });
    }
  }
  recentPRs.sort((a, b) => b.performedAt.getTime() - a.performedAt.getTime());

  // Agrupamos por nombre normalizado para no repetir el mismo ejercicio
  // cuando aparece en varios días (ej. "Extensión en polea" en Lunes y Jueves).
  const goalsByName = new Map<string, GoalEntry>();

  for (const ex of exercises) {
    if (!ex.targetWeight || ex.targetWeight <= 0 || ex.logs.length === 0) continue;

    const currentWeight = ex.logs[0].sets[0]?.weight ?? 0;
    const percent = Math.min(100, (currentWeight / ex.targetWeight) * 100);
    const mostRecent = ex.logs[0].performedAt;
    const key = ex.name.trim().toLowerCase();

    const existing = goalsByName.get(key);
    if (!existing || mostRecent > existing.mostRecent) {
      goalsByName.set(key, {
        exerciseName: ex.name,
        percent,
        currentWeight,
        targetWeight: ex.targetWeight,
        mostRecent,
      });
    }
  }

  const goals = Array.from(goalsByName.values())
    .sort((a, b) => b.percent - a.percent)
    .map((g) => ({
      exerciseName: g.exerciseName,
      percent: g.percent,
      currentWeight: g.currentWeight,
      targetWeight: g.targetWeight,
    }));

  res.json({
    streak,
    monthlyWorkouts,
    recentPRs: recentPRs.slice(0, 3).map((p) => ({ exerciseName: p.exerciseName, weight: p.weight })),
    goals: goals.slice(0, 5),
  });
}