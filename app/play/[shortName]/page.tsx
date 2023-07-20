'use client';
const Button = dynamic(() => import('gamba/react-ui').then((mod) => mod.Button), {
  ssr: false, // Disable SSR for Button
});

import {GameBundle,Svg} from 'gamba/react-ui'

const GameView = dynamic(() => import('gamba/react-ui').then((mod) => mod.GameView), {
  ssr: false, // Disable SSR for GameView
});

const RecentPlays = dynamic(() => import('gamba/react-ui').then((mod) => mod.RecentPlays), {
  ssr: false, // Disable SSR for RecentPlays
});


import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useMemo } from 'react';
import { FaArrowRight, FaDice, FaList } from 'react-icons/fa';
import styled from 'styled-components';
import { Card } from '../../../components/common/Card';
import { Slider } from '../../../components/common/Slider';
import { GAMES } from '../../../components/games';
import { Banner, Section, StylelessButton } from '../../../components/styles';
import dynamic from 'next/dynamic';

const CoverImage = styled.div`
  transition: background-image 0.2s ease;
  background-image: url('');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export default function Page({ params }: { params: { shortName: string } }) {
  useEffect(()=>{

  },[typeof window!=="undefined"])
  const navigate = useRouter();
  const { shortName } = params;
  const game = useMemo(
    () => GAMES.find((x) => x.short_name === shortName),
    [shortName]
  );
  const play = true;
  console.log({ GAMES, shortName: shortName });
  return (
    <>
      <Banner size={play ? 'big' : shortName ? 'medium' : 'default'}>
        <Fragment key={shortName}>
          {play && game ? (
            <div>
              <GameView game={game} />
              <div
                style={{
                  position: 'absolute',
                  top: 80,
                  right: 20,
                  zIndex: 1000,
                }}
              >
                <StylelessButton
                  style={{ color: 'white', fontSize: '20px' }}
                  onClick={() => navigate.push('/play/' + game.short_name)}
                >
                  <Svg.Close />
                </StylelessButton>
              </div>
            </div>
          ) : (
            
             <Details game={game} />
          )}
        </Fragment>
      </Banner>
      {GAMES.length > 1 && (
        <Section>
          <Slider
            title={
              <h2>
                <FaDice /> Featured Games
              </h2>
            }
          >
            {GAMES.map((game: any) => (
              <Link key={game.short_name} href={`/play/${game.short_name}`}>
                <Card
                  width={150}
                  height={play ? 50 : 200}
                  backgroundImage={game.image}
                  backgroundColor={game.theme_color}
                >
                  {game.name}
                </Card>
              </Link>
            ))}
          </Slider>
        </Section>
      )}
      <Section>
        <h2>
          <FaList /> Recent Plays
        </h2>
        <RecentPlays />
      </Section>
    </>
  );
}

function Details({ game }: { game?: any }) {
  console.log(game);
  const navigate = useRouter();
  return (
    <>
      {game ? (
        <CoverImage
          style={{
            backgroundImage: 'url(' + game.image + ')',
            backgroundColor: game.theme_color,
          }}
        />
      ) : (
        <CoverImage style={{ backgroundImage: 'url(/images/banner.png)' }} />
      )}
      <div>
        <Section>
          <div
            style={{ position: 'absolute', top: 80, right: 20, zIndex: 1000 }}
          >
            <StylelessButton
              style={{ color: 'white', fontSize: '20px' }}
              onClick={() => navigate.push('/')}
            >
              <Svg.Close />
            </StylelessButton>
          </div>
        </Section>
        {game ? (
          <Section>
            <h1>{game.name}</h1>
            <div
              style={{
                color: '#ffffff99',
                wordWrap: 'break-word',
                overflow: 'hidden',
              }}
            >
              By {game.creator}
            </div>
            <div>{game.description || '-'}</div>
            <div
              style={{ display: 'flex', gap: '20px', justifyContent: 'end' }}
            >
              <Button
                fill
                pulse
                onClick={() =>
                  navigate.push('/play/' + game.short_name + '/play')
                }
              >
                Play Game <FaArrowRight />
              </Button>
            </div>
          </Section>
        ) : (
          <Section>
            <h1>Gamba Demo</h1>
            <div>
              A decentralized, provably-fair casino built on{' '}
              <a
                target="_blank"
                href="https://github.com/gamba-labs/gamba"
                rel="noreferrer"
              >
                gamba
              </a>
              .
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Button onClick={() => {
                if (typeof window !== "undefined") {
                  window.open('https://gamba.so', '_blank')
                }
              }}>
                Read More
              </Button>
            </div>
          </Section>
        )}
      </div>
    </>
  );
}
