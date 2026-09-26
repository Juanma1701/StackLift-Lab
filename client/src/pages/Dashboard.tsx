import { Navbar } from "@/components/Navbar";
import { RoutineSelector } from "@/components/RoutineSelector";
import { WorkoutDay } from "@/components/WorkoutDay";
import { MonthlyCalendar } from "@/components/MonthlyCalendar";
import { DashboardStats } from "@/components/DashboardStats";
import { DashboardMobilePanel } from "@/components/DashboardMobilePanel";
import { DailyCheckInButton } from "@/components/DailyCheckInButton";
import { LostBanner } from "@/components/LostBanner";
import { useRoutines } from "@/hooks/useRoutines";
import { useAuth } from "@/context/AuthContext";

export function Dashboard() {
  const { user } = useAuth();
  const {
    routines,
    selectedId,
    setSelectedId,
    routine,
    loading,
    refreshKey,
    loadRoutines,
    handleCreated,
    handleDeleted,
    refreshCurrent,
  } = useRoutines();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {loading ? (
          <p className="text-muted-foreground">Cargando...</p>
        ) : (
          <div className="flex justify-center gap-12 items-start">
            <aside className="hidden lg:block w-[260px] flex-shrink-0 pt-[92px]">
              <div className="sticky top-8">
                <MonthlyCalendar key={refreshKey} />
              </div>
            </aside>

            <div className="w-full max-w-4xl">
              <h1 className="text-2xl font-bold mb-1">Hola, {user?.name} 👋</h1>
              <p className="text-muted-foreground mb-6">Esta es tu rutina actual</p>

              <DailyCheckInButton />

              <DashboardMobilePanel refreshKey={refreshKey} />

              <div className="mb-6">
                <RoutineSelector
                  routines={routines}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  onCreated={handleCreated}
                  onRenamed={loadRoutines}
                  onDeleted={handleDeleted}
                />
              </div>

              {!routine && (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">
                    Aún no tienes rutinas. Crea una con "+ Nueva rutina" para empezar.
                  </p>
                </div>
              )}

              {routine && (
                <div className="space-y-3">
                  {routine.days.map((day) => (
                    <WorkoutDay
                      key={day.id}
                      day={day}
                      allDays={routine.days}
                      routineId={routine.id}
                      onChange={refreshCurrent}
                    />
                  ))}
                </div>
              )}

              <div className="mt-6">
                <LostBanner />
              </div>
            </div>

            <aside className="hidden lg:block w-[260px] flex-shrink-0 pt-[92px]">
              <div className="sticky top-8">
                <DashboardStats key={refreshKey} />
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}