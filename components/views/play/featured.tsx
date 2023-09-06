'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { GAMES } from '@/components/games';
import { Slider } from '@/components/common/Slider';
import { FaArrowRight, FaDice, FaList } from 'react-icons/fa';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Section } from '@/components/styles';

type FeaturedProps = {};
const Featured: FC<FeaturedProps> = () => {
  return (
    <div className="flex max-w-[512px] w-full flex-col gap-4 rounded-lg bg-foreground ">
      <div className="flex flex-row gap-[10px] overflow-auto ">
        {GAMES.length > 1 && (
          <Section>
            <Slider>
              {GAMES.map((game: any) => (
                <Link key={game.short_name} href={`/play/${game.short_name}`}>
                  <Card
                    width={150}
                    height={50}
                    backgroundImage={game.image}
                    backgroundColor={game.theme_color}
                  >
                    {game.name}
                  </Card>
                </Link>
              ))}
            </Slider>
          </Section>
        )}
      </div>
    </div>
  );
};

export default Featured;
