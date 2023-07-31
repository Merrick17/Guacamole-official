import { FC } from 'react';
import ColorBlocks from '@/components/common/color-block';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import routes from '@/config/routes';

interface HomeContentProps {}

const HomeContent: FC<HomeContentProps> = () => {
  return (
    <div className="flex  lg:max-w-3xl flex-col gap-10 rounded-lg bg-white px-14 py-10">
      <header className="flex flex-col gap-6">
        <ColorBlocks />
        <h1 className="text-3xl sm:text-6xl lg:text-[64px] font-medium lg:leading-[72px] text-black">
          A Fresh And Simple Way To Trade, Earn, Create, And Play!
        </h1>
      </header>
      <p className="text-[#5B5B5B]">
        Experience a fresh take on DeFi with Guacamole. Trade, earn, and play
        effortlessly, while enjoying a seamless and user-friendly experience.
        Get started and unlock a world of possibilities!
      </p>
      <Link href={routes.info.root}>
        <Button className="px-6 py-3 md:px-12 max-h-[66px] md:py-6 sm:max-w-[220px] text-lg md:!text-2xl font-medium text-white  rounded-[36px] whitespace-nowrap">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default HomeContent;
