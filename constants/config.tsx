import { clusterApiUrl } from "@solana/web3.js";
import getConfig from "next/config";
import {
  ConfigEnum,
  DEV_BONK_CONFIG,
  DEV_CONFIG,
  DEV_GUAC_CONFIG,
  MAINNET_GUAC_CONFIG,
  ParimutuelConfig,
  STAGING_BONK_CONFIG,
  STAGING_CONFIG,
} from "../node_modules/@hxronetwork/parimutuelsdk/dist";

// eslint-disable-next-line
export const getWeb3Config = (
  selectedNetwork: string = "USDC"
): ParimutuelConfig => {
  // const {
  //   publicRuntimeConfig: { APP_ENV },
  // } = getConfig();
  const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;
  let c = DEV_GUAC_CONFIG;
  if (selectedNetwork === "GUAC") {
    if (APP_ENV === ConfigEnum.DEV) c = DEV_GUAC_CONFIG;
    if (APP_ENV === ConfigEnum.STAGING) c = MAINNET_GUAC_CONFIG;
  } else {
    if (APP_ENV === ConfigEnum.DEV) c = DEV_CONFIG;
    if (APP_ENV === ConfigEnum.STAGING) c = STAGING_CONFIG;
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
