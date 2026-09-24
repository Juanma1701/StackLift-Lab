import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Goal {
  exerciseName: string;
  percent: number;
  currentWeight: number;
  targetWeight: number;
}

interface StatsData {
  streak: number;
  monthlyWorkouts: number;
  recentPRs: { exerciseName: string; weight: number }[];
  goals: Goal[];
}

export function DashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    api.getDashboardStats().then(setStats);
  }, []);

  if (!stats) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Racha</p>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-3xl text-primary">{stats.streak}</span>
            <span className="text-xs text-muted-foreground">días</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Este mes</p>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-2xl">{stats.monthlyWorkouts}</span>
            <span className="text-xs text-muted-foreground">entrenos</span>
          </div>
        </div>
      </div>

      {stats.recentPRs.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">PRs recientes</p>
          <div className="flex flex-col gap-1.5">
            {stats.recentPRs.map((pr, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground truncate pr-2">{pr.exerciseName}</span>
                <span className="font-display font-bold text-sm text-success flex-shrink-0">{pr.weight}kg</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.goals.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-3">Metas en progreso</p>
          <div className="flex flex-col gap-3">
            {stats.goals.map((goal, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium truncate pr-2">{goal.exerciseName}</span>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">
                    {goal.currentWeight}/{goal.targetWeight}kg
                  </span>
                </div>
                <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${goal.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}