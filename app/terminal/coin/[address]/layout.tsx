"use client"
import { JupiterApiProvider } from "@/components/views/trade/src/contexts";
import { SelectedTokenProvider } from "@/context/coin-details";
import React from "react";

const Layout = ({ children }: { children: any }) => {
  return (
    <JupiterApiProvider>
      <SelectedTokenProvider>{children}</SelectedTokenProvider>
    </JupiterApiProvider>
  );
};

export default Layout;
