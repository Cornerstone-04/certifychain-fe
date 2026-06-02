import { useState } from "react";
import { toast } from "sonner";
import { useUploadCertificate } from "./useUploadCertificate";
import { useUploadMetadata } from "./useUploadMetadata";
import { useCertificateStore } from "@/store/certificateStore";
import { useWeb3 } from "@/hooks/useWeb3";
import { FirebaseError } from "firebase/app";
import { getFirebaseErrorMessage } from "@/lib/firebaseErrors";
interface UploadFields {
  name: string;
  fullName: string;
  matricNo: string;
  file: File;
}

const BLOCKCHAIN_CONFIRMATION_TIMEOUT_MS = 60_000;
const WALLET_RESPONSE_TIMEOUT_MS = 60_000;

class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TimeoutError";
  }
}

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  message: string
) {
  let timeoutId: ReturnType<typeof setTimeout>;

  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(
          () => reject(new TimeoutError(message)),
          timeoutMs
        );
      }),
    ]);
  } finally {
    clearTimeout(timeoutId!);
  }
}

export type CertificateUploadStatus =
  | "idle"
  | "processing"
  | "complete"
  | "blockchain-failed"
  | "blockchain-unconfirmed"
  | "metadata-failed";

function getBlockchainErrorMessage(error: unknown) {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? error.code
      : null;

  if (code === 4001 || code === "ACTION_REJECTED") {
    return "The wallet transaction was cancelled.";
  }

  return "The wallet could not reach its blockchain RPC endpoint. Check your selected network or switch to a working RPC endpoint, then try again.";
}

export function useCertificateUpload() {
  const uploadFile = useUploadCertificate();
  const { mutateAsync: uploadMetadata, isPending: isUploadingMetadata } =
    useUploadMetadata();
  const { addUpload } = useCertificateStore();
  const { contract, account, connectWallet } = useWeb3(); // Get contract and account from Web3Context

  const [isUploading, setIsUploading] = useState(false);
  const [cid, setCid] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] =
    useState<CertificateUploadStatus>("idle");
  const [isStoringOnBlockchain, setIsStoringOnBlockchain] = useState(false); // New state for blockchain interaction

  const handleUpload = async ({
    name,
    fullName,
    matricNo,
    file,
  }: UploadFields): Promise<void> => {
    if (!contract || !account) {
      toast.error("Wallet not connected.", {
        description:
          "Please connect your MetaMask wallet to upload certificates.",
        action: {
          label: "Connect",
          onClick: () => connectWallet(),
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setCid(null);
    setUploadStatus("idle");
    let uploadToastId;
    let ipfsCid: string | null = null;
    let transactionSubmitted = false;
    let blockchainConfirmed = false;

    try {
      uploadToastId = toast.loading("Uploading certificate to IPFS...");
      const ipfsResult = await uploadFile.mutateAsync(formData);
      ipfsCid = ipfsResult?.data?.cid;

      if (!ipfsCid) throw new Error("IPFS CID not returned");

      setCid(ipfsCid);
      setUploadStatus("processing");
      toast.dismiss(uploadToastId);
      toast.loading("Storing CID on blockchain...", { id: "blockchainToast" });
      setIsStoringOnBlockchain(true);

      // Call smart contract to store CID
      const tx = await withTimeout(
        contract.storeCID(ipfsCid),
        WALLET_RESPONSE_TIMEOUT_MS,
        "Timed out while waiting for the wallet response."
      );
      transactionSubmitted = true;
      await withTimeout(
        tx.wait(),
        BLOCKCHAIN_CONFIRMATION_TIMEOUT_MS,
        "Timed out while waiting for blockchain confirmation."
      );
      blockchainConfirmed = true;

      toast.dismiss("blockchainToast");
      toast.success("CID stored on blockchain successfully!");

      // Save metadata to Firestore (existing logic)
      await uploadMetadata({
        hash: ipfsCid,
        name: fullName,
        matricNo,
        fileName: file.name,
        fileType: file.type,
      });
      setUploadStatus("complete");
      toast.success("Certificate uploaded and metadata saved.");

      // Save to local store (existing logic)
      addUpload({
        name,
        cid: ipfsCid,
        timestamp: new Date().toISOString(),
      });

    } catch (error: unknown) {
      toast.dismiss(uploadToastId);
      toast.dismiss("blockchainToast");

      if (ipfsCid && blockchainConfirmed) {
        setUploadStatus("metadata-failed");
        toast.error("Certificate metadata could not be saved.", {
          description:
            "The CID is on the blockchain. Copy it now and try saving the certificate details again later.",
        });
      } else if (ipfsCid && transactionSubmitted) {
        setUploadStatus("blockchain-unconfirmed");
        toast.error("Blockchain confirmation is unavailable.", {
          description:
            "The wallet submitted the transaction, but its RPC endpoint could not confirm the result. Copy the CID and check your wallet transaction history before retrying.",
        });
      } else if (ipfsCid) {
        setUploadStatus("blockchain-failed");
        toast.error("CID could not be saved on the blockchain.", {
          description: getBlockchainErrorMessage(error),
        });
      } else if (error instanceof FirebaseError) {
        toast.error(
          getFirebaseErrorMessage(
            error,
            "Unable to save the certificate details. Please try again."
          )
        );
      } else if (error instanceof Error) {
        toast.error(error.message || "Upload failed. Please try again.");
      } else if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: unknown }).data === "object" &&
        error.data !== null &&
        "message" in (error.data as Record<string, unknown>)
      ) {
        const message = (error.data as { message?: string }).message;
        toast.error(
          `Blockchain Transaction Failed: ${message ?? "Unknown error"}`
        );
      } else if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("An unknown error occurred during upload.");
      }

      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      setIsStoringOnBlockchain(false);
    }
  };

  return {
    handleUpload,
    isUploading, // Represents overall upload process (IPFS + blockchain)
    cid,
    uploadStatus,
    isUploadingMetadata, // Still relevant for Firebase metadata
    isStoringOnBlockchain, // New state for blockchain transaction specifically
  };
}
