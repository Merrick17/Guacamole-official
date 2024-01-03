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
import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface Pool {
  poolId: string;
  baseMint: string;
  quoteMint: string;
  lpMint: string;
  lpDecimals: number;
  provider: string;
  liquidity: number;
}
export interface PoolExtended {
  poolId: string;
  baseMint: TokenInfo;
  quoteMint: TokenInfo;
  lpMint: string;
  lpDecimals: number;
  provider: string;
  liquidity: number;
  baseAdr: string;
  quoteAdr: string;
  tokenAmount: number;
}
interface PoolContextType {
  poolList: PoolExtended[];
  loading: boolean;
  error: string | null;
  selectedPool: PoolExtended | null;
  selectedMintAdr: string | null;
  setSelectedMintAdr: (value: SetStateAction<string>) => void;
  setSelectedPool: (value: SetStateAction<PoolExtended>) => void;
  getPoolByLpMint: (lpMint: string) => Promise<PoolExtended | null>;
  getPoolByPoolId: (lpMint: string) => Promise<PoolExtended | null>;
  usePoolInfo: () => UseQueryResult<PoolExtended[], Error>;
}

const PoolContext = createContext<PoolContextType | undefined>(undefined);

const PoolProvider: React.FC<{ children: any }> = ({ children }) => {
  const [poolList, setPoolList] = useState<PoolExtended[]>([]);
  const [selectedPool, setSelectedPool] = useState<PoolExtended | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMintAdr, setSelectedMintAdr] = useState<string | null>(null);

  const usePoolInfo = () => {
    return useQuery({
      queryKey: ["poolList"],
      queryFn: async () => {
        const response = await fetch("https://159.223.197.10.nip.io/pools");

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        // Assuming the structure of the API response is an array under the 'pools' key
        const fetchedPoolList: PoolExtended[] = data;

        return fetchedPoolList;
      },
    });
  };
  const MAX_RETRIES = 3;
  const getPoolByLpMint = async (
    lpMint: string
  ): Promise<PoolExtended | null> => {
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        const response = await axios.get(
          `https://159.223.197.10.nip.io/pool/${lpMint}`
        );

        if (response && response.data) {
          const poolData: PoolExtended = response.data;
          return poolData;
        }
      } catch (error) {
        console.error(
          `Error fetching pool data on attempt ${retries + 1}:`,
          error
        );
        retries++;
      }
    }

    console.error(
      `Max retries (${MAX_RETRIES}) reached without getting a valid response.`
    );
    return null;
  };
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
      const fetchedPoolList: PoolExtended[] = data;

      setPoolList(fetchedPoolList);
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   fetchPoolList();
  // }, [fetchPoolList]);

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
        selectedMintAdr, // Provide selectedMintAdr
        setSelectedMintAdr,
        usePoolInfo,
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
