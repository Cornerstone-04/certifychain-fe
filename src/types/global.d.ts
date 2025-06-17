import type { Eip1193Provider } from "ethers";

// Extend the Eip1193Provider to include event methods
interface EthereumProvider extends Eip1193Provider {
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
