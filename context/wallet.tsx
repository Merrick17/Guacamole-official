"use client";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// import {
//   BackpackWalletAdapter,
//   PhantomWalletAdapter,
// } from "@solana/wallet-adapter-wallets";
// import React, { FC, useMemo } from "react";
// import { ManifestProvider, ProductProvider, TraderProvider } from "./dexterity";
// import { NetworkConfigurationProvider } from "./network-configuration";

// // Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

// interface WalletProps {
//   children: React.ReactNode;
// }

// export const Wallet: FC<WalletProps> = ({ children }) => {
//   // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
//   const network = WalletAdapterNetwork.Devnet;

//   // You can also provide a custom RPC endpoint.
//   // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
//   const endpoint =
//     "https://rpc.helius.xyz/?api-key=9591f472-d97d-435c-a19c-d2514202d6d7";

//   const wallets = useMemo(
//     () => [
//       /**
//        * Wallets that implement either of these standards will be available automatically.
//        *
//        *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
//        *     (https://github.com/solana-mobile/mobile-wallet-adapter)
//        *   - Solana Wallet Standard
//        *     (https://github.com/solana-labs/wallet-standard)
//        *
//        * If you wish to support a wallet that supports neither of those standards,
//        * instantiate its legacy wallet adapter here. Common legacy adapters can be found
//        * in the npm package `@solana/wallet-adapter-wallets`.
//        */
//       new PhantomWalletAdapter(),

//       new BackpackWalletAdapter(),

//       //new SlopeWalletAdapter(),
//     ],
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [network]
//   );

//   return (
//     <NetworkConfigurationProvider>
//       <ManifestProvider>
//         <TraderProvider>
//           <ConnectionProvider endpoint={endpoint}>
//             <WalletProvider wallets={wallets}>
//               <ProductProvider>
//                 <WalletModalProvider>{children}</WalletModalProvider>
//               </ProductProvider>
//             </WalletProvider>
//           </ConnectionProvider>
//         </TraderProvider>
//       </ManifestProvider>
//     </NetworkConfigurationProvider>

//   );
// };
import dexterityTs from "@hxronetwork/dexterity-ts";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
  WalletConnectWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import dynamic from "next/dynamic";
import { FC, ReactNode, useCallback, useMemo } from "react";
// import { notify } from "../utils/notifications";
import { JupiterApiProvider } from "@/components/views/trade/src/contexts";
import { BraveWalletAdapter } from "@/components/wallets/bravewallet";
import { OKXWalletAdapter } from "@/components/wallets/okxwallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MarinadeProvider } from "./Marinade";
import { AutoConnectProvider, useAutoConnect } from "./autoconnect";
import { ManifestProvider, ProductProvider, TraderProvider } from "./dexterity";
import {
  NetworkConfigurationProvider,
  useNetworkConfiguration,
} from "./network-configuration";
import {
  BitgetWalletAdapter,
  BitgetWalletName,
} from "@/components/wallets/bitgetwallet";
export const dexterity = dexterityTs;

const ReactUIWalletModalProviderDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);
const queryClient = new QueryClient();
const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { autoConnect } = useAutoConnect();
  const { networkConfiguration } = useNetworkConfiguration();
  // const endpoint =
  //   "https://solana-devnet.g.alchemy.com/v2/DjYXduI63_lr9Vh7oz0cQ3bpPPQY-6SW";
 const endpoint ="https://rpc.helius.xyz/?api-key=9591f472-d97d-435c-a19c-d2514202d6d7";
  // const endpoint =
  //   "https://solana-mainnet.g.alchemy.com/v2/bYvXTPXDlkcg7JxAUXywhMnFHqq6oi1K";
  //const endpoint =      "https://mainnet.helius-rpc.com/?api-key=cc1594d9-3636-48e9-9014-b072380feccb";
  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/solana-labs/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      new PhantomWalletAdapter(),

      new SolflareWalletAdapter(),
      new OKXWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new BraveWalletAdapter(),
      new WalletConnectWalletAdapter({
        network: WalletAdapterNetwork.Mainnet,
        options: {
          relayUrl: "wss://relay.walletconnect.com",
          // example WC app project ID
          projectId: "6004d00df26c760c8cc264cf71a44621",
          metadata: {
            name: "GUACAMOLE",
            description: "GUCAMOLE",
            icons: ["https://avatars.githubusercontent.com/u/35608259?s=200"],
          },
        },
      }),
      new Coin98WalletAdapter(),
      new LedgerWalletAdapter(),
      new TrustWalletAdapter(),
      new BitgetWalletAdapter(),

      //new SlopeWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onError = useCallback((error: WalletError) => {
    //notify({ type: 'error', message: error.message ? `${error.name}: ${error.message}` : error.name });
    console.error(error);
  }, []);

  return (
    // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider
          wallets={wallets}
          onError={onError}
          autoConnect={autoConnect}
        >
          <ReactUIWalletModalProviderDynamic>
            <MarinadeProvider>{children}</MarinadeProvider>
          </ReactUIWalletModalProviderDynamic>
        </WalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <NetworkConfigurationProvider>
        <AutoConnectProvider>
          <ManifestProvider>
            <TraderProvider>
              <ProductProvider>
                {" "}
                <WalletContextProvider>
                  <JupiterApiProvider>{children}</JupiterApiProvider>
                </WalletContextProvider>
              </ProductProvider>
            </TraderProvider>
          </ManifestProvider>
        </AutoConnectProvider>
      </NetworkConfigurationProvider>
    </>
  );
};
