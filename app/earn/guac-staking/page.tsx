
import Container from "@/components/common/container";
import EarnHeader from "@/components/common/earn-header";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-3 lg:px-8 py-6 md:px-16 md:py-12  max-w-2xl ">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md ">
        <EarnHeader
          title="Dynamic SOL Vault"
          tutorialLink="https://docs.guacamole.gg/products-and-features/earn#guacamole-staking-pools"
          hideSecondBtn
        />
        <hr className="border-dashed border-background" />

        {/* <p className="text-sm text-[#FCFCFC]">
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
        </Link> */}
        <div className="w-full h-[40px] flex rounded-lg justify-center items-center bg-[#0F0F0F] border-[1px] border-[rgba(168, 168, 168, 0.10)]">
          <div className="text-[#FFF] w-full flex items-center justify-center gap-1 text-[24px]">
            Stake Your GUAC
          </div>
        </div>

        <Container className="bg-[#0F0F0F] hover:border-[#FF6565] relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)] ">
          <Image
            src="/images/explore/bg/dao.png"
            width={360}
            height={362}
            alt="guac background"
            className="-z-0 absolute rotate-[30deg] sm:translate-x-1/2  opacity-30  "
          />
          <div className="flex flex-col gap-4 z-10">
            <h1>Staking Options (Dual Finance)</h1>
            <p className="text-[#A8A8A8] text-[14px] w-[369px]">
              Staking Options provide an incentive mechanism that grants
              participants who lock up their liquid tokens, the right, but not
              the obligation to trade tokens at a future price.
            </p>
            <Link href={""} className="flex items-start  gap-2">
              <span className="text-[#FF6565] text-[16px]">Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="mt-1"
              >
                <g clip-path="url(#clip0_3130_506)">
                  <path
                    d="M10.0003 7.33317V10.5552C10.0004 10.6574 9.98035 10.7586 9.94128 10.853C9.90222 10.9474 9.84491 11.0332 9.77265 11.1055C9.70039 11.1778 9.61459 11.2351 9.52016 11.2741C9.42573 11.3132 9.32452 11.3333 9.22233 11.3332H1.44499C1.23865 11.3332 1.04077 11.2512 0.894863 11.1053C0.74896 10.9594 0.666992 10.7615 0.666992 10.5552V2.77784C0.666905 2.67564 0.686969 2.57444 0.726036 2.48001C0.765103 2.38557 0.822406 2.29977 0.894668 2.22751C0.966929 2.15525 1.05273 2.09795 1.14716 2.05888C1.24159 2.01981 1.3428 1.99975 1.44499 1.99984H4.52366M7.48833 0.666504H11.3337V4.51184M6.07433 5.92584L11.2597 0.740504"
                    stroke="#FF6565"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3130_506">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
        </Container>
        <Container className="bg-[#0F0F0F] hover:border-[#FF6565]  relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)] ">
          <h1>Provide GUAC Gaming Liquidity</h1>
          <p className="text-[#A8A8A8] text-[14px] w-[369px]">
            Provide single-sided GUAC liquidity for the “Play” section and earn
            2% of the fees collected.
          </p>
          <Link href={""} className="flex items-start  gap-2">
            <span className="text-[#FF6565] text-[16px]">
              View Gaming Pools
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="mt-1"
            >
              <g clip-path="url(#clip0_3130_506)">
                <path
                  d="M10.0003 7.33317V10.5552C10.0004 10.6574 9.98035 10.7586 9.94128 10.853C9.90222 10.9474 9.84491 11.0332 9.77265 11.1055C9.70039 11.1778 9.61459 11.2351 9.52016 11.2741C9.42573 11.3132 9.32452 11.3333 9.22233 11.3332H1.44499C1.23865 11.3332 1.04077 11.2512 0.894863 11.1053C0.74896 10.9594 0.666992 10.7615 0.666992 10.5552V2.77784C0.666905 2.67564 0.686969 2.57444 0.726036 2.48001C0.765103 2.38557 0.822406 2.29977 0.894668 2.22751C0.966929 2.15525 1.05273 2.09795 1.14716 2.05888C1.24159 2.01981 1.3428 1.99975 1.44499 1.99984H4.52366M7.48833 0.666504H11.3337V4.51184M6.07433 5.92584L11.2597 0.740504"
                  stroke="#FF6565"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3130_506">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </Container>
        <Container className="bg-[#0F0F0F] hover:border-[#FF6565]   relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)] ">
          <h1>Stake In Avotar Farm</h1>
          <p className="text-[#A8A8A8] text-[14px] w-[369px]">
            Deposit your GUAC into a Tokenized NFT Farm and earn points, which
            are redeemable for Avotars!
          </p>
          <Link href={"!#"} className="flex items-start  gap-2">
            <span className="text-[#FF6565] text-[16px]">Coming Soon</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="mt-1"
            >
              <g clip-path="url(#clip0_3130_506)">
                <path
                  d="M10.0003 7.33317V10.5552C10.0004 10.6574 9.98035 10.7586 9.94128 10.853C9.90222 10.9474 9.84491 11.0332 9.77265 11.1055C9.70039 11.1778 9.61459 11.2351 9.52016 11.2741C9.42573 11.3132 9.32452 11.3333 9.22233 11.3332H1.44499C1.23865 11.3332 1.04077 11.2512 0.894863 11.1053C0.74896 10.9594 0.666992 10.7615 0.666992 10.5552V2.77784C0.666905 2.67564 0.686969 2.57444 0.726036 2.48001C0.765103 2.38557 0.822406 2.29977 0.894668 2.22751C0.966929 2.15525 1.05273 2.09795 1.14716 2.05888C1.24159 2.01981 1.3428 1.99975 1.44499 1.99984H4.52366M7.48833 0.666504H11.3337V4.51184M6.07433 5.92584L11.2597 0.740504"
                  stroke="#FF6565"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3130_506">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </Container>
      </div>
    </main>
  );
};

export default Page;
