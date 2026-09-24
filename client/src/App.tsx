import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { RestTimerProvider } from "@/context/RestTimerContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ToastContainer } from "@/components/ToastContainer";
import { RestTimerButton } from "@/components/RestTimerButton";

const Login = lazy(() => import("@/pages/Login").then((m) => ({ default: m.Login })));
const Register = lazy(() => import("@/pages/Register").then((m) => ({ default: m.Register })));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword").then((m) => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => import("@/pages/ResetPassword").then((m) => ({ default: m.ResetPassword })));
const Dashboard = lazy(() => import("@/pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const History = lazy(() => import("@/pages/History").then((m) => ({ default: m.History })));
const Progress = lazy(() => import("@/pages/Progress").then((m) => ({ default: m.Progress })));
const Profile = lazy(() => import("@/pages/Profile").then((m) => ({ default: m.Profile })));
const PublicProgress = lazy(() => import("@/pages/PublicProgress").then((m) => ({ default: m.PublicProgress })));

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground text-sm">Cargando...</p>
    </div>
  );
}

// Rutas donde no tiene sentido mostrar el botón del cronómetro (no hay sesión activa todavía)
const PUBLIC_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"];

function GlobalRestTimerButton() {
  const location = useLocation();
  const isPublic = PUBLIC_PATHS.includes(location.pathname) || location.pathname.startsWith("/compartido/");
  if (isPublic) return null;
  return <RestTimerButton />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RestTimerProvider>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/compartido/:token" element={<PublicProgress />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/historial" element={<ProtectedRoute><History /></ProtectedRoute>} />
              <Route path="/progreso" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
              <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </Suspense>
          <ToastContainer />
          <GlobalRestTimerButton />
        </RestTimerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}