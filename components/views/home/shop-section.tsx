import Container from '@/components/common/container';
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
                <p className="text-muted-foreground text-sm ">
                  Today’s Highlighted Avotar Holder Deal
                </p>
                <h1>
                  <span className="uppercase">7.99 USDC</span> for Discord Nitro
                </h1>
              </div>
              <Link
                href={'https://guac.gg/nitro-offer'}
                className="text-sm font-semibold uppercase bg-black text-white py-2 px-5 text-center rounded-md w-max  "
              >
                Start Shopping
              </Link>
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
            {shopList.map((item) => (
              <Link key={item.name} href={item.href}>
                <BannerCard
                  backgroundImage={item.image}
                  backgroundColor={item.theme_color}
                  compact={true}
                >
                  {item.name}
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

const shopList = [
  {
    name: 'SHOP',
    theme_color: '#F0FDF4',
    image: '/images/home/shop/SHOP.png',
    href: 'https://guac.gg/shop',
  },
  {
    name: 'RAFFLES',
    theme_color: '#F0FDF4',
    image: '/images/home/shop/RAFFLES.png',
    href: 'https://guac.gg/raffles',
  },
  {
    name: 'GIVEAWAYS',
    theme_color: '#F0FDF4',
    image: '/images/home/shop/GIVEAWAYS.png',
    href: 'https://guac.gg/dashboard?menu=giveaways',
  },
  {
    name: 'SECONDARY',
    theme_color: '#F0FDF4',
    image: '/images/home/shop/SECONDARY.png',
    href: 'https://guac.gg/secondary',
  },
];

export default ShopSection;
