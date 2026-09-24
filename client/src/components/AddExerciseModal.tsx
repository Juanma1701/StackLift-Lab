import { useState } from "react";
import { Modal } from "./Modal";
import { api } from "@/lib/api";

interface Props {
  muscleGroupId: string;
  onClose: () => void;
  onAdded: () => void;
}

export function AddExerciseModal({ muscleGroupId, onClose, onAdded }: Props) {
  const [name, setName] = useState("");
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [targetWeight, setTargetWeight] = useState("");

  async function handleAddExercise() {
    if (!name.trim()) return;
    const weight = targetWeight.trim() ? Number(targetWeight) : undefined;
    await api.createExercise(muscleGroupId, name, sets, reps, weight);
    onAdded();
    onClose();
  }

  return (
    <Modal title="Nuevo ejercicio" onClose={onClose}>
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
        <div>
          <label className="text-xs text-muted-foreground">Peso meta (kg) — opcional</label>
          <input
            type="number"
            min={0}
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground"
            placeholder="Ej: 60"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddExercise}
          className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90"
        >
          Guardar ejercicio
        </button>
      </div>
    </Modal>
  );
}