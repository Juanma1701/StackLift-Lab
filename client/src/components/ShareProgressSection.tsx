import { useEffect, useState } from "react";
import { Share2, Copy, Check, X } from "lucide-react";
import { api } from "@/lib/api";

export function ShareProgressSection() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api
      .getShareStatus()
      .then((data: { token: string | null }) => setToken(data.token))
      .finally(() => setLoading(false));
  }, []);

  const shareUrl = token ? `${window.location.origin}/compartido/${token}` : null;

  async function handleGenerate() {
    setWorking(true);
    try {
      const data = await api.generateShareLink();
      setToken(data.token);
    } finally {
      setWorking(false);
    }
  }

  async function handleRevoke() {
    if (!confirm("¿Desactivar el enlace? Quien lo tenga ya no podrá ver tu progreso.")) return;
    setWorking(true);
    try {
      await api.revokeShareLink();
      setToken(null);
    } finally {
      setWorking(false);
    }
  }

  function handleCopy() {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mt-4">
      <p className="text-sm font-medium mb-1">Compartir mi progreso</p>
      <p className="text-xs text-muted-foreground mb-3">
        Genera un enlace público de solo lectura con tu racha, PRs y avance hacia tus metas de peso. Nadie necesita
        iniciar sesión para verlo.
      </p>

      {!shareUrl ? (
        <button
          onClick={handleGenerate}
          disabled={working}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
        >
          <Share2 size={15} />
          {working ? "Generando..." : "Generar enlace"}
        </button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-xs text-foreground truncate"
            />
            <button
              onClick={handleCopy}
              className="p-2 rounded-md bg-secondary hover:bg-muted flex-shrink-0"
              title="Copiar enlace"
            >
              {copied ? <Check size={15} className="text-success" /> : <Copy size={15} />}
            </button>
          </div>
          <button
            onClick={handleRevoke}
            disabled={working}
            className="w-full flex items-center justify-center gap-2 bg-destructive/10 text-destructive font-medium py-2 rounded-md text-sm hover:bg-destructive/20 disabled:opacity-50"
          >
            <X size={15} />
            Desactivar enlace
          </button>
        </div>
      )}
    </div>
  );
}