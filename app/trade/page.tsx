import BackgroundSplash from '@/components/common/background-splash';
import ColorBlocks from '@/components/common/color-block';
import HeroHeadline from '@/components/common/hero-headline';
import HeroList from '@/components/common/hero-list';
import Trade from '@/components/views/trade/src/Trade';
import routes from '@/config/routes';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Easily Swap Solana Based Tokens | Guacamole',
  description:
    'Guacamole Swap allows you to trade any tokens on Solana in just a few clicks with no hassle and the best fees.',
};

const Page: FC = () => {
  return (
    <>
      <BackgroundSplash />
      <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] ">
        <section className="flex flex-col gap-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-8  gap-[60px] ">
            <HeroHeadline
              className="col-span-1  lg:col-span-5"
              title={
                <h1 className="text-3xl sm:text-6xl lg:text-[64px] lg:leading-[72px] ">
                  Trade <span className="text-primary">anything</span> with the
                  click of a button. It&apos;s really that{' '}
                  <span className="text-primary">easy</span>!
                </h1>
              }
            >
              <p className=" text-xl font-medium leading-8 text-muted-foreground">
                Our amazing tools help you trade any token on Solana. Just
                connect your wallet, select a token, and click! Advanced trading
                options are also available like the ability to DCA, place limit
                orders, or bridge from other chains.
              </p>
            </HeroHeadline>
            <Trade showDetails={false} className="col-span-1 lg:col-span-3" />
          </div>

          <HeroList listItems={TradeListItems} />
          <ColorBlocks className="mx-auto" />
        </section>
      </main>
    </>
  );
};

const TradeListItems: ListItemProps[] = [
  {
    title: 'Swap Aggregator',
    description:
      'Easily find the best trading routes to ensure you get the best bang for your buck!',
    image: '/icons/trade/swap-aggregator.svg',
    href: routes.trade.swap,
  },
  {
    title: 'Bridge Swaps',
    description:
      'Bridge your ETH, BNB, AVAX, and ARB to Solana and pick up tokens like GUAC.',
    image: '/icons/trade/bridge-swap.svg',
    href: routes.trade.bridge,
  },
  {
    title: 'Crypto Futures',
    description:
      'Trade gamified perpetual futures markets for BTC, ETH, SOL, and more. ',
    image: '/icons/trade/perpetuals.svg',
    href: routes.trade.perpetuals,
  },
  {
    title: 'DCA & Limit Orders',
    description:
      'Set limit or dollar cost averaging orders to swap when you’re not around.',
    image: '/icons/trade/dca.svg',
    href: routes.tools.root,
    disabled: true,
  },
];

export default Page;
