import { useState } from "react";
import { Modal } from "./Modal";
import { api } from "@/lib/api";

interface Props {
  routineId: string;
  currentName: string;
  onClose: () => void;
  onRenamed: () => void;
}

export function RenameRoutineModal({ routineId, currentName, onClose, onRenamed }: Props) {
  const [value, setValue] = useState(currentName);

  async function handleRename() {
    if (!value.trim()) return;
    await api.renameRoutine(routineId, value);
    onRenamed();
    onClose();
  }

  return (
    <Modal title="Renombrar rutina" onClose={onClose}>
      <div className="space-y-3">
        <input
          className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
        <button
          onClick={handleRename}
          className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90"
        >
          Guardar nombre
        </button>
      </div>
    </Modal>
  );
}