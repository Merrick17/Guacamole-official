import { useEffect, useState } from 'react';

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

      setVaultData(json.slice(0, maxNumberOfTokens));
      setLoading(false);
    };
    getTrending();
  }, []);

  return { vaultData, loading };
}
