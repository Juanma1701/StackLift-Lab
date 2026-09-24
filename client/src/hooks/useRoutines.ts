import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { Routine, RoutineSummary } from "@/types";

export function useRoutines() {
  const [routines, setRoutines] = useState<RoutineSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadRoutines = useCallback(async () => {
    const list: RoutineSummary[] = await api.listRoutines();
    setRoutines(list);
    if (list.length && !selectedId) {
      setSelectedId(list[0].id);
    }
    setLoading(false);
  }, [selectedId]);

  const loadRoutineDetail = useCallback(async (id: string) => {
    const full = await api.getRoutine(id);
    setRoutine(full);
  }, []);

  useEffect(() => {
    loadRoutines();
  }, [loadRoutines]);

  useEffect(() => {
    if (selectedId) loadRoutineDetail(selectedId);
    else setRoutine(null);
  }, [selectedId, loadRoutineDetail]);

  function handleCreated(id: string) {
    loadRoutines().then(() => setSelectedId(id));
  }

  async function handleDeleted() {
    const list: RoutineSummary[] = await api.listRoutines();
    setRoutines(list);
    setSelectedId(list.length ? list[0].id : null);
  }

  function refreshCurrent() {
    if (selectedId) loadRoutineDetail(selectedId);
    setRefreshKey((k) => k + 1);
  }

  return {
    routines,
    selectedId,
    setSelectedId,
    routine,
    loading,
    refreshKey,
    loadRoutines,
    handleCreated,
    handleDeleted,
    refreshCurrent,
  };
}