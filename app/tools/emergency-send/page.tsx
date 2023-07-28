'use client';
import ToolHeader from '@/components/common/tool-header';
import EmergencySendForm from '@/components/views/emergency-send/emergency-send-form';
import Tool from '@/components/views/tools/tool';
import { useWallet } from '@solana/wallet-adapter-react';

const EmergencySend = () => {
  const { connected } = useWallet();

  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      {connected ? (
        <div className=" mx-auto flex w-full max-w-lg flex-col gap-6 rounded-lg bg-white px-6 py-5">
          <ToolHeader title="Emergency Send Tool" />
          <hr className="border-dashed border-[#E5E7EB]" />
          <div className="text-black/50 text-sm font-normal">
            <p>
              This tool will send all tokens and NFTs in a wallet to a new
              address of your choice. This can be useful if you suspect your
              wallet has been compromised or if you`re just looking to utilize a
              new address!
            </p>
            <br />
            <p className="font-medium">Please use this tool with caution!</p>
          </div>
          <EmergencySendForm />
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

export default EmergencySend;
