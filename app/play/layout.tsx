'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { ContextProvider } from '@/context/wallet';

const GambaProvider = dynamic(
  () => import('gamba/react').then((mod) => mod.GambaProvider),
  {
    ssr: false, // Disable SSR for the component
  }
);

const Gamba = dynamic(
  () => import('gamba/react').then((mod) => mod.Gamba),
  { ssr: false } // Disable SSR for the component
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContextProvider>
      <Gamba creator={'EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC'}>
        <main
          className={cn(
            'container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] '
          )}
        >
          {children}
        </main>
      </Gamba>
    </ContextProvider>
  );
}
