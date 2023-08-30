import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FC } from 'react';

interface DynamicVaultStatisticsProps {}

const DynamicVaultStatistics: FC<DynamicVaultStatisticsProps> = () => {
  return (
    <Container className="flex flex-col  gap-5 overflow-y-auto">
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
      <DynamicVaultStatisticsItem />
      <DynamicVaultStatisticsItem />
      <DynamicVaultStatisticsItem />
      <DynamicVaultStatisticsItem />
    </Container>
  );
};

export default DynamicVaultStatistics;

const DynamicVaultStatisticsItem: FC = () => {
  return (
    <div className="p-5 flex flex-row justify-between items-center rounded-lg bg-background">
      <div className="flex flex-row items-center gap-5">
        <Image src="/logo.png" width={40} height={40} alt="logo" />
        <div className="flex flex-col gap-1">
          <p className="uppercase text-sm">SOL</p>
          <p className="text-muted-foreground">TVL: $755.1k</p>
        </div>
      </div>
      <Button>3.13% APY</Button>
    </div>
  );
};
