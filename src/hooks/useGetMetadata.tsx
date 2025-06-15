// src/hooks/useGetCertificateMetadata.ts
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface CertificateMetadata {
  cid: string;
  name: string;
  fileName: string;
  fileType: string;
  matricNo: string;
  uploadedAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export const useGetCertificateMetadata = (hash: string | null) => {
  return useQuery<CertificateMetadata | null, Error>({
    queryKey: ["certificateMetadata", hash],
    queryFn: async () => {
      if (!hash) {
        return null;
      }
      const docRef = doc(db, "certificates", hash);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as CertificateMetadata;
      } else {
        return null;
      }
    },
    enabled: !!hash, // Only run the query if hash is provided
  });
};
