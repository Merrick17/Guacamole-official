import getConfig from "next/config";
import {
  ConfigEnum,
  DEV_CONFIG,
  STAGING_BONK_CONFIG,
  DEV_BONK_CONFIG,
  ParimutuelConfig,
  STAGING_CONFIG,MAINNET_GUAC_CONFIG
} from "../node_modules/@hxronetwork/parimutuelsdk/dist";
import { clusterApiUrl } from "@solana/web3.js";

// eslint-disable-next-line
export const getWeb3Config = (
  selectedNetwork: string = "GUAC"
): ParimutuelConfig => {
  // const {
  //   publicRuntimeConfig: { APP_ENV },
  // } = getConfig();
  const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;
  let c = DEV_BONK_CONFIG;
  if (selectedNetwork === "BONK") {
    if (APP_ENV === ConfigEnum.DEV) c = DEV_BONK_CONFIG;
    if (APP_ENV === ConfigEnum.STAGING) c = STAGING_BONK_CONFIG;
  } else {
    if (APP_ENV === ConfigEnum.DEV) c = DEV_CONFIG;
    if (APP_ENV === ConfigEnum.STAGING) c = MAINNET_GUAC_CONFIG;
  }

  return c as ParimutuelConfig;
};

export const getWeb3Url = () => {
  const {
    publicRuntimeConfig: { SOLANA_CLUSTER_URL },
  } = getConfig();

  if (SOLANA_CLUSTER_URL) return SOLANA_CLUSTER_URL;

  return clusterApiUrl("devnet");
};
