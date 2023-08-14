// 'use client';
import Container from '@/components/views/home/container';
import { BannerCard } from '@/components/common/banner-card';
import { GAMES } from '@/components/games';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ColorBlocks from '@/components/common/color-block';
import { Raleway } from 'next/font/google';
// import { useEffect } from 'react';
import axios from 'axios';
const RalewayFont = Raleway({
  weight: '700',
  subsets: ['latin'],
});
const GamesSection = () => {
  // useEffect(() => {
  //   const getTotalPlayedVolume = async () => {
  //     const { data } = await axios.get(
  //       `https://209.38.229.113.nip.io:3001/top-creators/total-wager?start=1677724800&end=${Date.now()}`,
  //       {
  //         headers: {
  //           'Access-Control-Allow-Origin': '*',
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  //     console.log('wa333', data);
  //   };
  //   getTotalPlayedVolume();
  // }, []);
  return (
    <section className="flex flex-col gap-[60px]">
      <div className="flex flex-col lg:flex-row gap-14 justify-between w-full">
        <Container>
          <div className="flex flex-col justify-center gap-10 h-full">
            <div className="flex flex-col gap-10">
              <h1
                className={cn('font-bold text-[40px]', RalewayFont.className)}
              >
                Play plenty of fun on-chain games and win prizes!
              </h1>
              <p className="font-medium text-xl text-[#5B5B5B]">
                Take a chance in fun games where you can win Solana and some of
                your favorite coins and tokens. Flips, mines, dice, and more
                away for you to play on Guacamole’s game section.
              </p>
            </div>
            <div className="bg-[#F0FDF4] rounded-lg border border-[#E5E7EB] p-6 flex flex-col gap-6 ">
              <div className="font-medium text-3xl">
                <p className="text-black/50 text-sm ">Total Played Volume</p>
                <h1>
                  <span className="uppercase">1000+</span> SOL
                </h1>
              </div>
              <div className="font-medium text-3xl">
                <p className="text-black/50 text-sm ">Biggest Multiplier Win</p>
                <h1>
                  <span className="uppercase">25.0</span> X
                </h1>
              </div>
            </div>
          </div>
        </Container>
        <Container>
          <div
            className={cn(
              'grid  place-content-center  grid-cols-1',
              'md:grid-cols-2  gap-9'
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

export default GamesSection;
