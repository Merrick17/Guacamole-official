import InfoCard from '@/components/common/info-card';
import routes from '@/config/routes';
import { FC } from 'react';

interface ToolsProps {}

const Tools: FC<ToolsProps> = () => {
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <div
        className={
          ' mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-6xl lg:grid-cols-3 gap-x-6 gap-y-6'
        }
      >
        {tools.map((tool, index) => (
          <InfoCard key={index} {...tool} />
        ))}
      </div>
    </main>
  );
};

export default Tools;

const tools: {
  image: string;
  name: string;
  description: string;
  href?: string;
}[] = [
  {
    image: '/images/spl-token.png',
    name: 'Create SPL Token',
    description:
      'Easily create your own token on the Solana network with this simple interface',
    href: routes.tools.createSplToken,
  },
  {
    image: '/images/multi-token.png',
    name: 'Token Multi Sender',
    description:
      'Multiple options to send tokens to  Solana addresses and domains. The best way to airdrop tokens!',
    href: routes.tools.tokenMultiSender,
  },
  {
    image: '/images/burn-token-spl.png',
    name: 'BURN SPL Tokens',
    description:
      'Burn those worthless tokens and scam airdrops in your wallet to reclaim some $SOL back from rent accounts.',
    href: routes.tools.burnSplToken,
  },
  {
    image: '/images/burn-token.png',
    name: 'BURN SOLANA NFT',
    description:
      'Burn those worthless airdrop and “rugged” NFTs to reclaim some $SOL back from rent accounts.',
    href: routes.tools.burnNftToken,
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
    href: routes.tools.closeTokenAccounts,
  },
];
