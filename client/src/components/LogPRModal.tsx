import { useState } from "react";
import { Modal } from "./Modal";
import { api } from "@/lib/api";
import type { Exercise } from "@/types";

interface Props {
  exercise: Exercise;
  onClose: () => void;
  onSaved: () => void;
}

export function LogPRModal({ exercise, onClose, onSaved }: Props) {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(1);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await api.createWorkoutLog(exercise.id, notes, [{ weight, reps }]);
      onSaved();
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal title={`Registrar PR — ${exercise.name}`} onClose={onClose}>
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground">
          Para un intento máximo puntual, sin afectar el registro de tu sesión normal.
        </p>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground">Peso (kg)</label>
            <input
              type="number"
              autoFocus
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground">Reps</label>
            <input
              type="number"
              min={1}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Observaciones (opcional)</label>
          <textarea
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:border-primary"
            rows={2}
            placeholder="Ej: Con ayuda en el último tramo"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar PR"}
        </button>
      </div>
    </Modal>
  );
}