import Container from "@/components/common/container";
import EarnHeader from "@/components/common/earn-header";
import GuacStakeForm from "@/components/views/earn/guac-stake/guac-stake-guac";
import LiquidityStackingForm from "@/components/views/earn/liquidity-staking/liquidity-staking-form";
import useMarinadeData from "@/hooks/use-marinade-data";
import fetchMarinadeData from "@/lib/marinade-data";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Liquid Solana Staking | Guacamole",
  description:
    "Elevate your DeFi experience with our liquid staking solution for Solana. Stake your SOL and continue to earn rewards while retaining the freedom to swap and partake in DeFi activities. Get the best of both worlds—growth and liquidity with Solana liquid staking.    ",
  openGraph: {
    images: "/images/seo/earn.png",
  },
};

const Page = async () => {
  const marinadeData = await fetchMarinadeData();
  return (
    <main className="container mx-auto  items-center flex flex-col gap-14 px-3 lg:px-8 py-6 md:px-16 md:py-12   max-w-2xl ">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md ">
        <EarnHeader
          title="Dynamic SOL Vault"
          tutorialLink="https://docs.guacamole.gg/products-and-features/earn/liquid-solana-staking"
          hideSecondBtn
        />
        <hr className="border-dashed border-background" />
        <div className="w-full h-[40px] flex rounded-lg justify-center items-center bg-[#0F0F0F] border-[1px] border-[rgba(168, 168, 168, 0.10)]">
          <div className="text-[#A8A8A8] w-full flex items-center justify-center gap-1 text-[14px]">
            Explore The Benefits of Liquid Staking:{" "}
            <Link href={"#"} className="text-[#8BD796]">Click Here</Link>
          </div>
        </div>
        <Container className="p-5 font-medium bg-background relative overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)]">
          <p className="text-muted-foreground text-sm">Projected mSOL Yield</p>
          <h1 className="text-3xl text-[#87D793]">
            {marinadeData && (marinadeData["apy"].value * 100).toFixed(2)}% APY
          </h1>
          <p className="text-white/50 text-xl mt-2 font-normal">
            1 MSOL = {marinadeData && marinadeData["currentPrice"].toFixed(3)}{" "}
            SOL
          </p>
          <Image
            src="/images/earn/bg/liquid_staking.png"
            width={282}
            height={282}
            alt="launch background"
            className="-z-0 absolute  opacity-30  rotate-[30deg] top-[-50px] right-4"
          />
        </Container>
        <LiquidityStackingForm />
        <div className="flex items-center justify-center w-full gap-3">
          <p className="text-muted-foreground text-xs font-medium ">
            Provided By
          </p>
          <Image
            src="/icons/sponsors/marinade.png"
            alt="Marinade"
            width={90}
            height={15}
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
