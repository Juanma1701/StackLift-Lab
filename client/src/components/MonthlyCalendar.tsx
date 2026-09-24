import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";

const MONTH_NAMES = [
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
  "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE",
];
const WEEKDAY_LABELS = ["L", "M", "X", "J", "V", "S", "D"];

function dateKey(year: number, month: number, day: number): string {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

export function MonthlyCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // 1-12
  const [daysWithLogs, setDaysWithLogs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getCalendarMonth(year, month).then((data: { daysWithLogs: string[] }) => {
      setDaysWithLogs(new Set(data.daysWithLogs));
      setLoading(false);
    });
  }, [year, month]);

  function goToPrevMonth() {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function goToNextMonth() {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  const firstOfMonth = new Date(year, month - 1, 1);
  const jsFirstDay = firstOfMonth.getDay(); // 0 = domingo
  const leadingBlanks = jsFirstDay === 0 ? 6 : jsFirstDay - 1; // lunes primero
  const daysInMonth = new Date(year, month, 0).getDate();

  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth() + 1;

  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={goToPrevMonth} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft size={16} />
        </button>
        <p className="font-display font-bold text-sm tracking-wide">
          {MONTH_NAMES[month - 1]} {year}
        </p>
        <button onClick={goToNextMonth} className="text-muted-foreground hover:text-foreground">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAY_LABELS.map((d) => (
          <span key={d} className="text-[10px] text-muted-foreground text-center">
            {d}
          </span>
        ))}
      </div>

      <div className={`grid grid-cols-7 gap-1 ${loading ? "opacity-50" : ""}`}>
        {cells.map((day, i) => {
          if (day === null) return <div key={`blank-${i}`} />;

          const dateObj = new Date(year, month - 1, day);
          const weekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
          const key = dateKey(year, month, day);
          const trained = daysWithLogs.has(key);
          const isToday = isCurrentMonth && day === today.getDate();

          if (weekend) {
            return (
              <div key={key} className="aspect-square flex items-center justify-center text-xs text-muted-foreground">
                {day}
              </div>
            );
          }

          return (
            <div
              key={key}
              className={`aspect-square rounded-md flex items-center justify-center text-xs ${
                trained ? "bg-success text-background font-medium" : "bg-secondary text-muted-foreground"
              } ${isToday ? "ring-2 ring-foreground" : ""}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-success" />
          <span className="text-[10px] text-muted-foreground">Entrenaste</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-secondary" />
          <span className="text-[10px] text-muted-foreground">Sin registro</span>
        </div>
      </div>
    </div>
  );
}