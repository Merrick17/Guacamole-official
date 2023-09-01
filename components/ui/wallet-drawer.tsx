'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { BiLinkExternal, BiSolidLeftArrow } from 'react-icons/bi';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@solana/wallet-adapter-react';
import routes from '@/config/routes';
import useWalletTokens from '@/lib/tokens/useWalletTokens';
import axios from 'axios';
import { Skeleton } from './skeleton';

const WalletDrawer = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { connected } = useWallet();
  const walletTokens = useWalletTokens();

  const [tokenData, setTokenData] = useState([]); // Store token data including USD values

  useEffect(() => {
    const fetchTokenData = async () => {
      const tokenDataWithPrices = await Promise.all(
        walletTokens
          .filter((token) => !!token.token)
          .map(async (token) => {
            const { data } = await axios.get(
              'https://price.jup.ag/v4/price?ids=' + token.token.symbol
            );
            for (var prop in data.data) {
              const price = data.data[prop].price;
              const amount = token.account.amount
                ? Number(token.account.amount) / Math.pow(10, token.decimals)
                : 0;
              return {
                ...token,
                price,
                amount,
              };
            }
          })
      );

      setTokenData(tokenDataWithPrices);
    };

    fetchTokenData();
  }, [walletTokens]);
  return (
    <>
      <button
        className="fixed z-50 top-1/3 left-0 w-12 h-12 p-[6px] bg-[#8BD796] rounded-tr-lg rounded-br-lg "
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
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="28"
            viewBox="0 0 29 28"
            fill="none"
          >
            <path
              d="M27.5 6.92V3.5C27.5 1.85 26.15 0.5 24.5 0.5H3.5C1.835 0.5 0.5 1.85 0.5 3.5V24.5C0.5 26.15 1.835 27.5 3.5 27.5H24.5C26.15 27.5 27.5 26.15 27.5 24.5V21.08C28.385 20.555 29 19.61 29 18.5V9.5C29 8.39 28.385 7.445 27.5 6.92ZM26 9.5V18.5H15.5V9.5H26ZM3.5 24.5V3.5H24.5V6.5H15.5C13.85 6.5 12.5 7.85 12.5 9.5V18.5C12.5 20.15 13.85 21.5 15.5 21.5H24.5V24.5H3.5Z"
              fill="black"
            />
          </svg>
        </div>
      </button>
      {open && (
        <div className={cn('fixed w-full h-full top-0 z-50 ')}>
          <div
            className=" fixed bg-black/50 w-screen h-screen cursor-pointer "
            onClick={() => setOpen(false)}
          />

          <div className="relative px-4 py-3 top-1/3 -translate-y-1/3 h-2/3 flex flex-col gap-2  w-full max-w-full md:max-w-sm bg-foreground xs:w-80   rounded-tr-lg rounded-br-lg ">
            <header className="flex items-center justify-between overflow-hidden ">
              <h1 className=" block text-lg font-medium w-full pt-3 pb-5 ">
                Your Wallet
              </h1>
              <div className="flex items-center gap-2">
                <Link
                  href={routes.trade.root}
                  className="w-9 h-8 p-1  flex items-center justify-center rounded-lg bg-background"
                >
                  <Image
                    src="/images/themes/violet.png"
                    width={20}
                    height={20}
                    alt="swap"
                  />
                </Link>
                <Link
                  href={routes.earn.root}
                  className="w-9 h-8 p-1  flex items-center justify-center rounded-lg  bg-background"
                >
                  <Image
                    src="/icons/earn/dynamic-vault.png"
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
              <ul className="flex flex-col gap-4">
                {tokenData
                  ? tokenData.length > 0 &&
                    tokenData
                      .sort((a, b) =>
                        a.price * a.amount > b.price * b.amount ? -1 : 1
                      )
                      .map((token, index) => <Row key={index} token={token} />)
                  : Array(5).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-16 w-full rounded-xl "
                      />
                    ))}
              </ul>
            </div>
            <div
              className="absolute -right-9 top-6 w-9 h-14 flex justify-center items-center shadow-md  rounded-tr-lg rounded-br-lg bg-foreground cursor-pointer text-[#8BD796]"
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
  const amount = useMemo(() => {
    return token.account.amount
      ? Number(token.account.amount) / Math.pow(10, token.decimals)
      : 0;
  }, [token.account.amount, token.decimals]);

  return (
    <div
      key={token.token.address}
      className="flex items-center justify-start gap-5 w-full rounded-xl p-3 bg-background"
    >
      <img
        src={token.token.logoURI as string}
        alt={token.token.name}
        className="h-[24px] w-[24px] "
      />
      <div className="w-full">
        <div className=" flex flex-row items-center justify-between gap-4 ">
          <div className="flex items-center gap-2">
            <h1 className="text-sm">{token.token.symbol}</h1>
            <Link
              href={`https://explorer.solana.com/address/${token.pubkey.toBase58()}`}
              rel="noopener noreferrer"
              target="_blank"
              className="text-xs flex items-center text-[#8BD796] bg-foreground  rounded-sm px-2 py-1 "
            >
              <span className="  max-w-[44px] text-ellipsis overflow-hidden">
                {token.pubkey.toBase58()}
              </span>
              <BiLinkExternal />
            </Link>
          </div>
          <span>${token.price.toFixed(2)}</span>
        </div>
        <div className=" flex flex-row items-center justify-between gap-4 text-muted-foreground text-sm ">
          <span>{amount.toFixed(6)}</span>
          <span>${(token.price * amount).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
