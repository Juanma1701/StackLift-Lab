import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PasswordInput } from "@/components/PasswordInput";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (name.trim().length < 2) return setError("El nombre debe tener al menos 2 caracteres");
    if (!EMAIL_REGEX.test(email)) return setError("Ingresa un correo electrónico válido");
    if (password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres");
    if (password !== confirm) return setError("Las contraseñas no coinciden");

    try {
      const result = await register(name, email, password);
      setSuccess(result.message);
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm bg-card p-8 rounded-lg shadow-sm border border-border space-y-4 text-center">
          <h1 className="font-display font-bold text-2xl tracking-wide">REVISA TU CORREO</h1>
          <p className="text-sm text-muted-foreground">{success}</p>
          <Link to="/login" className="text-primary font-medium text-sm inline-block">
            Ir a iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-card p-8 rounded-lg shadow-sm border border-border space-y-4">
        <h1 className="font-display font-bold text-2xl tracking-wide text-center">CREAR CUENTA</h1>
        {error && <p className="text-destructive text-sm text-center">{error}</p>}
        <input
          className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-primary"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-primary"
          placeholder="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          placeholder="Contraseña (mín. 8 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md hover:opacity-90 transition-opacity">
          Crear cuenta
        </button>
        <p className="text-sm text-center text-muted-foreground">
          ¿Ya tienes cuenta? <Link to="/login" className="text-primary font-medium">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}