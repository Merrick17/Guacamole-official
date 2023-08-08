import ColorBlocks from '@/components/common/color-block';
import GamesSection from '@/components/views/home/games-section';
import HomeContent from '@/components/views/home/home-content';
import HomeHeadline from '@/components/views/home/home-headline';
import HomeList from '@/components/views/home/home-list';
import ShopSection from '@/components/views/home/shop-section';
import routes from '@/config/routes';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main
      className={cn(
        'container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] '
      )}
    >
      <section className="flex flex-col gap-[60px]">
        <HomeContent />
        <HomeList listItems={HomeListItems} />
        <ColorBlocks className="mx-auto" />
      </section>
      <section className="flex flex-col gap-[60px]">
        <HomeHeadline
          title="Trade anything with the click of a button. It’s that easy!"
          description="Our amazing tools help you trade any token on Solana in just
            seconds. Just connect your wallet, select your token, and click
            swap! More advanced trading options are also available like the
            ability to DCA, place limit orders, or bridge from other chains."
        />
        <HomeList listItems={TradeListItems} />
        <ColorBlocks className="mx-auto" />
      </section>
      <section className="flex flex-col gap-[60px]">
        <HomeHeadline
          title="Several ways to earn passive income with your crypto!"
          description="Guacamole offers several exciting features to help earn tokens,
          NFTs, and more. Our platform makes it easy to make your crypto work
          for you! Most features also feature a permissionless setup for any
          community or project to use."
        />
        <HomeList listItems={EarnListItems} />
        <ColorBlocks className="mx-auto" />
      </section>
      <GamesSection />
      <section className="flex flex-col gap-[60px]">
        <HomeHeadline
          title="There’s nothing like a fresh side of GUAC."
          description="The GUAC token is at the very pit of the Guacamole ecosystem. You can easily buy, farm, spend, stake, win and even vote with it! Our token was initially stealth launched with a whopping 94% of supply locked in a Raydium liquidity pool on launch."
        />
        <HomeList listItems={EarnListItems} />
        <ColorBlocks className="mx-auto" />
      </section>
      <ShopSection />
    </main>
  );
}

type ListItemProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  disabled?: boolean;
};

const HomeListItems: ListItemProps[] = [
  {
    title: 'Trade',
    description:
      'Trade any tokens on Solana in just a few clicks with no hassle and the best fees.',
    image: '/icons/trade.svg',
    href: routes.swap.root,
  },
  {
    title: 'Earn',
    description:
      'Put your crypto to work for you in various ways and enjoy the fruit of its labor.',
    image: '/icons/earn.svg',
    href: routes.info.root,
  },
  {
    title: 'Play',
    description:
      'Take a chance in fun games where you can win some of your favorite tokens.',
    image: '/icons/play.svg',
    href: routes.play.root,
  },
  {
    title: 'Manage',
    description:
      'Helpful tools make it easy to navigate every step of your journey through crypto.',
    image: '/icons/manage.svg',
    href: routes.tools.root,
  },
];
const TradeListItems: ListItemProps[] = [
  {
    title: 'Swap Aggregator',
    description:
      'Easily find the best trading routes to ensure you get the best bang for your buck!',
    image: '/images/home/trade/swap-aggregator.png',
    href: routes.swap.root,
  },
  {
    title: 'DCA & Limit Orders',
    description:
      'Set limit or dollar cost averaging orders to swap when you’re not around.',
    image: '/images/home/trade/dca.png',
    href: routes.info.root,
    disabled: true,
  },
  {
    title: 'Bridge Swaps',
    description:
      'Bridge your ETH, BNB, AVAX, and ARB to Solana and pick up tokens like GUAC.',
    image: '/images/home/trade/bridge-swap.png',
    href: routes.play.root,
    disabled: true,
  },
  {
    title: 'Liquidity Pools',
    description:
      'Provide liquidity for AMMs like Guacamole, Raydium, Orca, and more to earn fees.',
    image: '/images/home/trade/liquidity-pools.png',
    href: routes.tools.root,
    disabled: true,
  },
];
const EarnListItems: ListItemProps[] = [
  {
    title: 'Dynamic Vaults',
    description:
      'Optimize yields between top lending protocols with rebalancing vaults.',
    image: '/images/home/earn/vault.png',
    href: routes.swap.root,
  },
  {
    title: 'Token For NFT Pools',
    description:
      'Stake tokens to receive points which can be utilized to redeem vaulted NFTs.',
    image: '/images/home/earn/nft-pool.png',
    href: routes.info.root,
    disabled: true,
  },
  {
    title: 'NFT For Token Pools',
    description:
      'Stake your NFTs to receive tokens. Can be created or used by any project.',
    image: '/images/home/earn/token-pool.png',
    href: routes.play.root,
    disabled: true,
  },
  {
    title: 'Liquidity Farming',
    description:
      'Power up your liquidity provision to earn extra liquidity mining rewards.',
    image: '/images/home/earn/liquidity-farming.png',
    href: routes.tools.root,
    disabled: true,
  },
];
