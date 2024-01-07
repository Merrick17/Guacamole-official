import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { PositionSideEnum, calculateOdd } from "@hxronetwork/parimutuelsdk";
import React, { FC, useMemo } from "react";
import { useSetting } from "@/context/setting";
import { useParimutuel } from "@/context/parimutuel";
import { useTokenAccounts } from "@bonfida/hooks";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import numeral from "numeral";
type PositionDialogProps = {
  isDialogOpen: boolean;
  onOpenChange?: (x: boolean) => void;
  position: PositionSideEnum;
  countDown: string;
};
const PositionDialog: FC<PositionDialogProps> = ({
  isDialogOpen,
  onOpenChange,
  position,
  countDown,
}) => {
  const { selectedParimutuel, positionSide, decimalPlaces, selectedNetwork } =
    useSetting();
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { parimutuels, getPositions, markets, web3 } = useParimutuel();
  const contractSize = useMemo(
    () => markets[0]?.info.market.contractSize.toNumber(),
    [markets]
  );

  const parimutuelAccount = useMemo(
    () =>
      parimutuels.find(
        (parimutuel) => parimutuel.pubkey.toBase58() === selectedParimutuel
      ),
    [parimutuels, selectedParimutuel]
  );

  const { parimutuel } = parimutuelAccount?.info || {};
  const isLong = position === PositionSideEnum.LONG;
  const { selectedMarketPair } = useSetting();
  const longPosition = parimutuel?.activeLongPositions.toNumber() ?? 0;
  const shortPosition = parimutuel?.activeShortPositions.toNumber() ?? 0;
  const poolSize = longPosition + shortPosition;

  const odd = calculateOdd(isLong ? longPosition : shortPosition, poolSize);
  const { data: tokenAccounts, refresh: refreshToken } = useTokenAccounts(
    connection,
    publicKey
  );
  const guacTokenAccount = tokenAccounts
    ? tokenAccounts?.getByMint(
        new PublicKey("AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR")
      )
    : null;
  const guacBalance =
    guacTokenAccount && guacTokenAccount.decimals
      ? Number(guacTokenAccount.account.amount) /
        Math.pow(10, guacTokenAccount.decimals)
      : 0;
  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>
          <span className="text-[#FCFCFC] text-[16px] font-medium">
            {" "}
            Open A New Position
          </span>
        </DialogTitle>
        <Container className="bg-[#0F0F0F] p-2 flex gap-3  min-h-[50px] my-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M10.3447 6.94181H8.85884V12.8853L13.5641 15.7085L14.3071 14.4901L10.3447 12.1424V6.94181ZM15.1362 0.810059L19.6999 4.61888L18.4319 6.13943L13.8653 2.33259L15.1362 0.810059ZM4.56265 0.810059L5.83259 2.3316L1.26795 6.13943L0 4.61788L4.56265 0.810059ZM9.84943 2.97945C4.9262 2.97945 0.934126 6.97153 0.934126 11.8948C0.934126 16.818 4.9262 20.8101 9.84943 20.8101C14.7727 20.8101 18.7647 16.818 18.7647 11.8948C18.7647 6.97153 14.7727 2.97945 9.84943 2.97945ZM9.84943 18.8289C6.02575 18.8289 2.9153 15.7184 2.9153 11.8948C2.9153 8.07108 6.02575 4.96063 9.84943 4.96063C13.6731 4.96063 16.7836 8.07108 16.7836 11.8948C16.7836 15.7184 13.6731 18.8289 9.84943 18.8289Z"
              fill="#7FD88B"
            />
          </svg>
          <span className="text-[#FCFCFC] text-[14px] font-medium ">
            {countDown} LEFT IN THIS ROUND
          </span>
        </Container>

        <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col">
          <div className="flex gap-2 items-center">
            {isLong ? (
              <FaArrowUp color="#7ED88A" size={24} />
            ) : (
              <FaArrowDown color="#FF6363" size={24} />
            )}{" "}
            <span className="text-white text-[24px]">{selectedMarketPair}</span>
          </div>
          <span className="text-muted-foreground text-[16px]">
            {" "}
            {`${poolSize / (10 ** decimalPlaces / contractSize)} / ${odd}X`}
          </span>
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Enter Amount</span>
            <div className="flex gap-1 items-center">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.27539 10H9.77539V2.5H8.21289V0H2.27539C1.23963 0 0.400391 0.839235 0.400391 1.875V8.125C0.400391 9.16073 1.23963 10 2.27539 10ZM8.52539 3.75V8.75H2.27539C1.92994 8.75 1.65039 8.47046 1.65039 8.125V3.64078C1.8512 3.7128 2.06237 3.74943 2.27539 3.75004L8.52539 3.75ZM2.27539 1.25H6.96289V2.5H2.27539C1.92994 2.5 1.65039 2.22045 1.65039 1.875C1.65039 1.52955 1.92994 1.25 2.27539 1.25Z"
                  fill="#A8A8A8"
                  fill-opacity="0.5"
                />
              </svg>
              <span className="text-xs text-muted-foreground">
                {numeral(guacBalance).format("0,0")}
              </span>
            </div>
          </div>
        </Container>
        <Button onClick={() => {}}>Confirm</Button>
      </DialogContent>
    </Dialog>
  );
};

export default PositionDialog;
