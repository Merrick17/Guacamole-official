// @ts-nocheck
import { Connection, PublicKey } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import { FEES } from "../../settings/fees";
import * as anchor from "@coral-xyz/anchor";

export const getFeeAddress = async (
  connection: Connection,
  mint: PublicKey,
  payer: PublicKey
) => {
  const ata = await getAssociatedTokenAddress(mint, FEES);
  const info = await connection.getAccountInfo(ata);

  if (!info || !info.data) {
    const ix = createAssociatedTokenAccountInstruction(payer, ata, FEES, mint);
    return { pubkey: ata, ix };
  }

  return { pubkey: ata, ix: undefined };
};

export const getFeeAddressV2 = (mint: PublicKey) => {
  const [feetAccount, _] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode("referral_ata")),
      new PublicKey("3r28grWHXN5iHEX3dewDBzYFAFGeHVrxycQAUM3pTzXy").toBuffer(),
      mint.toBuffer(),
    ],
    new PublicKey("REFER4ZgmyYx9c6He5XfaTMiGfdLwRnkV4RPp9t9iF3")
  );
  return feetAccount;
};
