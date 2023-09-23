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
  console.log("Name",name)
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
