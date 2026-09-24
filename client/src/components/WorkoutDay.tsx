import { useState } from "react";
import { ChevronDown, Plus, Copy } from "lucide-react";
import type { RoutineDay } from "@/types";
import { DAY_NAMES } from "@/lib/constants";
import { MuscleGroupSection } from "./MuscleGroupSection";
import { AddMuscleGroupModal } from "./AddMuscleGroupModal";
import { CopyDayModal } from "./CopyDayModal";

interface Props {
  day: RoutineDay;
  allDays: RoutineDay[];
  routineId: string;
  onChange: () => void;
}

export function WorkoutDay({ day, allDays, routineId, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);

  const summary = day.muscleGroups.length
    ? day.muscleGroups.map((g) => g.name).join(" · ")
    : "Día de descanso";

  const otherDays = allDays.filter((d) => d.dayOfWeek !== day.dayOfWeek);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors"
      >
        <div className="text-left">
          <p className="font-display font-bold text-lg tracking-wide">{DAY_NAMES[day.dayOfWeek].toUpperCase()}</p>
          <p className="text-sm text-muted-foreground">{summary}</p>
        </div>
        <ChevronDown size={20} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-3 border-t border-border pt-4">
          {day.muscleGroups.map((group, idx) => (
            <MuscleGroupSection
              key={group.id}
              group={group}
              onChange={onChange}
              isFirst={idx === 0}
              isLast={idx === day.muscleGroups.length - 1}
            />
          ))}
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1 text-sm font-medium bg-secondary px-3 py-2 rounded-md hover:bg-muted"
            >
              <Plus size={16} /> Agregar grupo muscular
            </button>
            {day.muscleGroups.length > 0 && (
              <button
                onClick={() => setShowCopyModal(true)}
                className="flex items-center gap-1 text-sm font-medium bg-secondary px-3 py-2 rounded-md hover:bg-muted"
              >
                <Copy size={16} /> Copiar a otro día
              </button>
            )}
          </div>
        </div>
      )}

      {showAddModal && (
        <AddMuscleGroupModal dayId={day.id} onClose={() => setShowAddModal(false)} onAdded={onChange} />
      )}

      {showCopyModal && (
        <CopyDayModal
          day={day}
          otherDays={otherDays}
          routineId={routineId}
          onClose={() => setShowCopyModal(false)}
          onCopied={onChange}
        />
      )}
    </div>
  );
}