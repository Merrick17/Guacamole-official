import BackgroundSplash from '@/components/common/background-splash';
import ColorBlocks from '@/components/common/color-block';
import HeroHeadline from '@/components/common/hero-headline';
import HeroList from '@/components/common/hero-list';
import { Button } from '@/components/ui/button';

import routes from '@/config/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';

interface ToolsProps {}

const Tools: FC<ToolsProps> = () => {
  return (
    <>
      <BackgroundSplash />
      <main
        className={cn(
          'container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] '
        )}
      >
        <section className="flex flex-col gap-[60px] ">
          {/* <HomeContent className="w-full" /> */}
          <HeroHeadline
            className="w-full lg:max-w-none  h-full lg:h-[560px] overflow-hidden"
            title={
              'A growing list of tools focused on cleaning up your crypto portfolio.'
            }
          >
            <>
              <p className=" text-xl font-medium leading-8 text-muted-foreground">
                Find a variety of easy to use tools in our suite that can
                instantly help improve your quality of life while interacting
                with the Solana blockchain or starting your own project!
              </p>
              <Link href={routes.tools.explore} className="mt-auto">
                <Button>BROWSE ALL TOOLS</Button>
              </Link>
            </>
          </HeroHeadline>
          <HeroList listItems={tools} />
          <ColorBlocks className="mx-auto" />
        </section>
      </main>
    </>
  );
};
export default Tools;

const tools: ListItemProps[] = [
  {
    image: '/icons/tools/airdrop.svg',
    title: 'Airdrop Tokens',
    description:
      'Send tokens to  Solana addresses and domains. The best way to airdrop tokens!',
    href: routes.tools.tokenMultiSender,
  },
  {
    image: '/icons/tools/emergency-send.svg',
    title: 'Emergency Send',
    description:
      'Easily send everything from one wallet to a new wallet of your choice.',
    href: routes.tools.emergencySend,
  },
  {
    image: '/icons/tools/burn-nft.svg',
    title: 'Burn NFTs',
    description:
      'Burn those worthless and “rugged” NFTs to reclaim $SOL from rent accounts.',
    href: routes.tools.burnNftToken,
  },
  {
    image: '/icons/tools/close-accounts.svg',
    title: 'Close Accounts',
    description:
      'Close unused token & NFT accounts to easily reclaim $SOL from rent accounts.',
    href: routes.tools.closeTokenAccounts,
  },
];
