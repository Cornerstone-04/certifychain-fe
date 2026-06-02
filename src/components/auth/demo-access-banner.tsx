import { CopyButton } from "@/components/ui/copy-button";
import { KeyRound } from "lucide-react";

const DEMO_EMAIL = "admin@university.com";
const DEMO_PASSWORD = "Un1_test";

export function DemoAccessBanner() {
  return (
    <section className="mb-7 border border-blue-500 bg-blue-50 p-4 dark:bg-[#0b1220]">
      <div className="mb-4 flex items-start gap-3">
        <KeyRound className="mt-0.5 h-5 w-5 shrink-0 text-blue-700 dark:text-blue-400" />
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-blue-900 dark:text-blue-200">
            Demo institution access
          </p>
          <p className="mt-1 text-xs leading-relaxed text-blue-800 dark:text-blue-300">
            Use this shared admin account to explore the proof-of-concept
            upload workflow.
          </p>
        </div>
      </div>

      <div className="space-y-3 border-t border-blue-300 pt-4 dark:border-blue-800">
        <CredentialRow label="Email" displayValue={DEMO_EMAIL} value={DEMO_EMAIL} />
        <CredentialRow
          label="Password"
          displayValue="••••••••"
          value={DEMO_PASSWORD}
        />
      </div>
    </section>
  );
}

function CredentialRow({
  label,
  displayValue,
  value,
}: {
  label: string;
  displayValue: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3">
      <div>
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-blue-700 dark:text-blue-400">
          {label}
        </p>
        <p className="mt-1 break-all font-mono text-xs font-semibold text-blue-950 dark:text-blue-100">
          {displayValue}
        </p>
      </div>
      <CopyButton
        value={value}
        label={`Copy ${label.toLowerCase()}`}
        className="mt-0 h-8 border-blue-400 bg-transparent px-2 text-[10px] uppercase tracking-[0.08em] text-blue-800 shadow-none dark:text-blue-300"
      />
    </div>
  );
}
