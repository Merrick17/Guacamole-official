"use client";

import { PerceptualTable } from "@/components/views/trade/perceptual-table";
import { ProductMap } from "@/components/views/trade/perpetual-constants";
import PerceptualForm from "@/components/views/trade/perpetuals-form";
import SelectTradingAccount from "@/components/views/trade/select-trading-account";
import TableDetails from "@/components/views/trade/table-details";
import {
  Leverage,
  Price,
  dexterity,
  useManifest,
  useProduct,
  useTrader,
} from "@/context/dexterity";
import { WebSocketProvider } from "@/context/websocket";
import { cn } from "@/lib/utils";
import { DexterityWallet } from "@hxronetwork/dexterity-ts";
import { useWallet } from "@solana/wallet-adapter-react";
import { GetProgramAccountsFilter, PublicKey } from "@solana/web3.js";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
import { useToast } from "@/hooks/use-toast";
const TVChartContainer = dynamic(
  () => import("@/components/views/trade/TVChart"),
  {
    ssr: false,
  }
);

const Perceptual = () => {
  const {
    markPrice,
    setProductLeverage,
    setIndexPrice,
    setMarkPrice,
    selectedProduct,
  } = useProduct();
  const { trader } = useTrader();
  const UNINITIALIZED = new PublicKey("11111111111111111111111111111111");
  const USDC_MINT = new PublicKey(
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  );
  const { connected } = useWallet();
  const { setManifest, manifest } = useManifest();
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const [usdcBalance, setUsdcBalance] = useState(0);

  useMemo(async () => {
    const DexWallet: DexterityWallet = {
      publicKey: publicKey!,
      signTransaction,
      signAllTransactions,
    };
    console.log({ DexWallet });
    const rpc ="https://rpc.helius.xyz/?api-key=9591f472-d97d-435c-a19c-d2514202d6d7"
    //const rpc =
      //"https://flashy-frosty-energy.solana-mainnet.discover.quiknode.pro/d43909b1eb698964f230e00afe18c673d10e5c0f/";
    //clusterApiUrl(network)
    const manifest = await dexterity.getManifest(rpc, true, DexWallet);
    console.log("Manifest: ", manifest);
    setManifest(manifest);
  }, [publicKey]);

  const { toast } = useToast();

  useMemo(async () => {
    if (!manifest || !publicKey) return;
    const filters: GetProgramAccountsFilter[] = [
      {
        dataSize: 165,
      },
      {
        memcmp: {
          offset: 32,
          bytes: publicKey.toBase58(),
        },
      },

      {
        memcmp: {
          offset: 0,
          bytes: USDC_MINT.toBase58(),
        },
      },
    ];

    const connection = manifest.fields.connection;
    const accounts = await connection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID,
      { filters: filters }
    );

    const balance =
      accounts[0].account.data["parsed"]["info"]["tokenAmount"]["uiAmount"];
    setUsdcBalance(balance);
  }, [toast, publicKey, manifest]);

  const updatePrices = useCallback(async () => {
    if (trader) {
      try {
        await trader.updateMarkPrices();
        const productMarkArray: Price[] = [];
        const productIndexArray: Price[] = [];
        for (const [productName, obj] of dexterity.Manifest.GetProductsOfMPG(
          trader.mpg
        )) {
          if (!productName.includes('OPOS0D')) {

            if (!ProductMap.get(productName.trim())) {
              continue;
            }

          }
          const { index: productIndex, product } = obj;
          const meta = dexterity.productToMeta(product);
          if (meta.productKey.equals(UNINITIALIZED)) {
            continue;
          }
          if (product.combo?.combo) {
            continue;
          }
          const index = Number(
            dexterity.Manifest.GetIndexPrice(trader.markPrices, meta.productKey)
          );
          const mark = Number(
            dexterity.Manifest.GetMarkPrice(trader.markPrices, meta.productKey)
          );
          productMarkArray.push({ index: productIndex, price: mark });
          productIndexArray.push({ index: productIndex, price: index });
        }
        setMarkPrice(productMarkArray);
        setIndexPrice(productIndexArray);
        console.log({productMarkArray, productIndexArray})
      } catch (error) {
        console.error("Error updating prices:", error);
      }
    }
  }, [trader, setIndexPrice, setMarkPrice, selectedProduct]);

  const updateLeverage = useCallback(async () => {
    if (trader && markPrice) {
      const leverageArr: Leverage[] = [];

      for (const [productName, obj] of dexterity.Manifest.GetProductsOfMPG(
        trader.mpg
      )) {

        if (!productName.includes('OPOS0D')){
          if (!ProductMap.get(productName.trim())) {
            continue;
          }
        }
        
        const { index: productIndex, product } = obj;

        await manifest.updateCovarianceMetadatas();
        const productKey =
          product.outright.outright.metadata.productKey.toBase58();
        let currMarginReq: number = 0;
        const stds = new Map(manifest.getStds(trader.marketProductGroup));
        for (const [k, v] of stds) {
          if (k === productKey) {
            currMarginReq = v * 3;
            break;
          }
        }
        const leverage: number = Number(
          (
            markPrice.find((p) => p.index === productIndex).price /
            currMarginReq
          ).toFixed(2)
        );

        leverageArr.push({ index: productIndex, lev: leverage });
      }
      setProductLeverage(leverageArr);
    }
  }, [markPrice, trader]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updatePrices();
      updateLeverage();
    }, 500);
    return () => clearInterval(intervalId);
  }, [updatePrices, trader]);

  //const
  return (
    <>
      <WebSocketProvider>
        <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
          <div
            className={cn(
              "flex flex-col gap-10  w-full z-20  rounded-lg bg-background  "
            )}
          >
            <div className="w-full bg-foreground grid  z-20  grid-cols-1 lg:grid-cols-12 gap-[10px] px-5 py-7">
              <div className="flex flex-1 justify-center col-span-1 lg:col-span-8">
                <TVChartContainer productSelect={"SOLUSD-PERP"} />
              </div>
              <div className="col-span-1 lg:col-span-4 ">
                <PerceptualForm />
              </div>
            </div>
            {connected && trader && (
              <>
                <div className="w-full bg-foreground grid  z-20  grid-cols-1 lg:grid-cols-12 gap-[10px] px-5 py-7">
                  <div className="flex flex-1 justify-center  col-span-1  lg:col-span-4">
                    <PerceptualTable />
                  </div>
                  <div className="col-span-1 lg:col-span-4 ">
                    <TableDetails />
                  </div>
                  <div className="col-span-1 lg:col-span-4 ">
                    <SelectTradingAccount />
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </WebSocketProvider>
    </>
  );
};

export default Perceptual;
