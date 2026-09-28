import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PasswordInput } from "@/components/PasswordInput";
import { api } from "@/lib/api";

export function Login() {
  const { login, completeTwoFactorLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendStatus, setResendStatus] = useState("");

  const [needsTwoFactor, setNeedsTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [rememberDevice, setRememberDevice] = useState(true);
  const [twoFactorError, setTwoFactorError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setNeedsVerification(false);
    setResendStatus("");
    try {
      const result = await login(email, password);
      if (result.twoFactorRequired) {
        setNeedsTwoFactor(true);
        return;
      }
      navigate("/");
    } catch (err: any) {
      setError(err.message);
      if (err.code === "EMAIL_NOT_VERIFIED") {
        setNeedsVerification(true);
      }
    }
  }

  async function handleTwoFactorSubmit(e: FormEvent) {
    e.preventDefault();
    setTwoFactorError("");
    try {
      await completeTwoFactorLogin(twoFactorCode, rememberDevice);
      navigate("/");
    } catch (err: any) {
      setTwoFactorError(err.message);
    }
  }

  async function handleResend() {
    setResendStatus("Enviando...");
    try {
      await api.resendVerificationEmail(email);
      setResendStatus("Si el correo existe y no está verificado, se envió un nuevo enlace.");
    } catch {
      setResendStatus("No se pudo reenviar. Intenta de nuevo.");
    }
  }

  if (needsTwoFactor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <form
          onSubmit={handleTwoFactorSubmit}
          className="w-full max-w-sm bg-card p-8 rounded-lg shadow-sm border border-border space-y-4"
        >
          <h1 className="font-display font-bold text-2xl tracking-wide text-center">VERIFICACIÓN 2FA</h1>
          <p className="text-sm text-muted-foreground text-center">
            Ingresa el código de 6 dígitos de tu app de autenticación.
          </p>
          {twoFactorError && <p className="text-destructive text-sm text-center">{twoFactorError}</p>}
          <input
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-primary"
            placeholder="000000"
            inputMode="numeric"
            maxLength={6}
            value={twoFactorCode}
            onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ""))}
          />
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
            />
            Confiar en este dispositivo por 60 días
          </label>
          <button className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md hover:opacity-90 transition-opacity">
            Verificar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm bg-card p-8 rounded-lg shadow-sm border border-border space-y-5">
        <div className="text-center space-y-1">
          <h1 className="font-display font-bold text-2xl tracking-wide">💪 StackLift Lab</h1>
          <p className="text-sm text-muted-foreground">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {error && <p className="text-destructive text-sm text-center">{error}</p>}

          {needsVerification && (
            <div className="text-center space-y-1 bg-secondary rounded-md py-2 px-3">
              <button
                type="button"
                onClick={handleResend}
                className="text-primary text-sm font-medium underline"
              >
                Reenviar correo de verificación
              </button>
              {resendStatus && <p className="text-xs text-muted-foreground">{resendStatus}</p>}
            </div>
          )}

          <input
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-primary"
            placeholder="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md hover:opacity-90 transition-opacity">
            Iniciar sesión
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Link to="/forgot-password" className="hover:text-primary transition-colors">
            ¿Olvidaste tu contraseña?
          </Link>
          <span className="text-border">·</span>
          <Link to="/soporte" className="hover:text-primary transition-colors">
            ¿No puedes acceder?
          </Link>
        </div>

        <div className="border-t border-border pt-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">¿No tienes cuenta?</p>
          <Link
            to="/register"
            className="block w-full text-center bg-secondary text-foreground font-semibold py-2 rounded-md text-sm hover:bg-muted transition-colors"
          >
            Crear una cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}