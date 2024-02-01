"use client";

import { Card } from "@/components/common/Card";
import { Slider } from "@/components/common/Slider";
import { GAMES } from "@/components/games-v2";
// import { GAMES } from "@/components/games";
import { Section } from "@/components/styles";

//import { useGamba } from "gamba/react";
import { useGamba } from "gamba-react-v2";
import Link from "next/link";
import { FC } from "react";

const Featured: FC = () => {
  

  return (
    <div className="flex max-w-[700px] w-full flex-col gap-4 rounded-lg ">
      <div className="flex flex-row gap-[10px] overflow-auto px-0">
        <Section>
          <Slider>
            {GAMES.map((game) => (
              <Link key={game.id} href={`/play/${game.id}`}>
                <Card
                  width={170}
                  height={75}
                  backgroundImage={game.meta.image}
                  backgroundColor={game.meta.background }
                >
                  <span className="text-[#FCFCFC] text-[32px]">
                    {game.meta.name}
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
