import { useState, FormEvent } from "react";
import { X } from "lucide-react";
import { api } from "@/lib/api";

interface Props {
  onClose: () => void;
}

const TYPE_OPTIONS: { value: "bug" | "idea" | "other"; label: string }[] = [
  { value: "bug", label: "Error" },
  { value: "idea", label: "Idea" },
  { value: "other", label: "Otro" },
];

export function ReportModal({ onClose }: Props) {
  const [type, setType] = useState<"bug" | "idea" | "other">("bug");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!subject.trim() || !message.trim()) {
      setError("Completa asunto y mensaje");
      return;
    }
    setLoading(true);
    try {
      await api.createMyTicket(type, subject, message);
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-sm bg-card border border-border rounded-lg p-6 space-y-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>

        {sent ? (
          <div className="text-center space-y-2 py-4">
            <p className="text-sm font-medium">¡Gracias!</p>
            <p className="text-xs text-muted-foreground">Recibimos tu mensaje, lo revisaremos pronto.</p>
            <button onClick={onClose} className="text-sm text-primary font-medium mt-2">
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <h2 className="font-display font-bold text-lg">Reportar o sugerir</h2>
            <p className="text-xs text-muted-foreground">
              ¿Encontraste un error o tienes una idea? Cuéntanos.
            </p>

            <div className="flex gap-1.5">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setType(opt.value)}
                  className={`flex-1 text-xs px-2 py-1.5 rounded-md border transition-colors ${
                    type === opt.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <input
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              placeholder="Asunto"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary min-h-[100px]"
              placeholder="Cuéntanos con el mayor detalle posible..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}