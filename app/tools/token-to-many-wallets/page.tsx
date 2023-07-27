import ToolHeader from '@/components/common/tool-header';
import { Button } from '@/components/ui/button';
import TokenToManyWalletsForm from '@/components/views/token-to-many-wallet/token-to-many-wallets-form';
const TokenToManyWallets = () => {
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <div className=" mx-auto flex w-full max-w-lg flex-col gap-6 rounded-lg bg-white px-6 py-5">
        <ToolHeader title="Token Multi Sender" />
        <hr className="border-dashed border-[#E5E7EB]" />
        <p className="text-black/50 text-sm text-center">
          Select a token and insert the addresses and amount you would like to
          send in one simple transaction. We support .sol and ans domains!
        </p>
        <TokenToManyWalletsForm />
      </div>
    </main>
  );
};

export default TokenToManyWallets;
