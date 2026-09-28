import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";

export function Soporte() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !message.trim()) {
      setError("Completa correo y mensaje");
      return;
    }

    setLoading(true);
    try {
      await api.createSupportTicket(email, "No puedo acceder a mi cuenta", message);
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm space-y-4 text-center">
          <h1 className="text-2xl font-condensed font-bold text-foreground">Mensaje enviado</h1>
          <p className="text-sm text-muted-foreground">
            Recibimos tu mensaje. Te contactaremos pronto.
          </p>
          <Link to="/login" className="block text-xs text-muted-foreground underline text-center">
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-condensed font-bold text-foreground">¿No puedes acceder?</h1>
        <p className="text-sm text-muted-foreground">
          Cuéntanos qué pasó y te ayudamos a recuperar el acceso a tu cuenta.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
            placeholder="Tu correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary min-h-[100px]"
            placeholder="Describe el problema (ej. mi cuenta quedó bloqueada tras varios intentos)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>

        <Link to="/login" className="block text-xs text-muted-foreground underline text-center">
          Volver a iniciar sesión
        </Link>
      </div>
    </div>
  );
}