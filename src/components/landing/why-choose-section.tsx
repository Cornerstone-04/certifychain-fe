import { Shield, Upload, CheckCircle } from "lucide-react";
import { useState, ReactNode } from "react";

interface WhyChooseSectionProps {
  isVisible: boolean;
}

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay: string;
}

function Feature({ icon, title, description, delay }: FeatureProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 animate-fade-in-up ${delay}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center items-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 text-blue-600 dark:text-blue-300 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
        <div
          className={`transition-all duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        >
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
        {description}
      </p>

      {/* Hover effect line */}
      <div className="mt-4 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
    </div>
  );
}

export default function WhyChooseSection({ isVisible }: WhyChooseSectionProps) {
  return (
    <section className="relative py-20 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Why Choose CertifyChain?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Feature
            icon={<Shield className="w-7 h-7" />}
            title="Secure & Immutable"
            description="Certificates are stored on a decentralized network for unmatched authenticity and security."
            delay="delay-300"
          />
          <Feature
            icon={<Upload className="w-7 h-7" />}
            title="Fast Upload"
            description="Upload and receive a unique CID instantly with our streamlined process."
            delay="delay-500"
          />
          <Feature
            icon={<CheckCircle className="w-7 h-7" />}
            title="Easy Verification"
            description="Verify any certificate using its unique CID in seconds with complete confidence."
            delay="delay-700"
          />
        </div>
      </div>
    </section>
  );
}
