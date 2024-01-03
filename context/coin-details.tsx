// "use client";
// import { useJupiterApiContext } from "@/components/views/trade/src/contexts";
// import { TokenInfo } from "@solana/spl-token-registry";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
//   useCallback,
//   useMemo,
// } from "react";
// interface ITokenDetails {
//   id: string;
//   type: string;
//   attributes: {
//     address: string;
//     name: string;
//     symbol: string;
//     coingecko_coin_id: string;
//     decimals: number;
//     total_supply: string;
//     price_usd: string;
//     fdv_usd: string;
//     total_reserve_in_usd: string;
//     volume_usd: {
//       h24: string;
//     };
//     market_cap_usd: null | string; // It can be null or a string
//   };
//   relationships: {
//     top_pools: {
//       data: {
//         id: string;
//         type: string;
//       }[];
//     };
//   };
// }
// interface IPoolInfo {
//   id: string;
//   type: string;
//   attributes: {
//     base_token_price_usd: string;
//     base_token_price_native_currency: string;
//     quote_token_price_usd: string;
//     quote_token_price_native_currency: string;
//     base_token_price_quote_token: string;
//     quote_token_price_base_token: string;
//     address: string;
//     name: string;
//     pool_created_at: null | string;
//     token_price_usd: string;
//     fdv_usd: string;
//     market_cap_usd: null | string;
//     price_change_percentage: {
//       h1: string;
//       h24: string;
//     };
//     transactions: {
//       h1: {
//         buys: number;
//         sells: number;
//       };
//       h24: {
//         buys: number;
//         sells: number;
//       };
//     };
//     volume_usd: {
//       h24: string;
//     };
//     reserve_in_usd: string;
//   };
//   relationships: {
//     base_token: {
//       data: {
//         id: string;
//         type: string;
//       };
//     };
//     quote_token: {
//       data: {
//         id: string;
//         type: string;
//       };
//     };
//     dex: {
//       data: {
//         id: string;
//         type: string;
//       };
//     };
//   };
// }
// // Define the context interface
// interface TokenContextProps {
//   selectedToken: TokenInfo | null;
//   selectToken: (token: TokenInfo) => void;
//   tokenDetails: ITokenDetails;
//   poolDetails: IPoolInfo[];
//   tokenInfo: any;

// }

// // Create the context with initial values
// const SelectedTokenContext = createContext<TokenContextProps | undefined>(
//   undefined
// );

// // Define the context provider component
// export const SelectedTokenProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);
//   const [tokenDetails, setTokenDetails] = useState<ITokenDetails | null>(null);
//   const [poolDetails, setPoolDetails] = useState<IPoolInfo[]>([]);
//   const [tokenInfo, setTokenInfo] = useState<any>(null);
//   const [marketCap, setMarketCap] = useState<number>(0);
//   const { tokenMap } = useJupiterApiContext();
//   const params = useParams();
//   useEffect(() => {
//     let adr: any = params["address"];
//     let tkn = tokenMap.get(adr);
//     if (tkn) {
//       setSelectedToken(tkn);
//     }
//   }, [params]);
//   const getMarketCap = useCallback(async () => {
//     if (selectedToken && selectedToken.extensions) {
//       const { data } = await axios.get(
//         "https://api.coingecko.com/api/v3/coins/" +
//           selectedToken.extensions.coingeckoId
//       );
//     }
//   }, [selectedToken]);
//   const fetchTokenInfo = useCallback(async () => {
//     if (selectedToken) {
//       console.log("Selected Token", selectedToken);
//       const { data } = await axios.get(
//         `/api/token?mint=${selectedToken.address}&decimals=${selectedToken.decimals}`
//       );
//       setTokenInfo(data);
//     }
//   }, [selectedToken]);
//   const getTokenData = useCallback(async () => {
//     if (selectedToken) {
//       const { data: tokenData } = await axios.get(
//         `https://api.geckoterminal.com/api/v2/networks/solana/tokens/${selectedToken.address}`
//       );
//       const { data: poolData } = await axios.get(
//         `https://api.geckoterminal.com/api/v2/networks/solana/tokens/${selectedToken.address}/pools`
//       );

//       setTokenDetails(tokenData["data"]);
//       setPoolDetails(poolData["data"]);
//     }
//   }, [selectedToken]);
//   useMemo(() => {
//     getTokenData();
//     getMarketCap();
//     fetchTokenInfo();
//   }, [selectedToken]);
//   const selectToken = (token: TokenInfo) => {
//     setSelectedToken(token);
//   };

//   return (
//     <SelectedTokenContext.Provider
//       value={{
//         selectedToken,
//         selectToken,
//         tokenDetails,
//         poolDetails,
//         tokenInfo,
//         marketCap,
//       }}
//     >
//       {children}
//     </SelectedTokenContext.Provider>
//   );
// };

// // Define a custom hook to access the context values
// export const useSelectedToken = () => {
//   const context = useContext(SelectedTokenContext);
//   if (!context) {
//     throw new Error("useToken must be used within a TokenProvider");
//   }
//   return context;
// };
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useJupiterApiContext } from "@/components/views/trade/src/contexts";
import { TokenInfo } from "@solana/spl-token-registry";

interface ITokenDetails {
  id: string;
  type: string;
  attributes: {
    address: string;
    name: string;
    symbol: string;
    coingecko_coin_id: string;
    decimals: number;
    total_supply: string;
    price_usd: string;
    fdv_usd: string;
    total_reserve_in_usd: string;
    volume_usd: {
      h24: string;
    };
    market_cap_usd: null | string; // It can be null or a string
  };
  relationships: {
    top_pools: {
      data: {
        id: string;
        type: string;
      }[];
    };
  };
}
interface IPoolInfo {
  id: string;
  type: string;
  attributes: {
    base_token_price_usd: string;
    base_token_price_native_currency: string;
    quote_token_price_usd: string;
    quote_token_price_native_currency: string;
    base_token_price_quote_token: string;
    quote_token_price_base_token: string;
    address: string;
    name: string;
    pool_created_at: null | string;
    token_price_usd: string;
    fdv_usd: string;
    market_cap_usd: null | string;
    price_change_percentage: {
      h1: string;
      h24: string;
    };
    transactions: {
      h1: {
        buys: number;
        sells: number;
      };
      h24: {
        buys: number;
        sells: number;
      };
    };
    volume_usd: {
      h24: string;
    };
    reserve_in_usd: string;
  };
  relationships: {
    base_token: {
      data: {
        id: string;
        type: string;
      };
    };
    quote_token: {
      data: {
        id: string;
        type: string;
      };
    };
    dex: {
      data: {
        id: string;
        type: string;
      };
    };
  };
}
// Define the context interface
interface TokenContextProps {
  selectedToken: TokenInfo | null;
  selectToken: (token: TokenInfo) => void;
  tokenDetails: ITokenDetails;
  poolDetails: IPoolInfo[];
  tokenInfo: any;
}

const SelectedTokenContext = createContext<TokenContextProps | undefined>(
  undefined
);

export const SelectedTokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);
  const [tokenDetails, setTokenDetails] = useState<ITokenDetails | null>(null);
  const [poolDetails, setPoolDetails] = useState<IPoolInfo[]>([]);
  const [tokenInfo, setTokenInfo] = useState<any>(null);

  const { tokenMap } = useJupiterApiContext();
  const params = useParams();

  useEffect(() => {
    const adr: any = params["address"];
    const tkn = tokenMap.get(adr);
    if (tkn) setSelectedToken(tkn);
  }, [params, tokenMap]);

  const fetchTokenData = useCallback(async () => {
    if (selectedToken) {
      try {
        const { data: tokenData } = await axios.get(
          `https://api.geckoterminal.com/api/v2/networks/solana/tokens/${selectedToken.address}`
        );
        const { data: poolData } = await axios.get(
          `https://api.geckoterminal.com/api/v2/networks/solana/tokens/${selectedToken.address}/pools`
        );
        setTokenDetails(tokenData["data"]);
        setPoolDetails(poolData["data"]);
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    }
  }, [selectedToken]);

  useEffect(() => {
    fetchTokenData();
  }, [fetchTokenData]);

  const selectToken = useCallback((token: TokenInfo) => {
    setSelectedToken(token);
  }, []);

  const contextValue = useMemo(
    () => ({
      selectedToken,
      selectToken,
      tokenDetails,
      poolDetails,
      tokenInfo,
    }),
    [selectedToken, tokenDetails, poolDetails, tokenInfo]
  );

  return (
    <SelectedTokenContext.Provider value={contextValue}>
      {children}
    </SelectedTokenContext.Provider>
  );
};

export const useSelectedToken = () => {
  const context = useContext(SelectedTokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
