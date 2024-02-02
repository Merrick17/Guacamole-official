// @ts-nocheck
import { Connection, PublicKey } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

export const getTokenAccount = async (
  connection: Connection,
  mint: PublicKey,
  payer: PublicKey,
  owner: PublicKey,
  onCurve? = false
) => {

  const ata = await getAssociatedTokenAddress(mint, owner, true);
  const info = await connection.getAccountInfo(ata);

  if (!info || !info.data) {
    const ix = createAssociatedTokenAccountInstruction(payer, ata, owner, mint);
    return { pubkey: ata, ix };
  }

  return { pubkey: ata, ix: undefined };
};
