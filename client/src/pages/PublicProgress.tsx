import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { api } from "@/lib/api";
import type { PublicProgressData, PublicProgressExercise } from "@/types";

export function PublicProgress() {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<PublicProgressData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    api
      .getPublicProgress(token)
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Cargando...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="font-display font-bold text-xl mb-2">Enlace no válido</p>
          <p className="text-muted-foreground text-sm">{error || "Este enlace ya no está disponible."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <p className="font-display font-bold text-lg tracking-wide">💪 Gym Tracker</p>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-1">Progreso de {data.name}</h1>
        <p className="text-muted-foreground mb-6">Solo lectura — compartido públicamente</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Racha</p>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-bold text-3xl text-primary">{data.streak}</span>
              <span className="text-xs text-muted-foreground">días</span>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Este mes</p>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-bold text-2xl">{data.monthlyWorkouts}</span>
              <span className="text-xs text-muted-foreground">entrenos</span>
            </div>
          </div>
        </div>

        {data.recentPRs.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">PRs recientes</p>
            <div className="flex flex-col gap-1.5">
              {data.recentPRs.map((pr, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{pr.exerciseName}</span>
                  <span className="font-display font-bold text-sm text-success">{pr.weight}kg</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.progress.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aún no hay metas de peso definidas para mostrar progreso.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {data.progress.map((ex) => (
              <PublicExerciseCard key={ex.exerciseName} exercise={ex} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function PublicExerciseCard({ exercise }: { exercise: PublicProgressExercise }) {
  const chartData = exercise.history.map((point) => ({
    date: new Date(point.date).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" }),
    peso: point.weight,
  }));

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-1">
        <p className="font-medium text-sm">{exercise.exerciseName}</p>
        <span className="font-display font-bold text-lg text-primary">{exercise.currentWeight} kg</span>
      </div>
      <p className="text-[11px] text-muted-foreground mb-2">
        Meta: {exercise.targetWeight} kg ({Math.round(exercise.percent)}%)
      </p>
      <div className="h-1.5 w-full bg-background rounded-full overflow-hidden mb-3">
        <div className="h-full bg-primary rounded-full" style={{ width: `${exercise.percent}%` }} />
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} width={30} />
          <Tooltip />
          <Line type="monotone" dataKey="peso" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}