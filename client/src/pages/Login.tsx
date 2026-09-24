import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-card p-8 rounded-lg shadow-sm border border-border space-y-4">
        <h1 className="font-display font-bold text-2xl tracking-wide text-center">INICIAR SESIÓN</h1>
        {error && <p className="text-destructive text-sm text-center">{error}</p>}
        <input
          className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-primary"
          placeholder="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-primary"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md hover:opacity-90 transition-opacity">
          Iniciar sesión
        </button>
        <p className="text-sm text-center text-muted-foreground">
          ¿No tienes cuenta? <Link to="/register" className="text-primary font-medium">Crear una cuenta</Link>
        </p>
        <p className="text-sm text-center text-muted-foreground">
          <Link to="/forgot-password" className="text-primary font-medium">¿Olvidaste tu contraseña?</Link>
        </p>
      </form>
    </div>
  );
}