import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const tabs = ["upload", "verify"];

export default function AnimatedTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (val: string) => void;
}) {
  return (
    <div className="relative w-full mb-6 ">
      <TabsList className="w-full grid grid-cols-2 relative border  bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-900/60">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            onClick={() => setActiveTab(tab)}
            className="relative z-10"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>

      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-1/2 z-0"
        animate={{ x: activeTab === "verify" ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}
