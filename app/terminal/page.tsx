import ColorBlocks from "@/components/common/color-block";
import HeroHeadline from "@/components/common/hero-headline";

import BackgroundSplash from "@/components/common/background-splash";
import HeroList from "@/components/common/hero-list";
import TrendingToday from "@/components/views/home/trending-today";
import routes from "@/config/routes";
import { AccentColors } from "@/config/themes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import TerminalGraph from "@/components/views/terminal/TerminalGraph";
import Trade from "@/components/views/trade/src/Trade";
import AnalyticsChart from "@/components/views/terminal/AnalyticsChart";
import MarketPulseChart from "@/components/views/terminal/MarketPulseChart";
import SolanaTvlRanking from "@/components/views/terminal/solana-tvl-ranking";
import TopNftCollections from "@/components/views/terminal/top-nft-collections";

export default function Terminal() {
  return (
    <>
      <main
        className={cn(
          "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
        )}
      >
        <section className="grid grid-cols-6 gap-10">
          <Trade className=" lg:col-span-2  lg:h-full bg-foreground" />
          <TerminalGraph className="  lg:col-span-4 w-full">
            <MarketPulseChart />
          </TerminalGraph>
          <TrendingToday className=" lg:col-span-2 lg:h-full bg-foreground" />
          <TopNftCollections className="lg:col-span-2 w-full" />
          <SolanaTvlRanking className="lg:col-span-2 w-full" />
        </section>
      </main>
    </>
  );
}
