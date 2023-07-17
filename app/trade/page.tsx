'use client';
import Trade from '@/components/views/trade/src/App';
import { useWallet } from '@solana/wallet-adapter-react';
import { FC } from 'react';

interface TradeProps {}

const TradePage: FC<TradeProps> = () => {
  const { connected } = useWallet();
  return (
    <main className="container mx-auto flex flex-col items-center gap-14 px-16 py-12  max-w-[1440px]">
      <div className="flex w-full max-w-lg flex-col gap-[10px] rounded-lg bg-white px-5 py-7">
        {connected ? (
          <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
            <Trade />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <h1>Please connect your wallet first</h1>
          </div>
        )}
      </div>
    </main>
  );
};

export default TradePage;
