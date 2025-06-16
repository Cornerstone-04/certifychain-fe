import React from "react";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { AppHeader } from "@/components/shared/app-header";
import { useAuthStatus } from "@/hooks/useAuth";

interface LayoutPageProps {
  children: React.ReactNode;
  className?: string; // To allow custom styling for the inner content div if needed
}

export const LayoutPage: React.FC<LayoutPageProps> = ({
  children,
  className = "",
}) => {
  const { user, loading, role } = useAuthStatus(); // Use the auth status hook

  // Determine if user is authenticated and their role once loading is complete
  const isAuthenticated = !loading && !!user;
  const userRole = role;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 text-gray-800 dark:text-white overflow-hidden">
      <AnimatedBackground />
      {/* Render AppHeader with auth status and role */}
      <AppHeader isAuthenticated={isAuthenticated} userRole={userRole} />
      <div
        className={`relative flex items-start justify-center p-4 pt-8 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
