import UploadForm from "@/components/upload/upload-form";
import UploadResult from "@/components/upload/upload-result";
import { useUploadCertificate } from "@/hooks/useUploadCertificate";
import { useCertificateStore } from "@/store/certificateStore";
import { toast } from "sonner";

export default function UploadTab() {
  const { mutate, data } = useUploadCertificate();
  const { addUpload } = useCertificateStore();

  const handleSubmit = async (
    name: string,
    base64: FormData,
  ): Promise<void> => {
    console.log(base64);
    return new Promise((resolve) => {
      console.log({ name, content: base64 });
      mutate(base64, {
        onSuccess: (data) => {
          if (data.data) {
            toast.success("Upload successful");
            addUpload({
              name,
              cid: data.data.cid,
              timestamp: new Date().toISOString(),
            });
            resolve(data.data);
          } else {
            toast.error(data?.data.message || "Upload failed.");
          }
          resolve();
        },
        onError: () => {
          toast.error("Something went wrong during upload.");
          resolve();
        },
      });
    });
  };

  return (
    <div className="flex justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Upload Certificate
        </h1>
        <UploadForm onSubmit={handleSubmit} />
        {data?.data.cid && <UploadResult cid={data.data.cid} />}
      </div>
    </div>
  );
}
