import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

export function LostBanner() {
  return (
    <Link
      to="/guia"
      className="flex items-center gap-3 bg-secondary hover:bg-muted transition-colors rounded-md px-4 py-3 text-sm"
    >
      <HelpCircle size={18} className="text-primary flex-shrink-0" />
      <span>
        <span className="font-medium">¿Estás perdido?</span>{" "}
        <span className="text-muted-foreground">
          ¿No sabes qué hacer ni cómo empezar? Toca aquí para ver la guía.
        </span>
      </span>
    </Link>
  );
}