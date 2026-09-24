import { useState } from "react";
import { Pencil, Check } from "lucide-react";
import { api } from "@/lib/api";

function progressMessage(percent: number): string {
  if (percent >= 100) return "¡Meta alcanzada! 🎯";
  if (percent >= 90) return "Ya casi llegas";
  if (percent >= 70) return "Vas muy bien";
  if (percent >= 40) return "Sigue así";
  return "Recién comenzando";
}

interface Props {
  exerciseId: string;
  target: number | null;
  currentWeight: number;
  onChange: () => void;
}

export function EditableTargetWeight({ exerciseId, target, currentWeight, onChange }: Props) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(target?.toString() ?? "");
  const [saving, setSaving] = useState(false);

  const percent = target && target > 0 ? Math.min(100, (currentWeight / target) * 100) : null;

  async function handleSave() {
    setSaving(true);
    try {
      const value = input.trim() ? Number(input) : null;
      await api.updateExercise(exerciseId, { targetWeight: value });
      setEditing(false);
      onChange();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-2">
      {editing ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Meta:</span>
          <input
            type="number"
            min={0}
            autoFocus
            className="w-20 border border-border rounded-md px-2 py-1 text-xs bg-background"
            placeholder="kg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <button onClick={handleSave} disabled={saving} className="text-success hover:opacity-80 disabled:opacity-50">
            <Check size={15} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {target ? <>Meta: {target} kg</> : <>Definir meta de peso</>}
          <Pencil size={11} />
        </button>
      )}

      {percent !== null && (
        <div className="mt-1.5">
          <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${percent}%` }} />
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">{progressMessage(percent)}</p>
        </div>
      )}
    </div>
  );
}