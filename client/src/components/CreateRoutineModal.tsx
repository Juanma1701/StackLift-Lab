import { useState } from "react";
import { Modal } from "./Modal";
import { api } from "@/lib/api";
import { ROUTINE_TEMPLATES } from "@/lib/routineTemplates";

interface Props {
  onClose: () => void;
  onCreated: (id: string) => void;
}

export function CreateRoutineModal({ onClose, onCreated }: Props) {
  const [name, setName] = useState("");
  const [templateId, setTemplateId] = useState(ROUTINE_TEMPLATES[0].id);
  const [creating, setCreating] = useState(false);

  async function handleCreate() {
    if (!name.trim()) return;
    setCreating(true);
    try {
      const template = ROUTINE_TEMPLATES.find((t) => t.id === templateId)!;
      const routine = await api.createRoutine(name, template.days);
      onCreated(routine.id);
      onClose();
    } finally {
      setCreating(false);
    }
  }

  return (
    <Modal title="Nueva rutina" onClose={onClose}>
      <div className="space-y-4">
        <input
          className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground"
          placeholder="Ej: Rutina de hipertrofia"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Empieza desde una plantilla</label>
          <div className="space-y-2">
            {ROUTINE_TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplateId(t.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md border transition-colors ${
                  templateId === t.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:bg-secondary"
                }`}
              >
                <p className="text-sm font-medium">{t.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={creating}
          className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
        >
          {creating ? "Creando..." : "Crear rutina"}
        </button>
      </div>
    </Modal>
  );
}