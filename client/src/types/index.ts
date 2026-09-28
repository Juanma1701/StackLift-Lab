export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  emailVerified: boolean;
  isAdmin: boolean;
  twoFactorEnabled: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  emailVerified: boolean;
  isAdmin: boolean;
  failedLoginAttempts: number;
  lockedUntil: string | null;
  createdAt: string;
  lastLoginAt: string | null;
  lastActiveAt: string | null;
}

export interface AdminExerciseImage {
  exerciseId: string;
  exerciseName: string;
  imageUrl: string | null;
  createdAt: string;
  owner: { id: string; name: string; email: string };
}

export interface TrustedDevice {
  id: string;
  userAgent: string | null;
  createdAt: string;
  lastUsedAt: string;
  expiresAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string | null;
  email: string;
  subject: string;
  message: string;
  type: "bug" | "idea" | "other";
  status: "open" | "resolved";
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  imageUrl: string | null;
  targetSets: number;
  targetReps: number;
  targetWeight?: number | null;
  order: number;
}

export interface MuscleGroup {
  id: string;
  name: string;
  order: number;
  exercises: Exercise[];
}

export interface RoutineDay {
  id: string;
  dayOfWeek: number;
  muscleGroups: MuscleGroup[];
}

export interface RoutineSummary {
  id: string;
  name: string;
  updatedAt: string;
}

export interface Routine extends RoutineSummary {
  days: RoutineDay[];
}

export interface SetLog {
  id: string;
  setNumber: number;
  weight: number;
  reps: number;
}

export interface WorkoutLog {
  id: string;
  notes: string | null;
  performedAt: string;
  sets: SetLog[];
}

export interface HistoryExerciseEntry {
  id: string;
  exerciseName: string;
  muscleGroupName: string;
  sets: SetLog[];
  notes: string | null;
}

export interface HistoryDay {
  date: string;
  entries: HistoryExerciseEntry[];
}

export interface ExerciseOption {
  id: string;
  name: string;
  muscleGroupName: string;
  dayOfWeek: number;
}

export interface PublicProgressPoint {
  date: string;
  weight: number;
}

export interface PublicProgressExercise {
  exerciseName: string;
  currentWeight: number;
  targetWeight: number;
  percent: number;
  history: PublicProgressPoint[];
}

export interface PublicProgressData {
  name: string;
  streak: number;
  monthlyWorkouts: number;
  recentPRs: { exerciseName: string; weight: number }[];
  progress: PublicProgressExercise[];
}

export interface DailyCheckIn {
  id: string;
  date: string;
  difficulty: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TrashedRoutine {
  id: string;
  name: string;
  deletedAt: string;
  expiresAt: string;
}

export interface TrashedExercise {
  id: string;
  name: string;
  deletedAt: string;
  expiresAt: string;
  muscleGroupName: string;
  routineName: string;
  dayOfWeek: number;
}