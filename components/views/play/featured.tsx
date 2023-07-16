import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FC } from 'react';

type FeaturedProps = {
  variant?: 'normal' | 'compact';
};
const Featured: FC<FeaturedProps> = ({ variant = 'normal' }) => {
  return (
    <div className="flex w-[512px] flex-col gap-4 rounded-lg bg-white px-5 py-7">
      <header className="flex items-center gap-1">
        <div className="relative aspect-square w-6">
          <Image src="/icons/featured-games.svg" fill alt="play" />
        </div>
        <h1 className="text-2xl   text-black">Featured Games</h1>
      </header>
      <div className="flex flex-row gap-[10px] overflow-auto ">
        {Games.map((game, index) => (
          <FeaturedGame variant={variant} key={index} {...game} />
        ))}
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
