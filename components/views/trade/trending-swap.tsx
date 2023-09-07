'use client';
import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import { useGetTrendingToday } from '@/hooks/use-get-trending-today';
import { FC } from 'react';
import { useJupiterApiContext } from './src/contexts';
import routes from '@/config/routes';
import Link from 'next/link';

interface TrendingSwapProps {}

const TrendingSwap: FC<TrendingSwapProps> = () => {
  const { trending } = useGetTrendingToday({
    maxNumberOfTokens: 4,
  });
  return (
    <Container className="py-[10px] flex flex-row items-center overflow-auto max-w-3xl  gap-6 rounded-lg">
      <Button className="whitespace-nowrap">Trending Today</Button>

      {trending.map((x, idx) => (
        <TrendingSwapItem key={x.symbol} {...x} idx={idx + 1} />
      ))}
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
        <img src={token.logoURI} className="w-6 h-6" alt="logo" />
        <p className="uppercase">{token.symbol}</p>
      </div>
    </Link>
  );
};