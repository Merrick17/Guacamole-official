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
        {tools.map((tool, index) => (
          <InfoCard key={index} {...tool} />
        ))}
      </div>
    </main>
  );
};

export default Page;

const tools: {
  image: string;
  name: string;
  description: string;
  href?: string;
  disabled?: boolean;
}[] = [
  {
    image: '/icons/trade/swap-aggregator.svg',
    name: 'Swap Aggregator',
    description:
      'Easily find the best trading routes to ensure you get the best bang for your buck!',
    href: routes.trade.swap,
  },
  {
    name: 'Bridge Swaps',
    description:
      'Bridge your ETH, BNB, AVAX, and ARB to Solana and pick up tokens like GUAC.',
    image: '/icons/trade/bridge-swap.svg',
    href: routes.trade.bridge,
  },
  {
    name: 'Trade Perpetuals',
    description:
      'Trade gamified perpetual futures markets for BTC, ETH, SOL, and more.',
    image: '/icons/trade/perpetuals.svg',
    href: routes.trade.perpetuals,
  },
  {
    image: '/icons/trade/dca.svg',
    name: 'Place Limit Orders',
    description:
      'Set limit orders through the swap aggregator or view orderbooks for markets.',
    href: routes.tools.root,
    disabled: true,
  },
  {
    name: 'Dollar Cost Average',
    description:
      'Buy or sell tokens in time-based increments to automate your trades.',
    image: '/icons/trade/dollar-cost-avg.svg',
    href: routes.tools.root,
    disabled: true,
  },
  {
    image: '/icons/trade/Thumbs up down.svg',
    name: 'Trading Arena',
    description:
      'Place bets on market price movement in an interactive PvP arena setting.',
    href: routes.tools.root,
    disabled: true,
  },
  {
    image: '/icons/trade/Hot tub.svg',
    name: 'Liquidity Pools',
    description:
      'Place bets on market price movement in an interactive PvP arena setting.',
    href: routes.tools.root,
    disabled: true,
  },
  {
    image: '/icons/trade/nft-marketplace.svg',
    name: 'NFT Marketplace',
    description:
      'Browse, sell, and purchase your favorite NFTs with our integrated aggegation.',
    href: routes.tools.root,
    disabled: true,
  },
  {
    image: '/icons/trade/liq-pool.svg',
    name: 'NFT Liquidity Pools',
    description:
      'Setup a position to buy and sell NFTs across a specified range (bonding curve).',
    href: routes.tools.root,
    disabled: true,
  },
];
