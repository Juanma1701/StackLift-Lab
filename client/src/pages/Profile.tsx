import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { api, getFullImageUrl } from "@/lib/api";
import { ImageIcon, Camera, Download } from "lucide-react";
import { ShareProgressSection } from "@/components/ShareProgressSection";

export function Profile() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [exporting, setExporting] = useState(false);

  async function handleSaveName() {
    setSaving(true);
    setMessage("");
    try {
      await api.updateProfile(name);
      await refreshUser();
      setMessage("Los cambios se guardaron.");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    await api.uploadAvatar(file);
    await refreshUser();
  }

  async function handleExport() {
    setExporting(true);
    try {
      await api.exportData();
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-md mx-auto px-6 py-8">
        <h1 className="font-display font-bold text-2xl tracking-wide mb-6">PERFIL</h1>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="flex flex-col items-center gap-3">
            <label className="relative w-20 h-20 rounded-full border-2 border-primary overflow-hidden flex items-center justify-center bg-secondary cursor-pointer hover:opacity-90 transition-opacity group">
              {user?.avatarUrl ? (
                <img src={getFullImageUrl(user.avatarUrl)!} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon size={24} className="text-muted-foreground" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={18} className="text-white" />
              </div>
              <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleAvatarChange} />
            </label>
            <p className="text-xs text-muted-foreground">Toca la foto para cambiarla</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground">Nombre</label>
              <input
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm mt-1 text-foreground focus:outline-none focus:border-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Correo</label>
              <input
                className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm mt-1 text-muted-foreground cursor-not-allowed"
                value={user?.email ?? ""}
                disabled
              />
            </div>
          </div>

          {message && <p className="text-sm text-center text-success">{message}</p>}

          <button
            onClick={handleSaveName}
            disabled={saving}
            className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mt-4">
          <p className="text-sm font-medium mb-1">Exportar mis datos</p>
          <p className="text-xs text-muted-foreground mb-3">
            Descarga un archivo con todas tus rutinas, ejercicios y el historial completo de entrenamientos.
          </p>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="w-full flex items-center justify-center gap-2 bg-secondary text-foreground font-medium py-2 rounded-md text-sm hover:bg-muted disabled:opacity-50 transition-colors"
          >
            <Download size={15} />
            {exporting ? "Exportando..." : "Descargar mis datos (JSON)"}
          </button>
        </div>

        <ShareProgressSection />
      </main>
    </div>
  );
}