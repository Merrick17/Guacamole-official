'use client';
import Tool from '@/components/views/tools/tool';
import { useWallet } from '@solana/wallet-adapter-react';
import { FC } from 'react';

interface ToolsProps {}

const Tools: FC<ToolsProps> = () => {
  const { connected } = useWallet();
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      {connected ? (
        <div className={' mx-auto grid max-w-6xl grid-cols-3 gap-x-6 gap-y-6'}>
          {tools.map((tool, index) => (
            <Tool key={index} {...tool} />
          ))}
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

export default Tools;

const tools: { image: string; name: string; description: string }[] = [
  {
    image: '/images/spl-token.png',
    name: 'Create SPL Token',
    description:
      'Easily create your own token on the Solana network with this simple interface',
  },
  {
    image: '/images/multi-token.png',
    name: 'Token Multi Sender',
    description:
      'Multiple options to send tokens to  Solana addresses and domains. The best way to airdrop tokens!',
  },
  {
    image: '/images/burn-token-spl.png',
    name: 'BURN SPL Tokens',
    description:
      'Burn those worthless tokens and scam airdrops in your wallet to reclaim some $SOL back from rent accounts.',
  },
  {
    image: '/images/burn-token.png',
    name: 'BURN SOLANA NFT',
    description:
      'Burn those worthless airdrop and “rugged” NFTs to reclaim some $SOL back from rent accounts.',
  },
  {
    image: '/images/send-token.png',
    name: 'Send an nft message',
    description:
      'One of the best ways to get in touch with people on-chain! Send an NFT with a customized message included.',
  },
  {
    image: '/images/close-account.png',
    name: 'Close empty accounts',
    description:
      'Your wallet may have some unused accounts! You can close these accounts to reclaim some $SOL back!',
  },
];
