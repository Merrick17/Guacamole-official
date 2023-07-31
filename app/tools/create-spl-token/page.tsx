'use client';
import ToolHeader from '@/components/common/tool-header';
import CreateSplTokenForm from '@/components/views/create-spl-token/create-spl-token-form';
import Tool from '@/components/common/info-card';
import { useWallet } from '@solana/wallet-adapter-react';

const CreateSplToken = () => {
  const { connected } = useWallet();
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      {connected ? (
        <div className=" mx-auto flex w-full max-w-lg flex-col gap-6 rounded-lg bg-white px-6 py-5">
          <ToolHeader title="Create SPL Token" tutorialLink='https://docs.guacamole.gg/products-and-features/tools/create-spl-token' />
          <hr className="border-dashed border-[#E5E7EB]" />
          <CreateSplTokenForm />
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

export default CreateSplToken;
