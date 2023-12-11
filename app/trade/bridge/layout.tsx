import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: " Easily Bridge To Solana | Guacamole",
  description:
    "Seamlessly bridge your assets to Solana with our cutting-edge Bridge Swap service. Convert ETH, BNB, AVAX, and ARB into Solana's native tokens like GUAC with ease and efficiency. Experience fast, secure, and cost-effective swaps to optimize your digital portfolio on the Solana blockchain",
  openGraph: {
    images: "/images/seo/trade.png",
  },
};
const layout = ({ children }: { children: any }) => {
  return <>{children}</>;
};

export default layout;
