import Container from "@/components/common/container";
import EarnHeader from "@/components/common/earn-header";
import NftStakeForm from "@/components/views/earn/nft-staking/nft-staking-form";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Earn NFTS With Token Staking | Guacamole",
};

const Page = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col gap-14 px-3 lg:px-8 py-6 md:px-16 md:py-12   max-w-2xl ">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md ">
        <EarnHeader
          title="Dynamic SOL Vault"
          tutorialLink="https://docs.guacamole.gg/products-and-features/earn/tokenized-nft-farms"
          hideSecondBtn
        />
        <hr className="border border-[rgba(168, 168, 168, 0.10)] " />
        <Container className="p-5 font-medium bg-background text-center h-[40px] flex justify-center items-center">
          <p className="text-[#FAFAFA] text-[24px]">Guacamole Avotar Farm</p>
          {/* <h1 className="text-3xl">Coming Soon...</h1> */}
        </Container>
        <Container className="p-5 font-medium bg-background relative overflow-hidden">
          <Image
            src="/images/explore/bg/avocado.png"
            width={220}
            height={250}
            alt="guac background"
            className="-z-0 absolute rotate-[20deg] sm:translate-x-[10%] right-0 top-[-60px] opacity-30  "
          />
          <p className="text-white/50 text-xs">
            Your Total Points For This Pool
          </p>
          <h1 className="text-3xl ">0.00 Points</h1>
          <p className="text-white/50 text-xs mt-2 font-normal">
            Staked 0 GUAC{" "}
          </p>
        </Container>
        <NftStakeForm />
      </div>
    </main>
  );
};

export default Page;
