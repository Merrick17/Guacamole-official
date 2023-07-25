'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FC } from 'react';
type BannerProps = {
  className?: string;
  btnClassName?: string;
  image: string;
  title: string;
};
const Banner: FC<BannerProps> = ({ btnClassName, className, image, title }) => {
  return (
    <div
      className={cn(
        'flex max-w-[512px] w-full flex-col gap-[10px] rounded-lg ',
        className
      )}
    >
      <div className="relative h-[136px] w-full overflow-hidden rounded-[5px]">
        <Image src={image} className="object-cover" fill alt={title} />
        <div className="absolute bottom-[10px] left-[10px]">
          <Button className={cn('font-semibold uppercase', btnClassName)}>
            {title}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
