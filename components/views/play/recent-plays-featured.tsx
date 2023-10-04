'use client';
import { FC, useEffect, useState } from 'react';
import Container from '../../common/container';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BiLinkExternal } from 'react-icons/bi';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import routes from '@/config/routes';
import { JupiterApiProvider } from '../trade/src/contexts';
import { useGetTrendingToday } from '@/hooks/use-get-trending-today';
import { Skeleton } from '@/components/ui/skeleton';
import RecentPlays from '@/components/common/recent-plays';

interface RecentPlaysFeaturedProps {
  className?: string;
}
// USDC, USDT, USDCet, mSOL, bSOL, JitoSOL, stSOL, UXD, ETH, USDTet

const RecentPlaysFeatured: FC<RecentPlaysFeaturedProps> = ({ className }) => {
  return (
    <JupiterApiProvider>
      <Container
        className={cn(
          'flex flex-col max-h-[560px] bg-foreground  gap-5 overflow-y-auto  ',
          className
        )}
      >
        <div className="flex flex-row gap-2 items-center">
          <div className="shrink-0 w-5 aspect-square">
            <Image
              src="/images/themes/yellow.png"
              width={20}
              height={20}
              alt="trending"
            />
          </div>
          <h1 className="text-xl capitalize">Recent Plays</h1>
        </div>
        <div className=" flex flex-col  gap-5 overflow-y-auto no-scrollbar">
          <RecentPlays className="p-0" />
        </div>
      </Container>
    </JupiterApiProvider>
  );
};

export default RecentPlaysFeatured;
