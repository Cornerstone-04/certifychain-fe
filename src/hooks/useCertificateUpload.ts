import { useState } from "react";
import { toast } from "sonner";
import { useUploadCertificate } from "./useUploadCertificate";
import { useUploadMetadata } from "./useUploadMetadata";
import { useCertificateStore } from "@/store/certificateStore";

interface UploadFields {
  name: string;
  fullName: string;
  matricNo: string;
  file: File;
}

export function useCertificateUpload() {
  const uploadFile = useUploadCertificate();
  const { mutate } = useUploadMetadata();
  const { addUpload } = useCertificateStore();

  const [isUploading, setIsUploading] = useState(false);
  const [cid, setCid] = useState<string | null>(null);

  const handleUpload = async ({
    name,
    fullName,
    matricNo,
    file,
  }: UploadFields): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);

    try {
      const result = await uploadFile.mutateAsync(formData);
      const cid = result?.data?.cid;

      mutate(
        {
          hash: cid,
          name: fullName,
          matricNo,
          fileName: file.name,
          fileType: file.type,
        },
        {
          onSuccess: () => {
            console.log("uploaded metadata to firebase");
          },
          onError: (err) => console.log(err),
        },
      );

      if (!cid) throw new Error("CID not returned");

      // Save to local store
      addUpload({
        name,
        cid,
        timestamp: new Date().toISOString(),
      });

      // Save metadata to Firestore
      //
      mutate({
        hash: cid,
        name: fullName,
        fileName: file.name,
        fileType: file.type,
        matricNo,
      });

      setCid(cid);
      toast.success("Upload successful");
    } catch (error: unknown) {
      if (error instanceof Error)
        toast.error(error.message || "Upload failed. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    handleUpload,
    isUploading,
    cid,
  };
}
