import BackgroundSplash from '@/components/common/background-splash';
import ColorBlocks from '@/components/common/color-block';
import HeroHeadline from '@/components/common/hero-headline';
import RecentPlays from '@/components/common/recent-plays';
import PlayCard from '@/components/ui/play-card';
import RecentPlaysFeatured from '@/components/views/play/recent-plays-featured';
import routes from '@/config/routes';
import { Metadata } from 'next';

import { FC } from 'react';

export const metadata: Metadata = {
  title: "Let's Play Some Games | Guacamole",
  description:
    'Take a chance in fun games where you can win some Solana and some of your favorite coins and tokens. Flips, mines, and more await for you to play on Guacamole!',
};

const Page: FC = () => {
  return (
    <>
      <BackgroundSplash />
      <section className="flex flex-col gap-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-8  gap-14 ">
          <HeroHeadline
            className="col-span-1 lg:col-span-5"
            title={
              <h1 className="text-3xl sm:text-6xl lg:text-[64px] lg:leading-[72px] ">
                Play plenty of funky fresh on-chain games and{' '}
                <span className="text-primary">win prizes</span>!
              </h1>
            }
          >
            <p className=" text-xl font-medium leading-8 text-muted-foreground">
              Take a chance in fun games where you can win SOL and some of your
              favorite coins and tokens. Flips, mines, dice, and more await for
              you to play on our game section.
            </p>
          </HeroHeadline>
          {/* <WalletMultiButtonDynamic /> */}
          <RecentPlaysFeatured className="col-span-1 lg:col-span-3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10  rounded-lg bg-foreground px-14 py-6  backdrop:blur-sm">
          {PlayListItems.map((item, index) => (
            <PlayCard key={index} {...item} />
          ))}
        </div>
        <ColorBlocks className="mx-auto" />
      </section>
    </>
  );
};

const PlayListItems: {
  title: string;
  image: string;
  href: string;
  disabled?: boolean;
}[] = [
  {
    title: 'Roulette',
    image: '/images/play/roulette.png',
    href: routes.play.roulette,
  },
  {
    title: 'Slots',
    image: '/images/play/slots.png',
    href: routes.play.slots,
  },
  {
    title: 'Dice',
    image: '/images/play/dice.png',
    href: routes.play.dice,
  },

  {
    title: 'Mines',
    image: '/images/play/mines.png',
    href: routes.play.mines,
  },
];

export default Page;
