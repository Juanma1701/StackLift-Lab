import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "@/lib/api";

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");

  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    if (!token || !uid) return;

    api
      .verifyEmail(uid, token)
      .then(() => setStatus("ok"))
      .catch(() => {
        setStatus("error");
      });
  }, [token, uid]);

  if (!token || !uid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-sm text-muted-foreground">Enlace inválido o incompleto.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-condensed font-bold text-foreground">Verificación de correo</h1>

        {status === "loading" && (
          <p className="text-sm text-muted-foreground">Verificando tu correo...</p>
        )}
        {status === "ok" && (
          <p className="text-sm text-foreground">Tu correo fue verificado. Ya puedes iniciar sesión.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-muted-foreground">
            El enlace no funcionó. Puedes pedir uno nuevo desde la pantalla de inicio de sesión.
          </p>
        )}

        <Link to="/login" className="block text-xs text-muted-foreground underline text-center">
          Volver a iniciar sesión
        </Link>
      </div>
    </div>
  );
}