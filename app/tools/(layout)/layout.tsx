'use client';
import React from 'react';

import { useWallet } from '@solana/wallet-adapter-react';
import InfoCard from '@/components/common/info-card';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { connected } = useWallet();

  return (
    <>
      <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
        {connected ? (
          <>{children}</>
        ) : (
          <div className="flex items-center justify-center">
            <InfoCard
              name="Please connect your wallet"
              description="You will need to connect a supported Solana wallet to continue! Press the button below to explore the options."
              image="/images/connect-wallet-tool.png"
              connectWallet
            />
          </div>
        )}
      </main>
    </>
  );
}
