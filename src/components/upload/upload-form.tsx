import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { ThreeDotsLoader } from "../ui/three-dot-loader";
import { FileUp } from "lucide-react";

type UploadFormProps = {
  onSubmit: (fields: {
    name: string;
    fullName: string;
    matricNo: string;
    file: File;
  }) => Promise<void>;
};

export default function UploadForm({ onSubmit }: UploadFormProps) {
  const [fullName, setFullName] = useState("");
  const [matricNo, setMatricNo] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!certificateName || !file) {
      toast.warning("Please provide both certificate name and file!");
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        name: certificateName.trim(),
        fullName: fullName.trim(),
        matricNo: matricNo.trim(),
        file,
      });
    } catch (error) {
      toast.error("Upload could not be completed. Please try again.");
      console.error("Error uploading certificate:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2">
        <label className="fintech-label">Full Name</label>
        <Input
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="fintech-label">Matric Number</label>
        <Input
          placeholder="e.g., 20/52HL001"
          value={matricNo}
          onChange={(e) => setMatricNo(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="fintech-label">Certificate Name</label>
        <Input
          placeholder="e.g., Degree 2024"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
        />
      </div>
      </div>

      <div className="space-y-2">
        <label className="fintech-label">Select File</label>
        <label className="group flex cursor-pointer items-center gap-4 border border-dashed border-slate-400 bg-slate-50 p-4 transition-colors hover:border-blue-600 hover:bg-blue-50 dark:border-zinc-700 dark:bg-[#0d0d0d] dark:hover:border-blue-400 dark:hover:bg-[#0b1220]">
          <span className="flex h-10 w-10 items-center justify-center border border-blue-600 text-blue-700 dark:border-blue-400 dark:text-blue-400">
            <FileUp className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-xs font-bold uppercase tracking-[0.08em] text-slate-900 dark:text-zinc-100">
              {file ? file.name : "Choose certificate file"}
            </span>
            <span className="mt-1 block text-xs text-slate-500 dark:text-zinc-500">
              PDF, PNG, JPG, or another supported document
            </span>
          </span>
          <Input
            type="file"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 uppercase tracking-[0.12em] text-xs"
      >
        {loading ? <ThreeDotsLoader /> : "Upload Certificate"}
      </Button>
    </form>
  );
}
