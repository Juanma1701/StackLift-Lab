import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";
import { sendAdminMessageEmail } from "../services/email.service";
import fs from "fs";
import path from "path";

export async function listUsers(_req: AuthRequest, res: Response) {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      emailVerified: true,
      isAdmin: true,
      failedLoginAttempts: true,
      lockedUntil: true,
      createdAt: true,
      lastLoginAt: true,
      lastActiveAt: true,
    },
  });
  res.json(users);
}

export async function listTickets(_req: AuthRequest, res: Response) {
  const tickets = await prisma.supportTicket.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(tickets);
}

export async function resolveTicket(req: AuthRequest, res: Response) {
  const { id } = req.params;

  const ticket = await prisma.supportTicket.update({
    where: { id },
    data: { status: "resolved" },
  });

  res.json(ticket);
}

export async function unlockAccount(req: AuthRequest, res: Response) {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "No existe una cuenta con ese correo" });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { failedLoginAttempts: 0, lockedUntil: null },
  });

  res.json({ message: `Cuenta de ${email} desbloqueada` });
}

export async function updateUser(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { name, emailVerified } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(emailVerified !== undefined && { emailVerified }),
    },
  });

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    emailVerified: user.emailVerified,
  });
}

export async function deleteUser(req: AuthRequest, res: Response) {
  const { id } = req.params;

  if (id === req.userId) {
    return res.status(400).json({ message: "No puedes eliminar tu propia cuenta desde el panel admin" });
  }

  await prisma.user.delete({ where: { id } });
  res.json({ message: "Usuario eliminado" });
}

export async function sendUserEmail(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { subject, message } = req.body;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  await sendAdminMessageEmail(user.email, subject, message);
  res.json({ message: "Correo enviado" });
}

export async function listExerciseImages(_req: AuthRequest, res: Response) {
  const exercises = await prisma.exercise.findMany({
    where: { imageSource: "user" },
    orderBy: { createdAt: "desc" },
    include: {
      muscleGroup: {
        include: {
          routineDay: {
            include: {
              routine: {
                include: { user: { select: { id: true, name: true, email: true } } },
              },
            },
          },
        },
      },
    },
  });

  const images = exercises.map((ex) => ({
    exerciseId: ex.id,
    exerciseName: ex.name,
    imageUrl: ex.imageUrl,
    createdAt: ex.createdAt,
    owner: ex.muscleGroup.routineDay.routine.user,
  }));

  res.json(images);
}

export async function deleteUserExerciseImage(req: AuthRequest, res: Response) {
  const { id } = req.params;

  const exercise = await prisma.exercise.findUnique({ where: { id } });
  if (!exercise) return res.status(404).json({ message: "Ejercicio no encontrado" });

  if (exercise.imageSource === "user" && exercise.imageUrl) {
    const filePath = path.join(__dirname, "../../uploads", path.basename(exercise.imageUrl));
    fs.unlink(filePath, () => {});
  }

  await prisma.exercise.update({
    where: { id },
    data: { imageUrl: null, imageSource: null, imageLicenseAuthor: null, imageLicenseUrl: null, imageSourceUrl: null },
  });

  res.json({ message: "Imagen eliminada" });
}