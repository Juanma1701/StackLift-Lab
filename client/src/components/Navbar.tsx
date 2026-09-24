import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/historial", label: "Historial" },
    { to: "/progreso", label: "Progreso" },
    { to: "/perfil", label: "Perfil" },
  ];

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