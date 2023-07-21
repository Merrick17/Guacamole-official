'use client';
import React from 'react';
import { GAMES } from '@/components/games';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BannerCard } from '@/components/common/banner-card';

const Play = () => {
  return (
    <>
      {/* <Ready />
      <Banner /> */}
      {
        // grid of 4 columns make it responsive
      }
      <div
        className={cn(
          'grid place-items-center  gap-4 px-4 py-4 grid-cols-1',
          'md:grid-cols-2'
        )}
      >
        {GAMES.length > 1 &&
          GAMES.map((game: any) => (
            <Link key={game.short_name} href={`/play/${game.short_name}`}>
              <BannerCard
                backgroundImage={game.image}
                backgroundColor={game.theme_color}
              >
                {game.name}
              </BannerCard>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Play;
