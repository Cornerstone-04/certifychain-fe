import { createContext } from "react";
import { Contract, BrowserProvider, Signer } from "ethers";

export interface Web3ContextType {
  provider: BrowserProvider | null;
  signer: Signer | null;
  account: string | null;
  chainId: number | null;
  contract: Contract | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoadingWeb3: boolean;
}

export const Web3Context = createContext<Web3ContextType | null>(null);
