import Container from "@/components/common/container";
import ExploreCard from "@/components/common/explore-card";
import InfoCard from "@/components/common/info-card";
import { Button } from "@/components/ui/button";
import routes from "@/config/routes";
import Link from "next/link";

const Page = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col gap-14 px-3 lg:px-8 py-6 md:px-16 md:py-12  max-w-[1440px] h-full">
      <div
        className={
          " mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-6xl lg:grid-cols-3 gap-x-6 gap-y-6"
        }
      >
        {featuredTools.map((tool, index) => (
          <ExploreCard key={index} {...tool} />
        ))}

        {/* {tools.map((tool, index) => (
          <InfoCard key={index} {...tool} />
        ))} */}
      </div>
      <Container className="max-w-[1000px] max-sm:max-w-xs  bg-[url('/images/div.max-w-sm.png')] border border-transparent min-h-[238px] hover:border-primary">
        <div className="flex w-full h-full flex-col items-start justify-start gap-4">
          <svg
            width="37"
            height="28"
            viewBox="0 0 37 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0V28H36.6154V0H0ZM4.30769 23.6923V4.30769H10.7692V23.6923H4.30769ZM15.0769 23.6923V16.1538H21.5385V23.6923H15.0769ZM32.3077 23.6923H25.8462V16.1538H32.3077V23.6923ZM15.0769 11.8462V4.30769H32.3077V11.8462H15.0769Z"
              fill="#BBB0DB"
            />
          </svg>

          <h5 className=" text-2xl font-medium tracking-tight ">
            Solana Data Terminal
          </h5>
          <p className="text-muted-foreground ">
            Explore DeFi, Token, and NFT statistics on one convenient panel so
            you can make better decisions, faster.
          </p>
          <Button className="w-[150px]">
            <Link
              href={"/terminal"}
              className="flex justify-center items-center"
            >
              Open Terminal{" "}
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>{" "}
          </Button>
        </div>
      </Container>
      <div
        className={
          " mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-6xl lg:grid-cols-3 gap-x-6 gap-y-6"
        }
      >
        {/* {featuredTools.map((tool, index) => (
          <ExploreCard key={index} {...tool} />
        ))} */}

        {tools.map((tool, index) => (
          <InfoCard key={index} {...tool} />
        ))}
      </div>
    </main>
  );
};

export default Page;

const featuredTools: {
  image: string;
  title: string;
  description: string;
  href: string;
  buttonTxt?: string;
}[] = [
  {
    title: "Swap Aggregator",
    description:
      "Easily find the best trading routes to ensure you get the best bang for your buck!",
    href: routes.trade.swap,
    image: "/images/trade/swap.png",
    buttonTxt: "Swap",
  },
  {
    title: "Bridge Swaps",
    description:
      "Bridge your ETH, BNB, AVAX, and ARB to Solana and pick up tokens like GUAC.",
    image: "/images/trade/bridge.png",
    href: routes.trade.bridge,
    buttonTxt: "Bridge",
  },
  {
    title: "Crypto Futures",
    description:
      "Use margin to trade gamified perpetual futures markets for BTC, ETH, SOL, and more. ",
    image: "/images/trade/crypto-future.png",
    href: routes.trade.perpetuals,
    buttonTxt: "Trade",
  },
];

const tools: {
  image: string;
  name: string;
  description: string;
  href?: string;
  disabled?: boolean;
}[] = [
  {
    image: "/icons/trade/dca.svg",
    name: "Place Limit Orders",
    description:
      "Setup limit on-chain limit orders or view aggregated orderbooks.",
    href: routes.tools.root,
    disabled: true,
  },
  {
    name: "Dollar Cost Average",
    description:
      "Setup limit on-chain limit orders or view aggregated orderbooks.",
    image: "/icons/trade/dollar-cost-avg.svg",
    href: routes.tools.root,
    disabled: true,
  },
  {
    image: "/icons/trade/Thumbs up down.svg",
    name: "Trading Arena",
    description:
      "Trade futures in an interactive PvP setting to move up the ranks.",
    href: routes.tools.root,
    disabled: true,
  },
  {
    image: "/icons/trade/Hot tub.svg",
    name: "Liquidity Pools",
    description:
      "Provide liquidity for a variety of protocols in the Solana ecosystem.",
    href: routes.tools.root,
    disabled: true,
  },
  {
    image: "/icons/trade/nft-marketplace.svg",
    name: "NFT Marketplace",
    description:
      "Browse, sell, and buy your favorite NFTs through market integrations.",
    href: routes.tools.root,
    disabled: true,
  },
  {
    image: "/icons/trade/liq-pool.svg",
    name: "NFT Liquidity Pools",
    description:
      "Provide liquidity for NFTs across a specified range (bonding curve).",
    href: routes.tools.root,
    disabled: true,
  },
];
