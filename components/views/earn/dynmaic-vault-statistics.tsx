'use client';
import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetVaultStatistics } from '@/hooks/use-get-vault-statistics';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FC, useState } from 'react';
import {
  JupiterApiProvider,
  useJupiterApiContext,
} from '../trade/src/contexts';
import { Loader2 } from 'lucide-react';

interface DynamicVaultStatisticsProps {
  className?: string;
}

const DynamicVaultStatistics: FC<DynamicVaultStatisticsProps> = ({
  className,
}) => {
  const { loading, vaultData } = useGetVaultStatistics({
    maxNumberOfTokens: 10,
  });
  return (
    <JupiterApiProvider>
      <Container
        className={cn('flex flex-col  gap-5 overflow-y-auto', className)}
      >
        <div className="flex flex-row gap-2 items-center">
          <div className="shrink-0 w-5 aspect-square">
            <Image
              src="/images/themes/orange.png"
              width={20}
              height={20}
              alt="trending"
            />
          </div>
          <h1 className="text-xl capitalize">Dynamic Vault Statistics</h1>
        </div>
        <div className="max-h-[420px] flex flex-col  gap-5 overflow-y-auto no-scrollbar">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="w-full  min-h-[92px]" />
            ))
          ) : (
            <>
              {vaultData
                .sort((itema, itemb) => {
                  return itemb.average_apy - itema.average_apy;
                })
                .map((item, index) => (
                  <DynamicVaultStatisticsItem
                    key={index}
                    apy={item.average_apy}
                    symbol={item.symbol}
                    tvl={item.lp_supply}
                    token_address={item.token_address}
                  />
                ))}
            </>
          )}
        </div>
      </Container>
    </JupiterApiProvider>
  );
};

export default DynamicVaultStatistics;

type DynamicVaultStatisticsItemProps = {
  className?: string;
  tvl: number;
  apy: number;
  symbol: string;
  token_address: string;
};

const DynamicVaultStatisticsItem: FC<DynamicVaultStatisticsItemProps> = ({
  className,
  tvl,
  apy,
  symbol,
  token_address,
}) => {
  const { tokenMap } = useJupiterApiContext();
  const token = tokenMap.get(token_address);
  const [loading, setLoading] = useState(true);

  return (
    <div className="p-5 flex flex-row justify-between items-center rounded-lg bg-background ">
      <div className="flex flex-row items-center gap-5">
        <img
          src={token?.logoURI}
          className="w-10 h-10 rounded-full hidden"
          alt="logo"
          onLoad={(e) => {
            setLoading(false);
            e.currentTarget.classList.remove('hidden');
          }}
        />
        {loading && <Loader2 className="w-10 h-10 rounded-full animate-spin" />}

        <div className="flex flex-col gap-1">
          <p className="uppercase text-sm">{symbol}</p>
          <p className="text-muted-foreground">
            TVL:{' '}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              compactDisplay: 'short',
              notation: 'compact',
            }).format(tvl)}
          </p>
        </div>
      </div>
      <Button>{apy.toFixed(2)}% APY</Button>
    </div>
  );
};
