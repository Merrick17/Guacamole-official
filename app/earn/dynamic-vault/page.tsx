import EarnFooter from "@/components/common/earn-footer";
import EarnHeader from "@/components/common/earn-header";
import VaultItemsContainer from "@/components/views/earn/dynmaic-vault/vault-items-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic Lending Vaults For Solana | Guacamole",
  description:
    "Unlock the potential of your crypto assets with our dynamic lending vaults. Effortlessly optimize yields by automatically rebalancing between the top lending protocols.",
  openGraph: {
    images: "/images/seo/earn.png",
  },
};

const Page = () => {
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-160px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] lg:min-w-[980px] w-max h-full">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg  px-6 py-5 bg-foreground shadow-md">
        <EarnHeader
          title="Dynamic Vaults"
          tutorialLink="https://docs.guacamole.gg/products-and-features/earn/dynamic-lending-vaults"
          hideSecondBtn
        />
        <hr className="border border-[rgba(168, 168, 168, 0.10)] " />
        <VaultItemsContainer />
        <EarnFooter />
      </div>
    </main>
  );
};

export default Page;
