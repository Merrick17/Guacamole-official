'use client';
import Trade from '@/components/views/trade/src/Trade';
import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dynamic from 'next/dynamic';

interface TradeProps {}
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
const TradePage: FC<TradeProps> = () => {
  const [menuValue, setMenuValue] = useState<'swap' | 'twamm'>('swap');
  return (
    <main className="container mx-auto flex flex-col items-center gap-14 px-16 py-12  max-w-[1440px]">
      <div className="flex w-full max-w-lg flex-col gap-[10px] rounded-lg bg-white px-5 py-7">
        {/* <Tabs defaultValue="swap" value={menuValue} className="w-full">
            <div className="flex flex-row justify-between items-center">
              <TabsList>
                <TabsTrigger value="swap" onClick={() => setMenuValue('swap')}>
                  Swap
                </TabsTrigger>
                <TabsTrigger
                  value="twamm"
                  onClick={() => setMenuValue('twamm')}
                >
                  Twamm
                </TabsTrigger>
              </TabsList>
              <WalletMultiButtonDynamic className="rounded-full" />
            </div>
            <TabsContent value="swap"> */}
        <Trade />
        {/* </TabsContent>
            <TabsContent value="twamm">Comming Soon</TabsContent>
          </Tabs> */}
      </div>
    </main>
  );
};

export default TradePage;
