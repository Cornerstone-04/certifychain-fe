import { useEffect, useState } from "react";
import { Contract, ethers, BrowserProvider, Signer } from "ethers";
import { toast } from "sonner";

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
      { indexed: false, internalType: "string", name: "cid", type: "string" },
    ],
    name: "CIDStored",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "getCIDsByOwner",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "cid", type: "string" }],
    name: "getOwnerOfCID",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "string", name: "cid", type: "string" },
    ],
    name: "isCIDOwnedBy",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "cid", type: "string" }],
    name: "storeCID",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export function useWeb3Implementation() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoadingWeb3, setIsLoadingWeb3] = useState(true);

  const connectWallet = async () => {
    setIsLoadingWeb3(true);
    if (!window.ethereum) {
      toast.error("MetaMask not detected.", {
        description: "Please install MetaMask to use this feature.",
      });
      setIsLoadingWeb3(false);
      return;
    }

    try {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await _provider.send("eth_requestAccounts", []);
      const _account = accounts[0];
      const _signer = await _provider.getSigner();
      const network = await _provider.getNetwork();
      const _contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, _signer);

      setProvider(_provider);
      setSigner(_signer);
      setAccount(_account);
      setChainId(Number(network.chainId));
      setContract(_contract);

      toast.success(`Wallet connected: ${_account.substring(0, 6)}...`);
    } catch (err) {
      console.error("MetaMask connection error:", err);
      toast.error("Failed to connect wallet.", {
        description:
          "Please ensure MetaMask is installed, unlocked, and on the correct network.",
      });
    } finally {
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
      if (!window.ethereum) {
        setIsLoadingWeb3(false);
        return;
      }

      try {
        const _provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await _provider.listAccounts();

        if (accounts.length > 0) {
          const _account = accounts[0].address;
          const _signer = await _provider.getSigner();
          const network = await _provider.getNetwork();
          const _contract = new Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            _signer
          );

          setProvider(_provider);
          setSigner(_signer);
          setAccount(_account);
          setChainId(Number(network.chainId));
          setContract(_contract);
        }
      } catch (err) {
        console.error("Auto-connect error:", err);
      } finally {
        setIsLoadingWeb3(false);
      }

      const handleAccountsChanged = (...args: unknown[]) => {
        const accounts = args[0] as string[];
        if (accounts.length > 0) {
          const newAccount = accounts[0];
          setAccount(newAccount);
          if (provider) {
            provider.getSigner().then((_signer) => {
              setSigner(_signer);
              setContract(
                new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, _signer)
              );
            });
          }
          toast.info(`Account changed: ${newAccount.substring(0, 6)}...`);
        } else {
          disconnectWallet();
        }
      };

      const handleChainChanged = (...args: unknown[]) => {
        const newChainId = args[0] as string;
        setChainId(Number(newChainId));
        window.location.reload();
      };

      if (window.ethereum?.on) {
        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("chainChanged", handleChainChanged);
      }

      return () => {
        if (window.ethereum?.removeListener) {
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          window.ethereum.removeListener("chainChanged", handleChainChanged);
        }
      };
    };

    initConnection();
  }, [provider]);

  return {
    provider,
    signer,
    account,
    chainId,
    contract,
    connectWallet,
    disconnectWallet,
    isLoadingWeb3,
  };
}
