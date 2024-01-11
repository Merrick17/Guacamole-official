import {
  ConfigEnum,
  DEV_BONK_CONFIG,
  DEV_CONFIG,
  MAINNET_CONFIG,
  ParimutuelConfig,
  STAGING_BONK_CONFIG,
  STAGING_CONFIG,
} from "@hxronetwork/parimutuelsdk";
import { clusterApiUrl } from "@solana/web3.js";
import getConfig from "next/config";

// eslint-disable-next-line
export const getWeb3Config = (
  selectedNetwork: string = "BONK"
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