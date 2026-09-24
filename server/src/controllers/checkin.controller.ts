import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";
import { toLocalDateKey } from "../utils/dateKey";

export async function saveCheckIn(req: AuthRequest, res: Response) {
  const { difficulty, notes, date } = req.body as { difficulty: number; notes?: string; date?: string };

  if (!difficulty || difficulty < 1 || difficulty > 10) {
    return res.status(400).json({ message: "La dificultad debe ser un número del 1 al 10" });
  }

  const targetDate = date ?? toLocalDateKey(new Date());

  const checkIn = await prisma.dailyCheckIn.upsert({
    where: { userId_date: { userId: req.userId!, date: targetDate } },
    update: { difficulty, notes },
    create: { userId: req.userId!, date: targetDate, difficulty, notes },
  });

  res.json(checkIn);
}

export async function getTodayCheckIn(req: AuthRequest, res: Response) {
  const today = toLocalDateKey(new Date());
  const checkIn = await prisma.dailyCheckIn.findUnique({
    where: { userId_date: { userId: req.userId!, date: today } },
  });
  res.json(checkIn);
}

export async function getCheckInByDate(req: AuthRequest, res: Response) {
  const checkIn = await prisma.dailyCheckIn.findUnique({
    where: { userId_date: { userId: req.userId!, date: req.params.date } },
  });
  res.json(checkIn);
}

export async function listCheckIns(req: AuthRequest, res: Response) {
  const checkIns = await prisma.dailyCheckIn.findMany({
    where: { userId: req.userId },
    orderBy: { date: "desc" },
  });
  res.json(checkIns);
}