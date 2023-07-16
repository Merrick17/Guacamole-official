import { cn } from '@/lib/utils';
import { FC } from 'react';

const ColorBlocks: FC<Partial<HTMLDivElement>> = ({ className }) => {
  return (
    <div className={cn('flex w-max flex-row items-center', className)}>
      <div className="aspect-square w-4 bg-[#A63B3D]" />
      <div className="aspect-square w-4 bg-[#D26651]" />
      <div className="aspect-square w-4 bg-[#5D4A2F] " />
      <div className="aspect-square w-4 bg-[#4E8341] " />
      <div className="aspect-square w-4 bg-[#97D19C] " />
    </div>
  );
};

export default ColorBlocks;
