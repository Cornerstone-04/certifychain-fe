import React from "react";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { Navbar } from "@/components/shared/navbar";

interface LayoutPageProps {
  children: React.ReactNode;
  className?: string; // To allow custom styling for the inner content div if needed
}

export const LayoutPage: React.FC<LayoutPageProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className="fintech-shell overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      <div
        className={`relative flex items-start justify-center p-4 py-8 sm:px-6 lg:py-12 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
