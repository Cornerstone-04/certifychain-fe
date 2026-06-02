import { CopyButton } from "@/components/ui/copy-button";
import { CertificateUploadStatus } from "@/hooks/useCertificateUpload";

interface UploadResultProps {
  cid: string;
  status: CertificateUploadStatus;
}

export default function UploadResult({ cid, status }: UploadResultProps) {
  const message =
    status === "complete"
      ? "Certificate uploaded successfully. CID:"
      : status === "blockchain-unconfirmed"
        ? "Your wallet submitted the transaction, but confirmation is unavailable. Copy this CID and check your wallet transaction history before retrying:"
        : status === "metadata-failed"
          ? "The CID is on the blockchain, but the certificate details could not be saved. Copy this CID:"
      : status === "blockchain-failed"
        ? "Your file was uploaded to IPFS, but the blockchain save failed. Copy this CID before retrying:"
        : "Your file was uploaded to IPFS. Saving the CID on the blockchain...";

  return (
    <div className="mt-6 border border-blue-500 bg-blue-50 p-4 text-sm text-blue-950 dark:border-blue-700 dark:bg-[#0b1220] dark:text-blue-100 animate-in fade-in zoom-in-75 duration-300">
      {message}
      <div className="mt-1 font-mono text-xs break-all">
        <code>{cid}</code>
      </div>
      <CopyButton value={cid} />
    </div>
  );
}
