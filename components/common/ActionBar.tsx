import { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useGamba, useGambaEvent } from 'gamba/react';
import { ProvablyFair, Svg } from 'gamba/react-ui';
import { Button } from '../ui/button';

const StyledPopup = styled.div`
  position: absolute;
  bottom: 100%;
  z-index: 10000;
  left: 50%;
  background: white;
  color: black;
  border-radius: var(--border-radius);
  margin-bottom: 40px;
  padding: 10px;
  transform: translateX(-50%);
  display: grid;
  gap: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  &:after {
    content: '';
    width: 20px;
    height: 20px;
    transform: rotate(-45deg);
    background: var(--bg-light-color);
    position: absolute;
    z-index: -1;
    bottom: -10px;
    left: calc(50% - 10px);
  }
`;

interface Props extends PropsWithChildren {
  _?: boolean;
}
interface PreviousGame {
  nonce: number;
  clientSeed: string;
  rngSeedHashed: string;
  rngSeed: string;
  options: number[];
}
export function ActionBar({ children }: Props) {
  const [proof, setProof] = useState(false);
  const toggleProof = () => setProof(!proof);
  const gamba = useGamba();
  const [previousGames, setPreviousGames] = useState<PreviousGame[]>([]);
  const [rngSeedHashed, setRngSeedHashed] = useState(
    gamba.user?.state.currentGame.rngSeedHashed
  );

  useEffect(
    () => setRngSeedHashed(gamba.user?.state.currentGame.rngSeedHashed),
    [gamba.user?.state.currentGame.rngSeedHashed]
  );

  useGambaEvent(
    ({ nonce, rngSeed, clientSeed, player }) => {
      if (gamba.wallet?.publicKey?.equals(player)) {
        const game = {
          nonce,
          clientSeed,
          rngSeedHashed: rngSeedHashed ?? 'abcd',
          rngSeed,
          options: gamba.user?.state.currentGame.options ?? [],
        };
        setPreviousGames((games) => [game, ...games].slice(0, 5));
        setRngSeedHashed(gamba.user?.state.currentGame.rngSeedHashed);
      }
    },
    [rngSeedHashed, gamba.wallet]
  );

  return (
    <>
      <div className=" max-w-[512px]  w-full z-10  ">
        <div className="  w-full p-5 flex flex-wrap items-center gap-1 justify-evenly bg-white rounded-lg backdrop:blur-[50px]">
          {children}
          <div>
            <div style={{ position: 'relative' }}>
              {proof && rngSeedHashed && (
                <StyledPopup>
                  <ProvablyFair
                    nextSeedHashed={rngSeedHashed}
                    games={previousGames}
                  />
                </StyledPopup>
              )}
              <Button disabled={!rngSeedHashed} onClick={toggleProof}>
                <Svg.Fairness />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
