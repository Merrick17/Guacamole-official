import FallbackImage from "@/components/FallBackImage";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
  GambaPlatformContext,
  useCurrentToken,
  useTokenList,
  useUserBalance,
  useCurrentPool,
} from "gamba-react-ui-v2";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import styled from "styled-components";
import { useJupiterApiContext } from "../trade/src/contexts";
const StyledToken = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    height: 20px;
  }
`;

const TokenImage = styled.img`
  height: 20px;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;

const StyledTokenButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
`;

export default function TokenSelect() {
  const [visible, setVisible] = React.useState(false);
  const context = React.useContext(GambaPlatformContext);
  const selectedToken = useCurrentToken();

  const balance = useUserBalance();
  const tokenList = useTokenList();
  const currentPool = useCurrentPool();
  const { tokenMap } = useJupiterApiContext();

  const setToken = (token: PublicKey) => {
    context.setToken(token);
    setVisible(false);
  };

  const click = () => {
    setVisible(!visible);
  };

  return (
    <div className="flex w-full   !bg-background h-16 rounded-md items-center justify-between px-2 border border-[rgba(168, 168, 168, 0.10)]">
      <div className="flex items-center justify-center gap-2">
        <FallbackImage
          src={selectedToken.image}
          width={35}
          height={35}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-[#FCFCFC] font-bold text-[13px]">
            Place Bets In {selectedToken.symbol}
          </p>
          <p className="text-xs text-muted-foreground">
            Min Bet:{" "}
            {currentPool.minWager / Math.pow(10, selectedToken.decimals)} Max
            Payout:{" "}
            {selectedToken.symbol == "SOL"
              ? currentPool.maxPayout / LAMPORTS_PER_SOL
              : currentPool.maxPayout / Math.pow(10, selectedToken.decimals)}
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="sm" className="game-btn">
            <FaChevronDown />
          </Button>
          {/* {" "}
          <GambaUi.Button >
            {selectedToken && (
              <StyledToken>
                <TokenImage src={selectedToken.image} />
                <TokenValue amount={balance.balance} />
              </StyledToken>
            )}
          </GambaUi.Button> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {tokenList.map((x, i) => (
            <DropdownMenuItem key={i.toString()}>
              <StyledTokenButton onClick={() => setToken(x.mint)} key={i}>
                <TokenImage src={x.image} /> {x.symbol}
              </StyledTokenButton>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
