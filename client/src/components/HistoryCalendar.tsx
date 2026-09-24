import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTH_NAMES = [
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
  "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE",
];
const WEEKDAY_LABELS = ["L", "M", "X", "J", "V", "S", "D"];

interface Props {
  datesWithData: Set<string>; // "YYYY-MM-DD"
  selectedDate: string | null;
  onSelect: (date: string) => void;
  initialYear: number;
  initialMonth: number; // 1-12
}

export function HistoryCalendar({ datesWithData, selectedDate, onSelect, initialYear, initialMonth }: Props) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

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
  const jsFirstDay = firstOfMonth.getDay();
  const leadingBlanks = jsFirstDay === 0 ? 6 : jsFirstDay - 1;
  const daysInMonth = new Date(year, month, 0).getDate();

  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function dateKey(day: number): string {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

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

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`blank-${i}`} />;

          const key = dateKey(day);
          const hasData = datesWithData.has(key);
          const isSelected = selectedDate === key;

          return (
            <button
              key={key}
              onClick={() => hasData && onSelect(key)}
              disabled={!hasData}
              className={`aspect-square rounded-md flex items-center justify-center text-xs transition-colors ${
                isSelected
                  ? "bg-primary text-primary-foreground font-medium"
                  : hasData
                  ? "bg-success/20 text-success font-medium hover:bg-success/30 cursor-pointer"
                  : "text-muted-foreground/40 cursor-default"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-success/20 border border-success" />
          <span className="text-[10px] text-muted-foreground">Con registro</span>
        </div>
      </div>
    </div>
  );
}