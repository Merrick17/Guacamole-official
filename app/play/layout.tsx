"use client";
import GameDisclaimer from "@/components/ui/GameDisclaimer";
import dynamic from "next/dynamic";
import React from "react";

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
      <Gamba creator={"EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC"}>
        {children}
      </Gamba>
    </>

    // </ContextProvider>
  );
}
