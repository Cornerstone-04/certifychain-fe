import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  label?: string;
  className?: string;
};

export function CopyButton({ value, label = "Copy CID", className }: Props) {
  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        copyWithFallback(value);
      }
      toast.success("Copied to clipboard");
    } catch {
      try {
        copyWithFallback(value);
        toast.success("Copied to clipboard");
      } catch {
        toast.error("Failed to copy");
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={copy}
      aria-label={label}
      className={cn("mt-2 flex items-center gap-2", className)}
    >
      <Copy size={14} />
      {label}
    </Button>
  );
}

function copyWithFallback(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) throw new Error("Clipboard copy was rejected.");
}
