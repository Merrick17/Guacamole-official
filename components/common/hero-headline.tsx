import { cn } from '@/lib/utils';
import { FC } from 'react';
import ColorBlocks from './color-block';
import { title } from 'process';
import { Raleway } from 'next/font/google';

interface HeroHeadlineProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const RalewayFont = Raleway({
  weight: '700',
  subsets: ['latin'],
});
const HeroHeadline: FC<HeroHeadlineProps> = ({
  className,
  children,
  title,
}) => {
  return (
    <div
      className={cn(
        'flex text-white lg:max-w-3xl flex-col gap-10 rounded-lg bg-foreground px-14 py-10  font-medium',

        className
      )}
    >
      <header className={cn('flex flex-col gap-6', RalewayFont.className)}>
        <ColorBlocks />
        {typeof title === 'string' ? (
          <h1 className="text-3xl sm:text-6xl lg:text-[64px] lg:leading-[72px] ">
            {title}
          </h1>
        ) : (
          title
        )}
      </header>
      {children}
    </div>
  );
};

export default HeroHeadline;
