// "use client";
// import { DefaultApi, createJupiterApiClient } from "@jup-ag/api";
// import { TokenInfo } from "@solana/spl-token-registry";
// import axios from "axios";
// import React, { useContext, useEffect, useMemo, useState } from "react";

// type RouteMap = Map<string, string[]>;

// interface JupiterApiContext {
//   api: DefaultApi;
//   loaded: boolean;
//   tokenMap: Map<string, TokenInfo>;
//   routeMap: RouteMap;
//   tokenList: TokenInfo[];
//   allTokens: TokenInfo[];
// }

// const JupiterApiContext = React.createContext<JupiterApiContext | null>(null);

// const getTokens = async () => {
//   const { data } = await axios.get("https://token.jup.ag/all");
//   return (data as TokenInfo[]).filter(
//     (elm) => elm.logoURI !== null && elm.logoURI !== undefined
//   );
// };

// const getTopTokens = async () => {
//   const { data } = await axios.get("https://cache.jup.ag/top-tokens");
//   return data as string[];
// };

// export const JupiterApiProvider = ({ children }: { children: any }) => {
//   const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());
//   const [routeMap, setRouteMap] = useState<RouteMap>(new Map());
//   const [loaded, setLoaded] = useState(false);
//   const [tokenList, setTokenList] = useState<TokenInfo[]>([]);
//   const [allTokens, setAllTokens] = useState<TokenInfo[]>([]);

//   const api = useMemo(() => {
//     // const config = new Configuration({
//     //   basePath: "https://quote-api.jup.ag/v6",
//     // });
//     //return new DefaultApi(config);
//     return createJupiterApiClient();
//   }, []);

//   useEffect(() => {
//     (async () => {
//       let [tokenList, topTokens, indexedRouteMapResult] = await Promise.all([
//         getTokens(),
//         getTopTokens(),
//         api.indexedRouteMapGet(),
//       ]);

//       tokenList = tokenList; //.filter((e) => !!topTokens.includes(e.address));
//       //setTokenList(tokenList.filter((elm) => elm.extensions?.coingeckoId));
//       setTokenList(tokenList);
//       setAllTokens(tokenList);
//       const { indexedRouteMap = {}, mintKeys = [] } = indexedRouteMapResult;

//       const routeMap = Object.keys(indexedRouteMap).reduce((routeMap, key) => {
//         routeMap.set(
//           mintKeys[Number(key)],
//           indexedRouteMap[key].map((index) => mintKeys[index])
//         );
//         return routeMap;
//       }, new Map<string, string[]>());

//       setTokenMap(
//         tokenList.reduce((map, item) => {
//           map.set(item.address, item);
//           return map;
//         }, new Map())
//       );
//       setRouteMap(routeMap);
//       setLoaded(true);
//     })();
//   }, []);

//   return (
//     <JupiterApiContext.Provider
//       value={{ api, routeMap, tokenMap, loaded, tokenList, allTokens }}
//     >
//       {children}
//     </JupiterApiContext.Provider>
//   );
// };

// export const useJupiterApiContext = () => {
//   const context = useContext(JupiterApiContext);

//   if (!context) {
//     throw new Error(
//       "useJupiterApiContext must be used within a JupiterApiProvider"
//     );
//   }

//   return context;
// };
"use client";
import { DefaultApi, createJupiterApiClient } from "@jup-ag/api";
import {
  ENV as ChainID,
  TokenInfo,
  TokenListContainer,
} from "@solana/spl-token-registry";
import { useConnection } from "@solana/wallet-adapter-react";
import React, { useContext, useEffect, useMemo, useState } from "react";

type RouteMap = Map<string, string[]>;
export type ENV = "mainnet-beta" | "testnet" | "devnet" | "localnet";
export const CLUSTER_TO_CHAIN_ID: Record<ENV, ChainID> = {
  "mainnet-beta": ChainID.MainnetBeta,
  testnet: ChainID.Testnet,
  devnet: ChainID.Devnet,
  localnet: ChainID.Devnet,
};
export type PreferredTokenListMode = "all" | "strict";
interface JupiterApiContext {
  api: DefaultApi;
  loaded: boolean;
  tokenMap: Map<string, TokenInfo>;
  routeMap?: RouteMap;
  tokenList: TokenInfo[];
  allTokens: TokenInfo[];
}

const JupiterApiContext = React.createContext<JupiterApiContext | null>(null);

const fetchAllMints = async (
  env: ENV,
  preferredTokenListMode: PreferredTokenListMode
) => {
  const tokens = await (preferredTokenListMode === "strict"
    ? await fetch("https://token.jup.ag/strict")
    : await fetch("https://token.jup.ag/all")
  ).json();
  const res = new TokenListContainer(tokens);
  const list = res
    .filterByChainId(CLUSTER_TO_CHAIN_ID[env])
    .getList()
    .filter((elm: TokenInfo) => elm.logoURI && !elm.logoURI.includes("file:/"));

  return list.reduce((acc, item) => {
    acc.set(item.address, item);
    return acc;
  }, new Map());
};
// export const JupiterApiProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {

//   const [tokenList, setTokenList] = useState<TokenInfo[]>([]);
//   const [allTokens, setAllTokens] = useState<TokenInfo[]>([]);

//   const api = useMemo(() => createJupiterApiClient(), []);

//   const { connection } = useConnection();
//   const defaultPreferredTokenListMode = "all";
//   const [preferredTokenListMode, setPreferredTokenListMode] =
//     useState<PreferredTokenListMode>(defaultPreferredTokenListMode);

//   const [{ tokenMap, loaded }, setState] = useState({
//     loaded: false,
//     tokenMap: new Map<string, TokenInfo>(),
//   });
//   const cluster = "mainnet-beta";

//   useEffect(() => {
//     fetchAllMints(cluster, preferredTokenListMode).then(async (tokenMap) => {
//       setTokenList([...tokenMap.values()]);
//       setAllTokens([...tokenMap.values()]);
//       setState({
//         loaded: true,
//         tokenMap,
//       });
//     });
//   }, [connection, preferredTokenListMode]);

//   return (
//     <JupiterApiContext.Provider
//       value={{ api, loaded, tokenMap, tokenList, allTokens }}
//     >
//       {children}
//     </JupiterApiContext.Provider>
//   );
// };
export const JupiterApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const api = useMemo(() => createJupiterApiClient(), []);
  const [tokenList, setTokenList] = useState<TokenInfo[]>([]);
  const [allTokens, setAllTokens] = useState<TokenInfo[]>([]);
  const { connection } = useConnection();
  const defaultPreferredTokenListMode = "all";
  const [preferredTokenListMode, setPreferredTokenListMode] =
    useState<PreferredTokenListMode>(defaultPreferredTokenListMode);

  const [{ tokenMap, loaded }, setState] = useState({
    loaded: false,
    tokenMap: new Map<string, TokenInfo>(),
  });
  const cluster = "mainnet-beta";

  const fetchMintsMemoized = useMemo(() => {
    return async () => {
      const tokenMap = await fetchAllMints(cluster, preferredTokenListMode);
      setTokenList([...tokenMap.values()]);
      setAllTokens([...tokenMap.values()]);
      setState({
        loaded: true,
        tokenMap,
      });
    };
  }, [cluster, preferredTokenListMode]);

  useEffect(() => {
    fetchMintsMemoized();
  }, [connection, fetchMintsMemoized]);

  return (
    <JupiterApiContext.Provider
      value={{ api, loaded, tokenMap, tokenList, allTokens }}
    >
      {children}
    </JupiterApiContext.Provider>
  );
};
export const useJupiterApiContext = () => {
  const context = useContext(JupiterApiContext);
  if (!context) {
    throw new Error(
      "useJupiterApiContext must be used within a JupiterApiProvider"
    );
  }
  return context;
};

export default JupiterApiProvider;
