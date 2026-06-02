import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="fintech-panel group p-5 transition-colors hover:border-blue-600 dark:hover:border-blue-400"
    >
      <div className="mb-5 flex h-10 w-10 items-center justify-center border border-blue-600 text-blue-700 dark:border-blue-400 dark:text-blue-400">
        {icon}
      </div>
      <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
        {title}
      </h4>
      <p className="text-gray-600 dark:text-gray-300 text-xs">{description}</p>
    </motion.div>
  );
}
