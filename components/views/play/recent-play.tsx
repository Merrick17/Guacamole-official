'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { RecentPlays } from '@/components/common/recent-plays';
//@ts-ignore

const RecentPlay = () => {
  return (
    <div className="flex max-w-[512px] w-full flex-col gap-4 rounded-lg bg-white px-5 py-7  border border-[#E5E7EB]">
      <header className="flex items-center gap-1 ">
        <div className="relative aspect-square w-6">
          <Image src="/images/recent-play.png" fill alt="play" />
        </div>
        <h1 className="text-2xl   text-black">Recent Plays</h1>
      </header>
      <div className="flex flex-col gap-4">
        <RecentPlays />
      </div>
    </div>
  );
};

export default RecentPlay;
