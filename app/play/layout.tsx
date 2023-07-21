'use client';
const GambaProvider = dynamic(
  () => import('gamba/react').then((mod) => mod.GambaProvider),
  {
    ssr: false, // Disable SSR for the component
  }
);

// Dynamic import for 'gamba/react-ui'
// const GambaUi = dynamic(
//   () => import('gamba/react-ui').then((mod) => mod.GambaUi),
//   {
//     ssr: false, // Disable SSR for the component
//   }
// );
import React from 'react';
import dynamic from 'next/dynamic';
const DynamicGambaUi = dynamic(
  async () => (await import('@/components/views/play/Provider')).GambaUi,
  { ssr: false }
);
import { PublicKey } from '@solana/web3.js';

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GambaProvider
        creator={new PublicKey('Hx5oruS1xKhHVjdHnbvLPQnJwyCAwd6QzzJ6yPnoqgP8')}
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
