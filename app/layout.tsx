import { Wallet } from '@/context/wallet';
import './globals.css';
import type { Metadata } from 'next';
import React from 'react';
import Disclaimer from '@/components/ui/disclaimer';
import Header from '@/components/ui/header';

export const metadata: Metadata = {
  title: 'A Fresh Solana Experience | Guacamole',
  description:
    'Experience a fresh take on Solana DeFi with Guacamole. Trade, earn, and play effortlessly, while enjoying a seamless and user-friendly experience. Get started and unlock a world of possibilities with GUAC!.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Disclaimer />
        <Wallet>
          <Header />
          <div className="mt-20">{children}</div>
        </Wallet>
      </body>
    </html>
  );
}
