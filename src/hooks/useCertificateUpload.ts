// src/hooks/useCertificateUpload.ts
import { useState } from "react";
import { toast } from "sonner";
import { useUploadCertificate } from "./useUploadCertificate";
import { useUploadMetadata } from "./useUploadMetadata";
import { useCertificateStore } from "@/store/certificateStore";
import { useWeb3 } from "@/context/web3context"; // Import useWeb3

interface UploadFields {
  name: string;
  fullName: string;
  matricNo: string;
  file: File;
}

export function useCertificateUpload() {
  const uploadFile = useUploadCertificate();
  const { mutate: uploadMetadata, isPending: isUploadingMetadata } =
    useUploadMetadata();
  const { addUpload } = useCertificateStore();
  const { contract, account, connectWallet } = useWeb3(); // Get contract and account from Web3Context

  const [isUploading, setIsUploading] = useState(false);
  const [cid, setCid] = useState<string | null>(null);
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
    let uploadToastId;

    try {
      uploadToastId = toast.loading("Uploading certificate to IPFS...");
      const ipfsResult = await uploadFile.mutateAsync(formData);
      const ipfsCid = ipfsResult?.data?.cid;

      if (!ipfsCid) throw new Error("IPFS CID not returned");

      toast.dismiss(uploadToastId);
      toast.loading("Storing CID on blockchain...", { id: "blockchainToast" });
      setIsStoringOnBlockchain(true);

      // Call smart contract to store CID
      const tx = await contract.storeCID(ipfsCid);
      await tx.wait(); // Wait for the transaction to be mined

      toast.dismiss("blockchainToast");
      toast.success("CID stored on blockchain successfully!");

      // Save metadata to Firestore (existing logic)
      uploadMetadata(
        {
          hash: ipfsCid,
          name: fullName,
          matricNo,
          fileName: file.name,
          fileType: file.type,
        },
        {
          onSuccess: () => {
            console.log("Uploaded metadata to Firebase");
            toast.success("Certificate uploaded and metadata saved.");
          },
          onError: (err) => {
            console.error("Error uploading metadata to Firebase:", err);
            toast.error("Failed to save certificate metadata.", {
              description:
                "Certificate is on IPFS and blockchain, but metadata saving to Firebase failed.",
            });
          },
        },
      );

      // Save to local store (existing logic)
      addUpload({
        name,
        cid: ipfsCid,
        timestamp: new Date().toISOString(),
      });

      setCid(ipfsCid);
    } catch (error: unknown) {
      toast.dismiss(uploadToastId);
      toast.dismiss("blockchainToast"); // Dismiss if blockchain interaction started but failed
      if (error instanceof Error) {
        toast.error(error.message || "Upload failed. Please try again.");
      } else if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as Record<string, string>).data === "object" &&
        (error as Record<string, string>).data !== null &&
        "message" in (error as any).data
      ) {
        // Ethers error structure for revert messages
        toast.error(
          `Blockchain Transaction Failed: ${(error as any).data.message}`,
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
    isUploadingMetadata, // Still relevant for Firebase metadata
    isStoringOnBlockchain, // New state for blockchain transaction specifically
  };
}
