"use client";
import { DefaultApi, createJupiterApiClient } from "@jup-ag/api";
import { TokenInfo } from "@solana/spl-token-registry";
import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";

type RouteMap = Map<string, string[]>;

interface JupiterApiContext {
  api: DefaultApi;
  loaded: boolean;
  tokenMap: Map<string, TokenInfo>;
  routeMap: RouteMap;
  tokenList: TokenInfo[];
  allTokens: TokenInfo[];
}

const JupiterApiContext = React.createContext<JupiterApiContext | null>(null);

const getTokens = async () => {
  const { data } = await axios.get("https://token.jup.ag/all");
  return (data as TokenInfo[]).filter(
    (elm) => elm.logoURI !== null && elm.logoURI !== undefined
  );
};

const getTopTokens = async () => {
  const { data } = await axios.get("https://cache.jup.ag/top-tokens");
  return data as string[];
};

export const JupiterApiProvider = ({ children }: { children: any }) => {
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());
  const [routeMap, setRouteMap] = useState<RouteMap>(new Map());
  const [loaded, setLoaded] = useState(false);
  const [tokenList, setTokenList] = useState<TokenInfo[]>([]);
  const [allTokens, setAllTokens] = useState<TokenInfo[]>([]);

  const api = useMemo(() => {
    // const config = new Configuration({
    //   basePath: "https://quote-api.jup.ag/v6",
    // });
    //return new DefaultApi(config);
    return createJupiterApiClient();
  }, []);

  useEffect(() => {
    (async () => {
      let [tokenList, topTokens, indexedRouteMapResult] = await Promise.all([
        getTokens(),
        getTopTokens(),
        api.indexedRouteMapGet(),
      ]);

      tokenList = tokenList; //.filter((e) => !!topTokens.includes(e.address));
      //setTokenList(tokenList.filter((elm) => elm.extensions?.coingeckoId));
      setTokenList(tokenList);
      setAllTokens(tokenList);
      const { indexedRouteMap = {}, mintKeys = [] } = indexedRouteMapResult;

      const routeMap = Object.keys(indexedRouteMap).reduce((routeMap, key) => {
        routeMap.set(
          mintKeys[Number(key)],
          indexedRouteMap[key].map((index) => mintKeys[index])
        );
        return routeMap;
      }, new Map<string, string[]>());

      setTokenMap(
        tokenList.reduce((map, item) => {
          map.set(item.address, item);
          return map;
        }, new Map())
      );
      setRouteMap(routeMap);
      setLoaded(true);
    })();
  }, []);

  return (
    <JupiterApiContext.Provider
      value={{ api, routeMap, tokenMap, loaded, tokenList, allTokens }}
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
