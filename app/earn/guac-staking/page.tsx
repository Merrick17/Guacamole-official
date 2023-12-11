import EarnHeader from "@/components/common/earn-header";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dynamic Vault | Guacamole",
  description:
    "Put your crypto to work for you in various ways and enjoy the fruit of its labor.",
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
          tutorialLink="https://docs.guacamole.gg/products-and-features/earn#guacamole-staking-pools"
          hideSecondBtn
        />
        <hr className="border-dashed border-background" />
        {/* <hr className="border-dashed border-background" />
        <Container className="p-5 font-medium bg-background">
          <p className="text-muted-foreground text-sm">
            Projected Staking Yield
          </p>
          <h1 className="text-3xl">Coming Soon...</h1>
        </Container>
        <GuacStakeForm /> */}
        <p className="text-sm text-[#FCFCFC]">
          Guacamole has partnered with Dual Finance to integrate GUAC Staking
          Options. Staking Options provide an incentive mechanism that grants
          participants who lock up their liquid tokens, the right, but not the
          obligation to trade tokens at a future price.
        </p>
        <Link
          rel="noopener noreferrer"
          href={"https://beta.dual.finance/"}
          target="_blank"
          className="h-[54px] bg-[#8BD796] text-center flex justify-center items-center rounded-lg text-black"
        >
          Proceed To Dual Finance
        </Link>
        <Link
          rel="noopener noreferrer"
          href={
            "https://docs.guacamole.gg/products-and-features/earn/staking-options"
          }
          target="_blank"
          className="h-[54px] bg-primary text-center flex justify-center items-center rounded-lg text-black"
        >
          View Documentation
        </Link>
      </div>
    </main>
  );
};

export default Page;
