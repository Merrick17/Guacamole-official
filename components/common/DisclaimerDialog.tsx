"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { FC } from "react";
import FallbackImage from "../FallBackImage";
import { Button } from "../ui/button";
type DisclaimerDialogProps = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  handleNextStep: () => void;
};
const DisclaimerDialog: FC<DisclaimerDialogProps> = ({
  open,
  onOpenChange,
  handleNextStep,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[672px] ">
        <div className="w-full h-full relative overflow-hidden">
          <FallbackImage
            alt=""
            src={"/images/toast/success.png"}
            className="absolute z-0 top-[0px] opacity-10 -translate-y-1/3"
            width={600}
            height={500}
          />
          <DialogHeader className="z-20">
            <DialogTitle>
              {" "}
              <h1 className="text-[24px] text-[#FCFCFC] leading-7 text-center">
                Welcome To Guacamole!
              </h1>
            </DialogTitle>
            <hr />
            <DialogDescription className="relative overflow-y-auto  h-[35vh] max-h-[50vh]  text-xs text-muted-foreground flex flex-col items-center gap-4">
              <h3 className="text-[20px] text-[#FCFCFC] font-semibold leading-8 text-center z-20">
                The <span className="text-[#8BD796]">best ingredients</span> to
                keep your crypto portfolio{" "}
                <span className="text-[#8BD796]">super fresh</span>.
              </h3>
              <p className="text-[16px] text-[#A8A8A8] z-20 leading-7">
                Experience a fresh take on Solana DeFi with{" "}
                <span className="text-[#8BD796] ">Guacamole</span>. Trade, earn,
                create, and play effortlessly, while enjoying a seamless and
                user-friendly experience. Each section is represented by a fresh
                ingredient of our favorite Guacamole recipe and color-coded to
                make navigation easier!
              </p>
              <p className="text-[16px] text-[#A8A8A8] mt-4 z-20 leading-7">
                Make sure to stop by the Ecosystem page to learn more about
                other amazing offerings within the Guacamole ecosystem like our
                token, the Avotars, and even ways to redeem rewards for special
                prizes. Press continue and unlock a world of possibilities!
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center w-full z-10">
            <Button
              className="guac-btn max-w-[150px] rounded-md z-30"
              onClick={handleNextStep}
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisclaimerDialog;
