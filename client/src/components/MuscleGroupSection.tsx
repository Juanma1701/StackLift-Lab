import { useState } from "react";
import { ChevronDown, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import type { MuscleGroup } from "@/types";
import { ExerciseItem } from "./ExerciseItem";
import { AddExerciseModal } from "./AddExerciseModal";
import { api } from "@/lib/api";

interface Props {
  group: MuscleGroup;
  onChange: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function MuscleGroupSection({ group, onChange, isFirst, isLast }: Props) {
  const [open, setOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  async function handleDeleteGroup() {
    if (!confirm(`¿Eliminar el grupo "${group.name}" y todos sus ejercicios? Esta acción no se puede deshacer.`)) return;
    await api.deleteMuscleGroup(group.id);
    onChange();
  }

  async function handleMoveGroup(direction: "up" | "down") {
    await api.moveMuscleGroup(group.id, direction);
    onChange();
  }

  async function handleDeleteExercise(exerciseId: string, exerciseName: string) {
    if (!confirm(`¿Eliminar el ejercicio "${exerciseName}" y todo su historial de registros? Esta acción no se puede deshacer.`)) return;
    await api.deleteExercise(exerciseId);
    onChange();
  }

  return (
    <div className="border border-border rounded-md">
      <div className="w-full flex items-center justify-between px-4 py-2.5">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm font-semibold flex-1 text-left"
        >
          <ChevronDown size={16} className={`transition-transform ${open ? "" : "-rotate-90"}`} />
          {group.name.toUpperCase()}
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleMoveGroup("up")}
            disabled={isFirst}
            className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground"
          >
            <ArrowUp size={14} />
          </button>
          <button
            onClick={() => handleMoveGroup("down")}
            disabled={isLast}
            className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground"
          >
            <ArrowDown size={14} />
          </button>
          <Trash2
            size={15}
            className="text-muted-foreground hover:text-destructive cursor-pointer"
            onClick={handleDeleteGroup}
          />
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4 space-y-2">
          {group.exercises.length === 0 && (
            <p className="text-xs text-muted-foreground py-1">Sin ejercicios todavía.</p>
          )}
          {group.exercises.map((ex, idx) => (
            <ExerciseItem
              key={ex.id}
              exercise={ex}
              onDelete={() => handleDeleteExercise(ex.id, ex.name)}
              onChange={onChange}
              isFirst={idx === 0}
              isLast={idx === group.exercises.length - 1}
            />
          ))}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 text-xs font-medium text-primary-foreground bg-primary px-3 py-1.5 rounded-md hover:opacity-90"
          >
            <Plus size={14} /> Agregar ejercicio
          </button>
        </div>
      )}

      {showAddModal && (
        <AddExerciseModal muscleGroupId={group.id} onClose={() => setShowAddModal(false)} onAdded={onChange} />
      )}
    </div>
  );
}