// src/screens/VerifyPage.tsx
import { useVerifyCertificate } from "@/hooks/useVerifyCertificate";
import VerifyForm from "@/components/verify/verify-form";
import { toast } from "sonner";
import { useCertificateStore } from "@/store/certificateStore";
import { useState, useEffect } from "react";
import { CheckCircle, Search } from "lucide-react";
import { useGetCertificateMetadata } from "@/hooks/useGetMetadata";
import { LayoutPage } from "@/layouts/layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import VerifiedResult from "@/components/verify/verified-result";
import { useWeb3 } from "@/context/web3context"; // Import useWeb3
import { ethers } from "ethers";

export default function VerifyPage() {
  const { mutate, data, isPending } = useVerifyCertificate();
  const { addVerification } = useCertificateStore();
  const [isVisible, setIsVisible] = useState(false);
  const [currentCid, setCurrentCid] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { data: metadata, isFetching: isFetchingMetadata } =
    useGetCertificateMetadata(currentCid);
  const { contract } = useWeb3(); // Get contract from Web3Context

  const [isBlockchainVerified, setIsBlockchainVerified] = useState<
    boolean | null
  >(null);
  const [isCheckingBlockchain, setIsCheckingBlockchain] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
          { id: "blockchainCheckToast" },
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
        "Wallet not connected. Cannot perform on-chain verification.",
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
      },
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
    <LayoutPage className="flex flex-col md:flex-row gap-4">
      <div
        className={`w-full max-w-2xl mx-auto transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105">
              <Search className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Certificate Verification
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Enter the CID to verify certificate authenticity
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="space-y-6">
            <VerifyForm onSubmit={handleSubmit} isPending={overallPending} />
          </div>

          {overallPending && (
            <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200 text-sm">
                    {isCheckingBlockchain
                      ? "Checking Blockchain Records..."
                      : isFetchingMetadata
                        ? "Fetching Certificate Metadata..."
                        : "Verifying Certificate..."}
                  </p>
                  {isCheckingBlockchain && (
                    <p className="text-blue-600 dark:text-blue-300 text-xs">
                      Connecting to Ethereum network
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Verification Results Dialog */}
      <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/40 dark:to-emerald-950/40 backdrop-blur-sm border-0 rounded-2xl overflow-hidden">
            {/* Header */}
            <DialogHeader className="px-4 sm:px-6 py-4 border-b border-green-200/30 dark:border-green-700/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <DialogTitle className="text-base sm:text-lg font-bold text-green-800 dark:text-green-200">
                      Verification Successful
                    </DialogTitle>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Certificate is authentic and verified
                    </p>
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* Scrollable Content */}
            <div className="px-4 sm:px-6 py-4 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-green-200/30 dark:border-green-700/30">
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
                      Verification failed. Could not confirm CID on blockchain
                      or fetch file content.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Please ensure your wallet is connected and the CID is
                      valid.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-4 border-t border-green-200/30 dark:border-green-700/30 bg-white/40 dark:bg-gray-800/40">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                {isBlockchainVerified !== null && (
                  <div className="flex items-center space-x-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full animate-pulse ${
                        isBlockchainVerified ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span
                      className={
                        isBlockchainVerified
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {isBlockchainVerified
                        ? "Verified on blockchain"
                        : "Not found on blockchain"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </LayoutPage>
  );
}
