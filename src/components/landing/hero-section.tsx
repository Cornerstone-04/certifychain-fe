import { ArrowRight, Upload } from "lucide-react"; // Import Upload icon
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { motion } from "motion/react";

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-[78vh] flex-col justify-center border-b border-slate-300 px-4 py-20 dark:border-zinc-800">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isVisible ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
        className="mx-auto w-full max-w-6xl"
      >
        <p className="fintech-kicker mb-5">
          Institutional verification rail / v1.0
        </p>
        <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.95] tracking-[-0.075em] text-slate-950 dark:text-white md:text-8xl">
          Certificate integrity,
          <span className="block text-blue-700 dark:text-blue-400">
            without ambiguity.
          </span>
        </h1>
        <p className="mb-10 mt-8 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-zinc-400 md:text-lg">
          Issue and verify academic credentials using IPFS-backed records and
          auditable blockchain references.
        </p>
        <div className="flex flex-wrap gap-3">
          {/* Verify Certificate Button */}
          <Button
            onClick={() => navigate("/verify")}
            className="h-12 px-6 uppercase tracking-[0.12em] text-xs"
          >
            Verify Certificate
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>

          <Button
            onClick={() => navigate("/admin/upload")}
            variant="outline"
            className="h-12 px-6 uppercase tracking-[0.12em] text-xs"
          >
            Upload Certificate
            <Upload className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-y-0.5" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
