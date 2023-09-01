import BackgroundSplash from '@/components/common/background-splash';
import ColorBlocks from '@/components/common/color-block';
import HeroHeadline from '@/components/common/hero-headline';
import { Button } from '@/components/ui/button';
import PopularSubscriptions from '@/components/views/shop/popular-subscriptions';

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
          <div className="flex flex-col lg:flex-row  gap-14 ">
            <HeroHeadline
              title={
                <h1 className="text-3xl sm:text-6xl lg:text-[64px] lg:leading-[72px] ">
                  Purchase games, subs, and more{' '}
                  <span className="text-primary">with crypto</span>.
                </h1>
              }
            >
              <>
                <p className=" text-xl font-medium leading-8 text-muted-foreground">
                  A first of its kind experience where you can connect your{' '}
                  <span className="text-primary">Solana</span>
                  wallet and directly buy tons of amazing items like game keys,
                  gift cards, software, and more! Supports GUAC,{' '}
                  <span className="text-primary">
                    SOL, USDC, USDT, BONK, DUST, mSOL,
                  </span>{' '}
                  & more!
                </p>
                <div className="flex flex-col md:flex-row md:items-center gap-7 ">
                  <Button className="w-max">BROWSE THE SHOP</Button>
                  <Button className="w-max">LIST MY TOKEN</Button>
                </div>
              </>
            </HeroHeadline>
            <PopularSubscriptions />
          </div>

          <ColorBlocks className="mx-auto" />
        </section>
      </main>
    </>
  );
};

export default Page;
