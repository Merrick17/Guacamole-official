import { Metadata } from "next";
import React from "react";
import { RiperottenProvider } from "./riperotten.provider";
export const metadata: Metadata = {
  title: "Gamified Crypto Futures | Guacamole",
  description:
    "Step into the future of trading with our gamified crypto futures platform, where you can leverage margin to engage in perpetual futures markets for BTC, ETH, SOL, and more. Enjoy an immersive trading experience with interactive features and intuitive integrations tailored for both novice and experienced traders.",
  openGraph: {
    images: "/images/seo/trade.png",
  },
};
const layout = ({ children }) => {
  return <RiperottenProvider>{children}</RiperottenProvider>;
};

export default layout;
