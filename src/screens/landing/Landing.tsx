import { useState, useEffect } from "react";
import { FloatingParticles } from "@/components/shared/floating-particles";
import {
  Header,
  HeroSection,
  FeatureSection,
  WhyChooseSection,
  Footer,
} from "@/components/landing";

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 text-gray-800 dark:text-white overflow-hidden">
      <Header isVisible={isVisible} />
      <HeroSection isVisible={isVisible} />
      <FloatingParticles />
      <FeatureSection isVisible={isVisible} />
      <WhyChooseSection isVisible={isVisible} />
      <Footer isVisible={isVisible} />
    </div>
  );
}
