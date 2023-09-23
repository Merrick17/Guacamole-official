import Container from '@/components/common/container';
import EarnHeader from '@/components/common/earn-header';
import GuacStakeForm from '@/components/views/earn/guac-stake/guac-stake-guac';
import LiquidityStackingForm from '@/components/views/earn/liquidity-staking/liquidity-staking-form';
import useMarinadeData from '@/hooks/use-marinade-data';
import fetchMarinadeData from '@/lib/marinade-data';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Dynamic Vault | Guacamole',
  description:
    'Put your crypto to work for you in various ways and enjoy the fruit of its labor.',
};

const Page = async () => {
  const marinadeData = await fetchMarinadeData();
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-2xl ">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md ">
        <EarnHeader
          title="Dynamic SOL Vault"
          tutorialLink="https://docs.guacamole.gg/products-and-features/tools/create-spl-token"
          hideSecondBtn
        />
        <hr className="border-dashed border-background" />
        <Container className="p-5 font-medium bg-background">
          <p className="text-muted-foreground text-sm">Projected mSOL Yield</p>
          <h1 className="text-3xl">
            {marinadeData && (marinadeData['apy'].value * 100).toFixed(2)}% APY
          </h1>
          <p className="text-white/50 text-xl mt-2 font-normal">
            1 MSOL = {marinadeData && marinadeData['currentPrice'].toFixed(3)}{' '}
            SOL
          </p>
        </Container>
        <LiquidityStackingForm />
        <div className="flex items-center justify-center w-full gap-3">
          <p className="text-muted-foreground text-xs font-medium ">
            Provided By
          </p>
          <Image
            src="/icons/sponsors/marinade.png"
            alt="Marinade"
            width={90}
            height={15}
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
