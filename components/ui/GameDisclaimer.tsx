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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GameDisclaimer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const isGameDisclaimerAccepted = localStorage.getItem(
      "isGameDisclaimerAccepted"
    );
    if (!isGameDisclaimerAccepted) {
      setIsOpen(true);
    }
  }, []);
  const save = () => {
    localStorage.setItem("isGameDisclaimerAccepted", "true");
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="h-[480px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <h1 className="text-base text-center">Play Section Disclaimer</h1>
          </AlertDialogTitle>
          <AlertDialogDescription className=" overflow-auto text-xs text-muted-foreground flex flex-col items-start gap-4">
            <p className="text-left text-[16px] font-[400] leading-[26px]">
              All Guacamole games in our “Play” section utilize a verifiably
              random on-chain gaming protocol, Gamba. These games provide
              several different front-end interfaces for interacting with these
              on-chain programs using your compatible Solana wallet.
              <br /> Playing these games may be restricted if you live in any of
              the following territories:
            </p>
            <p className="my-3 text-[#FF7171] text-left text-[16px] font-[400] leading-[26px]">
              USA, Turkey, Aruba, Bonaire, Curacao, France, Netherlands, Saba,
              St. Eustatius, St. Martin, China, United Kingdoms, Iran, North
              Korea (and other sanctioned areas).
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={isAccepted}
              onCheckedChange={() => setIsAccepted((s) => !s)}
            />
            <label
              htmlFor="terms"
              className="text-xs text-[#828282]  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I confirm these games are not forbidden by my local authorities
              and i’m atleast 18 years old.
            </label>
          </div>
          <div className="flex w-full justify-evenly p-[24px]">
            <AlertDialogAction
              className="guac-bg !ml-0 w-[150px]"
              disabled={!isAccepted}
              onClick={save}
            >
              Confirm
            </AlertDialogAction>
            <AlertDialogAction
              className="earn-bg !ml-0 w-[150px]"
              onClick={() => {
                router.replace("/");
              }}
            >
              Go Back Home
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GameDisclaimer;
