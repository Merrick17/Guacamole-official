"use client";
import React from "react";
import dynamic from "next/dynamic";
const DynamicGambaUi = dynamic(
  async () => (await import("@/components/views/play/Provider")).GambaUi,
  { ssr: false }
);
const GambaProvider = dynamic(
  () => import("gamba/react").then((mod) => mod.GambaProvider),
  {
    ssr: false, // Disable SSR for the component
  }
);
import { PublicKey } from "@solana/web3.js";
import { Metadata } from "next";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GambaProvider
        creator={new PublicKey("EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC")}
      >
        <DynamicGambaUi>
          <main className="container mx-auto flex flex-col items-center gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
            {children}
          </main>
        </DynamicGambaUi>
      </GambaProvider>
    </>
  );
}
