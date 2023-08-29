import { FC } from 'react';
import Container from './container';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BiLink } from 'react-icons/bi';

interface TrendingTodayProps {}

const TrendingToday: FC<TrendingTodayProps> = () => {
  return (
    <Container className="flex flex-col  gap-5">
      <div className="flex flex-row gap-2">
        <Image
          src="/images/home/trending.png"
          width={20}
          height={20}
          alt="trending"
        />
        <h1 className="text-xl capitalize">Trending Today</h1>
      </div>
      <TrendingItem />
      <TrendingItem />
      <TrendingItem />
      <TrendingItem />
    </Container>
  );
};

export default TrendingToday;

const TrendingItem: FC = () => {
  return (
    <div className="p-5 flex flex-row justify-between items-center rounded-lg bg-background">
      <div className="flex flex-row items-center gap-5">
        <Image src="/logo.png" width={40} height={40} alt="logo" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="uppercase text-sm">Guac</p>
            <div className="text-xs flex items-center bg-foreground text-primary  rounded-sm px-2 py-1 ">
              <span className="  max-w-[44px] text-ellipsis overflow-hidden">
                EPjF...Dt1v
              </span>
              <BiLink />
            </div>
          </div>
          <p className="text-muted-foreground">$0.0₈3252</p>
        </div>
      </div>
      <Button>Trade</Button>
    </div>
  );
};
