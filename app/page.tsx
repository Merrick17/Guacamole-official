import ColorBlocks from '@/components/common/color-block';
import HeroHeadline from '@/components/common/hero-headline';

import routes from '@/config/routes';
import { AccentColors } from '@/config/themes';
import { cn } from '@/lib/utils';
import HeroList from '@/components/common/hero-list';
import TrendingToday from '@/components/views/home/trending-today';
import BackgroundSplash from '@/components/common/background-splash';
import { Raleway } from 'next/font/google';

export default function Home() {
  return (
    <>
      <BackgroundSplash />
      <main
        className={cn(
          'container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] '
        )}
      >
        <section className="flex flex-col gap-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-5    gap-[60px]">
            {/* <HomeContent className="w-full" /> */}
            <HeroHeadline
              className="col-span-1  lg:col-span-3"
              title={
                <h1
                  className={
                    'text-3xl sm:text-6xl lg:text-[64px] lg:leading-[72px] font-bold '
                  }
                >
                  The <span className="text-primary">best ingredients</span> to
                  keep your crypto portfolio{' '}
                  <span className="text-primary">super fresh</span>.
                </h1>
              }
            >
              <p className=" text-xl font-medium leading-8 text-muted-foreground">
                Experience a fresh take on Solana DeFi with{' '}
                <span className="text-primary">Guacamole</span>. Trade, earn,
                and play effortlessly, while enjoying a seamless and
                user-friendly experience. Get started and unlock a world of
                possibilities!
              </p>
            </HeroHeadline>
            <TrendingToday className="col-span-1 lg:col-span-2" />
          </div>

          <HeroList listItems={HomeListItems} />
          <ColorBlocks className="mx-auto" />
        </section>
        {/* <section className="flex flex-col gap-[60px]">
        <HomeHeadline
          title="Trade anything with the click of a button. It’s that easy!"
          description="Our amazing tools help you trade any token on Solana in just
            seconds. Just connect your wallet, select your token, and click
            swap! More advanced trading options are also available like the
            ability to DCA, place limit orders, or bridge from other chains."
        />
        <HomeList listItems={TradeListItems} />
        <Sponsors />
        <ColorBlocks className="mx-auto" />
      </section>
      <section className="flex flex-col gap-[60px]">
        <HomeHeadline
          title="Several ways to earn passive income with your crypto!"
          description="Guacamole offers several exciting features to help earn tokens,
          NFTs, and more. Our platform makes it easy to make your crypto work
          for you! Most features also feature a permissionless setup for any
          community or project to use."
        />
        <HomeList listItems={EarnListItems} />
        <ColorBlocks className="mx-auto" />
      </section>
      <GamesSection />
      <section className="flex flex-col gap-[60px]">
        <HomeHeadline
          title="There’s nothing like a fresh side of GUAC."
          description="The GUAC token is at the very pit of the Guacamole ecosystem. You can easily buy, farm, spend, stake, win and even vote with it! Our token was initially stealth launched with a whopping 94% of supply locked in a Raydium liquidity pool on launch."
        />
        <EarnList />
        <ColorBlocks className="mx-auto" />
      </section>
      <ShopSection /> */}
      </main>
    </>
  );
}

const HomeListItems: ListItemProps[] = [
  {
    title: 'Trade',
    description:
      'Trade any tokens on Solana in just a few clicks with no hassle and the best fees.',
    image: '/images/themes/violet.png',
    href: routes.trade.swap,
    accent: AccentColors.violet,
  },
  {
    title: 'Earn',
    description:
      'Put your crypto to work for you in various ways and enjoy the fruit of its labor.',
    image: '/images/themes/orange.png',
    href: routes.earn.explore,
    accent: AccentColors.orange,
  },
  {
    title: 'Play',
    description:
      'Take a chance in fun games where you can win some of your favorite tokens.',
    image: '/images/themes/yellow.png',
    href: routes.play.explore,
    accent: AccentColors.yellow,
  },
  {
    title: 'Manage',
    description:
      'Helpful tools make it easy to navigate every step of your journey through crypto.',
    image: '/images/themes/white.png',
    href: routes.tools.explore,
    accent: AccentColors.white,
  },
];
