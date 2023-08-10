'use client';
import { cn } from '@/lib/utils';
import { TokenInfo } from '@solana/spl-token-registry';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { BiLink, BiSolidLeftArrow } from 'react-icons/bi';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@solana/wallet-adapter-react';
import routes from '@/config/routes';
import useWalletTokens from '@/lib/tokens/useWalletTokens';
import axios from 'axios';

const WalletDrawer = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { connected } = useWallet();
  const walletTokens = useWalletTokens();
  console.log('Wallet Tokens', walletTokens);
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
        <div className="w-full h-full relative">
          <Image src="/icons/wallet.png" fill alt="wallet drawer" />
        </div>
      </button>
      {open && (
        <div className={cn('fixed w-full h-full top-0 z-50 ')}>
          <div
            className=" fixed bg-black/50 w-screen h-screen cursor-pointer "
            onClick={() => setOpen(false)}
          />

          <div className="relative px-4 py-3 top-1/3 -translate-y-1/3 h-2/3 flex flex-col gap-2  w-full max-w-full md:max-w-sm bg-white xs:w-80   rounded-tr-lg rounded-br-lg border border-[#E5E7EB]">
            <header className="flex items-center justify-between overflow-hidden ">
              <h1 className=" block text-lg font-medium text-black pt-3 pb-5 border-b border-dashed border-[#E5E7EB]">
                Your Wallet
              </h1>
              <div className="flex items-center gap-2">
                <Link
                  href={routes.swap.root}
                  className="w-9 h-8 p-1  flex items-center justify-center rounded-lg bg-white border border-[#E5E7EB]"
                >
                  <Image
                    src="/icons/trade.svg"
                    width={20}
                    height={20}
                    alt="swap"
                  />
                </Link>
                <Link
                  href={routes.swap.root}
                  className="w-9 h-8 p-1  flex items-center justify-center rounded-lg bg-white border border-[#E5E7EB]"
                >
                  <Image
                    src="/images/earn/dynamic-vault.png"
                    width={20}
                    height={20}
                    alt="vault"
                  />
                </Link>
              </div>
            </header>
            <div
              className="overflow-y-auto"
              style={{ height: 'calc(100% - 96px)' }}
            >
              <ul className="flex flex-col gap-2">
                {walletTokens?.map(
                  (token, index) =>
                    token.token && <Row key={index} token={token} />
                )}
              </ul>
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

const Row = ({ token }: { token: any }) => {
  const [price, setPrice] = useState(0);

  const getValueInUsd = async (token: TokenInfo) => {
    const { data } = await axios.get(
      'https://price.jup.ag/v4/price?ids=' + token.symbol
    );
    for (var prop in data.data) {
      const value = data.data[prop].price;
      setPrice(value);
      break;
    }
  };

  const amount = useMemo(() => {
    return token.account.amount
      ? Number(token.account.amount) / Math.pow(10, token.decimals)
      : 0;
  }, [token.account.amount, token.decimals]);

  useEffect(() => {
    getValueInUsd(token.token);
  }, [amount]);

  return (
    <div
      key={token.token.address}
      className="flex items-center justify-start gap-5 w-full rounded-xl p-3 border border-[#E5E7EB]"
    >
      <img
        src={token.token.logoURI as string}
        alt={token.token.name}
        className="h-[24px] w-[24px] "
      />
      <div className="w-full">
        <div className=" flex flex-row items-center justify-between gap-4 text-black ">
          <div className="flex items-center gap-2">
            <h1 className="text-sm">{token.token.symbol}</h1>
            <Link
              href={`https://explorer.solana.com/address/${token.pubkey.toBase58()}`}
              rel="noopener noreferrer"
              target="_blank"
              className="text-xs flex items-center bg-black/50 text-white  rounded-[4px] px-2 py-1 "
            >
              <span className="  max-w-[44px] text-ellipsis overflow-hidden">
                {token.pubkey.toBase58()}
              </span>
              <BiLink />
            </Link>
          </div>
          <span>${price.toFixed(2)}</span>
        </div>
        <div className=" flex flex-row items-center justify-between gap-4 text-black text-sm ">
          <span>{amount.toFixed(6)}</span>
          <span>${(price * amount).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
