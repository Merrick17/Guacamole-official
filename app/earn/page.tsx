import EarnMainContentCard from "@/components/views/earn/explorer/EarnMainContentCard";
import LiquidStakingContentCard from "@/components/views/earn/explorer/LiquidStakingContentCard";
import StakeGuacContentCard from "@/components/views/earn/explorer/StakeGuacContentCard";
import TokenizedNftFarmCard from "@/components/views/earn/explorer/TokenizedNftFarmCard";
import routes from "@/config/routes";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Useful Tools For All Solana Users | Guacamole",
  description:
    "Find a variety of easy to use tools in our suite that can instantly help improve your quality of life while interacting with the Solana blockchain or starting your own project!",
  openGraph: {
    images: "/images/seo/earn.png",
  },
};
const Earn: FC = () => {
  return (
    <>
      {/* <BackgroundSplash className="bg-earn-bg" />
      <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] ">
        <section className="flex flex-col gap-[60px]  ">
          <div className="grid grid-cols-1 lg:grid-cols-8  gap-[60px] lg:h-[560px] overflow-hidden  ">
            <HeroHeadline
              className="col-span-1  lg:col-span-5"
              title={
                <h1
                  className={
                    "text-3xl sm:text-6xl lg:text-[60px] lg:leading-[72px] font-bold "
                  }
                >
                  Explore several ways to earn{" "}
                  <span className="text-primary">passive income</span> with your
                  portfolio!
                </h1>
              }
            >
              <p className=" text-xl font-medium leading-8 text-muted-foreground">
                Several exciting features to help earn tokens, NFTs, and more.
                Our platform makes it easy to make your crypto work for you!
                Most features also feature a permissionless setup for any
                community or project to use.
              </p>
              <Link className="text-xl text-primary" href={"/earn/explore"}>
                Explore Ways To Earn ➜
              </Link>
            </HeroHeadline>
            <DynamicVaultStatistics className="col-span-1 lg:col-span-3 bg-foreground" />
          </div>

          <HeroList listItems={EarnListItems} />
          <ColorBlocks className="mx-auto" />
        </section>
      </main> */}
      <main
        className={cn(
          "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
        )}
      >
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          <EarnMainContentCard className="col-span-1 md:col-span-2" />
          <StakeGuacContentCard className="col-span-1 md:col-span-2 hover:border-[#D6776A]" />
          <TokenizedNftFarmCard className="col-span-1 md:col-span-2 hover:border-[#D6776A]" />
          <LiquidStakingContentCard className="col-span-1 md:col-span-2 hover:border-[#D6776A]" />

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
      </main>
    </>
  );
};

export default Earn;

const EarnListItems: ListItemProps[] = [
  {
    title: "Dynamic Vaults",
    description:
      "Optimize yields between top lending protocols with rebalancing vaults.",
    image: "/icons/earn/dynamic-vault.png",
    href: routes.earn.dynamicVault,
  },
  {
    title: "NFT Farms",
    description:
      "Stake tokens to receive points which can be utilized to redeem vaulted NFTs.",
    image: "/icons/earn/nft-farms.svg",
    href: routes.earn.stakingFarms,
  },
  {
    title: "Liquid Staking",
    description:
      "Stake your Solana and earn while being able to swap & participate in DeFi.",
    image: "/icons/earn/liquidity-staking.svg",
    href: routes.earn.liquidityStaking,
  },
  {
    title: "GUAC Staking Options",
    description:
      "Stake GUAC to participate in our “Staking Call Options” program.",
    image: "/icons/earn/liquidity-farming.svg",
    href: routes.earn.guacStaking,
  },
];
