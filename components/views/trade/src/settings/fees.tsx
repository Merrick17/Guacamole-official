import { PublicKey } from '@solana/web3.js';

export const FEES = new PublicKey(process.env.NEXT_PUBLIC_FEES as string);
export const FEES_BPS = parseInt(process.env.NEXT_PUBLIC_FEES_BPS as string);
