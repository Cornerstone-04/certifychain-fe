import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type VerifyFormProps = {
  onSubmit: (cid: string) => void;
  isPending: boolean;
};

export default function VerifyForm({ onSubmit, isPending }: VerifyFormProps) {
  const [hash, setHash] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedHash = hash.trim();
    if (!trimmedHash) {
      toast.warning("Please enter a valid CID.");
      return;
    }
    onSubmit(trimmedHash);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <Input
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="Paste CID here"
        className="text-sm"
        autoFocus
      />
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Verifying..." : "Verify Certificate"}
      </Button>
    </form>
  );
}
