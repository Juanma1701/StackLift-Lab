import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Navbar } from "@/components/Navbar";
import { api } from "@/lib/api";
import type { RoutineSummary, Routine, WorkoutLog } from "@/types";
import { DAY_NAMES } from "@/lib/constants";

interface ExerciseProgress {
  id: string;
  name: string;
  muscleGroupName: string;
  logs: WorkoutLog[];
  mergedDayNames: string[];
}

export function Progress() {
  const [routines, setRoutines] = useState<RoutineSummary[]>([]);
  const [routineId, setRoutineId] = useState("");
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<number | null>(null);
  const [muscleFilter, setMuscleFilter] = useState<string>("Todos");
  const [exerciseData, setExerciseData] = useState<ExerciseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDay, setLoadingDay] = useState(false);

  useEffect(() => {
    api.listRoutines().then((list: RoutineSummary[]) => {
      setRoutines(list);
      if (list.length) setRoutineId(list[0].id);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!routineId) return;
    api.getRoutine(routineId).then((r: Routine) => {
      setRoutine(r);
      const firstDayWithExercises = r.days.find((d) => d.muscleGroups.some((g) => g.exercises.length > 0));
      setDayOfWeek(firstDayWithExercises?.dayOfWeek ?? r.days[0]?.dayOfWeek ?? null);
      setMuscleFilter("Todos");
    });
  }, [routineId]);

  useEffect(() => {
    if (!routine || dayOfWeek === null) {
      setExerciseData([]);
      return;
    }
    const day = routine.days.find((d) => d.dayOfWeek === dayOfWeek);
    if (!day) {
      setExerciseData([]);
      return;
    }

    // Mapa: nombre normalizado -> {ids, días} para combinar el mismo ejercicio repetido en varios días
    const byName = new Map<string, { ids: string[]; dayOfWeeks: Set<number> }>();
    for (const d of routine.days) {
      for (const g of d.muscleGroups) {
        for (const ex of g.exercises) {
          const key = ex.name.trim().toLowerCase();
          if (!byName.has(key)) byName.set(key, { ids: [], dayOfWeeks: new Set() });
          byName.get(key)!.ids.push(ex.id);
          byName.get(key)!.dayOfWeeks.add(d.dayOfWeek);
        }
      }
    }

    const flatExercises = day.muscleGroups.flatMap((group) =>
      group.exercises.map((ex) => ({ id: ex.id, name: ex.name, muscleGroupName: group.name }))
    );

    if (flatExercises.length === 0) {
      setExerciseData([]);
      return;
    }

    setLoadingDay(true);
    Promise.all(
      flatExercises.map(async (ex) => {
        const key = ex.name.trim().toLowerCase();
        const related = byName.get(key) ?? { ids: [ex.id], dayOfWeeks: new Set([dayOfWeek]) };
        const logsPerId = await Promise.all(related.ids.map((id) => api.listLogs(id)));
        const merged: WorkoutLog[] = logsPerId
          .flat()
          .sort((a: WorkoutLog, b: WorkoutLog) => new Date(a.performedAt).getTime() - new Date(b.performedAt).getTime());

        const mergedDayNames = Array.from(related.dayOfWeeks)
          .sort((a, b) => a - b)
          .map((dw) => DAY_NAMES[dw]);

        return { ...ex, logs: merged, mergedDayNames };
      })
    )
      .then((results) => setExerciseData(results))
      .finally(() => setLoadingDay(false));

    setMuscleFilter("Todos");
  }, [routine, dayOfWeek]);

  const currentDay = routine?.days.find((d) => d.dayOfWeek === dayOfWeek);
  const muscleGroupNames = currentDay
    ? currentDay.muscleGroups.filter((g) => g.exercises.length > 0).map((g) => g.name)
    : [];

  const visibleData =
    muscleFilter === "Todos" ? exerciseData : exerciseData.filter((e) => e.muscleGroupName === muscleFilter);

  const groupedByMuscle = visibleData.reduce<Record<string, ExerciseProgress[]>>((acc, ex) => {
    if (!acc[ex.muscleGroupName]) acc[ex.muscleGroupName] = [];
    acc[ex.muscleGroupName].push(ex);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="font-display font-bold text-2xl tracking-wide mb-1">PROGRESO</h1>
        <p className="text-muted-foreground mb-6">Consulta la evolución de tus ejercicios</p>

        {loading ? (
          <p className="text-muted-foreground">Cargando...</p>
        ) : routines.length === 0 ? (
          <p className="text-muted-foreground">Aún no tienes rutinas.</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-3 mb-4">
              <select
                className="border border-border rounded-md px-3 py-1.5 text-sm bg-card"
                value={routineId}
                onChange={(e) => setRoutineId(e.target.value)}
              >
                {routines.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>

              {routine && (
                <select
                  className="border border-border rounded-md px-3 py-1.5 text-sm bg-card"
                  value={dayOfWeek ?? ""}
                  onChange={(e) => setDayOfWeek(Number(e.target.value))}
                >
                  {routine.days.map((d) => (
                    <option key={d.dayOfWeek} value={d.dayOfWeek}>
                      {DAY_NAMES[d.dayOfWeek]}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {muscleGroupNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setMuscleFilter("Todos")}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    muscleFilter === "Todos"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  Todos
                </button>
                {muscleGroupNames.map((name) => (
                  <button
                    key={name}
                    onClick={() => setMuscleFilter(name)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                      muscleFilter === name
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}

            {loadingDay ? (
              <p className="text-muted-foreground">Cargando ejercicios...</p>
            ) : Object.keys(groupedByMuscle).length === 0 ? (
              <p className="text-muted-foreground">Este día no tiene ejercicios registrados.</p>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedByMuscle).map(([muscleName, exercises]) => (
                  <div key={muscleName}>
                    <h2 className="font-display font-bold text-sm tracking-wide text-muted-foreground uppercase mb-3">
                      {muscleName}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {exercises.map((ex) => (
                        <ExerciseProgressCard key={ex.id} exercise={ex} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

interface ChartPoint {
  date: string;
  peso: number;
  setsSummary: string;
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const point: ChartPoint = payload[0].payload;

  return (
    <div className="bg-card border border-border rounded-md px-3 py-2 shadow-lg">
      <p className="text-xs font-medium mb-0.5">{point.date}</p>
      <p className="text-xs text-muted-foreground">{point.setsSummary}</p>
    </div>
  );
}

function ExerciseProgressCard({ exercise }: { exercise: ExerciseProgress }) {
  const { logs } = exercise;

  if (logs.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="font-medium text-sm mb-1">{exercise.name}</p>
        <p className="text-xs text-muted-foreground">Sin registros aún.</p>
      </div>
    );
  }

  const chartData: ChartPoint[] = logs.map((log) => ({
    date: new Date(log.performedAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" }),
    peso: log.sets[0]?.weight ?? 0,
    setsSummary: log.sets.map((s) => `${s.weight}kg×${s.reps}`).join(" · "),
  }));

  const latestLog = logs[logs.length - 1];
  const currentWeight = latestLog.sets[0]?.weight ?? 0;
  const previousWeight = logs.length > 1 ? logs[logs.length - 2].sets[0]?.weight ?? null : null;
  const diff = previousWeight !== null ? currentWeight - previousWeight : null;
  const previousMax = logs.slice(0, -1).reduce((max, l) => Math.max(max, l.sets[0]?.weight ?? 0), 0);
  const isPR = logs.length > 1 && currentWeight > previousMax;
  const latestSetsSummary = latestLog.sets.map((s) => `${s.weight}kg×${s.reps}`).join(" · ");

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-1">
        <p className="font-medium text-sm">{exercise.name}</p>
        <div className="flex items-center gap-2">
          {isPR && (
            <span className="text-[10px] font-bold uppercase tracking-wide text-success border border-success rounded-full px-1.5 py-0.5">
              PR
            </span>
          )}
          <span className="font-display font-bold text-lg text-primary">{currentWeight} kg</span>
          {diff !== null && diff !== 0 && (
            <span className={`font-display font-bold text-sm ${diff > 0 ? "text-success" : "text-destructive"}`}>
              {diff > 0 ? "+" : ""}
              {diff} kg
            </span>
          )}
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground mb-2">{latestSetsSummary}</p>

      {exercise.mergedDayNames.length > 1 && (
        <p className="text-[10px] text-muted-foreground mb-2">
          Combinado: {exercise.mergedDayNames.join(" + ")}
        </p>
      )}

      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} width={30} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="peso" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}