import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FC } from 'react';

interface PopularSubscriptionsProps {
  className?: string;
}

const PopularSubscriptions: FC<PopularSubscriptionsProps> = ({ className }) => {
  return (
    <Container
      className={cn('flex flex-col bg-foreground gap-5 overflow-y-auto', className)}
    >
      <div className="flex flex-row gap-2 items-center">
        <div className="shrink-0 w-5 aspect-square">
          <Image
            src="/icons/shop/popular-subs.png"
            width={20}
            height={20}
            alt="popular subscriptions"
          />
        </div>
        <h1 className="text-xl capitalize">Popular Subscriptions</h1>
      </div>
      <PopularSubscriptionsItem />
      <PopularSubscriptionsItem />
      <PopularSubscriptionsItem />
      <PopularSubscriptionsItem />
    </Container>
  );
};

const PopularSubscriptionsItem: FC = () => {
  return (
    <Container className="bg-background flex items-center rounded-lg  justify-between gap-4 w-full ">
      <div>
        <h2>Discord Nitro</h2>
        <p className="text-muted-foreground">1 Month Sub Code</p>
      </div>
      <Button>As Low As $7.99</Button>
    </Container>
  );
};

export default PopularSubscriptions;
