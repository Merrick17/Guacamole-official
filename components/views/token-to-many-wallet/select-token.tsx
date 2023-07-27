import { useState } from 'react';
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
import { getToken } from '@bonfida/hooks';
const Row = ({
  info,
  handleSelect,
}: {
  info: TokenInfo;
  handleSelect: (e: TokenInfo) => void;
}) => {
  return (
    <button
      key={info.address}
      onClick={() => handleSelect(info)}
      className="flex items-center justify-start gap-4 w-full rounded-xl p-3 hover:bg-[#E5E7EB] "
    >
      <img
        src={info.logoURI as string}
        alt={info.name}
        className="h-[24px] w-[24px] "
      />
      <div className=" flex flex-col items-start text-black ">
        <div className="flex items-center gap-2">
          <h1 className="text-sm">{info.symbol}</h1>
          <Link
            href={`https://explorer.solana.com/address/${info.address}`}
            rel="noopener noreferrer"
            target="_blank"
            className="text-xs flex items-center bg-black/50 text-white  rounded-[4px] px-2 py-1 "
          >
            <span className="  max-w-[44px] text-ellipsis overflow-hidden">
              {info.address}
            </span>
          </Link>
        </div>
        <span className="text-sm opacity-80">{info.name}</span>
      </div>
    </button>
  );
};

export const SelectToken = ({}: {}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full cursor-pointer ">
        <div className="p-3 flex flex-col gap-[6px] items-start rounded-lg border border-[#E5E7EB] w-full">
          <p className="text-[#4B5563] text-xs font-normal uppercase">
            Select A Token
          </p>
          <p className="text-black font-medium text-sm">
            Select token from dropdown
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
        <div></div>
      </DialogContent>
    </Dialog>
  );
};
