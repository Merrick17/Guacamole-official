"use client"
import { JupiterApiProvider } from "@/components/views/trade/src/contexts";
import React from "react";

const layout = ({ children }: { children: any }) => {
  return <JupiterApiProvider>{children}</JupiterApiProvider>;
};

export default layout;
