"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FC } from "react";
type BuyAndSellDialogProps = {
  isOpen: boolean;
  handleOpenChange: (boolean) => void;
};
const BuyAndSellDialog: FC<BuyAndSellDialogProps> = ({
  isOpen,
  handleOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="min-h-[600px] p-0">
        <iframe
          src="https://app.kado.money?apiKey=0eb8dd38-4381-445b-8b52-73ebe6f586d8&theme=dark&onRevCurrency=SOL&networkList=SOLANA&network=SOLANA"
          width="100%"
          height="100%"
        ></iframe>
      </DialogContent>
    </Dialog>
  );
};

export default BuyAndSellDialog;
