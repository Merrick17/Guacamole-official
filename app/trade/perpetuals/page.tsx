'use client';

import PerceptualMarketHeader from '@/components/common/Perceptual-market-header';
import PerceptualForm from '@/components/views/trade/perpetuals-form';
import { useMarketContext } from '@/context/coin-select';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
const TVChartContainer = dynamic(
  () => import('@/components/views/trade/TVChart'),
  {
    ssr: false,
  }
);
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
const Perceptual = () => {
  const { selectedMarket } = useMarketContext();
  useEffect(() => {
    console.log("Selected Market", selectedMarket)
  }, [selectedMarket])
  return (
    <>
      <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
        <div
          className={cn(
            'grid  w-full z-20  grid-cols-1 lg:grid-cols-6 gap-[10px] rounded-lg bg-foreground px-5 py-7 '
          )}
        >
          <div className="flex flex-1 justify-center col-span-4">
            <div className="flex flex-col gap-5 w-full ">
              <PerceptualMarketHeader />
              <TVChartContainer productSelect={selectedMarket.name} />

            </div>
          </div>

          <div className="col-span-2 ">
            <PerceptualForm />
          </div>
        </div>
      </main>
    </>
  );
};

export default Perceptual;
