import { FileText, Shield, Zap } from "lucide-react";
import FeatureCard from "./feature-card";

interface FeatureSectionProps {
  isVisible: boolean;
}

export default function FeatureSection({ isVisible }: FeatureSectionProps) {
  return (
    <section className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-700 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard
              icon={<FileText className="w-5 h-5" />}
              title="Multiple Formats"
              description="Support for PDF, PNG, JPG and other formats"
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={<Shield className="w-5 h-5" />}
              title="Encrypted Storage"
              description="End-to-end encryption for maximum security"
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={<Zap className="w-5 h-5" />}
              title="Instant Upload"
              description="Fast processing and immediate CID generation"
              gradient="from-green-500 to-emerald-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
