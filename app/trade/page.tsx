import ColorBlocks from "@/components/common/color-block";
import BridgeSwapContent from "@/components/views/trade/BridgeSwapContent";
import BuyCryptoContentCard from "@/components/views/trade/BuyCryptoContentCard";
import FutureContentCard from "@/components/views/trade/FutureContentCard";
import LiquidityContentCard from "@/components/views/trade/LiquidityContentCard";
import MainTradeContentCard from "@/components/views/trade/MainTradeContentCard";
import PeerToPeerContentCard from "@/components/views/trade/PeerToPeerContent";
import RipRottenCard from "@/components/views/trade/RipRottenCard";
import routes from "@/config/routes";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Trade, Swap, Bridge & Buy Crypto | Guacamole",
};

const Page: FC = () => {
  return (
    <>
      {/* <BackgroundSplash className="bg-trade-bg" />
      <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-160px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] ">
        <section className="flex flex-col gap-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-8  gap-[60px] h-full lg:h-[560px] overflow-hidden ">
            <HeroHeadline
              className="col-span-1  lg:col-span-5"
              title={
                <h1 className="text-3xl sm:text-6xl lg:text-[60px] lg:leading-[72px] ">
                  Trade <span className="text-primary">anything</span> with the
                  click of a button. It&apos;s really that{" "}
                  <span className="text-primary">easy</span>!
                </h1>
              }
            >
              <p className=" text-xl font-medium leading-8 text-muted-foreground">
                Our amazing tools help you trade any token on Solana. Just
                connect your wallet, select a token, and click! Advanced trading
                options are also available like the ability to DCA, place limit
                orders, or bridge.
              </p>
              <Link className="text-xl text-primary" href={"/trade/explore"}>
                Explore Trading Features ➜
              </Link>
            </HeroHeadline>
            <Trade
              showDetails={false}
              className="col-span-1 lg:col-span-3 bg-foreground"
            />
          </div>

          <HeroList listItems={TradeListItems} />
          <ColorBlocks className="mx-auto" />
        </section>
      </main> */}
      <main
        className={cn(
          "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-160px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
        )}
      >
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          <MainTradeContentCard className="col-span-1 md:col-span-2" />
          <RipRottenCard className="hover:border-[#bbb0db]" />
          <FutureContentCard className="hover:border-[#bbb0db]" />
          <BridgeSwapContent className="hover:border-[#bbb0db]" />
          <BuyCryptoContentCard className="hover:border-[#bbb0db]" />
          <LiquidityContentCard className=" hover:border-[#bbb0db]" />
          <PeerToPeerContentCard className="hover:border-[#bbb0db]" />

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

const TradeListItems: ListItemProps[] = [
  {
    title: "Swap Aggregator",
    description:
      "Easily find the best trading routes to ensure you get the best bang for your buck!",
    image: "/icons/trade/swap-aggregator.svg",
    href: routes.trade.swap,
  },
  {
    title: "Bridge Swaps",
    description:
      "Bridge your ETH, BNB, AVAX, and ARB to Solana and pick up tokens like GUAC.",
    image: "/icons/trade/bridge-swap.svg",
    href: routes.trade.bridge,
  },
  {
    title: "Crypto Futures",
    description:
      "Trade gamified perpetual futures markets for BTC, ETH, SOL, and more. ",
    image: "/icons/trade/perpetuals.svg",
    href: routes.trade.perpetuals,
  },
  {
    title: "DCA & Limit Orders",
    description:
      "Set limit or dollar cost averaging orders to swap when you’re not around.",
    image: "/icons/trade/dca.svg",
    href: routes.tools.root,
    disabled: true,
  },
];

export default Page;
