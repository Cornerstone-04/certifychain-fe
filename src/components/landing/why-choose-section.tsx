import { Shield, Upload, CheckCircle } from "lucide-react";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface WhyChooseSectionProps {
  isVisible: boolean;
}

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay: number;
}

function Feature({ icon, title, description, delay }: FeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.25, delay }}
      className="fintech-panel group p-7 transition-colors hover:border-blue-600 dark:hover:border-blue-400"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center border border-blue-600 text-blue-700 dark:border-blue-400 dark:text-blue-400">
        <div className="transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
      <h3 className="mb-3 text-lg font-black uppercase tracking-[-0.035em] text-slate-950 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
        {description}
      </p>

      {/* Hover effect line */}
      <div className="mt-6 h-px bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </motion.div>
  );
}

export default function WhyChooseSection({ isVisible }: WhyChooseSectionProps) {
  return (
    <section className="relative border-b border-slate-300 bg-[#f5f7fa] px-4 py-20 dark:border-zinc-800 dark:bg-[#090909]">
      <div className="max-w-6xl mx-auto">
        <div
          className={`mb-12 transition-all duration-700 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="fintech-kicker mb-3">Operating model</p>
          <h2 className="text-3xl font-black uppercase tracking-[-0.055em] text-slate-950 dark:text-white md:text-5xl">
            A cleaner trust layer.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Feature
            icon={<Shield className="w-7 h-7" />}
            title="Secure & Immutable"
            description="Certificates are stored on a decentralized network for unmatched authenticity and security."
            delay={0.05}
          />
          <Feature
            icon={<Upload className="w-7 h-7" />}
            title="Fast Upload"
            description="Upload and receive a unique CID instantly with our streamlined process."
            delay={0.1}
          />
          <Feature
            icon={<CheckCircle className="w-7 h-7" />}
            title="Easy Verification"
            description="Verify any certificate using its unique CID in seconds with complete confidence."
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}
