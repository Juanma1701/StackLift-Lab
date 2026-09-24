import { useState } from "react";
import { Modal } from "./Modal";
import { api } from "@/lib/api";

interface Props {
  dayId: string;
  onClose: () => void;
  onAdded: () => void;
}

export function AddMuscleGroupModal({ dayId, onClose, onAdded }: Props) {
  const [groupName, setGroupName] = useState("");

  async function handleAddGroup() {
    if (!groupName.trim()) return;
    await api.createMuscleGroup(dayId, groupName);
    onAdded();
    onClose();
  }

  return (
    <Modal title="Nuevo grupo muscular" onClose={onClose}>
      <div className="space-y-3">
        <input
          className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground"
          placeholder="Ej: Pecho, Espalda, Pierna..."
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          autoFocus
        />
        <button
          onClick={handleAddGroup}
          className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90"
        >
          Guardar grupo
        </button>
      </div>
    </Modal>
  );
}