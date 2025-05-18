import { CopyButton } from "@/components/ui/copy-button";
import { FaCircleCheck, FaDownload } from "react-icons/fa6";

export default function VerifiedResult({ file }: { file: string }) {
  const mimeMatch = file.match(/^data:(.*?);base64,/);
  const mime = mimeMatch?.[1] || "application/octet-stream";

  function downloadFile() {
    const link = document.createElement("a");
    link.href = file;
    link.download = `certificate.${mime.split("/")[1] || "bin"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-400 rounded shadow-sm text-sm animate-in fade-in zoom-in-75 duration-300 space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-medium flex gap-1 items-center text-green-800">
          <FaCircleCheck /> Certificate Verified
        </p>

        <CopyButton value={file} />
      </div>

      <button
        onClick={downloadFile}
        className="text-blue-600 font-semibold cursor-pointer text-xs flex gap-1 items-center hover:scale-105 transition ease-in-out"
      >
        <FaDownload /> Download File
      </button>
    </div>
  );
}
