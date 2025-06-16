import { FileText, Shield, Zap } from "lucide-react";
import FeatureCard from "./feature-card";
import InfoBanner from "./info-banner";

interface FeatureSectionProps {
  isVisible: boolean;
}

export default function FeatureSection({ isVisible }: FeatureSectionProps) {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 flex flex-col">
      <div
        className={`text-center mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Features
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
      </div>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Feature Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <FeatureCard
            icon={<FileText className="w-6 h-6" />}
            title="Multiple Formats"
            description="Supports PDF, PNG, JPG, and other common file types."
            gradient="from-purple-500 to-pink-500"
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Encrypted Storage"
            description="End-to-end encryption ensures your data is safe and private."
            gradient="from-blue-500 to-cyan-500"
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Instant Upload"
            description="Fast and reliable CID generation with seamless UX."
            gradient="from-green-500 to-emerald-500"
          />
        </div>

        {/* Info Banner */}
        <InfoBanner isVisible={isVisible} />
      </div>
    </section>
  );
}
