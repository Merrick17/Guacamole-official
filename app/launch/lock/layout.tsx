"use client";
import { JupiterApiProvider } from "@/components/views/trade/src/contexts";
import { PoolProvider } from "@/hooks/use-pool-list";
import React from "react";

const PoolLayout = ({ children }: { children: any }) => {
  return (
    <PoolProvider>
      <JupiterApiProvider>{children}</JupiterApiProvider>
    </PoolProvider>
  );
};

export default PoolLayout;
