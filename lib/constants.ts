import { PublicKey } from "@solana/web3.js";
import { GambaStandardTokens, TokenMeta } from "gamba-react-ui-v2";

export const TOKENS: TokenMeta[] = [
  GambaStandardTokens.sol,
  GambaStandardTokens.usdc,
  GambaStandardTokens.guac,
  {
    mint: new PublicKey("JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"),
    symbol: "JUP",
    name: "JUPITER",
    image: "https://static.jup.ag/jup/icon.png",
    decimals: 6,
    baseWager: 1,
  },
];
