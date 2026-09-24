import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { api } from "@/lib/api";
import { DIFFICULTY_SCALE } from "@/lib/difficultyScale";

interface Props {
  onClose: () => void;
  onSaved: () => void;
}

export function DailyCheckInModal({ onClose, onSaved }: Props) {
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getTodayCheckIn()
      .then((existing) => {
        if (existing) {
          setDifficulty(existing.difficulty);
          setNotes(existing.notes ?? "");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!difficulty) return;
    setSaving(true);
    try {
      await api.saveCheckIn(difficulty, notes);
      onSaved();
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal title="¿Cómo te fue hoy?" onClose={onClose}>
      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              ¿Qué tan difícil se sintió el entrenamiento de hoy? (fatiga, sueño, alimentación, dolor, etc.)
            </p>
            <div className="grid grid-cols-5 gap-2">
              {DIFFICULTY_SCALE.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setDifficulty(level.value)}
                  title={level.label}
                  className={`flex flex-col items-center gap-1 rounded-md border py-2 transition-colors ${
                    difficulty === level.value
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:bg-secondary"
                  }`}
                >
                  <span className="text-xl">{level.emoji}</span>
                  <span className="text-[10px] text-muted-foreground">{level.value}</span>
                </button>
              ))}
            </div>
            {difficulty && (
              <p className="text-xs text-center text-primary font-medium mt-2">
                {DIFFICULTY_SCALE.find((l) => l.value === difficulty)?.label}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs text-muted-foreground">¿Qué pasó? (opcional)</label>
            <textarea
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:border-primary mt-1"
              rows={3}
              placeholder="Ej: Dormí poco, tuve molestia en el hombro, comí tarde..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={!difficulty || saving}
            className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      )}
    </Modal>
  );
}