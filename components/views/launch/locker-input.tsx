import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { FC } from "react";
interface LockerInputProps {
  handleStepChange: (nbr: number) => void;
}
const LockerInput: FC<LockerInputProps> = ({ handleStepChange }) => {
  return (
    <>
      <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col">
        <span className="text-muted-foreground text-xs">
          Use the locker to prove to your community that you have locked
          liquidity. This tool is mainly for token developers. Please read our
          documentation.
        </span>
        <span className="text-[#FFFF]">Guacamole Liquidity Lockers Offer:</span>
        <span className="text-muted-foreground text-xs">
          Verified on-chain time based locks
        </span>
        <span className="text-muted-foreground text-xs">
          Easily shareable liquidity locker pages
        </span>
        <span className="text-muted-foreground text-xs">
          Included relocking mechanims
        </span>
      </Container>
      <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col">
        <span className="text-muted-foreground text-xs">
          Enter the Raydium pair address you would like to lock liquidity for:
        </span>
        <Input placeholder="Raydium pair address" className="w-full" />
      </Container>
      <Container className="bg-[#0F0F0F] p-3 flex gap-3 flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/images/launch/guac.png"
              className="h-[30px] w-[30px] rounded-full"
            />
            <img
              src="/images/launch/sol.png"
              className="h-[30px] w-[30px] rounded-full"
            />
            <span className="text-[#FFF] text-sm">GUAC / SOL </span>
          </div>
          <span>0</span>
        </div>
      
      </Container>
      <Button
          className="bg-primary rounded-lg h-[50px] w-full"
          onClick={() => {
            handleStepChange(2);
          }}
        >
          Lock This Liquidity{" "}
        </Button>
    </>
  );
};

export default LockerInput;
