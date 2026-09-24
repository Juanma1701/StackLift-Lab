import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HistoryCalendar } from "@/components/HistoryCalendar";
import { HistoryDayDetail } from "@/components/HistoryDayDetail";
import { api } from "@/lib/api";
import type { RoutineSummary, HistoryDay, DailyCheckIn } from "@/types";

export function History() {
  const [routines, setRoutines] = useState<RoutineSummary[]>([]);
  const [selectedRoutineId, setSelectedRoutineId] = useState("");
  const [days, setDays] = useState<HistoryDay[]>([]);
  const [checkInsByDate, setCheckInsByDate] = useState<Map<string, DailyCheckIn>>(new Map());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listRoutines().then((list: RoutineSummary[]) => {
      setRoutines(list);
      if (list.length) setSelectedRoutineId(list[0].id);
      setLoading(false);
    });

    api.listCheckIns().then((list: DailyCheckIn[]) => {
      setCheckInsByDate(new Map(list.map((c) => [c.date, c])));
    });
  }, []);

  function reloadHistory() {
    if (!selectedRoutineId) return;
    api.getRoutineHistory(selectedRoutineId).then((result: HistoryDay[]) => {
      setDays(result);
      // Por defecto, selecciona el día más reciente con registro
      setSelectedDate(result.length > 0 ? result[0].date : null);
    });
  }

  useEffect(() => {
    reloadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoutineId]);

  async function handleDeleteEntry(id: string) {
    if (!confirm("¿Eliminar este registro? Esta acción no se puede deshacer.")) return;
    await api.deleteLog(id);
    reloadHistory();
  }

  const datesWithData = new Set(days.map((d) => d.date));
  const selectedDay = days.find((d) => d.date === selectedDate) ?? null;
  const selectedCheckIn = selectedDate ? checkInsByDate.get(selectedDate) ?? null : null;

  const today = new Date();
  const mostRecentDate = days[0]?.date;
  const [calYear, calMonth] = mostRecentDate
    ? mostRecentDate.split("-").map(Number)
    : [today.getFullYear(), today.getMonth() + 1];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="font-display font-bold text-2xl tracking-wide mb-1">HISTORIAL</h1>
        <p className="text-muted-foreground mb-6">Consulta tus entrenamientos anteriores</p>

        {loading ? (
          <p className="text-muted-foreground">Cargando...</p>
        ) : routines.length === 0 ? (
          <p className="text-muted-foreground">Aún no tienes rutinas.</p>
        ) : (
          <>
            <select
              className="border border-border rounded-md px-3 py-1.5 text-sm bg-card mb-6"
              value={selectedRoutineId}
              onChange={(e) => setSelectedRoutineId(e.target.value)}
            >
              {routines.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>

            {days.length === 0 ? (
              <p className="text-muted-foreground">
                Todavía no has registrado ningún entrenamiento en esta rutina.
              </p>
            ) : (
              <div className="grid md:grid-cols-[280px_1fr] gap-6 items-start">
                <HistoryCalendar
                  datesWithData={datesWithData}
                  selectedDate={selectedDate}
                  onSelect={setSelectedDate}
                  initialYear={calYear}
                  initialMonth={calMonth}
                />
                <HistoryDayDetail day={selectedDay} checkIn={selectedCheckIn} onDeleteEntry={handleDeleteEntry} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}