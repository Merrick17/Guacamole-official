import { Dispatch, SetStateAction, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { TokenInfo } from '@solana/spl-token-registry';
import Link from 'next/link';
import useWalletTokens from '@/lib/tokens/useWalletTokens';
import { useWallet } from '@solana/wallet-adapter-react';
const Row = ({
  info,
  handleSelect,
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  info: any;
  handleSelect: (e: any) => void;
}) => {
  return (
    <button
      onClick={() => {
        handleSelect(info.token);
        setOpen(false);
      }}
      className="flex items-center justify-start gap-4 w-full rounded-xl p-3 hover:bg-[#E5E7EB] "
    >
      <img
        src={info.token.logoURI as string}
        alt={info.token.name}
        className="h-[24px] w-[24px] "
      />
      <div className=" flex flex-col items-start text-black ">
        <span className="text-sm opacity-80">{info.token.symbol}</span>
      </div>
    </button>
  );
};

export const SelectToken = ({
  handleSelect,
  selectedToken,
}: {
  handleSelect: (token: any) => void;
  selectedToken: any;
}) => {
  const [open, setOpen] = useState(false);
  const { connected } = useWallet();
  const walletTokens = useWalletTokens();
  console.log('walletTokens', walletTokens);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full cursor-pointer ">
        <div className="p-3 flex flex-col gap-[6px] items-start rounded-lg border border-[#E5E7EB] w-full">
          <p className="text-[#4B5563] text-xs font-normal uppercase">
            Select A Token
          </p>
          <p className="text-black font-medium text-sm">
            {selectedToken ? selectedToken.name : 'Select token from dropdown'}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent closeBtn={false}>
        <DialogHeader>
          <DialogTitle>
            <div className="relative">
              <h2 className="text-base  text-black text-center ">Tokens</h2>
              <DialogTrigger asChild>
                <AiOutlineArrowLeft className=" absolute w-4 h-4 top-1/2 -left-2 -translate-y-1/2 cursor-pointer" />
              </DialogTrigger>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          {!connected ? (
            <p>Please Connect Your Wallet</p>
          ) : (
            <>
              {walletTokens.map((info, idx) => (
                <Row
                  key={idx}
                  info={info}
                  handleSelect={handleSelect}
                  setOpen={setOpen}
                />
              ))}
            </>
          )}{' '}
        </div>
      </DialogContent>
    </Dialog>
  );
};
