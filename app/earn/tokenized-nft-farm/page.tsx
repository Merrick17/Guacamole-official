import Container from "@/components/common/container";
import EarnHeader from "@/components/common/earn-header";
import GuacStakeForm from "@/components/views/earn/guac-stake/guac-stake-guac";
import NftStakeForm from "@/components/views/earn/nft-staking/nft-staking-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tokenized NFT Farms | Guacamole",
  description:
    "Stake your tokens on our revolutionary platform and accumulate points to unlock exclusive access to vaulted NFTs. Transform your staked assets into valuable digital collectibles as you redeem points for rare NFTs.",
  openGraph: {
    images: "/images/seo/earn.png",
  },
};

const Page = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-2xl ">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md ">
        <EarnHeader
          title="Dynamic SOL Vault"
          tutorialLink="https://docs.guacamole.gg/products-and-features/earn/tokenized-nft-farms"
          hideSecondBtn
        />
        <hr className="border-dashed border-background" />
        <Container className="p-5 font-medium bg-background">
          <p className="text-muted-foreground text-sm">Guacamole NFT Farm #1</p>
          {/* <h1 className="text-3xl">Coming Soon...</h1> */}
        </Container>
        <NftStakeForm />
      </div>
    </main>
  );
};

export default Page;
