import { Web3Context, Web3ContextType } from "@/context/web3-context";
import { useContext } from "react";

export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
