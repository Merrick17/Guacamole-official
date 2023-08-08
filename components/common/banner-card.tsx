import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';
interface Props extends PropsWithChildren {
  backgroundImage?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
  compact?: boolean;
}

export function BannerCard({
  backgroundImage,
  backgroundColor,
  children,
  compact = false,
}: Props) {
  return (
    <div
      className={cn(
        'min-w-[222px] w-full md:min-w-[372px] aspect-square bg-white  rounded-lg border border-[#E5E7EB] shadow-sm',
        {
          ' py-[6px] px-[10px]  md:py-[18px] md:px-[19px] ': !compact,
          'w-full min-w-0 max-w-[222px] md:min-w-0 md:max-w-[222px]': compact,
        }
      )}
    >
      <div
        className="group  relative z-10 w-full h-full bg-white  rounded-lg flex flex-col justify-end max-h-full transition-[height] duration-200 ease-in-out overflow-hidden flex-grow-0 flex-shrink-0"
        style={{ backgroundColor }}
      >
        <div className="absolute  top-0 left-0 z-10 w-full h-full opacity-100 group-hover:opacity-0 transition-opacity bg-white/50" />
        {backgroundImage && (
          <div
            className="group-hover:scale-110 absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-200 ease-in-out"
            style={{ backgroundImage: 'url(' + backgroundImage + ')' }}
          />
        )}
        <div className=" h-8 max-w-[130px] absolute z-20 text-center w-[90%] px-5 py-1 bottom-2 left-1/2 -translate-x-1/2 bg-black text-white rounded-[5px] font-semibold text-sm transition-opacity duration-200 ease-in-out">
          {children}
        </div>
      </div>
    </div>
  );
}
