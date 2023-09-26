'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { ContextProvider } from '@/context/wallet';

// const GambaProvider = dynamic(
//   () => import('gamba/react').then((mod) => mod.GambaProvider),
//   {
//     ssr: false, // Disable SSR for the component
//   }
// );

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
    // <ContextProvider>
      <Gamba creator={'EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC'}>
        {children}
      </Gamba>
    // </ContextProvider>
  );
}
