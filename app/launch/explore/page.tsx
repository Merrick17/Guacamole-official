import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import routes from '@/config/routes';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface ToolsProps {}

export const metadata: Metadata = {
  title: 'Useful Tools For All Solana Users | Guacamole',
  description:
    'Find a variety of easy to use tools in our suite that can instantly help improve your quality of life while interacting with the Solana blockchain or starting your own project!',
};
const page: FC<ToolsProps> = () => {
  return (
    <main className="container mx-auto w-full  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <div
        className={
          ' mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-6xl lg:grid-cols-3 gap-x-6 gap-y-6'
        }
      >
        {lanchItems.map((item) => (
          <Container
            key={item.name}
            className="border border-transparent min-w-[300px]  duration-500 ease-in-out hover:border-[var(--accent)]  hover:border rounded-lg"
          >
            <Link
              href={`${item.href}`}
              className={cn(
                'w-full lg:max-w-[322px] flex flex-col items-center gap-8  transition-colors p-4 rounded-lg cursor-pointer bg-background  ',
                item.disabled ? 'opacity-50' : ''
              )}
            >
              <header>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={90}
                  height={90}
                />
              </header>
              <Button className="w-32">{item.name}</Button>
            </Link>
          </Container>
        ))}
      </div>
    </main>
  );
};

export default page;

const lanchItems: {
  image: string;
  name: string;
  href?: string;
  disabled?: boolean;
}[] = [
  {
    image: '/icons/launch/create-token.svg',
    name: 'Create SPL TOken',
    href: routes.launch.createSplToken,
  },
  {
    image: '/icons/launch/mint-cnfts.svg',
    name: 'create cnfts',

    href: routes.launch.root,
  },
  {
    image: '/icons/launch/token-on-shop.svg',
    name: 'list token on shop',

    href: routes.launch.root,
  },
  {
    image: '/icons/launch/burn.svg',
    name: 'burn tokens',

    href: routes.launch.root,
  },
  {
    image: '/icons/launch/nft-farm.svg',
    name: 'add nft farm',

    href: routes.launch.root,
  },
  {
    image: '/icons/launch/create-token-22.svg',
    name: 'create token ‘22',
    href: routes.launch.root,
    disabled: true,
  },
  {
    image: '/icons/launch/launch-pool.svg',
    name: 'launch lp pools',
    href: routes.launch.root,
    disabled: true,
  },
  {
    image: '/icons/launch/lock-liquidity.svg',
    name: 'lock liquidity',
    href: routes.launch.root,
    disabled: true,
  },
  {
    image: '/icons/launch/create-lp-farm.svg',
    name: 'create lp Farm',
    href: routes.launch.root,
    disabled: true,
  },
];
