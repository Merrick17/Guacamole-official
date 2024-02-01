import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import {
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  createMetadataAccountV3,
  mplTokenMetadata,
  createV1,
  TokenStandard,
  mintV1,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity as UmiWalletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  ExtensionType,
  TOKEN_2022_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createInitializeTransferFeeConfigInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  getMintLen,
  AccountState,
  createInitializeNonTransferableMintInstruction,
  createInitializeDefaultAccountStateInstruction,
} from "../../node_modules/@solana/spl-token";
import {
  fromWeb3JsPublicKey,
  toWeb3JsPublicKey,
} from "@metaplex-foundation/umi-web3js-adapters";
import { percentAmount } from "@metaplex-foundation/umi";
// export const createNewToken = async (
//   owner: PublicKey,
//   wallet: WalletContextState,
//   connection: Connection,
//   name: string,
//   symbol: string,
//   metadataUri: string,
//   quantity: number,
//   decimals: number
// ) => {
//   try {
//     const rpcEndpoint =
//       "https://solana-devnet.g.alchemy.com/v2/DjYXduI63_lr9Vh7oz0cQ3bpPPQY-6SW";
//     const umi = createUmi(rpcEndpoint)
//       .use(walletAdapterIdentity(wallet))
//       .use(mplCandyMachine())
//       .use(mplTokenMetadata());
//     const mint = generateSigner(umi);
//     const SPL_TOKEN_2022_PROGRAM_ID: PublicKey = new PublicKey(
//       "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
//     );
//     await createV1(umi, {
//       mint,
//       authority: umi.identity,
//       name: name,
//       uri: metadataUri,
//       sellerFeeBasisPoints: percentAmount(5.5),
//       splTokenProgram: SPL_TOKEN_2022_PROGRAM_ID as any,
//       tokenStandard: TokenStandard.Fungible,
//       decimals: decimals,
//       symbol: symbol,
//     }).sendAndConfirm(umi);
//     const resp = await mintV1(umi, {
//       mint: mint.publicKey,
//       authority: umi.identity,
//       amount: quantity * Math.pow(10, decimals),
//       tokenOwner: umi.identity.publicKey,
//       splTokenProgram: SPL_TOKEN_2022_PROGRAM_ID as any,
//       tokenStandard: TokenStandard.Fungible,
//     }).sendAndConfirm(umi);
//     return resp.signature.toString();
//   } catch (error) {
//     throw error;
//   }
// };
export const createNewToken = async (
  owner: PublicKey,
  wallet: WalletContextState,
  connection: Connection,
  tokenName: string,
  symbol: string,
  metadataUri: string,
  quantity: number,
  decimals: number,
  transferFeeConfigAuthority: PublicKey,
  withdrawWithheldAuthority: PublicKey,
  feeBasisPoints: number,
  maxFee: number,
  defaultAccountState: AccountState | null,
  NonTransferable?: boolean,
  hasFees?: boolean
) => {
  try {
    const mintKeypair = Keypair.generate();
    const mint = mintKeypair.publicKey;

    let extensions = [];
    if (hasFees) {
      extensions.push(ExtensionType.TransferFeeConfig);
    }
    if (NonTransferable) {
      extensions.push(ExtensionType.NonTransferable);
    }
    if (defaultAccountState) {
      extensions.push(ExtensionType.DefaultAccountState);
    }

    const mintLen = getMintLen(extensions);

    const maxFeeBig = BigInt(maxFee);
    const rpcEndpoint =
      "https://rpc.helius.xyz/?api-key=9591f472-d97d-435c-a19c-d2514202d6d7";
    // const rpcEndpoint =
    //   "https://solana-mainnet.g.alchemy.com/v2/bYvXTPXDlkcg7JxAUXywhMnFHqq6oi1K";
    const umi = createUmi(rpcEndpoint)
      .use(UmiWalletAdapterIdentity(wallet))
      .use(mplCandyMachine())
      .use(mplTokenMetadata());

    const metadataIx: any = createV1(umi, {
      mint: mintKeypair.publicKey as any,
      authority: umi.identity,
      name: tokenName,
      uri: metadataUri,
      sellerFeeBasisPoints: percentAmount(0),
      splTokenProgram: TOKEN_2022_PROGRAM_ID as any,
      tokenStandard: TokenStandard.Fungible,
      decimals: decimals,
      symbol: symbol,
    }).getInstructions()[0];
    metadataIx.keys = metadataIx.keys.map((key) => {
      const newKey = { ...key };
      newKey.pubkey = toWeb3JsPublicKey(key.pubkey);
      return newKey;
    });

    const mintLamports = await connection.getMinimumBalanceForRentExemption(
      mintLen
    );
    let ata = getAssociatedTokenAddressSync(
      mint, // mint
      owner, // owner,
      false,
      TOKEN_2022_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    let mintTransaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: mint,
        space: mintLen,
        lamports: mintLamports,
        programId: TOKEN_2022_PROGRAM_ID,
      })
    );
    if (hasFees) {
      mintTransaction.add(
        createInitializeTransferFeeConfigInstruction(
          mint,
          transferFeeConfigAuthority,
          withdrawWithheldAuthority,
          feeBasisPoints,
          maxFeeBig,
          TOKEN_2022_PROGRAM_ID
        )
      );
    }
    if (NonTransferable) {
      mintTransaction.add(
        createInitializeNonTransferableMintInstruction(
          mint,
          TOKEN_2022_PROGRAM_ID
        )
      );
    }
    if (defaultAccountState) {
      mintTransaction.add(
        createInitializeDefaultAccountStateInstruction(
          mint,
          defaultAccountState,
          TOKEN_2022_PROGRAM_ID
        )
      );
    }
    mintTransaction.add(
      createInitializeMintInstruction(
        mint,
        decimals,
        owner,
        null,
        TOKEN_2022_PROGRAM_ID
      ),
      metadataIx,
      createAssociatedTokenAccountInstruction(
        owner, // payer
        ata, // ata
        owner, // owner
        mint, // mint,
        TOKEN_2022_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
      createMintToInstruction(
        mint,
        ata,
        toWeb3JsPublicKey(umi.identity.publicKey),
        quantity * 10 ** decimals,
        [],
        TOKEN_2022_PROGRAM_ID
      )
    );

    const sig = await wallet.sendTransaction(mintTransaction, connection, {
      signers: [mintKeypair],
    });

    return sig;
  } catch (error) {
    throw error;
  }
};
