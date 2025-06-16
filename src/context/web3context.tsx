import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ethers, Contract, BrowserProvider, Signer } from "ethers";
import { toast } from "sonner";

// Define the shape of your Web3 context
interface Web3ContextType {
  provider: BrowserProvider | null;
  signer: Signer | null;
  account: string | null;
  chainId: number | null;
  contract: Contract | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoadingWeb3: boolean;
}

const Web3Context = createContext<Web3ContextType | null>(null);

const CONTRACT_ADDRESS = "0xaB095753907D4DA2c59f8d080672ee44F9Fda07E";
const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "cid",
        type: "string",
      },
    ],
    name: "CIDStored",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "getCIDsByOwner",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
    ],
    name: "getOwnerOfCID",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
    ],
    name: "isCIDOwnedBy",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
    ],
    name: "storeCID",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoadingWeb3, setIsLoadingWeb3] = useState(true);

  const connectWallet = async () => {
    setIsLoadingWeb3(true);
    if (typeof window.ethereum !== "undefined") {
      try {
        const _provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(_provider);

        const accounts = await _provider.send("eth_requestAccounts", []);
        const _account = accounts[0];
        setAccount(_account);

        const _signer = await _provider.getSigner();
        setSigner(_signer);

        const network = await _provider.getNetwork();
        setChainId(Number(network.chainId));

        const _contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, _signer);
        setContract(_contract);

        toast.success(`Wallet connected: ${_account.substring(0, 6)}...`);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        toast.error("Failed to connect wallet.", {
          description:
            "Please ensure MetaMask is installed, unlocked, and on the correct network.",
        });
      } finally {
        setIsLoadingWeb3(false);
      }
    } else {
      toast.error("MetaMask not detected.", {
        description: "Please install MetaMask to use this feature.",
      });
      setIsLoadingWeb3(false);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setAccount(null);
    setChainId(null);
    setContract(null);
    toast.info("Wallet disconnected.");
  };

  useEffect(() => {
    const initConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const _provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await _provider.listAccounts(); // Check if accounts are already connected
          if (accounts.length > 0) {
            const _account = accounts[0].address;
            setAccount(_account);
            setProvider(_provider);
            const _signer = await _provider.getSigner();
            setSigner(_signer);
            const network = await _provider.getNetwork();
            setChainId(Number(network.chainId));
            setContract(new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, _signer));
          }
        } catch (error) {
          console.error("Error initializing MetaMask connection:", error);
        } finally {
          setIsLoadingWeb3(false);
        }

        // Setup listeners for account and chain changes
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            // Re-initialize signer and contract with new account
            if (provider) {
              provider.getSigner().then((s) => {
                setSigner(s);
                setContract(new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, s));
              });
            }
            toast.info(`Account changed to: ${accounts[0].substring(0, 6)}...`);
          } else {
            disconnectWallet();
          }
        });

        window.ethereum.on("chainChanged", (newChainId: string) => {
          setChainId(Number(newChainId));
          // Re-initialize everything on chain change
          window.location.reload(); // Simple reload for network changes
        });
      } else {
        setIsLoadingWeb3(false); // No MetaMask found
      }
    };

    initConnection();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("chainChanged", () => {});
      }
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        account,
        chainId,
        contract,
        connectWallet,
        disconnectWallet,
        isLoadingWeb3,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === null) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
