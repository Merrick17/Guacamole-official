import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "./idl.json";
import { GuacLock } from "./types";
const programId = new PublicKey("ASV4VjkLoqaEzUvFS6uViAkq7Kq7jA72SNmheEMt9B3w");
const getProgram = (connection: Connection, wallet: any) => {
    
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  
  const initProgram: Program<GuacLock> = new Program(
    idl as any,
    new PublicKey(programId),
    provider
  );
  return initProgram;
};
export { getProgram };
