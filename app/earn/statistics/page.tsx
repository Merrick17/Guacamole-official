import EarnFooter from '@/components/common/earn-footer';
import EarnHeader from '@/components/common/earn-header';
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
        <EarnFooter />
      </div>
    </main>
  );
};

export default Page;
