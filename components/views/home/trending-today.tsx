'use client';
import { FC, useEffect, useState } from 'react';
import Container from '../../common/container';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BiLinkExternal } from 'react-icons/bi';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import routes from '@/config/routes';
import TrendingItem from './trending-item';
import { JupiterApiProvider } from '../trade/src/contexts';
import { useGetTrendingToday } from '@/hooks/use-get-trending-today';

interface TrendingTodayProps {
  className?: string;
}
// USDC, USDT, USDCet, mSOL, bSOL, JitoSOL, stSOL, UXD, ETH, USDTet

const TrendingToday: FC<TrendingTodayProps> = ({ className }) => {
  const { trending } = useGetTrendingToday({
    maxNumberOfTokens: 3,
  });
  return (
    <JupiterApiProvider>
      <Container
        className={cn('flex flex-col  gap-5 overflow-y-auto', className)}
      >
        <div className="flex flex-row gap-2 items-center">
          <div className="shrink-0 w-5 aspect-square">
            <Image
              src="/images/home/trending.png"
              width={20}
              height={20}
              alt="trending"
            />
          </div>
          <h1 className="text-xl capitalize">Trending Today</h1>
        </div>
        {trending.map((x) => (
          <TrendingItem key={x.symbol} {...x} />
        ))}
      </Container>
    </JupiterApiProvider>
  );
};

export default TrendingToday;
