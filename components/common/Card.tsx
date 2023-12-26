import React, { PropsWithChildren } from "react";
interface Props extends PropsWithChildren {
  backgroundImage?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
}

export function Card({
  backgroundImage,
  children,
  width = 150,
  height = 200,
}: Props) {
  return (
    <div
      className="group relative bg-foreground shadow-md border-[1px] border-[rgba(168, 168, 168, 0.10)] shadow-lg rounded-[10px] flex flex-col  max-h-full transition-[height] duration-200 ease-in-out overflow-hidden flex-grow-0 flex-shrink-0 items-center justify-center"
      style={{ width, height }}
    >
      {children}
      {/* {backgroundImage && (
        <div
          className="group-hover:scale-110 absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-200 ease-in-out"
          style={{
            backgroundImage: 'url(' + backgroundImage + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
      )} */}
      {/* <div className="opacity-0  group-hover:opacity-100 absolute text-center w-[90%] px-5 py-1 bottom-2 left-1/2 -translate-x-1/2 bg-black text-white rounded-[5px] font-semibold text-sm transition-opacity duration-200 ease-in-out">
        {children}
      </div> */}
    </div>
  );
}
