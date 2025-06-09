import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: FeatureCardProps) {
  return (
    <div className="group bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/30 dark:border-gray-700/30 hover:border-gray-300/50 dark:hover:border-gray-600/50 transition-all duration-300 hover:scale-105">
      <div
        className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center text-white mb-3 transition-transform duration-300 group-hover:scale-110`}
      >
        {icon}
      </div>
      <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
        {title}
      </h4>
      <p className="text-gray-600 dark:text-gray-300 text-xs">{description}</p>
    </div>
  );
}
