import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "The Solana Terminal | Guacamole",
  description:
    "Explore Solana DeFi, Trade Tokens, & Track NFT Statistics on one convenient page so you can make better decisions, faster!",
};
const layout = ({ children }: { children: any }) => {
  return <>{children}</>;
};

export default layout;
