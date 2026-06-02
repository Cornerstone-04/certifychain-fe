import { FileText, Shield, Zap } from "lucide-react";
import FeatureCard from "./feature-card";
import InfoBanner from "./info-banner";

interface FeatureSectionProps {
  isVisible: boolean;
}

export default function FeatureSection({ isVisible }: FeatureSectionProps) {
  return (
    <section className="relative border-b border-slate-300 bg-white px-4 py-20 dark:border-zinc-800 dark:bg-[#0d0d0d] flex flex-col">
      <div
        className={`mx-auto mb-12 w-full max-w-6xl transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <p className="fintech-kicker mb-3">Core infrastructure</p>
        <h2 className="text-3xl font-black uppercase tracking-[-0.055em] text-slate-950 dark:text-white md:text-5xl">
          Built for verifiable records.
        </h2>
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
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Encrypted Storage"
            description="End-to-end encryption ensures your data is safe and private."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Instant Upload"
            description="Fast and reliable CID generation with seamless UX."
          />
        </div>

        {/* Info Banner */}
        <InfoBanner isVisible={isVisible} />
      </div>
    </section>
  );
}
