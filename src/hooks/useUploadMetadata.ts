import { useMutation } from "@tanstack/react-query";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface UploadMetadata {
  hash: string;
  name: string;
  fileName: string;
  fileType: string;
  matricNo: string;
}

export const useUploadMetadata = () => {
  return useMutation({
    mutationFn: async ({
      hash,
      name,
      fileName,
      fileType,
      matricNo,
    }: UploadMetadata) => {
      const certificateRef = doc(db, "certificates", hash);
      await setDoc(certificateRef, {
        cid: hash,
        name: name,
        fileName: fileName,
        fileType: fileType,
        matricNo: matricNo,
        uploadedAt: Timestamp,
      });
      return { success: true };
    },
    onSuccess: () => {
      console.log("Certificate metadata saved successfully!");
    },
    onError: (error) => {
      console.error("Failed to save certificate metadata:", error);
    },
  });
};
