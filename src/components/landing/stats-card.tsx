import { StatsCardProps } from "@/hooks/lib/types";

export function StatsCard({
  icon,
  title,
  value,
  description,
  gradient,
}: StatsCardProps) {
  return (
    <div className="group bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/50 dark:hover:border-gray-600/50">
      <div
        className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
      >
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {value}
        </p>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
