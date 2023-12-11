import ColorBlocks from "@/components/common/color-block";
import HeroHeadline from "@/components/common/hero-headline";

import BackgroundSplash from "@/components/common/background-splash";
import HeroList from "@/components/common/hero-list";
import TrendingToday from "@/components/views/home/trending-today";
import routes from "@/config/routes";
import { AccentColors } from "@/config/themes";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <BackgroundSplash className="bg-home-bg " />
      <main
        className={cn(
          "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
        )}
      >
        <section className="flex flex-col gap-[60px]">
       
          <div className="grid grid-cols-1 lg:grid-cols-8    gap-[60px] h-full  overflow-hidden">
          
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
              <Link className="text-xl text-primary" href={"/terminal"}>Scoop The Dip ➜</Link>
            </HeroHeadline>
            <TrendingToday className="col-span-1 lg:col-span-3  bg-foreground" />
          </div>

          <HeroList listItems={HomeListItems} />
          <ColorBlocks className="mx-auto" />
        </section>
      
      </main>
    </>
  );
}

const HomeListItems: ListItemProps[] = [
  {
    title: "Trade",
    description:
      "Trade any tokens on Solana in just a few clicks with no hassle and the best fees.",
    image: "/images/themes/violet.png",
    href: routes.trade.swap,
    accent: AccentColors.violet,
  },
  {
    title: "Earn",
    description:
      "Put your crypto to work for you in various ways and enjoy the fruit of its labor.",
    image: "/images/themes/orange.png",
    href: routes.earn.explore,
    accent: AccentColors.orange,
  },
  {
    title: "Play",
    description:
      "Take a chance in fun games where you can win some of your favorite tokens.",
    image: "/images/themes/yellow.png",
    href: routes.play.explore,
    accent: AccentColors.yellow,
  },
  {
    title: "Manage",
    description:
      "Helpful tools make it easy to navigate every step of your journey through crypto.",
    image: "/images/themes/white.png",
    href: routes.tools.explore,
    accent: AccentColors.white,
  },
];
