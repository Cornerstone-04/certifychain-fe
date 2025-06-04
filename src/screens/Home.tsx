import { Tabs, TabsContent } from "@/components/ui/tabs";
import AnimatedTabs from "@/components/ui/animated-tabs";
import UploadTab from "./UploadTab";
import VerifyTab from "./VerifyTab";
import { FadeTab } from "@/components/ui/fade-tab";
import { useState, useEffect } from "react";
import { Shield, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/shared/floating-particles";
import { ModeToggle } from "@/components/shared/mode-toggle";

export default function Home() {
  const [activeTab, setActiveTab] = useState("upload");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-bounce delay-500"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>

      {/* Header */}
      <header
        className={`relative w-full px-4 py-6 flex items-center justify-between max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <div className="flex items-center space-x-2 group">
          <div className="relative">
            <Shield className="w-8 h-8 text-blue-500 transition-transform duration-300 group-hover:rotate-12" />
            <div className="absolute inset-0 w-8 h-8 bg-blue-400/20 rounded-full blur-md animate-ping"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            CertifyChain
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button
            variant="outline"
            size="icon"
            className="border-red-300/50 hover:border-red-400/50 hover:bg-red-50/50 dark:hover:bg-red-950/50 transition-all duration-300 backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 text-red-600 hover:text-red-700"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative flex items-start justify-center p-4 pt-8">
        <div className="w-full max-w-4xl">
          {/* Welcome Section */}
          <div
            className={`text-center mb-12 transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Welcome to your Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Manage your certificates with blockchain-powered security and
              verification
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-4"></div>
          </div>

          {/*/

          {/* Main Tab Container */}
          <div
            className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 transition-all duration-1000 delay-600 ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-10 opacity-0 scale-95"
            }`}
          >
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
      </div>

      {/* Floating particles */}
      <FloatingParticles />
    </div>
  );
}
