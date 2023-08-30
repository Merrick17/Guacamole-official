import React, { PropsWithChildren } from 'react';
interface Props extends PropsWithChildren {
  backgroundImage?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
}

export function Card({
  backgroundImage,
  backgroundColor,
  children,
  width = 150,
  height = 200,
}: Props) {
  return (
    <div
      className="group relative bg-background rounded-[10px] flex flex-col justify-end max-h-full transition-[height] duration-200 ease-in-out overflow-hidden flex-grow-0 flex-shrink-0"
      style={{ width, height }}
    >
      {backgroundImage && (
        <div
          className="group-hover:scale-110 absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-200 ease-in-out"
          style={{ backgroundImage: 'url(' + backgroundImage + ')' }}
        />
      )}
      <div className="opacity-0  group-hover:opacity-100 absolute text-center w-[90%] px-5 py-1 bottom-2 left-1/2 -translate-x-1/2 bg-black text-white rounded-[5px] font-semibold text-sm transition-opacity duration-200 ease-in-out">
        {children}
      </div>
    </div>
  );
}
