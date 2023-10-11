import Container from "@/components/common/container";
import ExploreCard from "@/components/common/explore-card";
import InfoCard from "@/components/common/info-card";
import { Button } from "@/components/ui/button";
import routes from "@/config/routes";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ToolsProps {}

export const metadata: Metadata = {
  title: "Useful Tools For All Solana Users | Guacamole",
  description:
    "Find a variety of easy to use tools in our suite that can instantly help improve your quality of life while interacting with the Solana blockchain or starting your own project!",
};
const page: FC<ToolsProps> = () => {
  return (
    <main className="container mx-auto w-full  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <div
        className={
          " mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-6xl lg:grid-cols-3 gap-x-6 gap-y-6"
        }
      >
        {featuredLaunch.map((tool, index) => (
          <ExploreCard key={index} {...tool} />
        ))}
        {LaunchItems.map((tool, index) => (
          <InfoCard key={index} {...tool} />
        ))}
      </div>
    </main>
  );
};

export default page;

const featuredLaunch: {
  image: string;
  title: string;
  description: string;
  href: string;
  buttonTxt?: string;
  disabled?: boolean;
  target?: string;
}[] = [
  {
    title: "Create Your Token",
    description:
      "Create your own token in just 2 minutes using our no-code creation interface.",
    href: routes.launch.createSplToken,
    image: "/images/launch/create-spl-token.png",
    buttonTxt: "Create",
  },
  {
    title: "List Token On Shop",
    description:
      "Allow your community to purchase games, software, and more with your token.",
    image: "/images/launch/popular-subscription.png",
    href: "https://docs.guacamole.gg/extended-ecosystem/guac-shop/list-your-token",
    buttonTxt: "List",
    target: "_blank",
  },
  {
    title: "Mint Your cNFTs",
    description:
      "Easily create a compressed NFT collection using our no-code interfaces.",
    image: "/images/launch/CNFT_MInter_Guac.png",
    href: "",
    buttonTxt: "Coming Soon",
    disabled: true,
  },
];

const LaunchItems: {
  image: string;
  name: string;
  description: string;
  href?: string;
  disabled?: boolean;
}[] = [
  {
    image: "/icons/launch/burn.svg",
    name: "burn tokens",
    description: "Burn portions of token supply or liquidity pool tokens.",
    href: routes.tools.burnSplToken,
  },
  {
    name: "add nft farm",
    description:
      "Create your own Tokenized NFT Farm to reward stakers with NFTs.",
    image: "/icons/launch/nft-farm.svg",
    href: routes.launch.root,
    disabled: true,
  },

  {
    image: "/icons/launch/launch-pool.svg",
    name: "Launch Liquidity Pools",
    description: "Create pools for your token on Guacamole and other DEX’s.",
    href: routes.tools.root,
    disabled: true,
  },
  {
    image: "/icons/launch/create-lp-farm.svg",
    name: "Launch Liquidity Farm",
    description:
      "Incentivize liquidity pool deposits with extra token rewards.",
    href: routes.tools.root,
    disabled: true,
  },
  {
    image: "/icons/launch/lock-liquidity.svg",
    name: "Lock Your Liquidity",
    description:
      "Verifiably lock liquidity tokens in time-vested contracts or forever!",
    href: routes.tools.root,
    disabled: true,
  },
  {
    image: "/icons/launch/project-manager.svg",
    name: "Project Manager",
    description: "Manage your whole ecosystem from one simplified admin panel.",
    href: routes.tools.root,
    disabled: true,
  },
];

const lanchItems: {
  image: string;
  name: string;
  href?: string;
  disabled?: boolean;
}[] = [
  {
    image: "/icons/launch/burn.svg",
    name: "burn tokens",

    href: routes.launch.root,
  },
  {
    image: "/icons/launch/nft-farm.svg",
    name: "add nft farm",

    href: routes.launch.root,
  },
  {
    image: "/icons/launch/create-token-22.svg",
    name: "create token ‘22",
    href: routes.launch.root,
    disabled: true,
  },
  {
    image: "/icons/launch/launch-pool.svg",
    name: "launch lp pools",
    href: routes.launch.root,
    disabled: true,
  },
  {
    image: "/icons/launch/lock-liquidity.svg",
    name: "lock liquidity",
    href: routes.launch.root,
    disabled: true,
  },
  {
    image: "/icons/launch/create-lp-farm.svg",
    name: "create lp Farm",
    href: routes.launch.root,
    disabled: true,
  },
];
