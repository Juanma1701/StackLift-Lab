import { useRestTimer } from "@/context/RestTimerContext";

const PRESETS = [60, 90, 120];

export function RestTimerWidget() {
  const { active, secondsLeft, duration, running, finished, dismiss, adjust, restart, toggleRunning } = useRestTimer();

  if (!active) return null;

  const progress = duration > 0 ? (secondsLeft / duration) * 100 : 0;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div
      className={`fixed top-4 right-4 z-40 w-56 rounded-lg border p-3 shadow-lg flex flex-col items-center gap-2 transition-colors ${
        finished ? "border-primary bg-primary/10 animate-pulse" : "border-border bg-card"
      }`}
    >
      <span className="text-xs text-muted-foreground">{finished ? "¡Descanso terminado!" : "Descanso"}</span>

      <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="font-condensed text-3xl tabular-nums">
        {mins}:{secs.toString().padStart(2, "0")}
      </span>

      <div className="flex gap-1.5">
        <button onClick={() => adjust(-15)} className="px-2 py-1 rounded bg-secondary text-xs">-15s</button>
        <button onClick={toggleRunning} className="px-2 py-1 rounded bg-primary text-primary-foreground text-xs">
          {running ? "Pausar" : "Reanudar"}
        </button>
        <button onClick={() => adjust(15)} className="px-2 py-1 rounded bg-secondary text-xs">+15s</button>
      </div>

      <div className="flex gap-2 text-[11px] text-muted-foreground">
        {PRESETS.map((p) => (
          <button key={p} onClick={() => restart(p)} className="underline">{p}s</button>
        ))}
      </div>

      <button onClick={dismiss} className="text-[11px] text-muted-foreground underline">
        Cerrar
      </button>
    </div>
  );
}