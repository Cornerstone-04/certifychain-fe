import React from "react";
import { Header as HomeHeader } from "@/components/home/header";
import { FloatingParticles } from "@/components/shared/floating-particles"; // Import FloatingParticles
import { AnimatedBackground } from "@/components/shared/animated-background.tsx"; // Import AnimatedBackground

interface LayoutPageProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  className?: string;
  showAuthHeader?: boolean;
}

export const LayoutPage: React.FC<LayoutPageProps> = ({
  children,
  isAuthenticated = false,
  className = "",
  showAuthHeader = false,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 text-gray-800 dark:text-white overflow-hidden">
      <AnimatedBackground /> {/* Add Animated Background to the layout */}
      {showAuthHeader && isAuthenticated && <HomeHeader isVisible={true} />}
      <div
        className={`relative flex items-start justify-center p-4 pt-8 ${className}`}
      >
        {children}
      </div>
      <FloatingParticles /> {/* Add Floating Particles to the layout */}
    </div>
  );
};
