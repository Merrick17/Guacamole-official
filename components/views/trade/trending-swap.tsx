'use client';
import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import { useGetTrendingToday } from '@/hooks/use-get-trending-today';
import { FC } from 'react';
import { useJupiterApiContext } from './src/contexts';
import routes from '@/config/routes';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TrendingSwapProps {
  className?: string;
}

const TrendingSwap: FC<TrendingSwapProps> = ({ className }) => {
  const { trending } = useGetTrendingToday({
    maxNumberOfTokens: 9,
  });
  return (
    <Container
      className={cn(
        'py-[10px] flex flex-row items-center overflow-hidden  max-w-full  gap-6 rounded-lg',
        className
      )}
    >
      <Button className="whitespace-nowrap">Trending Today</Button>
      <djv className="overflow-x-auto flex flex-row items-center ">
        {trending.map((x, idx) => (
          <TrendingSwapItem key={x.symbol} {...x} idx={idx + 1} />
        ))}
      </djv>
    </Container>
  );
};

export default TrendingSwap;

type TrendingSwapItemProps = {
  className?: string;
  symbol: string;
  amount: number;
  mint: string;
  idx: number;
};
const TrendingSwapItem: FC<TrendingSwapItemProps> = ({
  amount,
  mint,
  symbol,
  className,
  idx,
}) => {
  const { tokenMap } = useJupiterApiContext();
  const token = tokenMap.get(mint);
  return (
    <Link href={routes.trade.swap + `?outputMint=${mint}`}>
      <div className=" bg-background py-[6px] px-3 font-bold text-sm flex flex-row items-center gap-1 rounded-lg">
        <p className="uppercase">#{idx}</p>
        <img src={token.logoURI} className="w-6 h-6 rounded-full" alt="logo" />
        <p className="uppercase">{token.symbol}</p>
      </div>
    </Link>
  );
};
