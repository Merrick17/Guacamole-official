'use client';
import { Kanit } from 'next/font/google';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@/components/styles';
//import {GambaProvider} from 'gamba/react'
const Gamba = dynamic(() => import('gamba/react').then((mod) => mod.Gamba), {
  ssr: false, // Disable SSR for the component
});
const GambaProvider = dynamic(() => import('gamba/react').then((mod) => mod.GambaProvider), {
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

import { PublicKey } from '@solana/web3.js';

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
        <GambaProvider creator={new PublicKey("Hx5oruS1xKhHVjdHnbvLPQnJwyCAwd6QzzJ6yPnoqgP8")}>


          <GambaUi>
            <main className="container mx-auto flex flex-col items-center gap-7 px-16 py-12  max-w-[1440px] text-black">
              {children}
            </main>
          </GambaUi>
        </GambaProvider>
      </ThemeProvider>
    </>
  );
}
