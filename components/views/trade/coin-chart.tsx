import Container from '@/components/common/container';
import React, { FC, PureComponent, useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useJupiterApiContext } from './src/contexts';
import { TokenInfo } from '@solana/spl-token-registry';
import axios from 'axios';
import { convert } from '@/lib/numbers';

const data = [
  {
    sell: 44,
    buy: 80,
  },
];

type CoinChartProps = {
  coinMint: string;
};
const CoinChart: FC<CoinChartProps> = ({ coinMint }) => {
  const [price, setPrice] = useState(0);

  const getValueInUsd = async (token: TokenInfo, amount: number) => {
    if (!token) return;
    const { data } = await axios.get(
      'https://price.jup.ag/v4/price?ids=' + token.symbol
    );
    for (var prop in data.data) {
      const value = data.data[prop].price;
      setPrice(value * (Number(amount) || 0));
      break;
    }
  };
  const { tokenMap } = useJupiterApiContext();
  const coin = tokenMap.get(coinMint);
  useEffect(() => {
    getValueInUsd(coin, 1);
  }, [coin]);
  return (
    <Container className="bg-background flex flex-col gap-10">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-foreground p-2 rounded-lg">
            <img src={coin.logoURI} className="w-6 h-6" alt="logo" />
          </div>
          <h1 className="text-lg font-semibold">{coin.symbol}</h1>
        </div>
        <p className="font-semibold text-base lg:text-2xl">${convert(price)}</p>
      </div>
      <div className="bg-black rounded-lg border border-gray-800 py-5 flex flex-col gap-5 w-full text-black font-medium text-xs capitalize">
        <div
          className="w-full rounded-lg bg-[#8BD796] h-10  flex items-center justify-start p-3 "
          style={{
            width: '48.9%',
          }}
        >
          <h1>BUYS: 48.9%</h1>
        </div>
        <div
          className="w-full rounded-lg bg-[#FF8F8F] h-10  flex items-center justify-start p-3"
          style={{
            width: '51.1%',
          }}
        >
          <h1>SELLS: 51.1%</h1>
        </div>
      </div>
    </Container>
  );
};

export default CoinChart;
