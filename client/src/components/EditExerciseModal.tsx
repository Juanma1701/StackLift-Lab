import { useState } from "react";
import { Modal } from "./Modal";
import { api } from "@/lib/api";
import type { Exercise } from "@/types";

interface Props {
  exercise: Exercise;
  onClose: () => void;
  onSaved: () => void;
}

export function EditExerciseModal({ exercise, onClose, onSaved }: Props) {
  const [name, setName] = useState(exercise.name);
  const [sets, setSets] = useState(exercise.targetSets);
  const [reps, setReps] = useState(exercise.targetReps);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!name.trim()) return;
    setSaving(true);
    try {
      await api.updateExercise(exercise.id, { name, targetSets: sets, targetReps: reps });
      onSaved();
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal title="Editar ejercicio" onClose={onClose}>
      <div className="space-y-3">
        <input
          className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground"
          placeholder="Nombre del ejercicio"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground">Series</label>
            <input
              type="number"
              min={1}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground"
              value={sets}
              onChange={(e) => setSets(Number(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground">Reps objetivo</label>
            <input
              type="number"
              min={1}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground"
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </Modal>
  );
}