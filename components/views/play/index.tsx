'use client';
import React from 'react';
import { GAMES } from '@/components/games';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BannerCard } from '@/components/common/banner-card';
import PlayCard from '@/components/ui/play-card';
import Container from '@/components/common/container';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Play = () => {
  return (
    <div className="flex justify-center  ">
      {/* <Ready />
      <Banner /> */}
      {
        // grid of 4 columns make it responsive
      }
      <div
        className={cn(
          'grid place-items-center   gap-4 px-4 py-4 grid-cols-1 w-max ',
          'md:grid-cols-2 '
        )}
      >
        {GAMES.length > 1 &&
          GAMES.map((game: any) => (
            <Container
              key={game.short_name}
              className="border border-transparent w-full  min-w-[322px] duration-500 ease-in-out hover:border-[var(--accent)]  hover:border rounded-lg"
            >
              <Link
                href={`/play/${game.short_name}`}
                className={cn(
                  'w-full  flex flex-col items-center gap-8  transition-colors p-4 rounded-lg cursor-pointer bg-background  '
                )}
              >
                <header>
                  <Image
                    src={game.image}
                    alt={game.short_name}
                    width={90}
                    height={90}
                  />
                </header>
                <Button className="w-32">{game.short_name}</Button>
              </Link>
            </Container>
          ))}
      </div>
    </div>
  );
};

export default Play;
