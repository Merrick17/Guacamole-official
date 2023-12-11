import { getTokenAccount } from "@/lib/get-ata";
import { getProgram } from "@/program/program";
import * as anchor from "@coral-xyz/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { BN } from "bn.js";
import Link from "next/link";
import { useToast } from "./use-toast";
const useLockerTools = () => {
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction } = useWallet();
  const { toast } = useToast();
  const anchorWallet = useAnchorWallet();
  const program = getProgram(connection, anchorWallet);
  // const getAllVaults = async () => {
  //   const vaults = await program.account.lockerAccount.all();
  //   return vaults;
  // };
  const getAllVaults = async (pageSize = 10, pageNumber = 1) => {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;

    const allVaults = await program.account.lockerAccount.all();

    const filtredVaults = allVaults; 

    // Apply pagination
    const paginatedVaults = filtredVaults.slice(start, end);

    return paginatedVaults;
  };
  const getTotalVaults = async () => {
    const allVaults = await program.account.lockerAccount.all();
    const filtredVaults = allVaults; 
    return filtredVaults.length;
  };
  const getFirstLockByLp = async (mint: string) => {
    const lock = await program.account.deposit.all();
    const mintLocks = lock.filter((elm) => elm.account.mint.toBase58() == mint);

    return mintLocks.length != 0 ? mintLocks[0] : null;
  };
  const getLockerByAdr = async (adr: string) => {
    return await program.account.deposit.fetch(adr);
  };
  const getLocksByOwner = async (owner: string) => {
    try {
      const locks = (await program.account.deposit.all()).filter(
        (elm) => elm.account.owner.toBase58() == owner
      );
      return locks;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      return null;
    }
  };

  const initNewVault = async (tokenMint: PublicKey, decimals: number) => {
    if (connected && publicKey) {
      const [lockAccount, _] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(anchor.utils.bytes.utf8.encode("guac_lock_pool")),
          publicKey.toBuffer(),
          tokenMint.toBuffer(),
        ],
        program.programId
      );
      const { pubkey: LockAccountAta, ix: lockAccountAtaIx } =
        await getTokenAccount(
          connection,
          tokenMint,
          publicKey,
          lockAccount,
          true
        );
      const { pubkey: userAta, ix: userAtaIx } = await getTokenAccount(
        connection,
        tokenMint,
        publicKey,
        publicKey,
        false
      );
      try {
        const ix = await program.methods
          .initialize(new BN(0.00001 * Math.pow(10, decimals)))
          .accounts({
            lockAccount: lockAccount,
            lockAta: LockAccountAta,
            signerAta: userAta,
            signer: publicKey,
            mint: tokenMint,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .instruction();
        const tx = new Transaction();
        if (lockAccountAtaIx) {
          tx.add(lockAccountAtaIx);
        }
        tx.add(ix);
        const sig = await sendTransaction(tx, connection, {
          skipPreflight: true,
        });

        toast({
          variant: "success",
          title: "Vault Created Successfully!",
          description: (
            <div className="flex flex-col gap-1">
              <p>Transaction sent successfully.</p>
              <Link href={`https://solscan.io/tx/${sig}`}>View on solscan</Link>
            </div>
          ),
        });
        return sig;
      } catch (error) {
        console.log("Error", error.message);
        toast({
          variant: "destructive",
          title: "Error !",
          description: <span>{error.message}</span>,
        });
        return null;
      }
    } else {
      toast({
        variant: "destructive",
        title: "Wallet not connected !",
        description: <span>Connect your wallet to create a new vault</span>,
      });
      return null;
    }
  };
  const handleCreateNewLock = async (
    amount: number,
    unlockTime: number,
    mint: string,
    payer: PublicKey
  ) => {
    try {
      const vaults = await getAllVaults();
      const selectedLock = vaults.find(
        (elm) => elm.account.mint.toBase58() == mint
      );
      const [lockAccountInfo] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(anchor.utils.bytes.utf8.encode("guac_lock_info")),
          payer.toBuffer(),
          new PublicKey(mint).toBuffer(),
        ],
        program.programId
      );
      const { pubkey: LockAccountAta, ix: lockAccountAtaIx } =
        await getTokenAccount(
          connection,
          new PublicKey(mint),
          publicKey,
          selectedLock.publicKey,
          true
        );
      const { pubkey: feeAta, ix: feeAtaIx } = await getTokenAccount(
        connection,
        new PublicKey(mint),
        publicKey,
        new PublicKey("EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC"),
        true
      );
      const { pubkey: userAta, ix: userAtaIx } = await getTokenAccount(
        connection,
        new PublicKey(mint),
        payer,
        payer,
        false
      );
      const { pubkey: feeGuacAta } = await getTokenAccount(
        connection,
        new PublicKey("AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR"),
        publicKey,
        new PublicKey("EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC"),
        true
      );
      const { pubkey: userGuacAta } = await getTokenAccount(
        connection,
        new PublicKey("AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR"),
        payer,
        payer,
        false
      );
      const tx = new Transaction();
      if (feeAtaIx) {
        // tx.add(feeAtaIx);
        const tx2 = new Transaction().add(feeAtaIx);
        const sig2 = await sendTransaction(tx2, connection);
      }
      const ix = await program.methods
        .depositAmount(new BN(amount), new BN(unlockTime))
        .accounts({
          lockInfo: lockAccountInfo,
          lockAccount: selectedLock.publicKey,
          lockAta: LockAccountAta,
          feeAta: feeAta,
          signerAta: userAta,
          signer: payer,
          mint: new PublicKey(mint),
          tokenProgram: TOKEN_PROGRAM_ID,
          feeGuacAta: feeGuacAta,
          signerGuacAta: userGuacAta,
          creator: selectedLock.account.creator,
        })
        .instruction();
      tx.add(ix);
      const sig = await sendTransaction(tx, connection, {
        skipPreflight: true,
      });
      toast({
        variant: "success",
        title: "Lock Created Successfully!",
        description: (
          <div className="flex flex-col gap-1">
            <p>Transaction sent successfully.</p>
            <Link href={`https://solscan.io/tx/${sig}`} target="_blank">
              View on solscan
            </Link>
          </div>
        ),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      console.log("Error", error);
    }
  };
  const getVaultByLpMint = async (mintAdr: string) => {
    try {
      const vaultList = await getAllVaults();
      const vault = vaultList.find(
        (elm) => elm.account.mint.toBase58() == mintAdr
      );
      return vault;
    } catch (error) {
      return null;
    }
  };
  const handleCloseVault = async (mint: string): Promise<string | null> => {
    try {
      const [lockAccount, _] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(anchor.utils.bytes.utf8.encode("guac_lock_pool")),
          publicKey.toBuffer(),
          new PublicKey(mint).toBuffer(),
        ],
        program.programId
      );
      const vaults = await getAllVaults();
      const selectedLock = vaults.find(
        (elm) => elm.account.mint.toBase58() == mint
      );
      const { pubkey: LockAccountAta, ix: lockAccountAtaIx } =
        await getTokenAccount(
          connection,
          new PublicKey(mint),
          publicKey,
          lockAccount,
          true
        );
      const { pubkey: userAta, ix: userAtaIx } = await getTokenAccount(
        connection,
        new PublicKey(mint),
        publicKey,
        publicKey,
        false
      );

      const ix = await program.methods
        .closePool()
        .accounts({
          lockAccount: lockAccount,
          lockAta: LockAccountAta,
          signerAta: userAta,
          signer: publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          mint: new PublicKey(mint),
        })
        .instruction();
      const tx = new Transaction().add(ix);
      const sig = await sendTransaction(tx, connection);
      console.log("Sig", sig);

      toast({
        variant: "success",
        title: "Amount Withdrawn Successfully!",
        description: (
          <div className="flex flex-col gap-1">
            <p>Transaction sent successfully.</p>
            <Link href={`https://solscan.io/tx/${sig}`} target="_blank">
              View on solscan
            </Link>
          </div>
        ),
      });
      return sig;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });

      return null;
    }
  };
  const getLocksByMint = async (tokenMint: string) => {
    try {
      const locks = (await program.account.deposit.all()).filter(
        (elm) => elm.account.mint.toBase58() == tokenMint
      );
      return locks;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      return null;
    }
  };
  const handleExtendLock = async (
    amount: number,
    extendTime: number,
    mint: string,
    payer: PublicKey
  ) => {
    try {
      const vaults = await getAllVaults();
      const selectedLock = vaults.find(
        (elm) => elm.account.mint.toBase58() == mint
      );
      const [lockAccountInfo] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(anchor.utils.bytes.utf8.encode("guac_lock_info")),
          payer.toBuffer(),
          new PublicKey(mint).toBuffer(),
        ],
        program.programId
      );
      const { pubkey: LockAccountAta, ix: lockAccountAtaIx } =
        await getTokenAccount(
          connection,
          new PublicKey(mint),
          publicKey,
          selectedLock.publicKey,
          true
        );
      const { pubkey: feeAta, ix: feeAtaIx } = await getTokenAccount(
        connection,
        new PublicKey(mint),
        publicKey,
        new PublicKey("EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC"),
        true
      );
      const { pubkey: userAta, ix: userAtaIx } = await getTokenAccount(
        connection,
        new PublicKey(mint),
        payer,
        payer,
        false
      );
      const { pubkey: feeGuacAta } = await getTokenAccount(
        connection,
        new PublicKey("AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR"),
        publicKey,
        new PublicKey("EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC"),
        true
      );
      const { pubkey: userGuacAta } = await getTokenAccount(
        connection,
        new PublicKey("AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR"),
        payer,
        payer,
        false
      );
      const ix = await program.methods
        .extendAmount(
          new BN(amount),
          new BN(extendTime),
          new BN(500_000_000 * Math.pow(10, 5))
        )
        .accounts({
          lockInfo: lockAccountInfo,
          lockAccount: selectedLock.publicKey,
          lockAta: LockAccountAta,
          feeAta: feeAta,
          signerAta: userAta,
          signer: payer,
          mint: new PublicKey(mint),
          tokenProgram: TOKEN_PROGRAM_ID,
          feeGuacAta: feeGuacAta,
          signerGuacAta: userGuacAta,
          creator: selectedLock.account.creator,
        })
        .instruction();
      const tx = new Transaction();
      tx.add(ix);
      const sig = await sendTransaction(tx, connection, {
        skipPreflight: true,
      });
      toast({
        variant: "success",
        title: "Lock Amount Extended Successfully!",
        description: (
          <div className="flex flex-col gap-1">
            <p>Transaction sent successfully.</p>
            <Link href={`https://solscan.io/tx/${sig}`} target="_blank">
              View on solscan
            </Link>
          </div>
        ),
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    }
  };
  const handleExtendLockTime = async (
    extendTime: number,
    mint: string,
    payer: PublicKey
  ) => {
    try {
      const [lockAccountInfo] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(anchor.utils.bytes.utf8.encode("guac_lock_info")),
          payer.toBuffer(),
          new PublicKey(mint).toBuffer(),
        ],
        program.programId
      );

      const { pubkey: feeGuacAta } = await getTokenAccount(
        connection,
        new PublicKey("AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR"),
        publicKey,
        new PublicKey("EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC"),
        true
      );
      const { pubkey: userGuacAta } = await getTokenAccount(
        connection,
        new PublicKey("AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR"),
        payer,
        payer,
        false
      );
      const ix = await program.methods
        .extendUnlockTime(new BN(extendTime))
        .accounts({
          lockInfo: lockAccountInfo,

          signer: payer,
          mint: new PublicKey(mint),
          tokenProgram: TOKEN_PROGRAM_ID,
          feeGuacAta: feeGuacAta,
          signerGuacAta: userGuacAta,
        })
        .instruction();
      const tx = new Transaction();
      tx.add(ix);
      const sig = await sendTransaction(tx, connection, {
        skipPreflight: true,
      });
      toast({
        variant: "success",
        title: "Lock Time Extended Successfully!",
        description: (
          <div className="flex flex-col gap-1">
            <p>Transaction sent successfully.</p>
            <Link href={`https://solscan.io/tx/${sig}`} target="_blank">
              View on solscan
            </Link>
          </div>
        ),
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    }
  };
  const handleUnlock = async (mint: string, payer: PublicKey) => {
    try {
      const vaults = await getAllVaults();
      const selectedLock = vaults.find(
        (elm) => elm.account.mint.toBase58() == mint
      );

      const [lockAccountInfo] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(anchor.utils.bytes.utf8.encode("guac_lock_info")),
          payer.toBuffer(),
          new PublicKey(mint).toBuffer(),
        ],
        program.programId
      );
      const { pubkey: LockAccountAta } = await getTokenAccount(
        connection,
        new PublicKey(mint),
        publicKey,
        selectedLock.publicKey,
        true
      );
      const { pubkey: userAta } = await getTokenAccount(
        connection,
        new PublicKey(mint),
        payer,
        payer,
        false
      );
      // Add your test here.
      const ix = await program.methods
        .closeAndWithdraw()
        .accounts({
          lockAccount: selectedLock.publicKey,
          lockAta: LockAccountAta,
          lockInfo: lockAccountInfo,
          creator: selectedLock.account.creator,
          signerAta: userAta,
          signer: payer,
          mint: mint,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .instruction();
      const tx = new Transaction();
      tx.add(ix);
      const sig = await sendTransaction(tx, connection, {
        skipPreflight: true,
      });
      toast({
        variant: "success",
        title: "Lock Unlocked Successfully!",
        description: (
          <div className="flex flex-col gap-1">
            <p>Transaction sent successfully.</p>
            <Link href={`https://solscan.io/tx/${sig}`} target="_blank">
              View on solscan
            </Link>
          </div>
        ),
      });
      console.log("Your transaction signature", tx);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      console.log("Error", error);
    }
  };
  return {
    initNewVault,
    getAllVaults,
    handleCreateNewLock,
    handleCloseVault,
    getFirstLockByLp,
    getVaultByLpMint,
    getLocksByMint,
    getLocksByOwner,
    getLockerByAdr,
    handleExtendLock,
    handleExtendLockTime,
    handleUnlock,
    getTotalVaults,
  };
};
export default useLockerTools;
