import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.span<{ $flash?: boolean }>`
  background: transparent;
  transition: background 0.5s;
  border-radius: 5px;
  ${({ $flash }) =>
    $flash &&
    `
    background: currentColor;
    transition: none;
  `}
`;

interface Props {
  children: ReactNode;
}

export function Flash({ children }: Props) {
  const [flash, set] = useState(false);

  useEffect(() => {
    set(true);
    setTimeout(() => {
      set(false);
    }, 250);
  }, [children]);

  return <Wrapper $flash={flash}>{children}</Wrapper>;
}
