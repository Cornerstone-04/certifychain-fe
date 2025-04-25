import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { ThreeDotsLoader } from "../ui/three-dot-loader";

type Props = {
  onSubmit: (name: string, base64: string) => void;
  isPending: boolean;
};

export default function UploadForm({ onSubmit, isPending }: Props) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadstart = () => toast.loading("Converting file to base64...");
      reader.onloadend = () => toast.success("File converted successfully");

      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !file) {
      toast.warning("Please provide both name and file");
      return;
    }

    try {
      const base64 = await toBase64(file);
      toast.loading("Uploading certificate...");
      onSubmit(name.trim(), base64);
    } catch {
      toast.error("Failed to convert file to base64");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="space-y-2">
        <label className="text-sm font-medium">Certificate Name</label>
        <Input
          placeholder="e.g., Degree 2024"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Select File</label>
        <Input type="file" onChange={handleFileChange} />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? <ThreeDotsLoader/> : "Upload Certificate"}
      </Button>
    </form>
  );
}
