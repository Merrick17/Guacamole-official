import BackgroundSplash from '@/components/common/background-splash';
import ColorBlocks from '@/components/common/color-block';
import HeroHeadline from '@/components/common/hero-headline';
import PlayCard from '@/components/ui/play-card';
import RecentPlay from '@/components/views/play/recent-play';
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
        <div className="grid grid-cols-1 lg:grid-cols-5  gap-14 ">
          <HeroHeadline
            className="col-span-3"
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
          <RecentPlay compact className="col-span-2" />
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
    image: '/icons/play/roulette.png',
    href: routes.play.roulette,
  },
  {
    title: 'Slots',
    image: '/icons/play/slots.png',
    href: routes.play.slots,
  },
  {
    title: 'HiLo',
    image: '/icons/play/hilo.png',

    href: routes.play.hilo,
  },
  {
    title: 'Mines',
    image: '/icons/play/mines.png',

    href: routes.play.mines,
  },
];

export default Page;
