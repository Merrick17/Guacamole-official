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
        'flex border border-[#E5E7EB] backdrop:blur-sm lg:max-w-3xl flex-col gap-10 rounded-lg bg-white px-14 py-10  font-medium',
        className
      )}
    >
      <header className="flex flex-col gap-6">
        <ColorBlocks />
        <h1 className="text-3xl sm:text-6xl lg:text-[64px] lg:leading-[72px] text-black">
          A Fresh And Simple Way To Trade, Earn, Create, And Play!
        </h1>
      </header>
      <p className="text-[#5B5B5B] text-xl">
        Experience a fresh take on DeFi with{' '}
        <span className="text-[#4E8341]">Guacamole</span>. Trade, earn, and play
        effortlessly, while enjoying a seamless and user-friendly experience.
        Get started and unlock a world of possibilities!
      </p>
    </div>
  );
};

export default HomeContent;
