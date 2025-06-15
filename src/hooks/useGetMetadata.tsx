import { db } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";

export default function useGetMetadata(docHash: string) {
  return useQuery({
    queryKey: [`getMeta${docHash}`],
    queryFn: () => {
      const docRef = doc(db, `certificates/${docHash}`);
      return getDoc(docRef);
    },
    enabled: !!docHash,
  });
}
