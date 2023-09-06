'use client';
import Image from 'next/image';
import { RecentPlays } from '@/components/common/recent-plays';
import Container from '@/components/common/container';
import { FC } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  compact?: boolean;
  className?: string;
};

const RecentPlay: FC<Props> = ({ compact = false, className }) => {
  return (
    <Container
      className={cn(
        'flex lg:max-w-[512px] w-full flex-col gap-4 rounded-lg bg-foreground  ',
        className
      )}
    >
      <header className="flex items-center gap-1 ">
        <div className="relative aspect-square w-6">
          <Image src="/images/themes/yellow.png" fill alt="play" />
        </div>
        <h1 className="text-2xl">Recent Plays</h1>
      </header>
      <div
        className={cn(
          'flex flex-col gap-5 h-full',
          compact && 'justify-between'
        )}
      >
        <RecentPlays compact={compact} />
      </div>
    </Container>
  );
};

export default RecentPlay;
