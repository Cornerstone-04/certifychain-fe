import { FormEvent, useState } from "react";
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

  const handleSubmit = async (event: FormEvent) => {
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
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <Input
        value={matric_no}
        onChange={(e) => setMatric(e.target.value)}
        placeholder="Enter student Matric-no."
        className="text-sm"
        autoFocus
        required
      />

      <Input
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="Paste CID here"
        className="text-sm"
        autoFocus
      />
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-500 hover:bg-blue-700"
      >
        {isPending || isFetchingMetadata
          ? "Verifying..."
          : "Verify Certificate"}
      </Button>
    </form>
  );
}
