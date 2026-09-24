import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { WorkoutLog } from "@/types";

export function useExerciseLog(exerciseId: string) {
  const [latestLog, setLatestLog] = useState<WorkoutLog | null>(null);
  const [isPR, setIsPR] = useState(false);
  const [repeating, setRepeating] = useState(false);

  async function loadLatest() {
    const logs: WorkoutLog[] = await api.listLogs(exerciseId);
    if (logs.length === 0) {
      setLatestLog(null);
      setIsPR(false);
      return;
    }
    const latest = logs[0];
    setLatestLog(latest);

    const latestWeight = latest.sets[0]?.weight ?? 0;
    const previousMax = logs.slice(1).reduce((max, l) => Math.max(max, l.sets[0]?.weight ?? 0), 0);
    setIsPR(logs.length > 1 && latestWeight > previousMax);
  }

  useEffect(() => {
    loadLatest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseId]);

  async function repeatLast(onDone?: () => void) {
    if (!latestLog) return;
    setRepeating(true);
    try {
      const sets = latestLog.sets.map((s) => ({ weight: s.weight, reps: s.reps }));
      await api.createWorkoutLog(exerciseId, latestLog.notes ?? "", sets);
      await loadLatest();
      onDone?.();
    } finally {
      setRepeating(false);
    }
  }

  return { latestLog, isPR, repeating, loadLatest, repeatLast };
}