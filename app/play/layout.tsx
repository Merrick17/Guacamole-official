"use client";
import { GAMES } from "@/components/games-v2";
import GameDisclaimer from "@/components/ui/GameDisclaimer";
import { TOKENS } from "@/lib/constants";
import dynamic from "next/dynamic";
import React from "react";
const GambaProvider = dynamic(
  () => import("gamba-react-v2").then((mod) => mod.GambaProvider),
  {
    ssr: false, // Disable SSR for the component
  }
);
const GambaPlatformProvider = dynamic(
  () => import("gamba-react-ui-v2").then((mod) => mod.GambaPlatformProvider),
  {
    ssr: false, // Disable SSR for the component
  }
);
// const GambaProvider = dynamic(
//   () => import('gamba/react').then((mod) => mod.GambaProvider),
//   {
//     ssr: false, // Disable SSR for the component
//   }
// );

const Gamba = dynamic(
  () => import("gamba/react").then((mod) => mod.Gamba),
  { ssr: false } // Disable SSR for the component
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ContextProvider>
    <>
      <GameDisclaimer />
      {/* <Gamba creator={"EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC"}> */}
      <GambaProvider>
        <GambaPlatformProvider
          creator={"EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC"}
          games={GAMES}
          tokens={TOKENS}
          defaultCreatorFee={0.01}
          defaultJackpotFee={0.001}
        >
          {children}
        </GambaPlatformProvider>
      </GambaProvider>

      {/* </Gamba> */}
    </>

    // </ContextProvider>
  );
}
