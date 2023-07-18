import Banner from '@/components/views/play/banner';
import Featured from '@/components/views/play/featured';
import Ready from '@/components/views/play/ready';
import RecentPlay from '@/components/views/play/recent-play';

import { FC } from 'react';

interface PlayProps {}

const Play: FC<PlayProps> = () => {
  return (
    <>
      <Ready />
      <Banner />
    </>
  );
};

export default Play;
