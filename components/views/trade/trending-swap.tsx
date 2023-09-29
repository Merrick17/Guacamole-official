'use client';
import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import { useGetTrendingToday } from '@/hooks/use-get-trending-today';
import { FC } from 'react';
import { useJupiterApiContext } from './src/contexts';
import routes from '@/config/routes';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import CustomTicker from '@/components/common/custom-ticker';

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
        'px-5 py-[10px] flex flex-row items-center overflow-hidden  max-w-full  gap-6 rounded-lg',
        className
      )}
    >
      <Button className="whitespace-nowrap h-8 px-3 lg:h-10 lg:px-4 lg:py-2">
        Trending Today
      </Button>
      <CustomTicker>
        {trending.map((x, idx) => (
          <TrendingSwapItem key={x.symbol} {...x} idx={idx + 1} />
        ))}
      </CustomTicker>
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
  if (!token) return null;
  return (
    <Link
      href={routes.trade.swap + `?outputMint=${mint}`}
      className=" text-xs lg:text-sm w-full   py-[6px] px-3 font-bold  flex flex-row items-center gap-1 rounded-lg"
    >
      <p className="uppercase">#{idx}</p>
      <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full shrink-0">
        <img
          src={token.logoURI}
          className="w-4 h-4 lg:w-6 lg:h-6  rounded-full"
          alt="logo"
        />
      </div>
      <p className="uppercase">{token.symbol}</p>
    </Link>
  );
};
