import BackgroundSplash from '@/components/common/background-splash';
import ColorBlocks from '@/components/common/color-block';
import HeroHeadline from '@/components/common/hero-headline';
import HeroList from '@/components/common/hero-list';
import CreationWalkthroughs from '@/components/views/launch/creation-walkthroughs';
import routes from '@/config/routes';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Easily Swap Solana Based Tokens | Guacamole',
  description:
    'Guacamole Swap allows you to launch any tokens on Solana in just a few clicks with no hassle and the best fees.',
};

const Page: FC = () => {
  return (
    <>
      <BackgroundSplash />
      <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] ">
        <section className="flex flex-col gap-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-5  gap-14 ">
            <HeroHeadline
              className="col-span-3"
              title={
                <h1 className="text-3xl sm:text-6xl lg:text-[64px] lg:leading-[72px] ">
                  Make sure your new project stays hot with our{' '}
                  <span className="text-primary">spicy features</span>.
                </h1>
              }
            >
              <p className=" text-xl font-medium leading-8 text-muted-foreground">
                Introducing a fresh and spicy way to launch your token or NFT
                project with easy-to-follow walk-throughs. The no-code
                interfaces make it easier to get off the ground and start
                distribution and add utilities.
              </p>
            </HeroHeadline>
            <CreationWalkthroughs className="col-span-2" />
          </div>

          <HeroList listItems={LaunchListItems} />
          <ColorBlocks className="mx-auto" />
        </section>
      </main>
    </>
  );
};

const LaunchListItems: ListItemProps[] = [
  {
    title: 'Create Your Token',
    description:
      'Create your own token in just 2 minutes using our no-code creation interface.',
    image: '/icons/launch/create-token.svg',
    href: routes.launch.root,
  },
  {
    title: 'Mint Your cNFTs',
    description:
      'Easily create a compressed NFT collection using our no-code interfaces.',
    image: '/icons/launch/mint-cnfts.svg',
    href: routes.launch.root,
  },
  {
    title: 'Add NFT Farm',
    description:
      'Reward token stakers in your community with points-based NFT rewards.',
    image: '/icons/launch/nft-farm.svg',
    href: routes.info.root,
  },
  {
    title: 'List Token On Shop',
    description:
      'Allow your community to purchase games, software, and more with your token.',
    image: '/icons/launch/token-on-shop.svg',
    href: routes.tools.root,
  },
];

export default Page;
