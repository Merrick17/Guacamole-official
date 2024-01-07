//@ts-nocheck
import { AccountLayout } from "@solana/spl-token";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token-v1";
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import BN from "bn.js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  CryptoEnum,
  getMarketPubkeys,
  MarketPairEnum,
  ParimutuelMarket,
  ParimutuelWeb3,
} from "@hxronetwork/parimutuelsdk";

// import { TOKEN_LIST } from "@constants/tokens";
// import { KnownTokenMap } from "@contexts/token";
// import hxroSvg from "/images/hxro.svg";
// import solonaSvg from "@public/images/solona.svg";
// import usdcSvg from "@public/images/usdc.svg";
import { getWeb3Config } from "@/constants/config";
const SOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatPubKey(pubkey: string): string {
  if (pubkey.length <= 8) return pubkey;
  return `${pubkey.substring(0, 4)}...${pubkey.substring(pubkey.length - 4)}`;
}

export function timeSince(timestamp: number): string {
  const now = Date.now(); // Current time in Unix timestamp (milliseconds)
  let elapsed = now - timestamp; // Time elapsed in milliseconds

  if (elapsed < 0) {
    return `in the future (${new Date(timestamp).toISOString()})`;
  }

  let interval = Math.floor(elapsed / 31536000000); // Years
  if (interval >= 1) {
    return interval + (interval === 1 ? " year ago" : " years ago");
  }

  interval = Math.floor(elapsed / 2592000000); // Months
  if (interval >= 1) {
    return interval + (interval === 1 ? " month ago" : " months ago");
  }

  interval = Math.floor(elapsed / 86400000); // Days
  if (interval >= 1) {
    return interval + (interval === 1 ? " day ago" : " days ago");
  }

  interval = Math.floor(elapsed / 3600000); // Hours
  if (interval >= 1) {
    return interval + (interval === 1 ? " hour ago" : " hours ago");
  }

  interval = Math.floor(elapsed / 60000); // Minutes
  if (interval >= 1) {
    return interval + (interval === 1 ? " minute ago" : " minutes ago");
  }

  return Math.floor(elapsed / 1000) + " seconds ago"; // Seconds
}

export const handleCopy = (textToCopy: string, item: string) => {
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      // notify({ type: 'success', message: `Copied ${item} to clipbpard!` })
    })
    .catch(() => {
      //notify({ type: 'error', message: `Could not copy ${item} to clipbpard` })
    });
};
export const fromLamports = (amount: number, decimals: number) => {
  const result = amount / Math.pow(10, decimals);
  return Number(result);
};

export const toLamports = (amount: number, decimals: number) => {
  const result = (amount * Math.pow(10, decimals)).toFixed(0);
  return Number(result);
};
export const getUserbalance = async (
  connection: Connection,
  mint: PublicKey,
  owner: PublicKey
) => {
  try {
    if (mint.equals(SOL_MINT)) {
      const accountInfo = await connection.getAccountInfo(owner);
      if (!accountInfo) {
        return 0;
      }
      return accountInfo.lamports;
    }

    const address = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mint,
      owner
    );
    const balanceInfo = await connection.getAccountInfo(address);
    if (!balanceInfo || balanceInfo.owner.equals(SystemProgram.programId)) {
      return 0;
    }
    const account = AccountLayout.decode(balanceInfo.data);
    const balance = new BN(account.amount, "le");

    return balance.toNumber();
  } catch (error) {
    console.log("Error getting user balance", error);
    return 0;
  }
};
export function getRandomHexColor() {
  // Generate random values for red, green, and blue components
  const red = Math.floor(Math.random() * 256); // 0 to 255
  const green = Math.floor(Math.random() * 256); // 0 to 255
  const blue = Math.floor(Math.random() * 256); // 0 to 255

  // Convert the decimal values to hexadecimal format
  const redHex = red.toString(16).padStart(2, "0"); // Convert to hex and ensure two digits
  const greenHex = green.toString(16).padStart(2, "0");
  const blueHex = blue.toString(16).padStart(2, "0");

  // Create a hex color string using the converted values
  const hexColor = `#${redHex}${greenHex}${blueHex}`;

  return hexColor;
}
export function getColorByName(name: string) {
  console.log("Name", name);
  const colorMap = {
    FRANCIUM: "#832941",
    TULIP: "#E74267",
    VAULTRESERVES: "#FF6901",
    FRAKTABC: "#FDB703",
    FRAKTDEGODS: "#18DFB4",
    OTHERS: "#24AEEF",
  };

  // Check if the name exists in the color map, if not, return a default color
  return colorMap[name] || getRandomHexColor(); // Default to black if name not found
}

export const notEmpty = <T>(value: T): value is NonNullable<typeof value> =>
  !!value;

export enum PositionSummaryOptionEnum {
  ALL = "all",
  LIVE = "live",
  UPCOMING = "upcoming",
}

// export const getCryptoAddress = (crypto: string): string => {
//   return TOKEN_LIST[crypto];
// };

export const getMarketByPubkey = (
  marketPubkey: string,
  markets: ParimutuelMarket[]
): ParimutuelMarket | undefined => {
  return markets.find((market) => market.pubkey.toBase58() === marketPubkey);
};

export const getMarketPairByPubkey = (
  marketKey: string,
  web3?: ParimutuelWeb3
): string => {
  const config = getWeb3Config();
  const solMarkets = getMarketPubkeys(config, MarketPairEnum.SOLUSD);
  const solMarket = solMarkets.find(
    (market) => market.pubkey.toBase58() === marketKey
  );
  if (solMarket) return MarketPairEnum.SOLUSD;

  const btcMarkets = getMarketPubkeys(config, MarketPairEnum.BTCUSD);
  const btcMarket = btcMarkets.find(
    (market) => market.pubkey.toBase58() === marketKey
  );
  if (btcMarket) return MarketPairEnum.BTCUSD;

  return MarketPairEnum.ETHUSD;
};

export const getCryptoName = (crypto: CryptoEnum): string => {
  switch (crypto) {
    case CryptoEnum.SOLANA:
      return "Solana";
    case CryptoEnum.USDC:
      return "USDC Coin";
    case CryptoEnum.HXRO:
      return "HXRO";
  }
};

export const formatMarketPair = (pair: MarketPairEnum): string => {
  const fiatSymbol = pair.slice(-3);
  const cryptoSymbol = pair.slice(0, -3);
  return cryptoSymbol + "/" + fiatSymbol;
};

export const getCryptoAbbr = (crypto: CryptoEnum): string => {
  switch (crypto) {
    case CryptoEnum.SOLANA:
      return "SOL";
    case CryptoEnum.USDC:
      return "USDC";
    case CryptoEnum.HXRO:
      return "HXRO";
  }
};

export const getCryptoIcon = (crypto: CryptoEnum): string => {
  switch (crypto) {
    case CryptoEnum.SOLANA:
      return solonaSvg;
    case CryptoEnum.USDC:
      return usdcSvg;
    case CryptoEnum.HXRO:
      return hxroSvg;
  }
};

// TODO: use this method for get icon
// export const getTokenIcon = (
//   map: KnownTokenMap,
//   mintAddress?: string | PublicKey
// ): string | undefined => {
//   const address =
//     typeof mintAddress === "string" ? mintAddress : mintAddress?.toBase58();
//   if (!address) {
//     return;
//   }

//   return map.get(address)?.logoURI;
// };
export const AmountFormating = (amount: number, fixed: number) => {
  const absAmount = Math.abs(amount);
  let suffix = "";
  let divisor = 1;

  if (absAmount >= 1e9) {
    suffix = "B";
    divisor = 1e9;
  } else if (absAmount >= 1e6) {
    suffix = "M";
    divisor = 1e6;
  } else if (absAmount >= 1e3) {
    suffix = "K";
    divisor = 1e3;
  }

  const formatted = (amount / divisor).toFixed(fixed);
  return `${formatted}${suffix}`;
};
