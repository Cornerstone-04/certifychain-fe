import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { ThreeDotsLoader } from "../ui/three-dot-loader";

type UploadFormProps = {
  onSubmit: (fields: {
    name: string;
    fullName: string;
    matricNo: string;
    file: File;
  }) => Promise<void>;
  isLoading?: boolean;
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
      console.log("converted to base64");

      const uploadToastId = toast.loading("Uploading certificate.");
      await onSubmit({
        name: certificateName.trim(),
        fullName: fullName.trim(),
        matricNo: matricNo.trim(),
        file,
      });

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
        <label className="text-sm font-medium">Full Name</label>
        <Input
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Matric Number</label>
        <Input
          placeholder="e.g., 20/52HL001"
          value={matricNo}
          onChange={(e) => setMatricNo(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Certificate Name</label>
        <Input
          placeholder="e.g., Degree 2024"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Select File</label>
        <Input
          type="file"
          className="cursor-pointer"
          onChange={handleFileChange}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-700"
      >
        {loading ? <ThreeDotsLoader /> : "Upload Certificate"}
      </Button>
    </form>
  );
}
