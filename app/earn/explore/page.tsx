import ExploreCard from '@/components/common/explore-card';
import InfoCard from '@/components/common/info-card';
import routes from '@/config/routes';

const Page = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] h-full">
      <div
        className={
          ' mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-6xl lg:grid-cols-3 gap-x-6 gap-y-6'
        }
      >
        {featuredTools.map((tool, index) => (
          <ExploreCard key={index} {...tool} />
        ))}

        {tools.map((tool, index) => (
          <InfoCard key={index} {...tool} />
        ))}
      </div>
    </main>
  );
};

export default Page;

const featuredTools: {
  image: string;
  title: string;
  description: string;
  href: string;
  buttonTxt?: string;
}[] = [
  {
    title: 'Dynamic Vaults',
    description:
      'Optimize possible yields between top lending protocols with dynamically rebalancing vaults.',
    href: routes.earn.dynamicVault,
    image: '/images/earn/dynamic-vault.png',
    buttonTxt: 'Lend',
  },
  {
    image: '/images/earn/tokenized-nft-farms.png',
    description:
      'Stake tokens to receive points which can be utilized to redeem vaulted NFTs.',
    title: 'Tokenized NFT Farms',
    href: routes.earn.root,
    buttonTxt: 'Farm',
  },
  {
    image: '/images/earn/liquid-solana-staking.png',
    description:
      'Stake your Solana and earn while being able to swap & participate in DeFi.',
    title: 'Liquid Solana Staking',
    href: routes.earn.liquidityStaking,
    buttonTxt: 'Stake',
  },
];
const tools: {
  image: string;
  name: string;
  description: string;
  href?: string;
  disabled?: boolean;
  buttonTxt?: string;
}[] = [
  {
    image: '/icons/earn/Account balance.svg',
    name: 'GUAC Staking',
    description:
      'Stake GUAC to participate in governance and earn retainer fees.',
    href: routes.earn.guacStaking,
    buttonTxt: 'Learn More',
  },
  {
    name: 'Liquidity Farming',
    description:
      'Power up your liquidity provision to earn extra liquidity mining rewards.',
    image: '/icons/earn/liquidity-farming.svg',
    href: routes.tools.root,
    disabled: true,
  },
  {
    image: '/icons/earn/nft-lend-borrow.svg',
    name: 'NFT Lend & Borrow',
    description:
      'Fund loans against NFT collateral or borrow against your portfolio.',
    href: '',
    disabled: true,
  },
];
