import Disclaimer from "@/components/ui/disclaimer";
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
            <Disclaimer />
            <ContextProvider>
              <Header />
              {/* <WalletDrawer /> */}
              <LeftSideUtility />
              <div className=" min-h-screen relative">
                <div className="z-10">{children}</div>
              </div>
              <Footer />
            </ContextProvider>
            <Toaster />
            {/* <Preloader key={'perloader'} /> */}
          </TransitionContextProvider>
        </Themes>
      </body>
    </html>
  );
}
