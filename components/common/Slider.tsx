import React, { PropsWithChildren, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";
import Image from "next/image";

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 0px;
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
    ref.current.scrollBy({ left: 1 * x, behavior: "smooth" });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <header className="flex items-center gap-1">
          <div className="relative aspect-square w-6">
            <Image src="/images/themes/yellow.png" fill alt="play" />
          </div>
          <h1 className="text-2xl  ">Featured Games</h1>
        </header> */}

        {/* <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={() => scrll(-1)}>
            <FaArrowLeft />
          </button>
          <button onClick={() => scrll(1)}>
            <FaArrowRight />
          </button>
        </div> */}
      </div>

      <Wrapper ref={ref}>{children}</Wrapper>
    </>
  );
}
