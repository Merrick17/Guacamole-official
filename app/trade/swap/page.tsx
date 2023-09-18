'use client';
import { Button } from '@/components/ui/button';
import Trade from '@/components/views/trade/src/Trade';
import { JupiterApiProvider } from '@/components/views/trade/src/contexts';
import SwapCharts from '@/components/views/trade/swap-charts';
import TrendingSwap from '@/components/views/trade/trending-swap';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { AiFillCaretRight } from 'react-icons/ai';

const Swap = () => {
  const [showCharts, setShowCharts] = useState(false);
  return (
    <>
      <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
        <div
          className={cn(
            'grid grid-cols-1 gap-14 max-w-md w-full',
            showCharts && 'lg:grid-cols-2 max-w-none'
          )}
        >
          <TrendingSwap
            className={cn('col-span-1', showCharts && 'lg:col-span-2 ')}
          />
          <div className="relative w-max">
            <Trade />
            <Button
              size="icon"
              className="absolute top-1/2 w-6 h-12 -translate-y-1/2 left-full rounded-lg rounded-tl-none rounded-bl-none  z-10"
              onClick={() => setShowCharts((s) => !s)}
            >
              <AiFillCaretRight className={cn(showCharts && 'rotate-180 ')} />
            </Button>
          </div>
          {showCharts && <SwapCharts />}
        </div>
      </main>
    </>
  );
};

export default Swap;
