import { prisma } from "../config/prisma";
import { TRASH_RETENTION_MS } from "../config/trash";

export async function purgeTrash() {
  const cutoff = new Date(Date.now() - TRASH_RETENTION_MS);

  const routinesResult = await prisma.routine.deleteMany({
    where: { deletedAt: { not: null, lte: cutoff } },
  });

  const exercisesResult = await prisma.exercise.deleteMany({
    where: { deletedAt: { not: null, lte: cutoff } },
  });

  if (routinesResult.count > 0) {
    console.log(`Papelera: ${routinesResult.count} rutina(s) purgada(s) definitivamente.`);
  }
  if (exercisesResult.count > 0) {
    console.log(`Papelera: ${exercisesResult.count} ejercicio(s) purgado(s) definitivamente.`);
  }
}