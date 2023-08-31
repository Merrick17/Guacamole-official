import ColorBlocks from '@/components/common/color-block';
import HeroHeadline from '@/components/common/hero-headline';
import Container from '@/components/common/container';
import EarnList from '@/components/views/home/earn-list';
import GamesSection from '@/components/views/home/games-section';
import HomeContent from '@/components/views/home/home-content';
import HomeHeadline from '@/components/views/home/home-headline';
import HomeList from '@/components/common/hero-list';
import ShopSection from '@/components/views/home/shop-section';
import Sponsors from '@/components/views/home/sponsors';
import Trade from '@/components/views/trade/src/Trade';
import routes from '@/config/routes';
import { AccentColors } from '@/config/themes';
import { cn } from '@/lib/utils';
import HeroList from '@/components/common/hero-list';
import TrendingToday from '@/components/views/home/trending-today';
import BackgroundSplash from '@/components/common/background-splash';

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
          <div className="flex flex-col lg:flex-row  gap-14 ">
            {/* <HomeContent className="w-full" /> */}
            <HeroHeadline
              title={
                <h1 className="text-3xl sm:text-6xl lg:text-[64px] lg:leading-[72px] ">
                  The <span className="text-primary">best ingredients</span> to
                  keep your crypto portfolio{' '}
                  <span className="text-primary">super fresh.</span>
                </h1>
              }
            >
              <p className=" text-xl font-medium leading-8 text-muted-foreground">
                Experience a fresh take on Solana DeFi with{' '}
                <span className="text-[#4E8341]">Guacamole</span>. Trade, earn,
                and play effortlessly, while enjoying a seamless and
                user-friendly experience. Get started and unlock a world of
                possibilities!
              </p>
            </HeroHeadline>
            <TrendingToday />
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
    href: routes.trade.root,
    accent: AccentColors.violet,
  },
  {
    title: 'Earn',
    description:
      'Put your crypto to work for you in various ways and enjoy the fruit of its labor.',
    image: '/images/themes/orange.png',
    href: routes.earn.root,
    accent: AccentColors.orange,
  },
  {
    title: 'Play',
    description:
      'Take a chance in fun games where you can win some of your favorite tokens.',
    image: '/images/themes/yellow.png',
    href: routes.play.root,
    accent: AccentColors.yellow,
  },
  {
    title: 'Manage',
    description:
      'Helpful tools make it easy to navigate every step of your journey through crypto.',
    image: '/images/themes/white.png',
    href: routes.tools.root,
    accent: AccentColors.white,
  },
];
