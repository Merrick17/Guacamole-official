import DisclaimerMain from "@/components/common/DisclaimerMain";
import Preloader from "@/components/common/preloader";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import LeftSideUtility from "@/components/ui/left-side-utility";
import { Toaster } from "@/components/ui/toaster";
import { Themes } from "@/context/themes";
import { TransitionContextProvider } from "@/context/transition-context";
import { ContextProvider } from "@/context/wallet";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import React from "react";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
//bg-[url('/images/home/Guacamole_BG_Image_v2_1.png')] bg-cover bg-no-repeat"
export const metadata: Metadata = {
  title: " A Fresh Solana Experience | Guacamole",
  description:
    "Experience a fresh take on Solana DeFi with Guacamole. Trade, earn, create, and play effortlessly, while enjoying a seamless and user-friendly experience. Get started and unlock a world of possibilities!",
};
const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={kanit.className}>
        <Themes>
          <TransitionContextProvider>
            {/* <Disclaimer /> */}
            <DisclaimerMain />
            <ContextProvider>
              <Header />
              {/* <WalletDrawer /> */}
              <LeftSideUtility />
              <div className=" min-h-screen relative ">
                <div className="z-10">{children}</div>
                <Analytics />
              </div>
              <Footer />
            </ContextProvider>
            <Toaster />
            {/* <Preloader key={"perloader"} /> */}
          </TransitionContextProvider>
        </Themes>
      </body>
    </html>
  );
}
