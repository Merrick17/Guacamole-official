import { Wallet } from '@/context/wallet';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/ui/header';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <Wallet>
          <Header />
          {children}
        </Wallet>
      </body>
    </html>
  );
}
