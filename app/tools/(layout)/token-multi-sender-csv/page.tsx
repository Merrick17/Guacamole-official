import ToolHeader from '@/components/common/tool-header';
import TokenMultiSenderCsvForm from '@/components/views/tools/token-multi-sender-csv/token-multi-sender-csv-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Token Multi Sender | Guacamole',
  description:
    'Multiple airdrop and multi-send options to send tokens to Solana addresses and domains. Connect your wallet, enter the addresses, and airdrop your tokens!',
};
const TokenMultiSenderCSV = () => {
  return (
    <div className=" mx-auto flex w-full max-w-lg flex-col gap-6 rounded-lg bg-white px-6 py-5  border border-[#E5E7EB] shadow-md">
      <ToolHeader
        title="Token Multi Sender By CSV"
        tutorialLink="https://docs.guacamole.gg/products-and-features/tools/token-multi-sender"
      />
      <hr className="border-dashed border-[#E5E7EB]" />
      <div className="text-muted-foreground text-sm ">
        <p>
          You can use this tool to upload a .csv file instead of manually
          inputting addresses in each input.
        </p>
        <br />
        <p className="font-medium">
          The uploaded file should respect the following order:
        </p>
        <p>receiver`s address, token address, amount to send</p>
      </div>

      <TokenMultiSenderCsvForm />
    </div>
  );
};

export default TokenMultiSenderCSV;
