export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
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