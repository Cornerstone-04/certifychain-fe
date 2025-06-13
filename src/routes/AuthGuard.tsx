// guards/AuthGuard.tsx
import { Navigate, useLocation } from "react-router";
import { useAuthStatus } from "@/hooks/useAuth";

interface GuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: GuardProps) {
  const { user, loading } = useAuthStatus();
  const location = useLocation();

  if (loading) return <div className="text-center p-4">Loading...</div>;

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

export function GuestGuard({ children }: GuardProps) {
  const { user, loading } = useAuthStatus();

  if (loading) return <div className="text-center p-4">Loading...</div>;

  // Redirect to dashboard/home if already authenticated
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
