import { Wallet } from '@/context/wallet';
import './globals.css';
import type { Metadata } from 'next';
import React from 'react';
import Disclaimer from '@/components/ui/disclaimer';
import Header from '@/components/ui/header';
import { Kanit } from 'next/font/google';
export const metadata: Metadata = {
  title: 'A Fresh Solana Experience | Guacamole',
  description:
    'Experience a fresh take on Solana DeFi with Guacamole. Trade, earn, and play effortlessly, while enjoying a seamless and user-friendly experience. Get started and unlock a world of possibilities with GUAC!.',
};
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/ui/footer';
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
    <html lang="en">
      <body className={kanit.className}>
        <Disclaimer />
        <Wallet>
          <Header />

          <div className="mt-20 min-h-screen relative">
            <div className="absolute top-0 left-0  w-screen h-screen bg-body-image bg-cover bg-no-repeat antialiased z-[-1]" />
            <div className="z-10">{children}</div>
          </div>
          <Footer />
        </Wallet>
        <Toaster />
      </body>
    </html>
  );
}
