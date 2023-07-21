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
  title: 'Cuagamole',
  description: 'Cuagamole is a decentralized exchange for Solana.',
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
