import React, { PropsWithChildren } from 'react';
interface Props extends PropsWithChildren {
  backgroundImage?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
}

export function BannerCard({
  backgroundImage,
  backgroundColor,
  children,
}: Props) {
  return (
    <div className="w-[372px] py-[18px] px-[19px] aspect-square bg-white  rounded-lg">
      <div
        className="group  relative z-10 w-full h-full bg-white  rounded-lg flex flex-col justify-end max-h-full transition-[height] duration-200 ease-in-out overflow-hidden flex-grow-0 flex-shrink-0"
        style={{ backgroundColor }}
      >
        {backgroundImage && (
          <div
            className="group-hover:scale-110 absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-200 ease-in-out"
            style={{ backgroundImage: 'url(' + backgroundImage + ')' }}
          />
        )}
        <div className="opacity-0 h-8 max-w-[130px] group-hover:opacity-100 absolute text-center w-[90%] px-5 py-1 bottom-2 left-1/2 -translate-x-1/2 bg-black text-white rounded-[5px] font-semibold text-sm transition-opacity duration-200 ease-in-out">
          {children}
        </div>
      </div>
    </div>
  );
}
