import { Trash2 } from "lucide-react";
import type { HistoryDay, DailyCheckIn } from "@/types";
import { DIFFICULTY_SCALE } from "@/lib/difficultyScale";

const DATE_FORMAT: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" };

interface Props {
  day: HistoryDay | null;
  checkIn: DailyCheckIn | null;
  onDeleteEntry: (id: string) => void;
}

export function HistoryDayDetail({ day, checkIn, onDeleteEntry }: Props) {
  if (!day) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground text-sm">Selecciona un día con registro en el calendario.</p>
      </div>
    );
  }

  const level = checkIn ? DIFFICULTY_SCALE.find((l) => l.value === checkIn.difficulty) : null;

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <p className="font-display font-bold tracking-wide">
          {new Date(day.date + "T00:00:00").toLocaleDateString("es-ES", DATE_FORMAT).toUpperCase()}
        </p>
        {level && (
          <span title={level.label} className="flex items-center gap-1 text-xs bg-secondary rounded-full px-2 py-1">
            <span>{level.emoji}</span>
            <span className="text-muted-foreground">{level.label}</span>
          </span>
        )}
      </div>

      {checkIn?.notes && (
        <p className="text-xs text-muted-foreground italic mb-4 border-l-2 border-border pl-2">"{checkIn.notes}"</p>
      )}

      <div className="space-y-3">
        {day.entries.map((entry, i) => (
          <div key={entry.id ?? i} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{entry.exerciseName}</p>
                <p className="text-xs text-muted-foreground">
                  {entry.sets.map((s) => `${s.weight}kg×${s.reps}reps`).join(" · ")}
                </p>
                {entry.notes && <p className="text-xs text-muted-foreground italic mt-0.5">"{entry.notes}"</p>}
              </div>
              {entry.id && (
                <button
                  onClick={() => onDeleteEntry(entry.id)}
                  className="text-muted-foreground hover:text-destructive flex-shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}