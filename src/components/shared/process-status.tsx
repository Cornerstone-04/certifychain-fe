import { motion } from "motion/react";

export function ProcessStatus({
  title,
  detail,
}: {
  title: string;
  detail?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 border border-blue-500 bg-blue-50 p-4 dark:border-blue-800 dark:bg-[#0b1220]"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 h-3 w-3 animate-pulse bg-blue-600" />
        <div className="flex-1">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-blue-900 dark:text-blue-200">
            {title}
          </p>
          {detail && (
            <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
              {detail}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 h-1 bg-blue-100 dark:bg-blue-900/30">
        <motion.div
          className="h-1 bg-blue-600"
          initial={{ width: "10%" }}
          animate={{ width: ["10%", "76%", "42%", "88%"] }}
          transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
