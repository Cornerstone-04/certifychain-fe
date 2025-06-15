import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const useVerifyCertificate = () =>
  useMutation({
    mutationFn: ({ hash, fileType }: { hash: string; fileType?: string }) =>
      api.post("/verify/getFile", { hash, fileType }),
  });
