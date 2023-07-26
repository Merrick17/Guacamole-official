import Image from 'next/image';
import { FC } from 'react';
import { Button } from '../ui/button';

type NftCardProps = {
  className?: string;
  image: string;
  title: string;
};
const NftCard: FC<NftCardProps> = ({ image, title, className }) => {
  return (
    <div className="rounded-xl bg-[#E5E7EB] border-2 border-white flex flex-col gap-2 text-xs px-6 py-4 ">
      <div className="flex flex-col  items-center">
        <Image
          src={image ? image : '/images/placeholder.png'}
          alt={title}
          className="rounded-xl"
          width={200}
          height={200}
        />
        <p>{title}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Button size="sm" variant="destructive">
          <span className="text-xs">selected</span>
        </Button>
        <Button size="sm">
          <span className="text-xs"> View Explorer</span>
        </Button>
      </div>
    </div>
  );
};

export default NftCard;
