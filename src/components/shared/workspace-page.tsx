import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type WorkflowStep = {
  code: string;
  title: string;
  detail: string;
};

type WorkspacePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
  steps: WorkflowStep[];
  meta: Array<{ label: string; value: string }>;
};

export function WorkspacePage({
  eyebrow,
  title,
  description,
  icon: Icon,
  children,
  steps,
  meta,
}: WorkspacePageProps) {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
        className="fintech-panel relative overflow-hidden p-5 sm:p-7"
      >
        <div className="absolute right-0 top-0 h-24 w-24 border-b border-l border-blue-600/40 bg-blue-500/5" />
        <div className="relative mb-8 grid gap-5 border-b border-slate-300 pb-7 dark:border-zinc-800 sm:grid-cols-[auto_1fr] sm:items-start">
          <motion.div
            whileHover={{ y: -3 }}
            className="flex h-14 w-14 items-center justify-center border border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-[#0b1220]"
          >
            <Icon className="h-6 w-6 text-blue-700 dark:text-blue-400" />
          </motion.div>
          <div>
            <p className="fintech-kicker mb-2">{eyebrow}</p>
            <h1 className="text-3xl font-black uppercase tracking-[-0.06em] text-slate-950 dark:text-white sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>
        <div className="relative">{children}</div>
      </motion.section>

      <motion.aside
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.12, duration: 0.42, ease: "easeOut" }}
        className="space-y-4"
      >
        <section className="fintech-panel p-5">
          <div className="mb-5 flex items-center justify-between">
            <p className="fintech-kicker">Protocol map</p>
            <ArrowUpRight className="h-4 w-4 text-blue-700 dark:text-blue-400" />
          </div>
          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.code}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.08 }}
                className="grid grid-cols-[2rem_1fr] gap-3 border-t border-slate-300 py-4 first:border-t-0 first:pt-0 dark:border-zinc-800"
              >
                <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-400">
                  {step.code}
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-950 dark:text-zinc-100">
                    {step.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-zinc-500">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-px border border-slate-300 bg-slate-300 dark:border-zinc-800 dark:bg-zinc-800">
          {meta.map((item) => (
            <div key={item.label} className="bg-white p-4 dark:bg-[#111]">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-zinc-500">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-black uppercase tracking-[-0.02em] text-slate-950 dark:text-zinc-100">
                {item.value}
              </p>
            </div>
          ))}
        </section>
      </motion.aside>
    </div>
  );
}
