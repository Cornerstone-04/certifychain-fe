import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const useUploadCertificate = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      console.log("triggering upload");
      const res = api.post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
  });
};
