'use client';
import React from 'react';
import { FC } from 'react';
import Image from 'next/image'
const RecentPlay = () => {
  return (
    <div className="flex w-[512px] flex-col gap-4 rounded-lg bg-white px-5 py-7">
      <header className="flex items-center gap-1 ">
        <div className="relative aspect-square w-6">
          <Image src="/images/recent-play.png" fill alt="play" />
        </div>
        <h1 className="text-2xl   text-black">Recent Plays</h1>
      </header>
      <div className="flex flex-col gap-4">
        {results.map((result, index) => (
          <ResultItem key={index} {...result} />
        ))}
      </div>
    </div>
  );
};

export default RecentPlay;

type ResultItemProps = {
  name?: string;
  winner: boolean;
  amount: number;
  time: string;
};

const ResultItem: FC<ResultItemProps> = ({
  name = 'Someone',
  winner,
  amount,
  time,
}) => {
  return (
    <div className="flex items-center justify-between rounded-[5px] border border-solid border-[#E5E7EB] p-[10px]">
      <h1>
        {name} {winner ? 'won' : 'bet'}{' '}
        <span className={winner ? 'text-[#4E8341]' : 'text-[#A63B3D]'}>
          {amount} SOL
        </span>{' '}
        {!winner && 'and lost'}
      </h1>
      <p className="text-sm underline">{time}</p>
    </div>
  );
};

const results = [
  {
    name: 'Someone',
    winner: true,
    amount: 1,
    time: '1m',
  },
  {
    name: 'Someone',
    winner: false,
    amount: 0.5,
    time: '2m',
  },
];
