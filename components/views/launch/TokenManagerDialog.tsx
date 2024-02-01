import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Nft, NftWithToken, Sft, SftWithToken } from "@metaplex-foundation/js";
import Link from "next/link";
import React, { FC } from "react";

const TokenManagerDialog: FC<{
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
  token: Sft | Nft | SftWithToken | NftWithToken;
}> = ({ isOpen, setIsOpen, token }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-w-[672px]">
        <DialogTitle>
          <span className="text-[#FCFCFC] text-[20px] font-medium flex flex-col gap-1">
            {" "}
            Token Management
          </span>
          <hr className="mt-3" />
        </DialogTitle>
        <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col min-h-[50px] my-1 ">
          <div className="flex justify-between items-center gap-3 w-full">
            <div className="flex justify-center items-center flex-col gap-2">
              <span>Mint Authority</span>
              <span>
                {token && token.mint.mintAuthorityAddress
                  ? token.mint.mintAuthorityAddress.toBase58()
                  : "-"}
              </span>
              <Button
                className="launch-bg"
                disabled={!token || !token.mint.mintAuthorityAddress}
              >
                Revoke
              </Button>
            </div>
            <div className="flex justify-center items-center flex-col gap-2">
              <span>Freeze Authority</span>
              <span>
                {" "}
                {token && token.mint.freezeAuthorityAddress
                  ? token.mint.freezeAuthorityAddress.toBase58()
                  : "-"}
              </span>
              <Button
                disabled={!token || !token.mint.freezeAuthorityAddress}
                className="launch-bg"
              >
                Revoke
              </Button>
            </div>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default TokenManagerDialog;
