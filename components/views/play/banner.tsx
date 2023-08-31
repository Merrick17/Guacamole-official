'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
type BannerProps = {
  className?: string;
  btnClassName?: string;
  image: string;
  title: string;
  path?: string;
};
const Banner: FC<BannerProps> = ({
  btnClassName,
  className,
  image,
  title,
  path,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => path && router.push(path)}
      className={cn(
        'group flex max-w-[512px] w-full flex-col gap-[10px] rounded-lg cursor-pointer',
        className
      )}
    >
      <div className="relative h-[136px] w-full overflow-hidden rounded-[5px]">
        <div className="absolute  top-0 left-0 z-10 w-full h-full opacity-100 group-hover:opacity-0 transition-opacity bg-black/50" />
        <div
          className="group-hover:scale-110 absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-200 ease-in-out"
          style={{ backgroundImage: 'url(' + image + ')' }}
        />
        <div className="absolute bottom-[10px] left-[10px] z-20">
          <Button className={cn('font-semibold uppercase', btnClassName)}>
            {title}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
