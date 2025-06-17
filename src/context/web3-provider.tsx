import { ReactNode } from "react";
import { Web3Context } from "./web3-context";
import { useWeb3Implementation } from "./web3impl";

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const web3 = useWeb3Implementation();

  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
};
