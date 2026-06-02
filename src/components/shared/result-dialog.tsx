import type { ReactNode } from "react";
import { CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ResultDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
};

export function ResultDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  maxWidth = "lg:max-w-3xl",
}: ResultDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`max-h-[90vh] w-full max-w-[95vw] overflow-hidden border-slate-400 p-0 sm:max-w-2xl ${maxWidth} dark:border-zinc-700`}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <div className="overflow-hidden bg-white dark:bg-[#111111]">
          <DialogHeader className="border-b border-slate-300 px-4 py-4 dark:border-zinc-700 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border border-blue-600 dark:border-blue-400">
                <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-400" />
              </div>
              <div>
                <DialogTitle className="text-base font-black uppercase tracking-[-0.03em] text-slate-950 dark:text-white sm:text-lg">
                  {title}
                </DialogTitle>
                <DialogDescription className="mt-1 text-xs">
                  {description}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="max-h-[calc(90vh-120px)] overflow-y-auto px-4 py-4 sm:px-6">
            <div className="border border-slate-300 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-[#0d0d0d]">
              {children}
            </div>
          </div>
          {footer && (
            <div className="border-t border-slate-300 bg-slate-50 px-4 py-4 dark:border-zinc-700 dark:bg-[#0d0d0d] sm:px-6">
              {footer}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
