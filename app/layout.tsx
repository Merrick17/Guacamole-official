import { Wallet } from '@/context/wallet';
import './globals.css';
import type { Metadata } from 'next';
import { Kanit } from 'next/font/google';
import Header from '@/components/ui/header';
import React from 'react';
import Disclaimer from '@/components/ui/disclaimer';

const kanit = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

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
      <body className={kanit.className}>
        <Disclaimer />
        <Wallet>
          <Header />
          <div className="mt-20">{children}</div>
        </Wallet>
      </body>
    </html>
  );
}
