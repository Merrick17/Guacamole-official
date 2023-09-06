import { useEffect, useState } from 'react';

const NotIncluded = (symbol: string) => {
  return (
    symbol === 'USDC' ||
    symbol === 'USDT' ||
    symbol === 'SOL' ||
    symbol === 'USDCet' ||
    symbol === 'mSOL' ||
    symbol === 'bSOL' ||
    symbol === 'JitoSOL' ||
    symbol === 'stSOL' ||
    symbol === 'UXD' ||
    symbol === 'ETH' ||
    symbol === 'USDTet'
  );
};

type props = {
  maxNumberOfTokens?: number;
};

export function useGetTrendingToday({ maxNumberOfTokens = 3 }: props) {
  const [trending, setTreding] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getTrending = async () => {
      setLoading(true);
      const data = await fetch('https://stats.jup.ag/info/day');
      const json = await data.json();
      const Guac = json.lastXTopBuy.filter(
        (x: any) => x.symbol === 'GUAC'
      )[0] as {
        symbol: string;
        amount: number;
        mint: string;
      };

      const treding: {
        symbol: string;
        amount: number;
        mint: string;
      }[] = json.lastXTopBuy
        .filter((x: any) => !NotIncluded(x.symbol) && x.symbol !== 'GUAC')
        .slice(0, maxNumberOfTokens);

      setTreding([Guac, ...treding]);
      setLoading(false);
    };
    getTrending();
  }, []);

  return { trending, loading };
}
