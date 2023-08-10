import EarnFooter from '@/components/common/earn-footer';
import EarnHeader from '@/components/common/earn-header';
import StatisticsForms from '@/components/views/earn/statistics/statistics-forms';
import TotalLiquidity from '@/components/views/earn/statistics/total-liquidity';
import YourDeposit from '@/components/views/earn/statistics/your-deposit';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dynamic Vault | Guacamole',
  description:
    'Put your crypto to work for you in various ways and enjoy the fruit of its labor.',
};

const Page = () => {
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12 w-full  max-w-[1440px]">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-white px-6 py-5 border border-[#E5E7EB] shadow-md ">
        <EarnHeader
          title="Dynamic SOL Vault"
          tutorialLink="https://docs.guacamole.gg/products-and-features/tools/create-spl-token"
          viewAll={true}
        />
        <hr className="border-dashed border-[#E5E7EB]" />
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 flex flex-col gap-4">
            <TotalLiquidity />
          </div>
          <div className="col-span-2 flex flex-col gap-4">
            <YourDeposit />
            <StatisticsForms />
          </div>
        </div>
        <EarnFooter />
      </div>
    </main>
  );
};

export default Page;
