import { SyntheticEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useGetCertificateMetadata } from "@/hooks/useGetMetadata";

type VerifyFormProps = {
  onSubmit: (cid: string) => void;
  isPending: boolean;
};

export default function VerifyForm({ onSubmit, isPending }: VerifyFormProps) {
  const [hash, setHash] = useState("");
  const [matric_no, setMatric] = useState("");
  const {
    refetch,
    data,
    isFetching: isFetchingMetadata,
  } = useGetCertificateMetadata(hash);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const trimmedHash = hash.trim();
    if (!trimmedHash) {
      toast.warning("Please enter a valid CID.");
      return;
    }
    await refetch({
      throwOnError: true,
    });

    if (data?.matricNo !== matric_no)
      toast.error("Invalid inputs", { description: "Matric number mismatch" });
    else onSubmit(trimmedHash);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div className="space-y-2">
        <label className="fintech-label">Student reference</label>
        <Input
          value={matric_no}
          onChange={(e) => setMatric(e.target.value)}
          placeholder="Enter student matric number"
          className="text-sm"
          autoFocus
          required
        />
      </div>
      <div className="space-y-2">
        <label className="fintech-label">Content identifier</label>
        <Input
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder="Paste IPFS CID"
          className="font-mono text-sm"
        />
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-11 uppercase tracking-[0.12em] text-xs"
      >
        {isPending || isFetchingMetadata
          ? "Verifying..."
          : "Verify Certificate"}
      </Button>
    </form>
  );
}
