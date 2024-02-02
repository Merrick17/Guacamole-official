import {
  Metaplex,
  MetaplexFile,
  bundlrStorage,
  toMetaplexFileFromBrowser,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";

const uploadMetaData = async (
  wallet: WalletContextState,
  connection: Connection,
  file: File,
  name: string,
  description: string,
  symbol: string
) => {
  //console.log("File", file);
  const metaplex = Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet))
    .use(
      bundlrStorage({
        // address: "https://devnet.bundlr.network",
        // providerUrl:
        //   "https://solana-devnet.g.alchemy.com/v2/DjYXduI63_lr9Vh7oz0cQ3bpPPQY-6SW",
        // timeout: 60000,
      })
    );
  const metaplexFile: MetaplexFile = await toMetaplexFileFromBrowser(file);
  const imageUri = await metaplex.storage().upload(metaplexFile);
  //console.log("image uri:", imageUri);

  // upload metadata and get metadata uri (off chain metadata)
  const { uri } = await metaplex.nfts().uploadMetadata({
    name: name,
    description: description,
    image: imageUri,
    symbol: symbol,
  });
  return uri;
};

export { uploadMetaData };
