"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { FC, useState } from "react";
import FallbackImage from "../FallBackImage";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { AlertDialogAction } from "../ui/alert-dialog";
type DisclaimerConfirmProps = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
};
const DisclaimerConfirm: FC<DisclaimerConfirmProps> = ({
  open,
  onOpenChange,
}) => {
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const save = () => {
    localStorage.setItem("isDisclaimerAccepted", "true");
    onOpenChange(false);
    //setIsOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" lg:min-w-[672px] ">
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
                Please Read Before Using
              </h1>
            </DialogTitle>
            <hr />
            <DialogDescription className="relative overflow-y-auto  h-[35vh] max-h-[50vh]  text-xs text-muted-foreground flex flex-col items-center gap-1">
              <p className="text-[16px] text-[#A8A8A8] mt-4 z-20 leading-7">
                This website-hosted user interface (this "Interface") is an open
                source frontend software portal that interacts with several
                blockchain-enabled smart contracts and tools created by
                reputable third-parties and the Guacamole community. This
                interface is made available by the AvocaDAO and maintained
                through community contributions. However, all transactions
                conducted are run by related permissionless smart contracts. As
                this interface is open-sourced and all smart contracts are
                accessible by any user, entity, or third-party, there may be a
                number of different applications or interfaces that interact or
                allow for interaction with the same third-party contracts or
                protocols specifically developed as the "Guacamole Protocol".
              </p>
            </DialogDescription>
            <div className="flex items-center space-x-2 z-20">
              <Checkbox
                id="terms"
                checked={isAccepted}
                onCheckedChange={() => setIsAccepted((s) => !s)}
              />
              <label
                htmlFor="terms"
                className="text-sm text-[#A8A8A8]  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read, understand, and accept these terms
              </label>
            </div>
          </DialogHeader>
          <DialogFooter className=" z-20 w-full mt-4">
            <hr />
            <div className="flex flex-col w-full gap-2 z-20 items-center">
              <Button
                className="w-full !ml-0 guac-btn max-w-[150px]"
                disabled={!isAccepted}
                onClick={save}
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisclaimerConfirm;
