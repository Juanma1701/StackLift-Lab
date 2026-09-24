import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.forgotPassword(email);
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-condensed font-bold text-foreground">¿Olvidaste tu contraseña?</h1>

        {sent ? (
          <p className="text-sm text-muted-foreground">
            Si el correo existe en nuestro sistema, te enviamos un enlace para restablecer tu contraseña.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              placeholder="Tu correo"
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>
        )}

        <Link to="/login" className="block text-xs text-muted-foreground underline text-center">
          Volver a iniciar sesión
        </Link>
      </div>
    </div>
  );
}