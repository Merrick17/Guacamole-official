import { JupiterApiProvider } from "@/components/views/trade/src/contexts";
import { LockerProvider } from "@/context/locker.context";
import { PoolProvider } from "@/hooks/use-pool-list";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Liquidity Lockers | Guacamole",
  description:
    "Guacamole’s liquidity lockers help keep trading on Solana safer! Explore other token liquidity locks or verifiably lock your project’s liquidity tokens in time-vested contracts or forever! Currently works with Raydium, Meteora, and more.",
  openGraph: {
    images: ["/images/seo/launch.png"],
  },
};
const PoolLayout = ({ children }: { children: any }) => {
  return (
    <PoolProvider>
      <LockerProvider>
        <JupiterApiProvider>{children}</JupiterApiProvider>
      </LockerProvider>
    </PoolProvider>
  );
};

export default PoolLayout;
