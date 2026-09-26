import { showToast } from "./toast";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL no está definida. Revisa las variables de entorno en Vercel.");
}

export const SERVER_URL = API_URL.replace(/\/api$/, "");;

export function getFullImageUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path; // URL absoluta (ej. imágenes de wger.de)
  return `${SERVER_URL}${path}`; // ruta relativa (imágenes subidas por el usuario)
}

async function request(path: string, options: RequestInit = {}, opts: { silent?: boolean } = {}) {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  } catch {
    if (!opts.silent) showToast("No se pudo conectar con el servidor", "error");
    throw new Error("No se pudo conectar con el servidor");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.message || "Error en la solicitud";
    if (!opts.silent) showToast(message, "error");
    throw new Error(message);
  }
  return data;
}

async function uploadRequest(path: string, method: string, file: File) {
  const formData = new FormData();
  formData.append("image", file);

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      credentials: "include",
      body: formData,
    });
  } catch {
    showToast("No se pudo conectar con el servidor", "error");
    throw new Error("No se pudo conectar con el servidor");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.message || "Error subiendo la imagen";
    showToast(message, "error");
    throw new Error(message);
  }
  return data;
}

// request sin cookie de sesión — para la ruta pública de compartir
async function publicRequest(path: string) {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`);
  } catch {
    throw new Error("No se pudo conectar con el servidor");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Enlace no válido");
  }
  return data;
}

export const api = {
  register: (name: string, email: string, password: string) =>
    request("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) }),
  login: (email: string, password: string) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  logout: () => request("/auth/logout", { method: "POST" }),
  me: () => request("/auth/me", {}, { silent: true }),
  updateProfile: (name: string) =>
    request("/auth/me", { method: "PATCH", body: JSON.stringify({ name }) }),
  uploadAvatar: (file: File) => uploadRequest("/auth/me/avatar", "POST", file),
  forgotPassword: (email: string) =>
    request("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }),
  resetPassword: (uid: string, token: string, newPassword: string) =>
    request("/auth/reset-password", { method: "POST", body: JSON.stringify({ uid, token, newPassword }) }),
  exportData: async () => {
    const res = await fetch(`${API_URL}/export`, { credentials: "include" });
    if (!res.ok) throw new Error("Error al exportar los datos");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gym-tracker-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  },

  getShareStatus: () => request("/share/status"),
  generateShareLink: () => request("/share/generate", { method: "POST" }),
  revokeShareLink: () => request("/share/revoke", { method: "DELETE" }),
  getPublicProgress: (token: string) => publicRequest(`/share/${token}`),

  saveCheckIn: (difficulty: number, notes: string, date?: string) =>
    request("/checkins", { method: "POST", body: JSON.stringify({ difficulty, notes, date }) }),
  getTodayCheckIn: () => request("/checkins/today"),
  listCheckIns: () => request("/checkins"),

  listRoutines: () => request("/routines"),
  createRoutine: (name: string, template?: Record<number, string[]>) =>
    request("/routines", { method: "POST", body: JSON.stringify({ name, template }) }),
  getRoutine: (id: string) => request(`/routines/${id}`),
  deleteRoutine: (id: string) => request(`/routines/${id}`, { method: "DELETE" }),
  renameRoutine: (id: string, name: string) =>
    request(`/routines/${id}`, { method: "PATCH", body: JSON.stringify({ name }) }),
  getRoutineHistory: (routineId: string) => request(`/routines/${routineId}/history`),
  getCalendarMonth: (year: number, month: number) => request(`/calendar/${year}/${month}`),
  getDashboardStats: () => request(`/stats/dashboard`),
  copyDay: async (routineId: string, sourceDayOfWeek: number, targetDayOfWeek: number, force = false) => {
    console.log("Llamando copyDay", { routineId, sourceDayOfWeek, targetDayOfWeek, force });
    const res = await fetch(`${API_URL}/routines/${routineId}/copy-day`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceDayOfWeek, targetDayOfWeek, force }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.status === 409) {
      return { conflict: true as const, message: data.message, logsAtRisk: data.logsAtRisk };
    }
    if (!res.ok) throw new Error(data.message || "Error al copiar el día");

    return { conflict: false as const, day: data };
  },

  createMuscleGroup: (dayId: string, name: string) =>
    request(`/routine-days/${dayId}/muscle-groups`, { method: "POST", body: JSON.stringify({ name }) }),
  deleteMuscleGroup: (id: string) => request(`/muscle-groups/${id}`, { method: "DELETE" }),
  moveMuscleGroup: (id: string, direction: "up" | "down") =>
    request(`/muscle-groups/${id}/move`, { method: "PATCH", body: JSON.stringify({ direction }) }),

  createExercise: (muscleGroupId: string, name: string, targetSets: number, targetReps: number, targetWeight?: number) =>
    request(`/muscle-groups/${muscleGroupId}/exercises`, {
      method: "POST",
      body: JSON.stringify({ name, targetSets, targetReps, targetWeight }),
    }),

  updateExercise: (
    id: string,
    data: Partial<{ name: string; targetSets: number; targetReps: number; targetWeight: number | null }>
  ) => request(`/exercises/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteExercise: (id: string) => request(`/exercises/${id}`, { method: "DELETE" }),
  moveExercise: (id: string, direction: "up" | "down") =>
    request(`/exercises/${id}/move`, { method: "PATCH", body: JSON.stringify({ direction }) }),
  uploadExerciseImage: (exerciseId: string, file: File) =>
    uploadRequest(`/exercises/${exerciseId}/image`, "POST", file),
  deleteExerciseImage: (exerciseId: string) =>
    request(`/exercises/${exerciseId}/image`, { method: "DELETE" }),
  getExerciseImageTemplates: (exerciseName: string) =>
    request(`/exercises/image-templates?q=${encodeURIComponent(exerciseName)}`),
  assignExerciseTemplate: (exerciseId: string, templateId: string) =>
    request(`/exercises/${exerciseId}/image-template`, {
      method: "POST",
      body: JSON.stringify({ templateId }),
    }),

  getLatestLog: (exerciseId: string) => request(`/exercises/${exerciseId}/logs/latest`),
  listLogs: (exerciseId: string) => request(`/exercises/${exerciseId}/logs`),
  deleteLog: (id: string) => request(`/logs/${id}`, { method: "DELETE" }),
  createWorkoutLog: (exerciseId: string, notes: string, sets: { weight: number; reps: number }[]) =>
    request(`/exercises/${exerciseId}/logs`, { method: "POST", body: JSON.stringify({ notes, sets }) }),
};