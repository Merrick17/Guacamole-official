import Container from '@/components/views/home/container';
import { BannerCard } from '@/components/common/banner-card';
import { GAMES } from '@/components/games';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ColorBlocks from '@/components/common/color-block';
import { Raleway } from 'next/font/google';
import { Button } from '@/components/ui/button';
const RalewayFont = Raleway({
  weight: '700',
  subsets: ['latin'],
});
const ShopSection = () => {
  return (
    <section className="flex flex-col gap-[60px]">
      <div className="flex flex-col lg:flex-row gap-14 justify-between w-full">
        <Container>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-10">
              <h1
                className={cn('font-bold text-[40px]', RalewayFont.className)}
              >
                Explore a fresher way to shop & reward yourself!
              </h1>
              <p className="font-medium text-xl text-[#5B5B5B]">
                The GUAC Shop (GUAC.GG) provides enthusiasts access to exciting
                giveaways, exclusive offers, and a variety of socially driven
                features! Freshen up and accumulate rewards in real-time to
                obtain or trade games, software, experiences, and digital
                collectibles.
              </p>
            </div>
            <div className="bg-[#F0FDF4] rounded-lg border border-[#E5E7EB] p-6 flex flex-col gap-6 ">
              <div className="font-medium text-3xl">
                <p className="text-black/50 text-sm ">
                  Today’s Highlighted Avotar Holder Deal
                </p>
                <h1>
                  <span className="uppercase">7.99 USDC</span> for Discord Nitro
                </h1>
              </div>
              <Button
                variant="default"
                size="sm"
                className="uppercase font-semibold w-max"
              >
                Start Shopping
              </Button>
            </div>
          </div>
        </Container>
        <Container>
          <div
            className={cn(
              'grid place-content-center gap-9 grid-cols-1',
              'md:grid-cols-2'
            )}
          >
            {GAMES.length > 1 &&
              GAMES.map((game: any) => (
                <Link key={game.short_name} href={`/play/${game.short_name}`}>
                  <BannerCard
                    backgroundImage={game.image}
                    backgroundColor={game.theme_color}
                    compact={true}
                  >
                    {game.name}
                  </BannerCard>
                </Link>
              ))}
          </div>
        </Container>
      </div>
      <ColorBlocks className="mx-auto" />
    </section>
  );
};

export default ShopSection;
