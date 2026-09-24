import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { RoutineSummary } from "@/types";
import { CreateRoutineModal } from "./CreateRoutineModal";
import { RenameRoutineModal } from "./RenameRoutineModal";
import { api } from "@/lib/api";

interface Props {
  routines: RoutineSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreated: (id: string) => void;
  onRenamed: () => void;
  onDeleted: () => void;
}

export function RoutineSelector({ routines, selectedId, onSelect, onCreated, onRenamed, onDeleted }: Props) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const selectedRoutine = routines.find((r) => r.id === selectedId) ?? null;

  async function handleDelete() {
    if (!selectedId || !selectedRoutine) return;
    if (!confirm(`¿Eliminar la rutina "${selectedRoutine.name}" y todo su contenido? Esta acción no se puede deshacer.`)) return;
    setDeleting(true);
    try {
      await api.deleteRoutine(selectedId);
      onDeleted();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        className="border border-border rounded-md px-3 py-1.5 text-sm bg-card"
        value={selectedId ?? ""}
        onChange={(e) => onSelect(e.target.value)}
      >
        {routines.length === 0 && <option value="">Sin rutinas</option>}
        {routines.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      {selectedRoutine && (
        <>
          <button
            onClick={() => setShowRenameModal(true)}
            title="Renombrar rutina"
            className="p-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            title="Eliminar rutina"
            className="p-1.5 rounded-md border border-border text-muted-foreground hover:text-destructive hover:bg-secondary disabled:opacity-50"
          >
            <Trash2 size={14} />
          </button>
        </>
      )}

      <button
        onClick={() => setShowCreateModal(true)}
        className="flex items-center gap-1 text-sm font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90"
      >
        <Plus size={15} /> Nueva rutina
      </button>

      {showCreateModal && (
        <CreateRoutineModal onClose={() => setShowCreateModal(false)} onCreated={onCreated} />
      )}

      {showRenameModal && selectedRoutine && (
        <RenameRoutineModal
          routineId={selectedRoutine.id}
          currentName={selectedRoutine.name}
          onClose={() => setShowRenameModal(false)}
          onRenamed={onRenamed}
        />
      )}
    </div>
  );
}