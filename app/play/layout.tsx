'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
const DynamicGambaUi = dynamic(
  async () => (await import('@/components/views/play/Provider')).GambaUi,
  { ssr: false }
);
const GambaProvider = dynamic(
  () => import('gamba/react').then((mod) => mod.GambaProvider),
  {
    ssr: false, // Disable SSR for the component
  }
);
export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GambaProvider creator={'EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC'}>
        <DynamicGambaUi>
          <main
            className={cn(
              'container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] '
            )}
          >
            {children}
          </main>
        </DynamicGambaUi>
      </GambaProvider>
    </>
  );
}
