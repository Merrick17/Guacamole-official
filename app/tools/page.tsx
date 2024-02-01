import ColorBlocks from "@/components/common/color-block";
import AirdropSvgCardContent from "@/components/views/tools/AirdropSvgCardContent";
import BurnNftTokenCardContent from "@/components/views/tools/BurnNftTokenCardContent";
import EmergencyCardContent from "@/components/views/tools/EmergencyCardContent";
import ManageYourPortfolioCardContent from "@/components/views/tools/ManageYourPortfolioCardContent";
import MultiSenderCardContent from "@/components/views/tools/MultiSenderCardContent";
import SecureWith3DefendersCardContent from "@/components/views/tools/SecureWith3DefendersCardContent";

import routes from "@/config/routes";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface ToolsProps {}

const Tools: FC<ToolsProps> = () => {
  return (
    <>
      {/* <BackgroundSplash className="bg-tools-bg" />
      <main
        className={cn(
          "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-160px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
        )}
      >
        <section className="flex flex-col gap-[60px] ">
          <div className="grid grid-cols-1 lg:grid-cols-8  gap-[60px] lg:h-[560px] overflow-hidden  ">
            <HeroHeadline
              className="col-span-1  lg:col-span-5"
              title={
                <h1 className="text-3xl sm:text-6xl lg:text-[60px] lg:leading-[72px] ">
                  A growing <span className="text-primary">list of tools</span> focused on cleaning up
                  your crypto portfolio
                </h1>
              }
            >
              <>
                <p className=" text-xl font-medium leading-8 text-muted-foreground">
                  Find a variety of easy to use tools in our suite that can
                  instantly help improve your quality of life while interacting
                  with the Solana blockchain or starting your own project!
                </p>
              </>
              <Link className="text-xl text-primary" href={"/tools/explore"}>
                Explore All Tools ➜
              </Link>
            </HeroHeadline>

            <LearnMoreAboutSolana className="col-span-1 lg:col-span-3 bg-foreground" />
          </div>

          <HeroList listItems={tools} />
          <ColorBlocks className="mx-auto" />
        </section>
      </main> */}
      <main
        className={cn(
          "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-180px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
        )}
      >
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          <ManageYourPortfolioCardContent className="col-span-1 md:col-span-2" />
          <SecureWith3DefendersCardContent className="col-span-1 md:col-span-2" />
          <BurnNftTokenCardContent  />
          <MultiSenderCardContent/>
          <AirdropSvgCardContent  />
          <EmergencyCardContent />

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
export default Tools;

const tools: ListItemProps[] = [
  {
    image: "/icons/tools/airdrop.svg",
    title: "Airdrop Tokens",
    description:
      "Send tokens to  Solana addresses and domains. The best way to airdrop tokens!",
    href: routes.tools.tokenMultiSender,
  },
  {
    image: "/icons/tools/emergency-send.svg",
    title: "Emergency Send",
    description:
      "Easily send everything from one wallet to a new wallet of your choice.",
    href: routes.tools.emergencySend,
  },
  {
    image: "/icons/tools/burn-nft.svg",
    title: "Burn NFTs",
    description:
      "Burn those worthless and “rugged” NFTs to reclaim $SOL from rent accounts.",
    href: routes.tools.burnNftToken,
  },
  {
    image: "/icons/tools/close-accounts.svg",
    title: "Close Accounts",
    description:
      "Close unused token & NFT accounts to easily reclaim $SOL from rent accounts.",
    href: routes.tools.closeTokenAccounts,
  },
];
