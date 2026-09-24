import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { playBeep, vibrate } from "@/lib/sound";

interface RestTimerContextValue {
  active: boolean;
  secondsLeft: number;
  duration: number;
  running: boolean;
  finished: boolean;
  start: (seconds?: number) => void;
  dismiss: () => void;
  adjust: (delta: number) => void;
  restart: (seconds: number) => void;
  toggleRunning: () => void;
}

const RestTimerContext = createContext<RestTimerContextValue | null>(null);

export function RestTimerProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [duration, setDuration] = useState(90);
  const [secondsLeft, setSecondsLeft] = useState(90);
  const [running, setRunning] = useState(true);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active || !running) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          playBeep();
          vibrate();
          setFinished(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, running]);

  function start(seconds = 90) {
    setDuration(seconds);
    setSecondsLeft(seconds);
    setRunning(true);
    setFinished(false);
    setActive(true);
  }

  function dismiss() {
    setActive(false);
    setFinished(false);
  }

  function adjust(delta: number) {
    setSecondsLeft((s) => Math.max(0, s + delta));
  }

  function restart(seconds: number) {
    setDuration(seconds);
    setSecondsLeft(seconds);
    setRunning(true);
    setFinished(false);
  }

  function toggleRunning() {
    setRunning((r) => !r);
  }

  return (
    <RestTimerContext.Provider
      value={{ active, secondsLeft, duration, running, finished, start, dismiss, adjust, restart, toggleRunning }}
    >
      {children}
    </RestTimerContext.Provider>
  );
}

export function useRestTimer() {
  const ctx = useContext(RestTimerContext);
  if (!ctx) throw new Error("useRestTimer debe usarse dentro de RestTimerProvider");
  return ctx;
}