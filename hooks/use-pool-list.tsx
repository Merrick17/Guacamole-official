import { useWallet } from "@solana/wallet-adapter-react";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
  SetStateAction,
} from "react";

// interface Pool {
//   id: string;
//   baseMint: string;
//   quoteMint: string;
//   lpMint: string;
//   baseDecimals: number;
//   quoteDecimals: number;
//   lpDecimals: number;
//   version: number;
//   programId: string;
//   authority: string;
//   openOrders: string;
//   targetOrders: string;
//   baseVault: string;
//   quoteVault: string;
//   withdrawQueue: string;
//   lpVault: string;
//   marketVersion: number;
//   marketProgramId: string;
//   marketId: string;
//   marketAuthority: string;
//   marketBaseVault: string;
//   marketQuoteVault: string;
//   marketBids: string;
//   marketAsks: string;
//   marketEventQueue: string;
//   lookupTableAccount: string;
// }
interface Pool {
  poolId: string;
  baseMint: string;
  quoteMint: string;
  lpMint: string;
  lpDecimals: number;
  provider: string;
  liquidity: number;
}
interface PoolContextType {
  poolList: Pool[];
  loading: boolean;
  error: string | null;
  selectedPool: Pool | null;
  setSelectedPool: (value: SetStateAction<Pool>) => void;
}

const PoolContext = createContext<PoolContextType | undefined>(undefined);

const PoolProvider: React.FC<{ children: any }> = ({ children }) => {
  const { connected } = useWallet();
  const [poolList, setPoolList] = useState<Pool[]>([]);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPoolList = useCallback(async () => {
    try {
      // const response = await fetch(
      //   "https://lock-pools-607adf8dc4ea.herokuapp.com/pools"
      // );
      const response = await fetch("/api/pools");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      // Assuming the structure of the API response is an array under the 'poolList' key
      const fetchedPoolList: Pool[] = data["pools"];

      setPoolList(fetchedPoolList);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchPoolList();
  }, [fetchPoolList]); // Empty dependency array ensures the effect runs only once on mount

  return (
    <PoolContext.Provider
      value={{ poolList, loading, error, selectedPool, setSelectedPool }}
    >
      {children}
    </PoolContext.Provider>
  );
};

const usePool = () => {
  const context = useContext(PoolContext);
  if (context === undefined) {
    throw new Error("usePool must be used within a PoolProvider");
  }
  return context;
};

export { PoolProvider, usePool };
