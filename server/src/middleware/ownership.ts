import { prisma } from "../config/prisma";

export async function assertRoutineOwner(routineId: string, userId: string) {
  const routine = await prisma.routine.findUnique({ where: { id: routineId } });
  if (!routine || routine.userId !== userId) {
    const err: any = new Error("Rutina no encontrada");
    err.status = 404;
    throw err;
  }
  return routine;
}

export async function assertDayOwner(dayId: string, userId: string) {
  const day = await prisma.routineDay.findUnique({
    where: { id: dayId },
    include: { routine: true },
  });
  if (!day || day.routine.userId !== userId) {
    const err: any = new Error("Día no encontrado");
    err.status = 404;
    throw err;
  }
  return day;
}

export async function assertMuscleGroupOwner(muscleGroupId: string, userId: string) {
  const group = await prisma.muscleGroup.findUnique({
    where: { id: muscleGroupId },
    include: { routineDay: { include: { routine: true } } },
  });
  if (!group || group.routineDay.routine.userId !== userId) {
    const err: any = new Error("Grupo muscular no encontrado");
    err.status = 404;
    throw err;
  }
  return group;
}

export async function assertExerciseOwner(exerciseId: string, userId: string) {
  const exercise = await prisma.exercise.findUnique({
    where: { id: exerciseId },
    include: { muscleGroup: { include: { routineDay: { include: { routine: true } } } } },
  });
  if (!exercise || exercise.muscleGroup.routineDay.routine.userId !== userId) {
    const err: any = new Error("Ejercicio no encontrado");
    err.status = 404;
    throw err;
  }
  return exercise;
}

export async function assertWorkoutLogOwner(logId: string, userId: string) {
  const log = await prisma.workoutLog.findUnique({
    where: { id: logId },
    include: { exercise: { include: { muscleGroup: { include: { routineDay: { include: { routine: true } } } } } } },
  });
  if (!log || log.exercise.muscleGroup.routineDay.routine.userId !== userId) {
    const err: any = new Error("Registro no encontrado");
    err.status = 404;
    throw err;
  }
  return log;
}