import UploadForm from "@/components/upload/upload-form";
import UploadResult from "@/components/upload/upload-result";
import { useCertificateUpload } from "@/hooks/useCertificateUpload";
import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { LayoutPage } from "@/layouts/layout";
import { ProcessStatus } from "@/components/shared/process-status";
import { ResultDialog } from "@/components/shared/result-dialog";
import { WorkspacePage } from "@/components/shared/workspace-page";

export default function UploadPage() {
  const { handleUpload, isUploading, cid, uploadStatus } =
    useCertificateUpload();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (cid) setShowDialog(true);
  }, [cid]);

  return (
    <LayoutPage>
      <WorkspacePage
        eyebrow="Issuer workspace / admin"
        title="Upload Certificate"
        description="Create a tamper-evident academic record. The file is pinned to IPFS, referenced on-chain, and indexed for later verification."
        icon={Upload}
        steps={[
          { code: "01", title: "Describe", detail: "Attach student and certificate metadata." },
          { code: "02", title: "Pin", detail: "Upload the source document to IPFS." },
          { code: "03", title: "Register", detail: "Save the generated CID on-chain." },
        ]}
        meta={[
          { label: "Network", value: "Sepolia" },
          { label: "Storage", value: "IPFS" },
          { label: "Access", value: "Admin" },
          { label: "Proof", value: "On-chain" },
        ]}
      >
        <UploadForm onSubmit={handleUpload} />
        {isUploading && (
          <ProcessStatus
            title="Registering certificate"
            detail="Uploading the document and saving its CID on the blockchain."
          />
        )}
      </WorkspacePage>

      <ResultDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        title={
          uploadStatus === "complete"
            ? "Upload successful"
            : uploadStatus === "blockchain-unconfirmed"
              ? "Blockchain confirmation unavailable"
              : uploadStatus === "metadata-failed"
                ? "CID saved - metadata save failed"
                : uploadStatus === "blockchain-failed"
                  ? "CID generated - blockchain save failed"
                  : "CID generated"
        }
        description="Certificate upload result and generated CID."
      >
        <UploadResult cid={cid!} status={uploadStatus} />
      </ResultDialog>
    </LayoutPage>
  );
}
