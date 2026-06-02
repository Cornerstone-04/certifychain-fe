import { FlaskConical } from "lucide-react";
import { motion } from "motion/react";

export function TestnetNotice() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.35 }}
      className="mt-10 max-w-2xl border border-amber-500 bg-amber-50 p-4 dark:bg-[#141108]"
    >
      <div className="flex items-start gap-3">
        <FlaskConical className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400" />
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-amber-900 dark:text-amber-200">
            Proof of concept / Sepolia only
          </p>
          <p className="mt-1 text-sm leading-relaxed text-amber-800 dark:text-amber-300">
            CertifyChain currently runs strictly on the Sepolia Ethereum
            testnet. No mainnet transactions or real-world credentials should
            be used.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
