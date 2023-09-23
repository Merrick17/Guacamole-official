import EarnFooter from '@/components/common/earn-footer';
import EarnHeader from '@/components/common/earn-header';
import ApyPerformance from '@/components/views/earn/statistics/apy-performance';
import LiquidityAllocation from '@/components/views/earn/statistics/liquidity-allocation';
import StatisticsCardContainer from '@/components/views/earn/statistics/statistics-card-container';
import StatisticsForm from '@/components/views/earn/statistics/statistics-form';
import StatisticsForms from '@/components/views/earn/statistics/statistics-forms';
import TotalLiquidity from '@/components/views/earn/statistics/total-liquidity';
import YourDeposit from '@/components/views/earn/statistics/your-deposit';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Dynamic Vault | Guacamole',
  description:
    'Put your crypto to work for you in various ways and enjoy the fruit of its labor.',
};
interface pageProps {
  params: {
    slug: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  console.log('slug', params.slug);
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-2xl ">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md ">
        <EarnHeader title="Dynamic SOL Vault" viewAll={true} />
        <hr className="border-dashed border-background" />
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
        <StatisticsForm />
      </div>
    </main>
  );
};

export default Page;