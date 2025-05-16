import { Tabs, TabsContent } from "@/components/ui/tabs";
import AnimatedTabs from "@/components/ui/animated-tabs";
import UploadTab from "./UploadTab";
import VerifyTab from "./VerifyTab";
import { FadeTab } from "@/components/ui/fade-tab";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="min-h-screen flex items-start justify-center bg-muted/30 p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <Tabs defaultValue={activeTab} value={activeTab} className="w-full">
          <AnimatedTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <TabsContent value="upload">
            <FadeTab>
              <UploadTab />
            </FadeTab>
          </TabsContent>

          <TabsContent value="verify">
            <FadeTab>
              <VerifyTab />
            </FadeTab>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
