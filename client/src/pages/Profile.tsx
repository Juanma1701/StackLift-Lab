import { Link } from "react-router-dom";
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
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [setupCode, setSetupCode] = useState("");
  const [setupStatus, setSetupStatus] = useState("");
  const [disableCode, setDisableCode] = useState("");
  const [disableStatus, setDisableStatus] = useState("");

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

  async function handleResendVerification() {
    if (!user?.email) return;
    setResending(true);
    setResendMessage("");
    try {
      await api.resendVerificationEmail(user.email);
      setResendMessage("Correo reenviado. Revisa tu bandeja de entrada.");
    } catch (err: any) {
      setResendMessage(err.message);
    } finally {
      setResending(false);
    }
  }

  async function handleStartTwoFactorSetup() {
    setSetupStatus("");
    try {
      const result = await api.setupTwoFactor();
      setQrCodeDataUrl(result.qrCodeDataUrl);
    } catch (err: any) {
      setSetupStatus(err.message);
    }
  }

  async function handleConfirmTwoFactor() {
    setSetupStatus("Verificando...");
    try {
      await api.confirmTwoFactor(setupCode);
      setQrCodeDataUrl(null);
      setSetupCode("");
      setSetupStatus("");
      await refreshUser();
    } catch (err: any) {
      setSetupStatus(err.message);
    }
  }

  async function handleDisableTwoFactor() {
    setDisableStatus("Verificando...");
    try {
      await api.disableTwoFactor(disableCode);
      setDisableCode("");
      setDisableStatus("");
      await refreshUser();
    } catch (err: any) {
      setDisableStatus(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-md mx-auto px-6 py-8">
        <h1 className="font-display font-bold text-2xl tracking-wide mb-6">PERFIL</h1>

        {user && !user.emailVerified && (
          <div className="bg-secondary border border-border rounded-lg p-4 mb-4 space-y-2">
            <p className="text-sm">Tu correo no está verificado.</p>
            <button
              onClick={handleResendVerification}
              disabled={resending}
              className="text-sm text-primary font-medium underline disabled:opacity-50"
            >
              {resending ? "Enviando..." : "Reenviar correo de verificación"}
            </button>
            {resendMessage && <p className="text-xs text-muted-foreground">{resendMessage}</p>}
          </div>
        )}

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

        <Link
          to="/papelera"
          className="block text-center bg-card border border-border rounded-lg p-4 mt-4 text-sm text-muted-foreground hover:bg-secondary transition-colors"
        >
          🗑️ Ver papelera de rutinas
        </Link>

        {user?.isAdmin && (
          <div className="bg-card border border-border rounded-lg p-6 mt-4 space-y-4">
            <div>
              <p className="text-sm font-medium">Autenticación de dos factores</p>
              <p className="text-xs text-muted-foreground">
                {user.twoFactorEnabled
                  ? "Activada. Se pedirá un código en dispositivos nuevos."
                  : "Agrega una capa extra de seguridad a tu cuenta de admin."}
              </p>
            </div>

            {!user.twoFactorEnabled && !qrCodeDataUrl && (
              <button
                onClick={handleStartTwoFactorSetup}
                className="text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90"
              >
                Activar 2FA
              </button>
            )}

            {qrCodeDataUrl && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  Escanea este código con Google Authenticator, Authy, o similar.
                </p>
                <img src={qrCodeDataUrl} alt="Código QR 2FA" className="w-40 h-40 mx-auto" />
                <input
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-center tracking-[0.3em] text-foreground focus:outline-none focus:border-primary"
                  placeholder="000000"
                  inputMode="numeric"
                  maxLength={6}
                  value={setupCode}
                  onChange={(e) => setSetupCode(e.target.value.replace(/\D/g, ""))}
                />
                <button
                  onClick={handleConfirmTwoFactor}
                  className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90"
                >
                  Confirmar y activar
                </button>
                {setupStatus && <p className="text-xs text-destructive text-center">{setupStatus}</p>}
              </div>
            )}

            {user.twoFactorEnabled && (
              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                  Ingresa un código actual para desactivar el 2FA (esto también olvida todos los dispositivos de confianza).
                </p>
                <input
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-center tracking-[0.3em] text-foreground focus:outline-none focus:border-primary"
                  placeholder="000000"
                  inputMode="numeric"
                  maxLength={6}
                  value={disableCode}
                  onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, ""))}
                />
                <button
                  onClick={handleDisableTwoFactor}
                  className="w-full text-sm px-4 py-2 rounded-md bg-destructive/20 text-destructive hover:bg-destructive/30"
                >
                  Desactivar 2FA
                </button>
                {disableStatus && <p className="text-xs text-muted-foreground text-center">{disableStatus}</p>}
              </div>
            )}
          </div>
        )}

        <ShareProgressSection />
      </main>
    </div>
  );
}