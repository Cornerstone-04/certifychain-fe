import { useVerifyCertificate } from "@/hooks/useVerifyCertificate";
import VerifyForm from "@/components/verify/verify-form";
import { toast } from "sonner";
import { useCertificateStore } from "@/store/certificateStore";
import { useState } from "react";
import { Search } from "lucide-react";
import { useGetCertificateMetadata } from "@/hooks/useGetMetadata";
import { LayoutPage } from "@/layouts/layout";
import VerifiedResult from "@/components/verify/verified-result";
import { useWeb3 } from "@/hooks/useWeb3"; // Import useWeb3
import { ethers } from "ethers";
import { ProcessStatus } from "@/components/shared/process-status";
import { ResultDialog } from "@/components/shared/result-dialog";
import { WorkspacePage } from "@/components/shared/workspace-page";

export default function VerifyPage() {
  const { mutate, data, isPending } = useVerifyCertificate();
  const { addVerification } = useCertificateStore();
  const [currentCid, setCurrentCid] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { data: metadata, isFetching: isFetchingMetadata } =
    useGetCertificateMetadata(currentCid);
  const { contract } = useWeb3(); // Get contract from Web3Context

  const [isBlockchainVerified, setIsBlockchainVerified] = useState<
    boolean | null
  >(null);
  const [isCheckingBlockchain, setIsCheckingBlockchain] = useState(false);

  const handleSubmit = async (cid: string) => {
    setCurrentCid(cid);
    setIsBlockchainVerified(null); // Reset blockchain verification status

    // Step 1: Fetch metadata from Firebase (already handled by useGetCertificateMetadata)
    // The metadata will be available via the `metadata` variable after the query runs.

    // Step 2: Check CID ownership on the blockchain
    if (contract) {
      setIsCheckingBlockchain(true);
      let blockchainCheckToastId;
      try {
        blockchainCheckToastId = toast.loading(
          "Checking blockchain for CID...",
          { id: "blockchainCheckToast" }
        );
        const ownerAddress = await contract.getOwnerOfCID(cid);
        if (ownerAddress && ownerAddress !== ethers.ZeroAddress) {
          setIsBlockchainVerified(true);
          toast.dismiss(blockchainCheckToastId);
          toast.success("CID found on blockchain!");
        } else {
          setIsBlockchainVerified(false);
          toast.dismiss(blockchainCheckToastId);
          toast.error("CID not found on blockchain or is not owned.");
          // Optionally, stop verification if not found on blockchain
          return;
        }
      } catch (error) {
        setIsBlockchainVerified(false);
        toast.dismiss(blockchainCheckToastId);
        toast.error("Error checking blockchain for CID.");
        console.error("Blockchain check error:", error);
        // Stop verification on blockchain error
        return;
      } finally {
        setIsCheckingBlockchain(false);
      }
    } else {
      toast.warning(
        "Wallet not connected. Cannot perform on-chain verification."
      );
      setIsBlockchainVerified(false); // Assume not verified if wallet not connected
      // Optionally, return here if on-chain verification is mandatory
      // return;
    }

    // After blockchain check, proceed with file fetching if blockchain check passes or is not mandatory
    mutate(
      { hash: cid, fileType: metadata?.fileType },
      {
        onSuccess: () => {
          toast.success("File content fetched successfully.");
          addVerification({
            name: metadata?.name || "Verified Certificate", // Use metadata name if available
            cid,
            timestamp: new Date().toISOString(),
          });
          setShowDialog(true);
        },
        onError: (error) => {
          toast.error("File content fetching failed.");
          console.error("File fetch error:", error);
        },
      }
    );
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setCurrentCid(null);
    setIsBlockchainVerified(null); // Reset blockchain status on dialog close
  };

  const overallPending =
    isPending || isFetchingMetadata || isCheckingBlockchain;

  return (
    <LayoutPage>
      <WorkspacePage
        eyebrow="Public verification / open access"
        title="Verify Certificate"
        description="Cross-check a student's record against its indexed metadata, IPFS document, and registered blockchain reference."
        icon={Search}
        steps={[
          { code: "01", title: "Match", detail: "Compare the student reference with indexed metadata." },
          { code: "02", title: "Inspect", detail: "Locate the CID on the blockchain." },
          { code: "03", title: "Retrieve", detail: "Fetch the original certificate from IPFS." },
        ]}
        meta={[
          { label: "Mode", value: "Public" },
          { label: "Lookup", value: "CID" },
          { label: "Ledger", value: "Sepolia" },
          { label: "Result", value: "Auditable" },
        ]}
      >
        <VerifyForm onSubmit={handleSubmit} isPending={overallPending} />
        {overallPending && (
          <ProcessStatus
            title={
              isCheckingBlockchain
                ? "Checking blockchain records"
                : isFetchingMetadata
                  ? "Fetching certificate metadata"
                  : "Verifying certificate"
            }
            detail={
              isCheckingBlockchain
                ? "Connecting to the configured Ethereum network."
                : "Cross-checking the submitted certificate reference."
            }
          />
        )}
      </WorkspacePage>

      <ResultDialog
        open={showDialog}
        onOpenChange={(open) => {
          if (!open) handleCloseDialog();
        }}
        title="Verification successful"
        description="Certificate is authentic and verified."
        maxWidth="lg:max-w-4xl"
        footer={
          isBlockchainVerified !== null && (
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`h-2 w-2 animate-pulse ${
                  isBlockchainVerified ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span
                className={
                  isBlockchainVerified
                    ? "text-green-700 dark:text-green-400"
                    : "text-red-700 dark:text-red-400"
                }
              >
                {isBlockchainVerified
                  ? "Verified on blockchain"
                  : "Not found on blockchain"}
              </span>
            </div>
          )
        }
      >
        {isBlockchainVerified && data?.data ? (
          <VerifiedResult
            name={metadata?.name}
            matricNo={metadata?.matricNo}
            file={data?.data as Blob}
            filename={metadata?.fileName}
          />
        ) : (
          <div className="text-center text-red-600 dark:text-red-400">
            <p>
              Verification failed. Could not confirm CID on blockchain or fetch
              file content.
            </p>
            <p className="text-xs text-muted-foreground">
              Please ensure your wallet is connected and the CID is valid.
            </p>
          </div>
        )}
      </ResultDialog>
    </LayoutPage>
  );
}
