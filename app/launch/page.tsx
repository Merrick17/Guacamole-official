// import BackgroundSplash from "@/components/common/background-splash";
// import ColorBlocks from "@/components/common/color-block";
// import HeroHeadline from "@/components/common/hero-headline";
// import HeroList from "@/components/common/hero-list";
// import CreationWalkthroughs from "@/components/views/launch/creation-walkthroughs";
// import routes from "@/config/routes";
// import { Metadata } from "next";
// import Link from "next/link";
// import { FC } from "react";

// export const metadata: Metadata = {
//   title: "Easily Swap Solana Based Tokens | Guacamole",
//   description:
//     "Guacamole Swap allows you to launch any tokens on Solana in just a few clicks with no hassle and the best fees.",
//     openGraph: {
//       images: "/images/seo/launch.png",
//     },
// };

// const Page: FC = () => {
//   return (
//     <>
//       <BackgroundSplash className="bg-launch-bg" />
//       <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-160px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] ">
//         <section className="flex flex-col gap-[60px]">
//           <div className="grid grid-cols-1 lg:grid-cols-8  gap-[60px]  h-full lg:h-[560px] overflow-hidden  ">
//             <HeroHeadline
//               className="col-span-1  lg:col-span-5"
//               title={
//                 <h1 className="text-3xl sm:text-6xl lg:text-[60px] lg:leading-[72px] ">
//                   Make sure your new project stays hot with our{" "}
//                   <span className="text-primary">spicy features</span>.
//                 </h1>
//               }
//             >
//               <p className=" text-xl font-medium leading-8 text-muted-foreground">
//                 Introducing a fresh and spicy way to launch your token or NFT
//                 project with easy-to-follow walk-throughs. The no-code
//                 interfaces make it easier to get off the ground and start
//                 distribution and add utilities.
//               </p>
//               <Link className="text-xl text-primary" href={"/launch/explore"}>
//                 Explore Launch Tools ➜
//               </Link>
//             </HeroHeadline>
//             <CreationWalkthroughs className="col-span-1 lg:col-span-3 bg-foreground" />
//           </div>

//           <HeroList listItems={LaunchListItems} />
//           <ColorBlocks className="mx-auto" />
//         </section>
//       </main>
//     </>
//   );
// };

// const LaunchListItems: ListItemProps[] = [
//   {
//     title: "Create Your Token",
//     description:
//       "Create your own token in just 2 minutes using our no-code creation interface.",
//     image: "/icons/launch/create-token.svg",
//     href: routes.launch.createSplToken,
//   },
//   {
//     title: "Mint Your cNFTs",
//     description:
//       "Easily create a compressed NFT collection using our no-code interfaces.",
//     image: "/icons/launch/mint-cnfts.svg",
//     href: routes.launch.root,
//   },
//   {
//     title: "Add NFT Farm",
//     description:
//       "Reward token stakers in your community with points-based NFT rewards.",
//     image: "/icons/launch/nft-farm.svg",
//     href: routes.earn.stakingFarms,
//   },
//   {
//     title: "List Token On Shop",
//     description:
//       "Allow your community to purchase games, software, and more with your token.",
//     image: "/icons/launch/token-on-shop.svg",
//     href: routes.tools.root,
//   },
// ];

// export default Page;
import ColorBlocks from "@/components/common/color-block";
import HeroHeadline from "@/components/common/hero-headline";

import BackgroundSplash from "@/components/common/background-splash";
import HeroList from "@/components/common/hero-list";
import TrendingToday from "@/components/views/home/trending-today";
import routes from "@/config/routes";
import { AccentColors } from "@/config/themes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import GuacContentCard from "@/components/views/home/guac-content-card";
import TradeContentCard from "@/components/views/home/trade-content-card";
import EarnContentCard from "@/components/views/home/earn-content-card";
import PlayContentCard from "@/components/views/home/play-content-card";

import LaunchContentCard from "@/components/views/home/launch-content-card";
import ManageContentCard from "@/components/views/home/manage-content-card";
import ExploreCardContent from "@/components/views/explore/ExploreCardContent";
import DaoCardContent from "@/components/views/explore/DaoCardContent";
import AvocadoCardContent from "@/components/views/explore/AvocadoCardContent";
import EarnRewardShop from "@/components/views/explore/EarnRewardShop";
import NoCodeTokenCreatorCard from "@/components/views/launch/NoCodeTokenCreatorCard";
import LiquidityCardContent from "@/components/views/launch/LiquidityCardContent";
import TokenManagerContentCard from "@/components/views/launch/TokenManagerContentCard";
import TokenLocksContentCard from "@/components/views/launch/TokenLocksContentCard";
import LaunchNftFarmCard from "@/components/views/launch/LaunchNftFarmCard";
import LaunchPoolsFarm from "@/components/views/launch/LaunchPoolsFarm";

export default function Page() {
  return (
    <>
      {/* <BackgroundSplash className="bg-home-bg " /> */}
      <main
        className={cn(
          "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-160px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
        )}
      >
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          <NoCodeTokenCreatorCard className="col-span-1 md:col-span-2 cursor-pointer" />
          <LiquidityCardContent className="col-span-1 md:col-span-2 cursor-pointer" />
          <TokenManagerContentCard className=" cursor-pointer" />
          <TokenLocksContentCard className="cursor-pointer" />
          <LaunchNftFarmCard className="cursor-pointer" />
          <LaunchPoolsFarm className="cursor-pointer" />

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
}
