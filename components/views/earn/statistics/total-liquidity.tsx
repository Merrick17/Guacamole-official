'use client';
import useTokenPrice from '@/hooks/useTokenPrice';
import StatisticsCardContainer from './statistics-card-container';
import numeral from 'numeral';
import { useEffect } from 'react';
const TotalLiquidity = ({
  tvl,
  lp,
  apy,
  symbol,
}: {
  tvl: number;
  lp: number;
  apy: number;
  symbol: string;
}) => {
  const { priceData, loading } = useTokenPrice(symbol);

  return (
    <StatisticsCardContainer>
      <div className="flex  flex-row justify-between items-start  text-sm">
        <div className="flex flex-col gap-2">
          <header>
            <p className="text-muted-foreground">Total Liquidity</p>
            <h1 className=" font-semibold  text-3xl ">
              {numeral(lp).format('0,0')} {symbol}
            </h1>
          </header>
          <p className=" text-muted-foreground">
            ${' '}
            {!loading && priceData && priceData['data'][symbol]
              ? numeral(priceData['data'][symbol].price * lp).format('0,0')
              : 0}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">APY</p>
          <h1 className=" text-3xl font-semibold ">{apy.toFixed(3)}%</h1>
        </div>
      </div>
    </StatisticsCardContainer>
  );
};

export default TotalLiquidity;
