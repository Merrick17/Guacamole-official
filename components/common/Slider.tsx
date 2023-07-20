import React, { PropsWithChildren, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';
import { StylelessButton } from '../games/Roulette/styles';
import Image from 'next/image';

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  overflow: scroll visible;
  scroll-snap-type: x mandatory;
  transition: height 0.25s ease;
  &::-webkit-scrollbar {
    height: 0.4em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cccccc33;
  }
  & > * {
    scroll-snap-align: start;
  }
`;

export function Slider({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null!);
  const scrll = (x: number) => {
    ref.current.scrollBy({ left: 1 * x, behavior: 'smooth' });
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="text-black"
      >
        <header className="flex items-center gap-1">
          <div className="relative aspect-square w-6">
            <Image src="/icons/featured-games.svg" fill alt="play" />
          </div>
          <h1 className="text-2xl   text-black">Featured Games</h1>
        </header>

        <div style={{ display: 'flex', gap: '20px' }}>
          <StylelessButton onClick={() => scrll(-1)}>
            <FaArrowLeft />
          </StylelessButton>
          <StylelessButton onClick={() => scrll(1)}>
            <FaArrowRight />
          </StylelessButton>
        </div>
      </div>

      <Wrapper ref={ref}>{children}</Wrapper>
    </>
  );
}
