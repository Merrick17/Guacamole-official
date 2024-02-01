"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
      <DialogContent className="min-w-[700px]  min-h-[400px] p-0">
        <div className="w-full h-full relative overflow-hidden p-4 flex flex-col gap-2">
          <FallbackImage
            alt=""
            src={"/images/toast/success.png"}
            className="absolute z-0 top-[0px] opacity-10 -translate-y-[15%]"
            width={600}
            height={400}
          />
          <DialogHeader className="z-20">
            <DialogTitle className="mb-[10px]">
              {" "}
              <h1 className="text-[24px] text-[#FCFCFC] leading-7 text-center font-[500]">
                Welcome To Guacamole!
              </h1>
            </DialogTitle>
            <hr className="mt-2" />
            <DialogDescription className="relative overflow-y-auto  h-[35vh] max-h-[50vh]  text-xs text-muted-foreground flex flex-col items-start gap-[20px]">
              <p className="text-[20px] text-[#FCFCFC] font-semibold leading-8 text-left z-20">
                The <span className="text-[#8BD796]">best ingredients</span> to
                keep your crypto portfolio{" "}
                <span className="text-[#8BD796]">super fresh</span>.
              </p>
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
          <div className="flex justify-center items-center w-full z-10 mt-3">
            <Button
              className="guac-btn min-w-[150px] rounded-md z-30"
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
