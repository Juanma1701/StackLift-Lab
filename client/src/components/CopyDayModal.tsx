import { useState } from "react";
import { Modal } from "./Modal";
import { api } from "@/lib/api";
import { DAY_NAMES } from "@/lib/constants";
import type { RoutineDay } from "@/types";

interface Props {
  day: RoutineDay;
  otherDays: RoutineDay[];
  routineId: string;
  onClose: () => void;
  onCopied: () => void;
}

export function CopyDayModal({ day, otherDays, routineId, onClose, onCopied }: Props) {
  const [targetDayOfWeek, setTargetDayOfWeek] = useState<number | null>(null);
  const [conflictInfo, setConflictInfo] = useState<{ message: string; logsAtRisk: number } | null>(null);
  const [copying, setCopying] = useState(false);

  async function handleCopy(force = false) {
    if (targetDayOfWeek === null) return;
    setCopying(true);
    try {
      const result = await api.copyDay(routineId, day.dayOfWeek, targetDayOfWeek, force);
      if (result.conflict) {
        setConflictInfo({ message: result.message, logsAtRisk: result.logsAtRisk });
      } else {
        onCopied();
        onClose();
      }
    } finally {
      setCopying(false);
    }
  }

  return (
    <Modal title={`Copiar ${DAY_NAMES[day.dayOfWeek]} a...`} onClose={onClose}>
      <div className="space-y-3">
        <select
          className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground"
          value={targetDayOfWeek ?? ""}
          onChange={(e) => {
            setTargetDayOfWeek(Number(e.target.value));
            setConflictInfo(null);
          }}
        >
          <option value="" disabled>
            Selecciona un día destino
          </option>
          {otherDays.map((d) => (
            <option key={d.dayOfWeek} value={d.dayOfWeek}>
              {DAY_NAMES[d.dayOfWeek]}
            </option>
          ))}
        </select>

        {conflictInfo && (
          <div className="text-sm bg-destructive/10 text-destructive rounded-md p-3">{conflictInfo.message}</div>
        )}

        <button
          onClick={() => handleCopy(!!conflictInfo)}
          disabled={targetDayOfWeek === null || copying}
          className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
        >
          {copying ? "Copiando..." : conflictInfo ? "Sobrescribir de todas formas" : "Copiar día"}
        </button>
      </div>
    </Modal>
  );
}