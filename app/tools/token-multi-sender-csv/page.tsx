'use client';
import ToolHeader from '@/components/common/tool-header';
import TokenMultiSenderCsvForm from '@/components/views/token-multi-sender-csv/token-multi-sender-csv-form';
import Tool from '@/components/common/info-card';
import { useWallet } from '@solana/wallet-adapter-react';
const TokenMultiSenderCSV = () => {
  const { connected } = useWallet();

  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      {connected ? (
        <div className=" mx-auto flex w-full max-w-lg flex-col gap-6 rounded-lg bg-white px-6 py-5">
          <ToolHeader title="Token Multi Sender By CSV" tutorialLink='https://docs.guacamole.gg/products-and-features/tools/token-multi-sender' />
          <hr className="border-dashed border-[#E5E7EB]" />
          <div className="text-black/50 text-sm ">
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
      ) : (
        <div className="flex items-center justify-center">
          <Tool
            name="Please connect your wallet"
            description="You will need to connect a supported Solana wallet to continue! Press the button below to explore the options."
            image="/images/connect-wallet-tool.png"
            connectWallet
          />
        </div>
      )}
    </main>
  );
};

export default TokenMultiSenderCSV;
