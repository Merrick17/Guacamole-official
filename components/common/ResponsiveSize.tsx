import React, { HTMLAttributes, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  maxScale?: number;
}

export function ResponsiveSize({
  children,
  maxScale = 1,
  ...props
}: HTMLAttributes<HTMLDivElement> & Props) {
  const wrapper = useRef<HTMLDivElement>(null!);
  const inner = useRef<HTMLDivElement>(null!);
  const okok = useRef<HTMLDivElement>(null!);
  useLayoutEffect(() => {
    let timeout: any;
    const resize = () => {
      const ww = wrapper.current.clientWidth / (okok.current.scrollWidth + 20);
      const hh =
        wrapper.current.clientHeight / (okok.current.clientHeight + 40);
      const zoom = Math.min(maxScale, ww, hh);
      inner.current.style.transform = 'scale(' + zoom + ')';
    };
    resize();
    window.addEventListener('resize', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        inner.current.style.transition = 'transform .1s';
        resize();
      }, 250);
    });
  }, []);
  return (
    <div
      className=" max-w-[512px] w-full flex flex-col h-max gap-4 items-center bg-white rounded-lg"
      {...props}
      ref={wrapper}
    >
      <div ref={inner}>
        <div ref={okok}>{children}</div>
      </div>
    </div>
  );
}
