import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  const navigate = useNavigate();

  return (
    <section className="relative text-center py-20 px-4 h-[90vh] flex flex-col justify-center">
      <div
        className={`transition-all duration-1000 delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="inline-block animate-fade-in-up">
            Blockchain-Powered
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent inline-block animate-fade-in-up delay-200">
            Certificate Verification
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-400">
          Upload, verify, and manage certificates with tamper-proof blockchain
          security that ensures authenticity and trust.
        </p>
        <div className="flex justify-center gap-4 flex-wrap animate-fade-in-up delay-600">
          <Button
            onClick={() => navigate("/register")}
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl group rounded-xl"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      
    </section>
  );
}
