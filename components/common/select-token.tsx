import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AiOutlineArrowLeft } from 'react-icons/ai';
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
        handleSelect(info);
        setOpen(false);
      }}
      className="flex items-center justify-start gap-4 w-full rounded-xl p-3 bg-primary "
    >
      {info && info.token && (
        <img
          src={info.token.logoURI as string}
          alt={info.token.name}
          className="h-[24px] w-[24px] "
        />
      )}
      <div className=" flex flex-col items-start  ">
        {info && info.token && (
          <span className="text-sm opacity-80">{info.token.symbol}</span>
        )}
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
  useEffect(() => {
    console.log('Wallet Tokens', walletTokens);
  }, [walletTokens]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full cursor-pointer ">
        <div className="p-3 flex flex-col gap-[6px] items-start rounded-lg border border-[#E5E7EB] w-full">
          <p className="text-muted-foreground text-xs font-normal uppercase">
            Select A Token
          </p>
          <p className=" font-medium text-sm">
            {selectedToken
              ? selectedToken.token.name
              : 'Select token from dropdown'}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent closeBtn={false}>
        <DialogHeader>
          <DialogTitle>
            <div className="relative">
              <h2 className="text-base   text-center ">Tokens</h2>
              <DialogTrigger asChild>
                <AiOutlineArrowLeft className=" absolute w-4 h-4 top-1/2 -left-2 -translate-y-1/2 cursor-pointer" />
              </DialogTrigger>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="h-[50vh] max-h-[50vh] overflow-auto">
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
