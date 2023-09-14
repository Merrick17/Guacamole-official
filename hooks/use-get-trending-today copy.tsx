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

export function useGetVaultStatistics({ maxNumberOfTokens = 3 }: props) {
  const [vaultData, setVaultData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getTrending = async () => {
      setLoading(true);
      const data = await fetch(
        'https://merv2-api.mercurial.finance/vault_info'
      );
      const json = await data.json();

      setLoading(false);
    };
    getTrending();
  }, []);

  return { vaultData, loading };
}
