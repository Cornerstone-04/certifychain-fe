import { ActivityItemProps } from "@/hooks/lib/types";

export function ActivityItem({ action, time, status }: ActivityItemProps) {
  const statusColors = {
    success: "bg-green-500",
    pending: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200">
      <div className="flex items-center space-x-3">
        <div
          className={`w-2 h-2 ${statusColors[status]} rounded-full animate-pulse`}
        ></div>
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-white">
            {action}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
        </div>
      </div>
    </div>
  );
}
