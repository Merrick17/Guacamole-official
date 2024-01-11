"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import FallbackImage from "../FallBackImage";

const Disclaimer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  useEffect(() => {
    const isDisclaimerAccepted = localStorage.getItem("isDisclaimerAccepted");
    if (!isDisclaimerAccepted) {
      setIsOpen(true);
    }
  }, []);
  const save = () => {
    localStorage.setItem("isDisclaimerAccepted", "true");
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} >
      <AlertDialogContent className="w-[700px]">
        <AlertDialogHeader>
          <AlertDialogTitle >
            <h1 className="text-[24px] text-[#FCFCFC] leading-7 text-center">Welcome To Guacamole!</h1>
          </AlertDialogTitle>
          <hr />
          <AlertDialogDescription className="h-[35vh] max-h-[50vh]  text-xs text-muted-foreground flex flex-col items-center gap-4 relative overflow-hidden ">
            <FallbackImage alt="" src={"/images/toast/success.png"} className="absolute z-0 top-[-40px] opacity-10" width={500} height={1700} />
            <h3 className="text-[20px] text-[#FCFCFC] font-semibold leading-8 text-center z-20">
              The <span className="text-[#8BD796]">best ingredients</span> to
              keep your crypto portfolio{" "}
              <span className="text-[#8BD796]">super fresh</span>.
            </h3>
            <p className="text-[16px] text-[#A8A8A8] z-20">
              Experience a fresh take on Solana DeFi with{" "}
              <span className="text-[#8BD796] ">Guacamole</span>. Trade, earn,
              create, and play effortlessly, while enjoying a seamless and
              user-friendly experience. Each section is represented by a fresh
              ingredient of our favorite Guacamole recipe and color-coded to
              make navigation easier!
            </p>
            <p className="text-[16px] text-[#A8A8A8] mt-4 z-20">
              Make sure to stop by the Ecosystem page to learn more about other
              amazing offerings within the Guacamole ecosystem like our token,
              the Avotars, and even ways to redeem rewards for special prizes.
              Press continue and unlock a world of possibilities!
            </p>
            <AlertDialogAction
              className="!ml-0 guac-bg w-[150px] rounded-md z-20"

            >
              Continue
            </AlertDialogAction>
          </AlertDialogDescription>
        </AlertDialogHeader>


      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Disclaimer;
