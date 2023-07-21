'use client';

const GameView = dynamic(
  () => import('gamba/react-ui').then((mod) => mod.GameView),
  {
    ssr: false, // Disable SSR for GameView
  }
);
import React, { Fragment, useMemo } from 'react';
import { GAMES } from '@/components/games';
import { Banner } from '@/components/styles';
import dynamic from 'next/dynamic';

export default function Page({ params }: { params: { shortName: string } }) {
  const { shortName } = params;
  const game = useMemo(
    () => GAMES.find((x) => x.short_name === shortName),
    [shortName]
  );
  const play = true;
  console.log({ GAMES, shortName: shortName });
  return (
    <>
      <div
        // size={play ? 'big' : shortName ? 'medium' : 'default'}
        className="w-full flex flex-col items-center gap-4"
      >
        <Fragment key={shortName}>
          <GameView game={game} />
        </Fragment>
      </div>
    </>
  );
}
