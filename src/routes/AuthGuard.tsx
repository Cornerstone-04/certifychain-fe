// src/routes/AuthGuard.tsx
import { Navigate, useLocation } from "react-router";
import { useAuthStatus } from "@/hooks/useAuth";
import { Loading } from "@/components/shared/loading";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStatus();
  const location = useLocation();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/" state={{ from: location }} replace />;

  return <>{children}</>;
}

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStatus();

  if (loading) return <Loading />;
  // Assuming /home is no longer the default authenticated route, this redirect might need review
  // based on future client dashboard decisions. For now, keeping original /home target.
  if (user) return <Navigate to="/home" replace />; 

  return <>{children}</>;
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, role } = useAuthStatus();
  const location = useLocation();

  if (loading) return <Loading />;
  // If not logged in or not an admin, redirect to /admin/login page
  if (!user || role !== 'admin') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}