import { CopyButton } from "@/components/ui/copy-button";

type Props = {
  file: string; // base64 with data URI prefix
};

export default function VerifiedResult({ file }: Props) {
  const mimeMatch = file.match(/^data:(.*?);base64,/);
  const mime = mimeMatch?.[1] || "application/octet-stream";
  const isImage = mime.startsWith("image/");
  const isPDF = mime === "application/pdf";
  const isText = mime.startsWith("text/");

  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-400 rounded shadow-sm text-sm animate-in fade-in zoom-in-75 duration-300 space-y-3">
      <p className="font-medium">✅ Certificate Verified</p>

      {isImage && (
        <img
          src={file}
          alt="Uploaded file preview"
          className="w-full rounded border"
        />
      )}

      {isPDF && (
        <iframe
          src={file}
          title="PDF Preview"
          className="w-full h-96 border rounded"
        />
      )}

      {isText && (
        <pre className="bg-muted p-3 rounded text-xs whitespace-pre-wrap break-words">
          {atob(file.split(",")[1])}
        </pre>
      )}

      {!isImage && !isPDF && !isText && (
        <div className="text-xs text-muted-foreground">
          Preview not supported for this file type.
        </div>
      )}

      <CopyButton value={file} />

      <a
        href={file}
        download={`certificate.${mime.split("/")[1] || "bin"}`}
        className="text-blue-600 underline text-xs inline-block"
      >
        Download File
      </a>
    </div>
  );
}
