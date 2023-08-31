import InfoCard from '@/components/common/info-card';
import routes from '@/config/routes';
import { Metadata } from 'next';
import { FC } from 'react';

interface ToolsProps {}

export const metadata: Metadata = {
  title: 'Useful Tools For All Solana Users | Guacamole',
  description:
    'Find a variety of easy to use tools in our suite that can instantly help improve your quality of life while interacting with the Solana blockchain or starting your own project!',
};
const page: FC<ToolsProps> = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
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

export default page;

const tools: {
  image: string;
  name: string;
  description: string;
  href?: string;
}[] = [
  {
    image: '/icons/tools/airdrop.svg',
    name: 'Airdrop Tokens',
    description:
      'Send tokens to  Solana addresses and domains. The best way to airdrop tokens!',
    href: routes.tools.tokenMultiSender,
  },
  {
    image: '/icons/tools/airdrop.svg',
    name: 'Airdrop via CSV',
    description:
      'Send tokens to  Solana addresses and domains. The best way to airdrop tokens!',
    href: routes.inPageLinks.tokenMultiSender.csv,
  },
  {
    image: '/icons/tools/emergency-send.svg',
    name: 'Emergency Send',
    description:
      'Easily send everything from one wallet to a new wallet of your choice.',
    href: routes.tools.emergencySend,
  },
  {
    image: '/icons/tools/burn-nft.svg',
    name: 'Burn Tokens',
    description:
      'Burn those worthless and “rugged” NFTs to reclaim $SOL from rent accounts.',
    href: routes.tools.burnSplToken,
  },
  {
    image: '/icons/tools/burn-nft.svg',
    name: 'Burn NFTs',
    description:
      'Burn those worthless and “rugged” NFTs to reclaim $SOL from rent accounts.',
    href: routes.tools.burnNftToken,
  },
  {
    image: '/icons/tools/close-accounts.svg',
    name: 'Close Accounts',
    description:
      'Close unused token & NFT accounts to easily reclaim $SOL from rent accounts.',
    href: routes.tools.closeTokenAccounts,
  },
];
