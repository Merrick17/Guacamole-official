"use client";
import { usePool } from "@/hooks/use-pool-list";
import { useToast } from "@/hooks/use-toast";
import { getTokenAccount } from "@/lib/get-ata";
import { getProgram } from "@/program/program";
import * as anchor from "@coral-xyz/anchor";
import { Metaplex } from "@metaplex-foundation/js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import axios from "axios";
import { BN } from "bn.js";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const LockerContext = React.createContext(null);
const LockerProvider = ({ children }) => {
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction } = useWallet();
  const { getPoolByLpMint } = usePool();
  const metaplex = new Metaplex(connection);
  const { toast } = useToast();
  const anchorWallet = useAnchorWallet();
  const program = getProgram(connection, anchorWallet);

  const [vaultsData, setVaultsData] = useState([]);
  const initVaults = async () => {
    const vaults = await getAllVaultsParsed();
    setVaultsData(vaults);
  };
  useEffect(() => {
    initVaults();
  }, []);

  const getPoolInfo = async (lock) => {
    let pool = await getPoolByLpMint(lock.mint);

    if (!pool) {
      throw new Error("Pool information not found");
    }
    if (!pool.baseMint || !pool.quoteMint) {
      pool = await getPoolByLpMint(lock.mint);
      if (!pool) {
        throw new Error("Pool information not found on second attempt");
      }
    }
    const baseInfo = await metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(pool.baseAdr) });
    const quoteInfo = await metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(pool.quoteAdr) });

    const base =
      pool.baseMint && pool.baseMint.logoURI
        ? pool.baseMint
        : {
            symbol: baseInfo.symbol,
            name: baseInfo.name,
            address: baseInfo.address.toBase58(),
            chainId: 101,
            decimals: baseInfo.mint.decimals,
            logoURI: baseInfo?.json?.image,
          };

    const quote =
      pool.quoteMint && pool.quoteMint.logoURI
        ? pool.quoteMint
        : {
            symbol: quoteInfo.symbol,
            name: quoteInfo.name,
            address: quoteInfo.address.toBase58(),
            chainId: 101,
            decimals: quoteInfo.mint.decimals,
            logoURI: quoteInfo?.json?.image,
          };

    return { pool, base, quote };
  };

  const calculateLiquidity = (lock, pool) => {
    const lockedAmount =
      lock.account.lockedAmount.toNumber() / Math.pow(10, pool.lpDecimals);
    const tokenAmount = pool.tokenAmount;
    return Number(((lockedAmount / tokenAmount) * pool.liquidity).toFixed(2));
  };

  const calculateLiquidityRatio = (lock, pool) => {
    const lockedAmount =
      lock.account.lockedAmount.toNumber() / Math.pow(10, pool.lpDecimals);
    return ((lockedAmount / pool.tokenAmount) * 100).toFixed(3);
  };

  const getAllVaultsParsed = async () => {
    const { data: allVaults } = await axios.get(
      "https://corsproxy.io/?https%3A%2F%2F159.223.197.10.nip.io%2Fvaults"
    );

    const mappedVaults = await Promise.all(
      allVaults.map(async (lock) => {
        const { pool, base, quote } = await getPoolInfo(lock);

        return {
          lock,
          pool,
          base,
          quote,
          lockedLiquidity: lock.lockedLiquidityUSD,
          ratio: lock.percentageUSD,
        };
      })
    );

    // Sort mappedVaults by liquidity in descending order
    mappedVaults.sort((a, b) => b.lockedLiquidity - a.lockedLiquidity);

    return mappedVaults;
  };
  const getPaginatedData = (currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return vaultsData.slice(startIndex, endIndex);
  };
  const getAllVaultsParsedAndPaginated = async (
    pageNumber = 1,
    pageSize = 10
  ) => {
    const allVaults = await program.account.lockerAccount.all();
    const mappedVaults = await Promise.all(
      allVaults.map(async (lock) => {
        const { pool, base, quote } = await getPoolInfo(lock);

        return {
          lock,
          pool,
          base,
          quote,
          lockedLiquidity: calculateLiquidity(lock, pool),
          ratio: calculateLiquidityRatio(lock, pool),
        };
      })
    );

    // Sort mappedVaults by liquidity in descending order
    mappedVaults.sort((a, b) => b.lockedLiquidity - a.lockedLiquidity);

    // Calculate start and end indices for pagination
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Return the subset of mappedVaults based on pagination
    return mappedVaults.slice(startIndex, endIndex);
  };
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
      const selectedLock = await getVaultByLpMint(mint);

      if (selectedLock) {
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
      }
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
      const mintPublicKey = new PublicKey(mintAdr);

      // Assuming the program's RPC interface supports direct filtering by mint
      const filters = [
        { memcmp: { offset: 16, bytes: mintPublicKey.toBase58() } },
      ];
      const vaultList = await program.account.lockerAccount.all(filters);
      //console.log("Vault List",vaultList);
      const vault = vaultList ? vaultList[0] : null;
      // const vaultList = await program.account.lockerAccount.all();
      // const vault = vaultList.find(
      //   (elm) => elm.account.mint.toBase58() == mintAdr
      // );
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
  // const getLocksByMint = async (tokenMint: string) => {
  //   try {
  //     const locks = (await program.account.deposit.all()).filter(
  //       (elm) => elm.account.mint.toBase58() == tokenMint
  //     );
  //     return locks;
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: error.message,
  //     });
  //     return null;
  //   }
  // };
  const getLocksByMint = async (tokenMint: string) => {
    try {
      const mintPublicKey = new PublicKey(tokenMint);

      // Assuming the program's RPC interface supports direct filtering by mint
      const filters = [
        { memcmp: { offset: 16, bytes: mintPublicKey.toBase58() } },
      ];
      const locks = await program.account.deposit.all(filters);
      console.log("lock", locks[0].account.mint.toBase58());
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
      const selectedLock = await getVaultByLpMint(mint);
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
      const selectedLock = await getVaultByLpMint(mint);

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

  const contextValue = {
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
    getAllVaultsParsed,
    getAllVaultsParsedAndPaginated,
    vaultsData,
    getPaginatedData,
  };

  return (
    <LockerContext.Provider value={contextValue}>
      {children}
    </LockerContext.Provider>
  );
};
const useLockerTools = () => {
  const context = useContext(LockerContext);

  if (context === undefined) {
    throw new Error("useLocker must be used within a LockerProvider");
  }

  return context;
};

export { LockerProvider, useLockerTools };
