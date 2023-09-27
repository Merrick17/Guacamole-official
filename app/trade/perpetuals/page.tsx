"use client";

import { PerceptualTable } from "@/components/views/trade/perceptual-table";
import PerceptualForm from "@/components/views/trade/perpetuals-form";
import TableDetails from "@/components/views/trade/table-details";
import { dexterity, useProduct, useTrader } from "@/context/dexterity";
import { WebSocketProvider } from "@/context/websocket";
import { cn } from "@/lib/utils";
import { PublicKey } from "@solana/web3.js";
import dynamic from "next/dynamic";
import { useCallback, useMemo } from "react";
const TVChartContainer = dynamic(
  () => import("@/components/views/trade/TVChart"),
  {
    ssr: false,
  }
);
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const Perceptual = () => {
  const {
    markPrice,
    indexPrice,
    setIndexPrice,
    setMarkPrice,
    selectedProduct,
  } = useProduct();
  const { trader } = useTrader();
  const UNINITIALIZED = new PublicKey("11111111111111111111111111111111");

  const updatePrices = useCallback(async () => {
    if (trader) {
      for (const [productName, obj] of dexterity.Manifest.GetProductsOfMPG(
        trader.mpg
      )) {
        if (!productName.includes(selectedProduct.name)) {
          continue;
        }
        const { index: productIndex, product } = obj;
        const meta = dexterity.productToMeta(product);
        if (meta.productKey.equals(UNINITIALIZED)) {
          continue;
        }
        if (product.combo?.combo) {
          continue;
        }

        await trader.updateMarkPrices();

        const index = Number(
          dexterity.Manifest.GetIndexPrice(trader.markPrices, meta.productKey)
        );
        const mark = Number(
          dexterity.Manifest.GetMarkPrice(trader.markPrices, meta.productKey)
        );
        setIndexPrice(index);
        setMarkPrice(mark);
      }
    }
  }, [trader, setIndexPrice, setMarkPrice, selectedProduct]); // Removed markPrice and indexPrice

  useMemo(() => {
    const intervalId = setInterval(() => {
      updatePrices();
    }, 500);

    return () => clearInterval(intervalId);
  }, [updatePrices]);
  //const
  return (
    <>
      <WebSocketProvider>
        <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
          <div
            className={cn(
              "grid  w-full z-20  grid-cols-1 lg:grid-cols-6 gap-[10px] rounded-lg bg-foreground px-5 py-7 "
            )}
          >
            <div className="flex flex-1 justify-center col-span-4">
              <TVChartContainer productSelect={"SOLUSD-PERP"} />
            </div>

            <div className="col-span-2 ">
              <PerceptualForm />
            </div>
            <div className="flex flex-1 justify-center col-span-4">
              <PerceptualTable />
            </div>

            <div className="col-span-2 ">
              <TableDetails />
            </div>
          </div>
        </main>
      </WebSocketProvider>
    </>
  );
};

export default Perceptual;
