import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Nft, NftWithToken, Sft, SftWithToken } from "@metaplex-foundation/js";
import { FC } from "react";
import {
  createSetAuthorityInstruction,
  AuthorityType,
  TOKEN_PROGRAM_ID,
} from "../../../node_modules/@solana/spl-token";
import { Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const TokenManagerDialog: FC<{
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
  token: Sft | Nft | SftWithToken | NftWithToken;
}> = ({ isOpen, setIsOpen, token }) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { toast } = useToast();
  const updateMintAuthority = async () => {
    try {
      if (
        publicKey &&
        token.mint.mintAuthorityAddress.toBase58() == publicKey.toBase58()
      ) {
        const ix = createSetAuthorityInstruction(
          token.address,
          token.mint.mintAuthorityAddress,
          AuthorityType.MintTokens,
          null,
          [],
          TOKEN_PROGRAM_ID
        );
        const tx = new Transaction().add(ix);
        const sig = await sendTransaction(tx, connection);
        toast({
          variant: "success",
          title: "Success",
          description: (
            <div className="flex flex-col gap-2">
              <Link
                href={`https://solscan.io/tx/${sig}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-5 py-2 uppercase text-sm rounded-md text-center"
              >
                View on solscan
              </Link>
            </div>
          ),
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You don't have the authority ",
        });
      }
    } catch (error) {}
  };
  const updateFreezeAuthority = async () => {
    try {
      if (
        publicKey &&
        token.mint.mintAuthorityAddress.toBase58() == publicKey.toBase58()
      ) {
        const ix = createSetAuthorityInstruction(
          token.address,
          token.mint.mintAuthorityAddress,
          AuthorityType.FreezeAccount,
          null,
          [],
          TOKEN_PROGRAM_ID
        );
        const tx = new Transaction().add(ix);
        const sig = await sendTransaction(tx, connection);
        toast({
          variant: "success",
          title: "Success",
          description: (
            <div className="flex flex-col gap-2">
              <Link
                href={`https://solscan.io/tx/${sig}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-5 py-2 uppercase text-sm rounded-md text-center"
              >
                View on solscan
              </Link>
            </div>
          ),
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You don't have the authority ",
        });
      }
    } catch (error) {}
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-w-[750px]">
        <DialogTitle>
          <span className="text-[#FCFCFC] text-[20px] font-medium flex flex-col gap-1">
            {" "}
            Token Management
          </span>
          <hr className="mt-3" />
        </DialogTitle>
        <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col min-h-[50px] my-1 items-center justify-center ">
          <div className="flex justify-center items-center flex-col gap-2">
            <span>Mint Authority</span>
            <span className="text-muted-foreground">
              {token && token.mint.mintAuthorityAddress
                ? token.mint.mintAuthorityAddress.toBase58()
                : "-"}
            </span>
            <Button
              onClick={updateMintAuthority}
              className="launch-bg"
              disabled={!token || !token.mint.mintAuthorityAddress}
            >
              Revoke
            </Button>
          </div>

          <div className="flex justify-center items-center flex-col gap-2">
            <span>Freeze Authority</span>
            <span className="text-muted-foreground">
              {" "}
              {token && token.mint.freezeAuthorityAddress
                ? token.mint.freezeAuthorityAddress.toBase58()
                : "-"}
            </span>
            <Button
              onClick={updateFreezeAuthority}
              disabled={!token || !token.mint.freezeAuthorityAddress}
              className="launch-bg"
            >
              Revoke
            </Button>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default TokenManagerDialog;
