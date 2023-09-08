import Container from '@/components/common/container';
import React, { FC, PureComponent } from 'react';
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
  const { tokenMap } = useJupiterApiContext();
  const coin = tokenMap.get(coinMint);
  return (
    <Container className="bg-background">
      <div className="flex items-center gap-2">
        <div className="bg-foreground p-2 rounded-lg">
          <img src={coin.logoURI} className="w-6 h-6" alt="logo" />
        </div>
        <h1 className="text-lg font-semibold">{coin.symbol}</h1>
      </div>
      <BarChart width={200} height={200} data={data} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" fill="black" stroke="black" />

        <Bar
          dataKey="buy"
          radius={8}
          fill="#8BD796"
          label={{ fill: '#000', fontSize: 12 }}
          barSize={100}
        />
        <Bar
          dataKey="sell"
          radius={8}
          fill="#FF8F8F"
          label={{ fill: '#000', fontSize: 12 }}
          barSize={100}
        />
      </BarChart>
    </Container>
  );
};

export default CoinChart;
