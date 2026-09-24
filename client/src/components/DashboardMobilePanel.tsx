import { useState } from "react";
import { ChevronDown, Calendar, BarChart3 } from "lucide-react";
import { MonthlyCalendar } from "./MonthlyCalendar";
import { DashboardStats } from "./DashboardStats";

interface Props {
  refreshKey: number;
}

export function DashboardMobilePanel({ refreshKey }: Props) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"calendar" | "stats">("calendar");

  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground"
      >
        <span className="flex items-center gap-2">
          <Calendar size={16} className="text-primary" />
          Calendario y estadísticas
        </span>
        <ChevronDown size={18} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-2 bg-card border border-border rounded-lg overflow-hidden">
          <div className="flex border-b border-border">
            <button
              onClick={() => setTab("calendar")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium ${
                tab === "calendar" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              }`}
            >
              <Calendar size={14} />
              Calendario
            </button>
            <button
              onClick={() => setTab("stats")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium ${
                tab === "stats" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              }`}
            >
              <BarChart3 size={14} />
              Estadísticas
            </button>
          </div>

          <div className="p-3">
            {tab === "calendar" ? (
              <MonthlyCalendar key={`m-cal-${refreshKey}`} />
            ) : (
              <DashboardStats key={`m-stats-${refreshKey}`} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}