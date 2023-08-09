'use client';
import { cn } from '@/lib/utils';
import { TokenInfo } from '@solana/spl-token-registry';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiLink, BiSolidLeftArrow } from 'react-icons/bi';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@solana/wallet-adapter-react';
const WalletDrawer = () => {
  const [open, setOpen] = useState(true);
  const { toast } = useToast();
  const { connected } = useWallet();
  return (
    <>
      <button
        className="fixed z-50 top-1/3 left-0 w-12 h-12 p-[6px] bg-white/80 rounded-tr-lg rounded-br-lg border border-[#E5E7EB]"
        onClick={() =>
          connected
            ? setOpen(true)
            : toast({
                variant: 'destructive',
                title: 'Wallet not connected',
                description: 'Please connect your wallet to continue',
              })
        }
      >
        <button className="w-full h-full relative">
          <Image src="/icons/wallet.png" fill alt="wallet drawer" />
        </button>
      </button>
      {open && (
        <div className={cn('fixed w-full h-full top-0 z-50 ')}>
          <div
            className=" fixed bg-black/50 w-screen h-screen cursor-pointer "
            onClick={() => setOpen(false)}
          />

          <div className="relative px-4 py-3 top-1/3 -translate-y-1/3 h-2/3  w-full max-w-full md:max-w-sm bg-white xs:w-80   rounded-tr-lg rounded-br-lg border border-[#E5E7EB]">
            <header className="flex items-center justify-between overflow-hidden ">
              <h1 className=" block text-2xl font-medium text-black">
                Your Wallet
              </h1>
            </header>
            <div
              className="overflow-y-auto"
              style={{ height: 'calc(100% - 96px)' }}
            >
              <ul className="">add rows here , safwen</ul>
            </div>
            <div
              className="absolute -right-9 top-6 w-9 h-14 flex justify-center items-center shadow-md bg-[#F0FDF4] rounded-tr-lg rounded-br-lg border border-[#E5E7EB]"
              onClick={() => setOpen(false)}
            >
              <BiSolidLeftArrow />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletDrawer;

const Row = ({ info }: { info: TokenInfo }) => {
  return (
    <div
      key={info.address}
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
            <BiLink />
          </Link>
        </div>
        <span className="text-sm opacity-80">{info.name}</span>
      </div>
    </div>
  );
};
