// @ts-nocheck
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

export const getAta = async (
  connection: Connection,
  mint: PublicKey,
  payer: PublicKey,
  owner: PublicKey,
  curve?: boolean = false
) => {
  const ata = await getAssociatedTokenAddress(mint, owner, curve);
  const info = await connection.getAccountInfo(ata);

  if (!info || !info.data) {
    const ix = createAssociatedTokenAccountInstruction(payer, ata, owner, mint);
    return { pubkey: ata, ix };
  }

  return { pubkey: ata, ix: undefined };
};
