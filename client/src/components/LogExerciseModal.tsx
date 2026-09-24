import { useState } from "react";
import { X } from "lucide-react";
import { Modal } from "./Modal";
import { api } from "@/lib/api";
import type { Exercise, WorkoutLog } from "@/types";

interface SetRow {
  reps: number;
  customWeight: number | null;
}

interface Props {
  exercise: Exercise;
  latestLog: WorkoutLog | null;
  onClose: () => void;
  onSaved: () => void;
}

export function LogExerciseModal({ exercise, latestLog, onClose, onSaved }: Props) {
  const initialSets: SetRow[] = Array.from({ length: exercise.targetSets }, (_, i) => ({
    reps: latestLog?.sets[i]?.reps ?? exercise.targetReps,
    customWeight: null,
  }));
  const initialWeight = latestLog?.sets[0]?.weight ?? 0;

  const [weight, setWeight] = useState(initialWeight);
  const [sets, setSets] = useState<SetRow[]>(initialSets);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  function updateReps(index: number, value: number) {
    setSets((prev) => prev.map((s, i) => (i === index ? { ...s, reps: value } : s)));
  }

  function updateCustomWeight(index: number, value: number) {
    setSets((prev) => prev.map((s, i) => (i === index ? { ...s, customWeight: value } : s)));
  }

  function toggleCustomWeight(index: number) {
    setSets((prev) =>
      prev.map((s, i) => (i === index ? { ...s, customWeight: s.customWeight === null ? weight : null } : s))
    );
  }

  function addSet() {
    setSets((prev) => [...prev, { reps: exercise.targetReps, customWeight: null }]);
  }

  function removeSet(index: number) {
    setSets((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = sets.map((s) => ({ weight: s.customWeight ?? weight, reps: s.reps }));
      await api.createWorkoutLog(exercise.id, notes, payload);
      onSaved();
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal title={exercise.name} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground">Peso (kg)</label>
          <div className="relative">
            <input
              type="number"
              className="w-full bg-background border border-border rounded-md pl-2 pr-8 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
              kg
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {sets.map((set, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground w-14">Serie {i + 1}</span>
                {sets.length > 1 && (
                  <button
                    onClick={() => removeSet(i)}
                    className="text-muted-foreground hover:text-destructive flex-shrink-0"
                    title="Eliminar esta serie"
                  >
                    <X size={14} />
                  </button>
                )}

                {set.customWeight !== null && (
                  <div className="flex-1 min-w-0 relative">
                    <input
                      type="number"
                      className="w-full min-w-0 bg-background border border-border rounded-md pl-2 pr-8 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary"
                      value={set.customWeight}
                      onChange={(e) => updateCustomWeight(i, Number(e.target.value))}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                      kg
                    </span>
                  </div>
                )}

                <div className="flex-1 min-w-0 relative">
                  <input
                    type="number"
                    className="w-full min-w-0 bg-background border border-border rounded-md pl-2 pr-10 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary"
                    value={set.reps}
                    onChange={(e) => updateReps(i, Number(e.target.value))}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                    reps
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleCustomWeight(i)}
                className="text-[11px] text-muted-foreground hover:text-primary ml-16"
              >
                {set.customWeight !== null ? "Usar el peso general" : "Usar otro peso para esta serie"}
              </button>
            </div>
          ))}
          <button onClick={addSet} className="text-xs text-primary font-medium">
            + Agregar serie
          </button>
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Observaciones</label>
          <textarea
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:border-primary"
            rows={2}
            placeholder="Ej: Mejorar técnica en la bajada"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </Modal>
  );
}