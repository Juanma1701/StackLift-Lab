import { useState } from "react";
import { Timer } from "lucide-react";
import { useRestTimer } from "@/context/RestTimerContext";

const PRESETS = [60, 90, 120, 180];

export function RestTimerButton() {
  const { active, start } = useRestTimer();
  const [open, setOpen] = useState(false);

  if (active) return null; // mientras el timer corre, se oculta y se ve el widget

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open && (
        <div className="mb-2 flex flex-col gap-1 rounded-lg border border-border bg-card p-2 shadow-lg">
          {PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => {
                start(p);
                setOpen(false);
              }}
              className="px-4 py-1.5 rounded text-sm text-left hover:bg-secondary text-foreground"
            >
              {p >= 60 ? `${Math.floor(p / 60)} min${p % 60 ? ` ${p % 60}s` : ""}` : `${p}s`}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90"
        title="Cronómetro de descanso"
      >
        <Timer size={22} />
      </button>
    </div>
  );
}