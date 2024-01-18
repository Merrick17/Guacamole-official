'use client';

// import { useWallet } from '@solana/wallet-adapter-react';
import ConnectWalletCard from '@/components/ui/connect-wallet-card';
import { useWallet } from '@solana/wallet-adapter-react';
import { ReactNode } from 'react';

export default function ToolsLayout({ children }: { children: ReactNode }) {
  const { connected } = useWallet();

  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-3 lg:px-8 py-6 md:px-16 md:py-12   max-w-[1440px]">
      {connected ? (
        <>{children}</>
      ) : (
        <div className="flex items-center justify-center">
          <ConnectWalletCard
            name="Please connect your wallet"
            description="You will need to connect a supported Solana wallet to continue! Press the button below to explore the options."
          />
        </div>
      )}
    </main>
  );
}
