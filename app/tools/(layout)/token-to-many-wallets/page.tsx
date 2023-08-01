import ToolHeader from '@/components/common/tool-header';
import TokenToManyWalletsForm from '@/components/views/tools/token-to-many-wallet/token-to-many-wallets-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Token Multi Sender | Guacamole',
  description:
    'Multiple airdrop and multi-send options to send tokens to Solana addresses and domains. Connect your wallet, enter the addresses, and airdrop your tokens!',
};
const TokenToManyWallets = () => {
  return (
    <div className=" mx-auto flex w-full max-w-lg flex-col gap-6 rounded-lg bg-white px-6 py-5">
      <ToolHeader
        title="Token Multi Sender"
        tutorialLink="https://docs.guacamole.gg/products-and-features/tools/token-multi-sender"
      />
      <hr className="border-dashed border-[#E5E7EB]" />
      <p className="text-black/50 text-sm text-center">
        Select a token and insert the addresses and amount you would like to
        send in one simple transaction. We support .sol and ans domains!
      </p>
      <TokenToManyWalletsForm />
    </div>
  );
};

export default TokenToManyWallets;