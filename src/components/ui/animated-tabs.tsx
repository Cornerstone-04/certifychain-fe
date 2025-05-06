import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import clsx from "clsx";

const tabs = ["upload", "verify"];

export default function AnimatedTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (val: string) => void;
}) {
  return (
    <div className="relative w-full mb-6">
      <TabsList className="w-full grid grid-cols-2 relative rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx("relative z-10 rounded-none shadow-inner")}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>

      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-primary w-1/2 z-0"
        animate={{ x: activeTab === "verify" ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}
