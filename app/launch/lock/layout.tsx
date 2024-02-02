import { JupiterApiProvider } from "@/components/views/trade/src/contexts";
import { LockerProvider } from "@/context/locker.context";
import { PoolProvider } from "@/hooks/use-pool-list";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Solana Token Liquidity Lockers Program | Guacamole",
};
const PoolLayout = ({ children }: { children: any }) => {
  return (
    <PoolProvider>
      <LockerProvider>
        <>{children}</>
      </LockerProvider>
    </PoolProvider>
  );
};

export default PoolLayout;
