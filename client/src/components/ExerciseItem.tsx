import { useState } from "react";
import { Trash2, ImageIcon, Repeat, Settings2, ArrowUp, ArrowDown, Trophy } from "lucide-react";
import type { Exercise } from "@/types";
import { api, getFullImageUrl } from "@/lib/api";
import { useExerciseLog } from "@/hooks/useExerciseLog";
import { EditableTargetWeight } from "./EditableTargetWeight";
import { LogExerciseModal } from "./LogExerciseModal";
import { LogPRModal } from "./LogPRModal";
import { ImageUploadModal } from "./ImageUploadModal";
import { EditExerciseModal } from "./EditExerciseModal";

interface Props {
  exercise: Exercise;
  onDelete: () => void;
  onChange: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function ExerciseItem({ exercise, onDelete, onChange, isFirst, isLast }: Props) {
  const { latestLog, isPR, repeating, loadLatest, repeatLast } = useExerciseLog(exercise.id);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showPRModal, setShowPRModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  async function handleMove(direction: "up" | "down") {
    await api.moveExercise(exercise.id, direction);
    onChange();
  }

  const currentWeight = latestLog?.sets[0]?.weight ?? 0;

  return (
    <>
      <div className="bg-secondary rounded-md px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setShowImageModal(true)}
              className="w-12 h-12 rounded-md border border-border overflow-hidden flex-shrink-0 flex items-center justify-center bg-background hover:opacity-80"
            >
              {exercise.imageUrl ? (
                <img src={getFullImageUrl(exercise.imageUrl)!} alt={exercise.name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon size={18} className="text-muted-foreground" />
              )}
            </button>
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">{exercise.name}</p>
              <p className="text-xs text-muted-foreground">
                {latestLog
                  ? latestLog.sets.map((s) => `${s.weight}kg×${s.reps}reps`).join(" · ")
                  : "Sin registros aún"}
              </p>
              {latestLog?.notes && (
                <p className="text-xs text-muted-foreground italic mt-0.5 truncate">"{latestLog.notes}"</p>
              )}
            </div>
          </div>

          {latestLog && (
            <div className="flex flex-col items-end flex-shrink-0 pl-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-2xl text-primary leading-none">{currentWeight}</span>
                <span className="text-xs text-muted-foreground">kg</span>
              </div>
              {isPR && (
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wide text-success border border-success rounded-full px-1.5 py-0.5">
                  PR
                </span>
              )}
            </div>
          )}
        </div>

        <EditableTargetWeight
          exerciseId={exercise.id}
          target={exercise.targetWeight ?? null}
          currentWeight={currentWeight}
          onChange={onChange}
        />

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <button
            onClick={() => handleMove("up")}
            disabled={isFirst}
            className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground"
          >
            <ArrowUp size={14} />
          </button>
          <button
            onClick={() => handleMove("down")}
            disabled={isLast}
            className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground"
          >
            <ArrowDown size={14} />
          </button>
          {latestLog && (
            <button
              onClick={() => repeatLast(onChange)}
              disabled={repeating}
              title="Repetir el último registro"
              className="flex items-center gap-1 text-xs font-medium bg-background px-2.5 py-1.5 rounded-md hover:bg-muted disabled:opacity-50"
            >
              <Repeat size={13} className={repeating ? "animate-spin" : ""} />
              {repeating ? "..." : "Repetir"}
            </button>
          )}
          <button
            onClick={() => setShowLogModal(true)}
            className="flex items-center gap-1 text-xs font-medium bg-primary text-primary-foreground px-2.5 py-1.5 rounded-md hover:opacity-90"
          >
            Registrar
          </button>
          <button
            onClick={() => setShowPRModal(true)}
            title="Registrar un intento máximo puntual"
            className="flex items-center gap-1 text-xs font-medium bg-background border border-success text-success px-2.5 py-1.5 rounded-md hover:bg-secondary"
          >
            <Trophy size={13} /> PR
          </button>
          <button onClick={() => setShowEditModal(true)} className="ml-auto text-muted-foreground hover:text-foreground">
            <Settings2 size={16} />
          </button>
          <button onClick={onDelete} className="text-muted-foreground hover:text-destructive">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {showEditModal && (
        <EditExerciseModal exercise={exercise} onClose={() => setShowEditModal(false)} onSaved={onChange} />
      )}

      {showPRModal && (
        <LogPRModal exercise={exercise} onClose={() => setShowPRModal(false)} onSaved={loadLatest} />
      )}

      {showLogModal && (
        <LogExerciseModal
          exercise={exercise}
          latestLog={latestLog}
          onClose={() => setShowLogModal(false)}
          onSaved={loadLatest}
        />
      )}

      {showImageModal && (
        <ImageUploadModal
          title={`Imagen de ${exercise.name}`}
          currentUrl={getFullImageUrl(exercise.imageUrl)}
          onClose={() => setShowImageModal(false)}
          onUpload={async (file) => {
            await api.uploadExerciseImage(exercise.id, file);
            onChange();
          }}
          onRemove={async () => {
            await api.deleteExerciseImage(exercise.id);
            onChange();
          }}
        />
      )}
    </>
  );
}