import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Timer } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRestTimer } from "@/context/RestTimerContext";

const PRESETS = [60, 90, 120];

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);
  const { active, secondsLeft, duration, running, finished, dismiss, adjust, restart, toggleRunning } =
    useRestTimer();

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/historial", label: "Historial" },
    { to: "/progreso", label: "Progreso" },
    { to: "/guia", label: "Guía" },
    { to: "/perfil", label: "Perfil" },
  ];

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progress = duration > 0 ? (secondsLeft / duration) * 100 : 0;

  return (
    <nav className="border-b border-border bg-card relative">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <span className="font-bold text-lg">💪 Gym Tracker</span>
          <div className="hidden sm:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {active && (
            <div className="relative">
              <button
                onClick={() => setTimerOpen((o) => !o)}
                className={`flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-md transition-colors ${
                  finished ? "bg-primary text-primary-foreground animate-pulse" : "bg-secondary hover:bg-muted"
                }`}
              >
                <Timer size={14} />
                <span className="font-condensed tabular-nums">
                  {mins}:{secs.toString().padStart(2, "0")}
                </span>
              </button>

              {timerOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-card p-3 shadow-lg flex flex-col items-center gap-2 z-50">
                  <span className="text-xs text-muted-foreground">
                    {finished ? "¡Descanso terminado!" : "Descanso"}
                  </span>

                  <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-1000 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <span className="font-condensed text-3xl tabular-nums">
                    {mins}:{secs.toString().padStart(2, "0")}
                  </span>

                  <div className="flex gap-1.5">
                    <button onClick={() => adjust(-15)} className="px-2 py-1 rounded bg-secondary text-xs">
                      -15s
                    </button>
                    <button
                      onClick={toggleRunning}
                      className="px-2 py-1 rounded bg-primary text-primary-foreground text-xs"
                    >
                      {running ? "Pausar" : "Reanudar"}
                    </button>
                    <button onClick={() => adjust(15)} className="px-2 py-1 rounded bg-secondary text-xs">
                      +15s
                    </button>
                  </div>

                  <div className="flex gap-2 text-[11px] text-muted-foreground">
                    {PRESETS.map((p) => (
                      <button key={p} onClick={() => restart(p)} className="underline">
                        {p}s
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      dismiss();
                      setTimerOpen(false);
                    }}
                    className="text-[11px] text-muted-foreground underline"
                  >
                    Cerrar
                  </button>
                </div>
              )}
            </div>
          )}

          <span className="text-sm text-muted-foreground hidden sm:inline">{user?.name}</span>
          <button
            onClick={logout}
            className="text-sm px-3 py-1.5 rounded-md bg-secondary hover:bg-muted transition-colors hidden sm:inline"
          >
            Cerrar sesión
          </button>
          <button className="sm:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-border px-6 py-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm px-3 py-2 rounded-md ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={logout}
            className="w-full text-left text-sm px-3 py-2 rounded-md bg-secondary hover:bg-muted"
          >
            Cerrar sesión ({user?.name})
          </button>
        </div>
      )}
    </nav>
  );
}