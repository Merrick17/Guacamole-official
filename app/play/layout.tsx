'use client';
import { Kanit } from 'next/font/google';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@/components/styles';
const Gamba = dynamic(() => import('gamba/react').then((mod) => mod.Gamba), {
  ssr: false, // Disable SSR for the component
});

// Dynamic import for 'gamba/react-ui'
const GambaUi = dynamic(
  () => import('gamba/react-ui').then((mod) => mod.GambaUi),
  {
    ssr: false, // Disable SSR for the component
  }
);
import React from 'react';
import dynamic from 'next/dynamic';

const kanit = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Gamba
          connection={{
            endpoint:
              'https://radial-delicate-layer.solana-mainnet.discover.quiknode.pro/124d30642a313843475e1ac3f67e59d11d55d943',
            config: {
              wsEndpoint:
                'wss://radial-delicate-layer.solana-mainnet.discover.quiknode.pro/124d30642a313843475e1ac3f67e59d11d55d943',
            },
          }}
        >
          <GambaUi>
            <main className="container mx-auto flex flex-col items-center gap-7 px-16 py-12  max-w-[1440px] text-black">
              {children}
            </main>
          </GambaUi>
        </Gamba>
      </ThemeProvider>
    </>
  );
}
