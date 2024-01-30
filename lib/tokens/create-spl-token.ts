import {
  Metaplex,
  MetaplexFileTag,
  bundlrStorage,
  token,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey
} from "@solana/web3.js";

// export async function createSPLToken(
//   owner: PublicKey,
//   wallet: WalletContextState,
//   connection: Connection,
//   quantity: number,
//   decimals: number,
//   isChecked: boolean,
//   tokenName: string,
//   symbol: string,
//   metadataURL: string,
//   description: string,
//   file:
//     | Readonly<{
//         buffer: Buffer;
//         fileName: string;
//         displayName: string;
//         uniqueName: string;
//         contentType: string | null;
//         extension: string | null;
//         tags: MetaplexFileTag[];
//       }>
//     | undefined,
//   metadataMethod: string,
//   setIscreating: Dispatch<SetStateAction<boolean>>,
//   setTokenAddresss: Dispatch<SetStateAction<string>>,
//   setSignature: Dispatch<SetStateAction<string>>,
//   setError: Dispatch<SetStateAction<string>>
// ) {
//   try {
//     setIscreating(true);
//     setTokenAddresss("");

//     const metaplex = Metaplex.make(connection)
//       .use(walletAdapterIdentity(wallet))
//       .use(bundlrStorage());

//     const mint_rent = await Token.getMinBalanceRentForExemptMint(connection);

//     const mint_account = Keypair.generate();

//     let InitMint: TransactionInstruction;

//     const [metadataPDA] = PublicKey.findProgramAddressSync(
//       [
//         Buffer.from("metadata"),
//         PROGRAM_ID.toBuffer(),
//         mint_account.publicKey.toBuffer(),
//       ],
//       PROGRAM_ID
//     );

//     let URI: string = "";

//     if (metadataMethod == "url") {
//       if (metadataURL != "") {
//         URI = metadataURL;
//       } else {
//         setIscreating(false);
//         setError("Please provide a metadata URL!");
//       }
//     } else {
//       if (file) {
//         const ImageUri = await metaplex.storage().upload(file);

//         if (ImageUri) {
//           const { uri } = await metaplex.nfts().uploadMetadata({
//             name: tokenName,
//             symbol: symbol,
//             description: description,
//             image: ImageUri,
//           });
//           if (uri) {
//             URI = uri;
//           }
//         }
//       } else {
//         setIscreating(false);
//         setError("Please provide an image file!");
//       }
//     }

//     if (URI != "") {
//       const tokenMetadata: DataV2 = {
//         name: tokenName,
//         symbol: symbol,
//         uri: URI,
//         sellerFeeBasisPoints: 0,
//         creators: null,
//         collection: null,
//         uses: null,
//       };

//       const args = {
//         data: tokenMetadata,
//         isMutable: true,
//         collectionDetails: null,
//       };

//       const createMintAccountInstruction = await SystemProgram.createAccount({
//         fromPubkey: owner,
//         newAccountPubkey: mint_account.publicKey,
//         space: MintLayout.span,
//         lamports: mint_rent,
//         programId: TOKEN_PROGRAM_ID,
//       });

//       if (isChecked) {
//         InitMint = await Token.createInitMintInstruction(
//           TOKEN_PROGRAM_ID,
//           mint_account.publicKey,
//           decimals,
//           owner,
//           owner
//         );
//       } else {
//         InitMint = await Token.createInitMintInstruction(
//           TOKEN_PROGRAM_ID,
//           mint_account.publicKey,
//           decimals,
//           owner,
//           null
//         );
//       }

//       const associatedTokenAccount = await Token.getAssociatedTokenAddress(
//         ASSOCIATED_TOKEN_PROGRAM_ID,
//         TOKEN_PROGRAM_ID,
//         mint_account.publicKey,
//         owner
//       );

//       const createATAInstruction =
//         await Token.createAssociatedTokenAccountInstruction(
//           ASSOCIATED_TOKEN_PROGRAM_ID,
//           TOKEN_PROGRAM_ID,
//           mint_account.publicKey,
//           associatedTokenAccount,
//           owner,
//           owner
//         );

//       const mintInstruction = await Token.createMintToInstruction(
//         TOKEN_PROGRAM_ID,
//         mint_account.publicKey,
//         associatedTokenAccount,
//         owner,
//         [],
//         quantity * 10 ** decimals
//       );

//       const MetadataInstruction = createCreateMetadataAccountV3Instruction(
//         {
//           metadata: metadataPDA,
//           mint: mint_account.publicKey,
//           mintAuthority: owner,
//           payer: owner,
//           updateAuthority: owner,
//         },
//         {
//           createMetadataAccountArgsV3: args,
//         }
//       );

//       const createAccountTransaction = new Transaction().add(
//         createMintAccountInstruction,
//         InitMint,
//         createATAInstruction,
//         mintInstruction,
//         MetadataInstruction
//       );

//       const createAccountSignature = await wallet.sendTransaction(
//         createAccountTransaction,
//         connection,
//         { signers: [mint_account] }
//       );

//       const createAccountconfirmed = await connection.confirmTransaction(
//         createAccountSignature,
//         "confirmed"
//       );

//       const signature = createAccountSignature.toString();

//       if (createAccountconfirmed) {
//         setIscreating(false);
//         setTokenAddresss(mint_account.publicKey.toBase58());
//         setSignature(signature);
//       }
//     }
//   } catch (error) {
//     throw error;
//   }
// }
export async function createSPLToken(
  owner: PublicKey,
  wallet: WalletContextState,
  connection: Connection,
  quantity: number,
  decimals: number,
  isChecked: boolean,
  tokenName: string,
  symbol: string,
  metadataURL: string,
  description: string,
  file:
    | Readonly<{
        buffer: Buffer;
        fileName: string;
        displayName: string;
        uniqueName: string;
        contentType: string | null;
        extension: string | null;
        tags: MetaplexFileTag[];
      }>
    | undefined,
  metadataMethod: string
): Promise<string> {
  try {
    const metaplex = Metaplex.make(connection)
      .use(walletAdapterIdentity(wallet))
      .use(
        bundlrStorage({
          address: "https://devnet.bundlr.network",
          providerUrl: "https://solana-devnet.g.alchemy.com/v2/DjYXduI63_lr9Vh7oz0cQ3bpPPQY-6SW",
          timeout: 60000,
        })
      );
    const sftBuilder = await metaplex
      .nfts()
      .builders()
      .createSft({
        name: tokenName,
        symbol: symbol,
        decimals: decimals,
        mintAuthority: metaplex.identity(),
        updateAuthority: metaplex.identity(),
        tokenOwner: owner,
        creators: [
          {
            address: owner,
            share: 100,
          },
        ],
        uri: metadataURL,
        sellerFeeBasisPoints: null,
        isMutable: true,
      });
    const { mintAddress } = sftBuilder.getContext();
    await metaplex
      .rpc()
      .sendAndConfirmTransaction(sftBuilder, { commitment: "confirmed" });
    // Add a timeout here (e.g., 5 seconds)
    const mintingTimeout = 5000; // 5 seconds
    await new Promise((resolve) => setTimeout(resolve, mintingTimeout));
    const sft = await metaplex.nfts().findByMint({ mintAddress: mintAddress });
    let mintBuilder = metaplex
      .nfts()
      .builders()
      .mint({
        nftOrSft: sft,
        toOwner: owner,
        amount: token(quantity * decimals),
      });
    const resp = await metaplex
      .rpc()
      .sendAndConfirmTransaction(mintBuilder, { commitment: "confirmed" });
    return resp.signature;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}
