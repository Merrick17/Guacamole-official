import DetailVaultContainer from "@/components/views/earn/dynmaic-vault/details-vault-container";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Dynamic Vault | Guacamole",
  description:
    "Put your crypto to work for you in various ways and enjoy the fruit of its labor.",
  openGraph: {
    images: "/images/seo/earn.png",
  },
};
interface pageProps {
  params: {
    slug: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-3 lg:px-8 py-6 md:px-16 md:py-12  max-w-2xl ">
      {/* <div className="grid grid-cols-1  lg:grid-cols-5 gap-4 ">
          <div className="lg:col-span-3">
            <TotalLiquidity />
          </div>
          <div className="lg:col-span-2">
            <YourDeposit />
          </div>
          <div className="lg:col-span-3">
            <LiquidityAllocation />
          </div>
          <div className="lg:col-span-2">
            <StatisticsForms />
          </div>
          <div className="lg:col-span-3">
            <ApyPerformance />
          </div>
          <div className="lg:col-span-2">
            <StatisticsCardContainer>
              <h1 className="text-lg font-semibold">
                What Are Dynamic Vaults?
              </h1>
            </StatisticsCardContainer>
          </div>
        </div> */}
      {/* <StatisticsForm /> */}

      <DetailVaultContainer tokenAdr={params.slug} />
    </main>
  );
};

export default Page;
