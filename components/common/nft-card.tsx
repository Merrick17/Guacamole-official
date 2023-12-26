'use client';
import Image from 'next/image';
import React, { FC, useEffect } from 'react';
import { Button } from '../ui/button';
import Container from './container';
import FallbackImage from '../FallBackImage';

type NftCardProps = {
  className?: string;
  image: string;
  title: string;
  token?: any;
  SelectButton?: React.ReactNode;
};
const NftCard: FC<NftCardProps> = ({ token, SelectButton, className }) => {
  return (
    <div className="rounded-xl  bg-background flex flex-col gap-2 text-xs px-6 py-4 border border-transparent transition-all ease-in-out duration-500  hover:border-primary ">
      <div className="flex flex-col  items-center">
        <FallbackImage
          unoptimized
          src={token ? token.logoURI : '/images/placeholder.png'}
          alt={token ? token.name : ''}
          className="rounded-xl w-[200px] h-[200px] "
          width={200}
          height={200}
        />
        <p>{token ? token.name : ''}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        {SelectButton}
        {/* <Button size="sm" variant="destructive">
          <span className="text-xs">selected</span>
        </Button> */}
        <Button
          size="sm"
          onClick={() => {
            if (typeof window !== 'undefined' && token) {
              window.open(`https://solscan.io/address/${token.mint}`);
            }
          }}
        >
          <span className="text-xs">View Explorer</span>
        </Button>
      </div>
    </div>
  );
};

export default NftCard;
