"use client";

import { Card } from "@/components/common/Card";
import { Slider } from "@/components/common/Slider";
import { GAMES } from "@/components/games";
import { Section } from "@/components/styles";
//import { useGamba } from "gamba/react";
import { useGamba } from 'gamba-react-v2'
import Link from "next/link";
import { FC } from "react";

const Featured: FC = () => {
  const gamba = useGamba();

  return (
    <div className="flex max-w-[512px] w-full flex-col gap-4 rounded-lg ">
      <div className="flex flex-row gap-[10px] overflow-auto px-0">
        <Section>
          <Slider>
            {GAMES.map((game) => (
              <Link key={game.short_name} href={`/play/${game.short_name}`}>
                <Card
                  width={170}
                  height={75}
                  backgroundImage={game.image}
                  backgroundColor={game.theme_color}
                >
                  <span className="text-[#FCFCFC] text-[32px]">
                    {game.name}
                  </span>
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
