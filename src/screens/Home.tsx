import { Tabs, TabsContent } from "@/components/ui/tabs";
import AnimatedTabs from "@/components/ui/animated-tabs";
import UploadTab from "./UploadTab";
import VerifyTab from "./VerifyTab";
import { FadeTab } from "@/components/ui/fade-tab";
import { useState, useEffect } from "react";
import { FloatingParticles } from "@/components/shared/floating-particles";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { WelcomeSection } from "@/components/home/welcome-section";
import {Header} from "@/components/home/header";

export default function Home() {
  const [activeTab, setActiveTab] = useState("upload");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      <AnimatedBackground />

      <Header isVisible={isVisible} />
      {/* Main Content */}
      <div className="relative flex items-start justify-center p-4 pt-8">
        <div className="w-full max-w-2xl">
          {/* Welcome Section */}
          <WelcomeSection isVisible={isVisible} />
          {/*  backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 transition-all duration-1000 delay-600 */}
          <Tabs defaultValue={activeTab} value={activeTab} className="w-full">
            <AnimatedTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabsContent value="upload" className="mt-0">
              <FadeTab>
                <UploadTab />
              </FadeTab>
            </TabsContent>
            <TabsContent value="verify" className="mt-0">
              <FadeTab>
                <VerifyTab />
              </FadeTab>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <FloatingParticles />
    </div>
  );
}
