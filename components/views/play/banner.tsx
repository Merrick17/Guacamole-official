import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="flex w-[512px] flex-col gap-[10px] rounded-lg bg-white p-5">
      <div className="relative h-[136px] w-full overflow-hidden rounded-[5px]">
        <Image
          src="/images/guac-a-mole.png"
          className="object-cover"
          fill
          alt={'guac-a-mole'}
        />
        <div className="absolute bottom-[10px] left-[10px]">
          <Button className="font-semibold uppercase">guac-a-mole</Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
