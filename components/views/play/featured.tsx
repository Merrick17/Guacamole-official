'use client';

import { Card } from '@/components/common/Card';
import { Slider } from '@/components/common/Slider';
import { GAMES } from '@/components/games';
import { Section } from '@/components/styles';
import { useGamba } from 'gamba/react';
import Link from 'next/link';
import { FC } from 'react';

const Featured: FC = () => {
  const gamba = useGamba();
  console.log(gamba.seed);
  return (
    <div className="flex max-w-[512px] w-full flex-col gap-4 rounded-lg bg-foreground ">
      <div className="flex flex-row gap-[10px] overflow-auto ">
        <Section>
          <Slider>
            {GAMES.map((game) => (
              <Link key={game.short_name} href={`/${game.short_name}`}>
                <Card
                  width={150}
                  height={75}
                  backgroundImage={game.image}
                  backgroundColor={game.theme_color}
                >
                  {game.name}
                </Card>
              </Link>
            ))}
          </Slider>
        </Section>
      </div>
    </div>
  );
};

export default Featured;
