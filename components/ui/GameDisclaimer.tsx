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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <h1 className="text-base">Play Section Disclaimer</h1>
          </AlertDialogTitle>
          <AlertDialogDescription className="h-[20vh] max-h-[50vh] overflow-auto text-xs text-muted-foreground flex flex-col items-start gap-4">
            <p className="text-left">
              All Guacamole games in our “Play” section utilize a verifiably
              random on-chain gaming protocol, Gamba. These games provide
              several different front-end interfaces for interacting with these
              on-chain programs using your compatible Solana wallet. Playing
              these games may be restricted if you live in any of the following
              territories:
            </p>
            <p className="my-3 text-[#FF7171] text-left">
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
          <div className="flex w-full justify-evenly">
            <AlertDialogAction
              className="bg-[#ABD8AE] !ml-0 w-[150px]"
              disabled={!isAccepted}
              onClick={save}
            >
              Confirm
            </AlertDialogAction>
            <AlertDialogAction
              className="bg-[#FF8B8B] !ml-0 w-[150px]"
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
