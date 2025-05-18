import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { ThreeDotsLoader } from "../ui/three-dot-loader";

type UploadFormProps = {
  onSubmit: (name: string, base64: string) => Promise<void>; 
};

export default function UploadForm({ onSubmit }: UploadFormProps) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const toBase64 = (
    file: File
  ): Promise<{ base64: string; mimeType: string }> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const [prefix, base64] = result.split(",");
        const mimeMatch = prefix.match(/^data:(.*?);base64$/);
        const mimeType = mimeMatch?.[1] || "application/octet-stream";
        resolve({ base64, mimeType });
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !file) {
      toast.warning("Please provide both name and file!");
      return;
    }

    setLoading(true);
    const convertingToastId = toast.loading("Converting file to base64.");

    try {
      const { base64 } = await toBase64(file);
      toast.dismiss(convertingToastId);

      const uploadToastId = toast.loading("Uploading certificate.");
      await onSubmit(name.trim(), base64);
      toast.dismiss(uploadToastId);
      toast.success("Certificate uploaded successfully.");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to upload certificate.");
      console.error("Error uploading certificate:", error);
    } finally {
      setLoading(false);
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

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <ThreeDotsLoader /> : "Upload Certificate"}
      </Button>
    </form>
  );
}
