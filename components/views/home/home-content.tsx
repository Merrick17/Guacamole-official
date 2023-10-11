import { FC } from 'react';
import ColorBlocks from '@/components/common/color-block';
import { cn } from '@/lib/utils';

interface HomeContentProps {}

const HomeContent: FC<HomeContentProps & Partial<HTMLDListElement>> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        'flex text-primary lg:max-w-3xl flex-col gap-10 rounded-lg bg-foreground px-14 py-10  font-medium',
        className
      )}
    >
      <header className="flex flex-col gap-6">
        <ColorBlocks />
        <h1 className="text-3xl sm:text-6xl lg:text-[60px] lg:leading-[72px] ">
          Purchase games, subs, and more with crypto.
        </h1>
      </header>
      <p className="text-secondary text-xl font-medium leading-8">
        Experience a fresh take on Solana DeFi with{' '}
        <span className="text-[#4E8341]">Guacamole</span>. Trade, earn, and play
        effortlessly, while enjoying a seamless and user-friendly experience.
        Get started and unlock a world of possibilities!
      </p>
    </div>
  );
};

export default HomeContent;
