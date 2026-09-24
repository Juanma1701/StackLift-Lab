import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { api } from "@/lib/api";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (!token || !uid) {
      setError("Enlace inválido");
      return;
    }

    setLoading(true);
    try {
      await api.resetPassword(uid, token, newPassword);
      navigate("/login");
    } catch {
      // el toast ya muestra el error del backend (enlace inválido o expirado)
    } finally {
      setLoading(false);
    }
  }

  if (!token || !uid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-sm text-muted-foreground">Enlace inválido o incompleto.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-condensed font-bold text-foreground">Nueva contraseña</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            required
            placeholder="Nueva contraseña"
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Confirmar contraseña"
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Restablecer contraseña"}
          </button>
        </form>

        <Link to="/login" className="block text-xs text-muted-foreground underline text-center">
          Volver a iniciar sesión
        </Link>
      </div>
    </div>
  );
}