import ColorBlocks from "@/components/common/color-block";
import GameLiquidityComponent from "@/components/views/play/explorer/GameLiquidityComponent";
import MainPlayComponent from "@/components/views/play/explorer/MainPlayComponent";
import PlayDiceCardComponent from "@/components/views/play/explorer/PlayDiceCardComponent";
import PlayFlipCardComponent from "@/components/views/play/explorer/PlayFlipCardComponent";
import PlayHiloCardComponent from "@/components/views/play/explorer/PlayHiloCardComponent";
import PlayMinesCardComponent from "@/components/views/play/explorer/PlayMinesCardComponent";
import PlayPlinkoCardComponent from "@/components/views/play/explorer/PlayPlinkoCardComponent";
import PlaySlotsCardComponent from "@/components/views/play/explorer/PlaySlotsCardComponent";
import routes from "@/config/routes";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

import { FC } from "react";

export const metadata: Metadata = {
  title: "Play Games, Win SOL and Tokens | Guacamole",
  // description:
  //   "Take a chance in fun games where you can win some Solana and some of your favorite coins and tokens. Flips, mines, and more await for you to play on Guacamole!",
  // openGraph: {
  //   images: "/images/seo/play.png",
  // },
};

const Page: FC = () => {
  return (
    <>
      {/* <BackgroundSplash className="bg-play-bg" />
      <main
        className={cn(
          "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-160px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
        )}
      >
        <section className="flex flex-col gap-[60px] ">
          <div className="grid grid-cols-1 lg:grid-cols-8  gap-14   h-full lg:h-[560px] overflow-hidden">
            <HeroHeadline
              className="col-span-1 lg:col-span-5"
              title={
                <h1 className="text-3xl sm:text-6xl lg:text-[60px] lg:leading-[72px] ">
                  Play plenty of funky fresh on-chain games and{" "}
                  <span className="text-primary">win prizes</span>!
                </h1>
              }
            >
              <p className=" text-xl font-medium leading-8 text-muted-foreground">
                Take a chance in fun games where you can win SOL and some of
                your favorite coins and tokens. Flips, mines, dice, and more
                await for you to play on our game section.
              </p>
              <Link className="text-xl text-primary" href={"/play/explore"}>
                Explore All Games ➜
              </Link>
            </HeroHeadline>
            <RecentPlaysFeatured className="col-span-1 lg:col-span-3 bg-foreground" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10  rounded-lg bg-foreground p-6 lg:px-14 lg:py-6  backdrop:blur-sm">
            {PlayListItems.map((item, index) => (
              <PlayCard key={index} {...item} />
            ))}
          </div>
          <ColorBlocks className="mx-auto" />
        </section>
      </main> */}
      <main
        className={cn(
          "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-160px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
        )}
      >
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          <MainPlayComponent className="col-span-1 md:col-span-2" />
          <PlayFlipCardComponent className=" hover:border-[#FCED7B]" />
          <PlayDiceCardComponent className=" hover:border-[#FCED7B]" />
          <PlayPlinkoCardComponent className=" hover:border-[#FCED7B]" />
          <PlaySlotsCardComponent className=" hover:border-[#FCED7B]" />
          <PlayHiloCardComponent className=" hover:border-[#FCED7B]" />
          <PlayMinesCardComponent className=" hover:border-[#FCED7B]" />
          {/* <GameLiquidityComponent className="col-span-1 md:col-span-2 hover:border-[#FCED7B]" /> */}

          {/* {lg:h-[560px]} */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-8    gap-[60px] h-full  overflow-hidden">
            <HeroHeadline
              className="col-span-1  lg:col-span-5"
              title={
                <h1
                  className={
                    "text-3xl sm:text-6xl lg:text-[60px] lg:leading-[72px] font-bold "
                  }
                >
                  The <span className="text-primary">best ingredients</span> to
                  keep your crypto portfolio{" "}
                  <span className="text-primary">super fresh</span>.
                </h1>
              }
            >
              <p className=" text-xl font-medium leading-8 text-muted-foreground">
                Experience a fresh take on Solana DeFi with{" "}
                <span className="text-primary">Guacamole</span>. Trade, earn,
                and play effortlessly, while enjoying a seamless and
                user-friendly experience. Get started and unlock a world of
                possibilities!
              </p>
              <Link className="text-xl text-primary" href={"/terminal"}>
                Scoop The Dip ➜
              </Link>
            </HeroHeadline>
            <TrendingToday className="col-span-1 lg:col-span-3  bg-foreground" />
          </div>

          <HeroList listItems={HomeListItems} />
          <ColorBlocks className="mx-auto" /> */}
        </section>
        <ColorBlocks className="mx-auto" />
      </main>
    </>
  );
};

const PlayListItems: {
  title: string;
  image: string;
  href: string;
  disabled?: boolean;
}[] = [
  {
    title: "Roulette",
    image: "/images/play/roulette.png",
    href: routes.play.roulette,
  },
  {
    title: "Slots",
    image: "/images/play/slots.png",
    href: routes.play.slots,
  },
  {
    title: "Dice",
    image: "/images/play/dice.png",
    href: routes.play.dice,
  },

  {
    title: "Mines",
    image: "/images/play/mines.png",
    href: routes.play.mines,
  },
];

export default Page;
