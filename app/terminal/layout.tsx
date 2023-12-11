import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: " Solana Market Data & Insights | Guacamole",
  description:
    "The Guacamole Solana terminal provides an all-in-one cryptocurrency hub for easy token trading and tracking. Swap leading tokens, monitor real-time performance charts, and access indepth market data on everything from protocols to NFT performance.",
  openGraph: {
    images: "/images/seo/terminal.png",
  },
};
const layout = ({ children }: { children: any }) => {
  return <>{children}</>;
};

export default layout;
