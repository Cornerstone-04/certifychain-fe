import { useState, useEffect } from "react";
import {
  HeroSection,
  FeatureSection,
  WhyChooseSection,
  Footer,
} from "@/components/landing";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { Navbar } from "@/components/shared/navbar";

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fintech-shell overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      <HeroSection isVisible={isVisible} />
      <FeatureSection isVisible={isVisible} />
      <WhyChooseSection isVisible={isVisible} />
      <Footer isVisible={isVisible} />
    </div>
  );
}
