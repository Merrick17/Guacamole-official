import {
  DataV2,
  createCreateMetadataAccountV2Instruction,
} from "@metaplex-foundation/mpl-token-metadata";

import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import {
  ExtensionType,
  getMintLen,
} from "../../node_modules/@solana/spl-token";

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
  NonTransferable?: boolean
) => {
  try {
    console.log("Token Name", tokenName);
    console.log("Symbol", symbol);
    console.log("Owner", owner);
    console.log("URI", metadataUri);
    const mintKeypair = Keypair.generate();
    const mint = mintKeypair.publicKey;
    const transferFeeConfigAuthority = Keypair.generate();
    const withdrawWithheldAuthority = Keypair.generate();

    const extensions = [ExtensionType.TransferFeeConfig];

    const mintLen = getMintLen(extensions);
    const decimals = 9;
    const feeBasisPoints = 50;
    const maxFee = BigInt(5_000);
    const metaplex = Metaplex.make(connection).use(
      walletAdapterIdentity(wallet)
    );
    const metadataPDA = metaplex.nfts().pdas().metadata({ mint });

    // onchain metadata format
    const tokenMetadata = {
      name: tokenName,
      symbol: symbol,
      uri: metadataUri,
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    } as DataV2;

    // transaction to create metadata account
    const transaction = new Transaction().add(
      createCreateMetadataAccountV2Instruction(
        {
          metadata: metadataPDA,
          updateAuthority: owner,
          mint: mint,
          mintAuthority: owner,
          payer: owner,
        },
        {
          createMetadataAccountArgsV2: {
            data: tokenMetadata,

            isMutable: true,
          },
        }
      )
    );
    const tx = await wallet.sendTransaction(transaction, connection);
    console.log("TX", tx);

    // const mintLamports = await connection.getMinimumBalanceForRentExemption(
    //   mintLen
    // );
    // const mintTransaction = new Transaction().add(
    //   SystemProgram.createAccount({
    //     fromPubkey: owner,
    //     newAccountPubkey: mint,
    //     space: mintLen,
    //     lamports: mintLamports,
    //     programId: TOKEN_2022_PROGRAM_ID,
    //   }),
    //   createInitializeTransferFeeConfigInstruction(
    //     mint,
    //     transferFeeConfigAuthority.publicKey,
    //     withdrawWithheldAuthority.publicKey,
    //     feeBasisPoints,
    //     maxFee,
    //     TOKEN_2022_PROGRAM_ID
    //   ),
    //   createInitializeMintInstruction(
    //     mint,
    //     decimals,
    //     owner,
    //     null,
    //     TOKEN_2022_PROGRAM_ID
    //   )
    // );
    // const sig = await wallet.sendTransaction(mintTransaction, connection, {
    //   signers: [mintKeypair],
    // });

    // return sig;
  } catch (error) {
    throw error;
  }
};
