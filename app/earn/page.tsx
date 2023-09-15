import BackgroundSplash from '@/components/common/background-splash';
import ColorBlocks from '@/components/common/color-block';
import HeroHeadline from '@/components/common/hero-headline';
import HeroList from '@/components/common/hero-list';
import DynamicVaultStatistics from '@/components/views/earn/dynmaic-vault-statistics';
import Trade from '@/components/views/trade/src/Trade';
import routes from '@/config/routes';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Useful Tools For All Solana Users | Guacamole',
  description:
    'Find a variety of easy to use tools in our suite that can instantly help improve your quality of life while interacting with the Solana blockchain or starting your own project!',
};
const Earn: FC = () => {
  return (
    <>
      <BackgroundSplash />
      <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] ">
        <section className="flex flex-col gap-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-8  gap-[60px] ">
            <HeroHeadline
              className="col-span-1  lg:col-span-5"
              title={
                <h1
                  className={
                    'text-3xl sm:text-6xl lg:text-[64px] lg:leading-[72px] font-bold '
                  }
                >
                  Explore several ways to earn{' '}
                  <span className="text-primary">passive income</span> with your
                  portfolio!
                </h1>
              }
            >
              <p className=" text-xl font-medium leading-8 text-muted-foreground">
                Several exciting features to help earn tokens, NFTs, and more.
                Our platform makes it easy to make your crypto work for you!
                Most features also feature a permissionless setup for any
                community or project to use.
              </p>
            </HeroHeadline>
            <DynamicVaultStatistics className="col-span-1 lg:col-span-3" />
          </div>

          <HeroList listItems={EarnListItems} />
          <ColorBlocks className="mx-auto" />
        </section>
      </main>
    </>
  );
};

export default Earn;

const EarnListItems: ListItemProps[] = [
  {
    title: 'Dynamic Vaults',
    description:
      'Optimize yields between top lending protocols with rebalancing vaults.',
    image: '/icons/earn/dynamic-vault.png',
    href: routes.earn.root,
  },
  {
    title: 'NFT Farms',
    description:
      'Stake tokens to receive points which can be utilized to redeem vaulted NFTs.',
    image: '/icons/earn/nft-farms.svg',
    href: routes.earn.root,
  },
  {
    title: 'Liquid Staking',
    description:
      'Stake your Solana and earn while being able to swap & participate in DeFi.',
    image: '/icons/earn/liquidity-staking.svg',
    href: routes.earn.root,
  },
  {
    title: 'GUAC Staking',
    description:
      'Stake GUAC to participate in governance and earn fees generated by the ecosystem.',
    image: '/icons/earn/liquidity-farming.svg',
    href: routes.tools.root,
    disabled: true,
  },
];
