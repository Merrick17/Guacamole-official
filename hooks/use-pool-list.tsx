"use client";
import { TokenInfo } from "@solana/spl-token-registry";
import axios from "axios";
import {
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface Pool {
  poolId: string;
  baseMint: string;
  quoteMint: string;
  lpMint: string;
  lpDecimals: number;
  provider: string;
  liquidity: number;
}
interface PoolExtended {
  poolId: string;
  baseMint: TokenInfo;
  quoteMint: TokenInfo;
  lpMint: string;
  lpDecimals: number;
  provider: string;
  liquidity: number;
  baseAdr: string;
  quoteAdr: string;
}
interface PoolContextType {
  poolList: Pool[];
  loading: boolean;
  error: string | null;
  selectedPool: Pool | null;
  setSelectedPool: (value: SetStateAction<Pool>) => void;
  getPoolByLpMint: (lpMint: string) => Promise<PoolExtended | null>;
  getPoolByPoolId: (lpMint: string) => Promise<PoolExtended | null>;
}

const PoolContext = createContext<PoolContextType | undefined>(undefined);

const PoolProvider: React.FC<{ children: any }> = ({ children }) => {
  const [poolList, setPoolList] = useState<Pool[]>([]);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const getPoolByLpMint = useCallback(
  //   (lpMint: string): Pool | null => {
  //     return poolList.find((pool) => pool.lpMint === lpMint) || null;
  //   },
  //   [poolList]
  // );
  const getPoolByLpMint = useCallback(
    async (lpMint: string): Promise<PoolExtended | null> => {
      try {
        const response = await axios.get(
          `https://159.223.197.10.nip.io/pool/${lpMint}`
        );

        // Assuming the response data has the same structure as your Pool object
        const poolData: PoolExtended = response.data;

        return poolData || null;
      } catch (error) {
        console.error("Error fetching pool data:", error);
        return null;
      }
    },
    []
  ); // Ensure to add dependencies if needed
  const getPoolByPoolId = useCallback(
    async (lpMint: string): Promise<PoolExtended | null> => {
      try {
        const response = await axios.get(
          `https://159.223.197.10.nip.io/pool/id/${lpMint}`
        );

        // Assuming the response data has the same structure as your Pool object
        const poolData: PoolExtended = response.data;

        return poolData || null;
      } catch (error) {
        console.error("Error fetching pool data:", error);
        return null;
      }
    },
    []
  ); // Ensure to add dependencies if needed
  const fetchPoolList = useCallback(async () => {
    try {
      const response = await fetch("https://159.223.197.10.nip.io/pools");

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      // Assuming the structure of the API response is an array under the 'pools' key
      const fetchedPoolList: Pool[] = data;

      setPoolList(fetchedPoolList);
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPoolList();
  }, [fetchPoolList]);

  return (
    <PoolContext.Provider
      value={{
        poolList,
        loading,
        error,
        selectedPool,
        setSelectedPool,
        getPoolByLpMint,
        getPoolByPoolId,
      }}
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
