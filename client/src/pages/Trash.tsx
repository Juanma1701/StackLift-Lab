import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { api } from "@/lib/api";
import type { TrashedRoutine, TrashedExercise } from "@/types";

const DAY_NAMES: Record<number, string> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
};

function formatTimeLeft(expiresAtIso: string): string {
  const diffMs = new Date(expiresAtIso).getTime() - Date.now();
  if (diffMs <= 0) return "Eliminándose...";

  const hours = Math.floor(diffMs / (60 * 60 * 1000));
  const minutes = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000));

  if (hours >= 1) return `${hours} h restantes`;
  return `${minutes} min restantes`;
}

export function Trash() {
  const [tab, setTab] = useState<"routines" | "exercises">("routines");

  const [routines, setRoutines] = useState<TrashedRoutine[]>([]);
  const [loadingRoutines, setLoadingRoutines] = useState(true);
  const [busyRoutineId, setBusyRoutineId] = useState<string | null>(null);

  const [exercises, setExercises] = useState<TrashedExercise[]>([]);
  const [loadingExercises, setLoadingExercises] = useState(true);
  const [busyExerciseId, setBusyExerciseId] = useState<string | null>(null);

  async function loadRoutines() {
    setLoadingRoutines(true);
    try {
      const data = await api.listTrash();
      setRoutines(data);
    } finally {
      setLoadingRoutines(false);
    }
  }

  async function loadExercises() {
    setLoadingExercises(true);
    try {
      const data = await api.listExerciseTrash();
      setExercises(data);
    } finally {
      setLoadingExercises(false);
    }
  }

  useEffect(() => {
    loadRoutines();
    loadExercises();
  }, []);

  async function handleRestoreRoutine(id: string) {
    setBusyRoutineId(id);
    try {
      await api.restoreRoutine(id);
      await loadRoutines();
    } finally {
      setBusyRoutineId(null);
    }
  }

  async function handlePermanentDeleteRoutine(id: string, name: string) {
    const confirmed = window.confirm(`¿Eliminar "${name}" definitivamente? Esto no se puede deshacer.`);
    if (!confirmed) return;

    setBusyRoutineId(id);
    try {
      await api.permanentlyDeleteRoutine(id);
      await loadRoutines();
    } finally {
      setBusyRoutineId(null);
    }
  }

  async function handleRestoreExercise(id: string) {
    setBusyExerciseId(id);
    try {
      await api.restoreExercise(id);
      await loadExercises();
    } finally {
      setBusyExerciseId(null);
    }
  }

  async function handlePermanentDeleteExercise(id: string, name: string) {
    const confirmed = window.confirm(`¿Eliminar "${name}" definitivamente? Esto no se puede deshacer.`);
    if (!confirmed) return;

    setBusyExerciseId(id);
    try {
      await api.permanentlyDeleteExercise(id);
      await loadExercises();
    } finally {
      setBusyExerciseId(null);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-md mx-auto px-6 py-8">
        <h1 className="font-display font-bold text-2xl tracking-wide mb-1">PAPELERA</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Lo eliminado se guarda aquí 72 horas antes de borrarse definitivamente.
        </p>

        <div className="flex gap-2 border-b border-border mb-4">
          <button
            onClick={() => setTab("routines")}
            className={`text-sm px-4 py-2 border-b-2 transition-colors ${
              tab === "routines" ? "border-primary text-foreground font-medium" : "border-transparent text-muted-foreground"
            }`}
          >
            Rutinas ({routines.length})
          </button>
          <button
            onClick={() => setTab("exercises")}
            className={`text-sm px-4 py-2 border-b-2 transition-colors ${
              tab === "exercises" ? "border-primary text-foreground font-medium" : "border-transparent text-muted-foreground"
            }`}
          >
            Ejercicios ({exercises.length})
          </button>
        </div>

        {tab === "routines" && (
          <div className="space-y-3">
            {loadingRoutines && <p className="text-sm text-muted-foreground">Cargando...</p>}
            {!loadingRoutines && routines.length === 0 && (
              <p className="text-sm text-muted-foreground">No hay rutinas en la papelera.</p>
            )}
            {routines.map((r) => (
              <div key={r.id} className="bg-card border border-border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{r.name}</p>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                    {formatTimeLeft(r.expiresAt)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRestoreRoutine(r.id)}
                    disabled={busyRoutineId === r.id}
                    className="flex-1 text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50"
                  >
                    Restaurar
                  </button>
                  <button
                    onClick={() => handlePermanentDeleteRoutine(r.id, r.name)}
                    disabled={busyRoutineId === r.id}
                    className="text-xs px-3 py-1.5 rounded-md bg-destructive/20 text-destructive hover:bg-destructive/30 disabled:opacity-50"
                  >
                    Eliminar ya
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "exercises" && (
          <div className="space-y-3">
            {loadingExercises && <p className="text-sm text-muted-foreground">Cargando...</p>}
            {!loadingExercises && exercises.length === 0 && (
              <p className="text-sm text-muted-foreground">No hay ejercicios en la papelera.</p>
            )}
            {exercises.map((ex) => (
              <div key={ex.id} className="bg-card border border-border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{ex.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {ex.routineName} · {DAY_NAMES[ex.dayOfWeek] ?? `Día ${ex.dayOfWeek}`} · {ex.muscleGroupName}
                    </p>
                  </div>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                    {formatTimeLeft(ex.expiresAt)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRestoreExercise(ex.id)}
                    disabled={busyExerciseId === ex.id}
                    className="flex-1 text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50"
                  >
                    Restaurar
                  </button>
                  <button
                    onClick={() => handlePermanentDeleteExercise(ex.id, ex.name)}
                    disabled={busyExerciseId === ex.id}
                    className="text-xs px-3 py-1.5 rounded-md bg-destructive/20 text-destructive hover:bg-destructive/30 disabled:opacity-50"
                  >
                    Eliminar ya
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}