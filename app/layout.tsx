import { Wallet } from '@/context/wallet';
import './globals.css';
import type { Metadata } from 'next';
import { Kanit } from 'next/font/google';
import Header from '@/components/ui/header';
import React from 'react';

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
        <Wallet>
          <Header />
          {children}
        </Wallet>
      </body>
    </html>
  );
}
