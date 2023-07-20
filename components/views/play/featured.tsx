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
  const pathname = usePathname();
  return (
    <div className="flex w-[512px] flex-col gap-4 rounded-lg bg-white ">
      <div className="flex flex-row gap-[10px] overflow-auto ">
        {GAMES.length > 1 && (
          <Section>
            <Slider>
              {GAMES.map((game: any) => (
                <Link key={game.short_name} href={`/play/${game.short_name}`}>
                  <Card
                    width={150}
                    height={150}
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

type FeaturedGameProps = {
  name: string;
  image: string;
  variant: 'normal' | 'compact';
};
const FeaturedGame: FC<FeaturedGameProps> = ({ name, image, variant }) => {
  const height = variant === 'normal' ? 'h-[150px]' : 'h-[50px]';
  return (
    <div
      className={cn(
        'relative  w-[150px] overflow-hidden rounded-[5px]',
        height
      )}
    >
      <Image src={image} fill alt={name} className="object-cover" />
      {variant === 'normal' && (
        <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2">
          <Button className="whitespace-nowrap font-semibold uppercase">
            {name}
          </Button>
        </div>
      )}
    </div>
  );
};

const Games = [
  {
    name: 'Coin Flip',
    image: '/images/coin-flip.png',
  },
  {
    name: 'Roulette',
    image: '/images/roulette.png',
  },
  {
    name: 'Slots',
    image: '/images/slots.png',
  },
];
