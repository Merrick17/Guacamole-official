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
import { Analytics } from "@vercel/analytics/react";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

//bg-[url('/images/home/Guacamole_BG_Image_v2_1.png')] bg-cover bg-no-repeat"
export const metadata: Metadata = {
  title: "The Freshest DeFi Experience On Solana | Guacamole",
  description:
    "Dive into a fresh adventure across Solana with Guacamole, your gateway to trade, earn, create, play, and more. Enjoy a DEX platform designed with user-experience at its core, and embark on a journey to unlock endless opportunities. What are you waiting for? Jump into crypto and scoop the dip with Guacamole!",
};
// const kanit = Kanit({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   subsets: ["latin"],
// });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>The Freshest DeFi Experience On Solana | Guacamole</title>
      
      </head>
      <body className={poppins.className}>
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
