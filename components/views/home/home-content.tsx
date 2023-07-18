import { FC } from 'react';
import ColorBlocks from '@/components/common/color-block';
import { Button } from '@/components/ui/button';

interface HomeContentProps {}

const HomeContent: FC<HomeContentProps> = () => {
  return (
    <div className="flex  lg:max-w-3xl flex-col gap-10 rounded-lg bg-white px-14 py-10">
      <header className="flex flex-col gap-6">
        <ColorBlocks />
        <h1 className="text-xl sm:text-6xl lg:text-[64px] font-medium lg:leading-[72px] text-black">
          A Fresh And Simple Way To Trade, Earn, Create, And Play!
        </h1>
      </header>
      <p className="text-[#5B5B5B]">
        Experience a fresh take on DeFi with Guacamole. Trade, earn, and play
        effortlessly, while enjoying a seamless and user-friendly experience.
        Get started and unlock a world of possibilities!
      </p>
      <Button className=" sm:max-w-[220px] text-2xl font-medium text-white">
        Get Started
      </Button>
    </div>
  );
};

export default HomeContent;
