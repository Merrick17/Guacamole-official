import Banner from '@/components/views/play/banner';
import Featured from '@/components/views/play/featured';
import Ready from '@/components/views/play/ready';
import RecentPlay from '@/components/views/play/recent-play';

import { FC } from 'react';

interface PlayProps {}

const Play: FC<PlayProps> = () => {
  return (
    <main className="container mx-auto flex flex-col gap-14 px-16 py-12 max-w-[1440px]  ">
      <div className="flex flex-col items-center gap-7 ">
        <Ready />
        <Banner />
        <Featured />
        <RecentPlay />
      </div>
    </main>
  );
};

export default Play;
