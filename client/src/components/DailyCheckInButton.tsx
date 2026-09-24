import { useEffect, useState } from "react";
import { Smile } from "lucide-react";
import { api } from "@/lib/api";
import { DailyCheckInModal } from "./DailyCheckInModal";
import { DIFFICULTY_SCALE } from "@/lib/difficultyScale";

export function DailyCheckInButton() {
  const [showModal, setShowModal] = useState(false);
  const [todayDifficulty, setTodayDifficulty] = useState<number | null>(null);

  function loadToday() {
    api.getTodayCheckIn().then((existing) => setTodayDifficulty(existing?.difficulty ?? null));
  }

  useEffect(() => {
    loadToday();
  }, []);

  const todayLevel = DIFFICULTY_SCALE.find((l) => l.value === todayDifficulty);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3 mb-6 hover:bg-secondary/50 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <Smile size={16} className="text-primary" />
          {todayLevel ? "Registro de hoy" : "¿Cómo te fue hoy?"}
        </span>
        {todayLevel ? (
          <span className="text-sm">
            {todayLevel.emoji} {todayLevel.label}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">Toca para registrar</span>
        )}
      </button>

      {showModal && <DailyCheckInModal onClose={() => setShowModal(false)} onSaved={loadToday} />}
    </>
  );
}