"use client";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useJupiterApiContext } from "@/components/views/trade/src/contexts";

import { usePool } from "@/hooks/use-pool-list";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useTokenAccounts } from "@bonfida/hooks";
import { TokenInfo } from "@solana/spl-token-registry";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { format } from "date-fns";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import FallbackImage from "@/components/common/FallbackImage";
import { useLockerTools } from "@/context/locker.context";
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { poolList, getPoolByLpMint } = usePool();
  const { toast } = useToast();
  const [selectedPool, setSelectedPool] = useState<any>(null);
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { tokenList, tokenMap } = useJupiterApiContext();
  const [baseToken, setBaseToken] = useState<TokenInfo | null>(null);
  const [quoteToken, setQuoteToken] = useState<TokenInfo | null>(null);
  const [lock, setLock] = useState(null);
  const {
    getVaultByLpMint,
    getLocksByMint,
    getLockerByAdr,
    handleExtendLock,
    handleExtendLockTime,
    handleUnlock,
  } = useLockerTools();
  const [poolAdr, setPoolAdr] = useState("");
  const [lockList, setLockList] = useState([]);
  const [lockerInfo, setLockerInfo] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const { data: tokenAccounts, refresh: refreshToken } = useTokenAccounts(
    connection,
    publicKey
  );

  const [lockDate, setLockDate] = useState(new Date(Date.now()));
  const fetchPoolData = useCallback(async () => {
    const adr = params["address"] as string;

    if ( adr !== "") {
      setPoolAdr(adr);
      const locker = await getLockerByAdr(adr);

      setLockerInfo(locker);

      if (locker) {
        if (locker.owner.toBase58() !== publicKey.toBase58()) {
          router.push("/launch/lock");
        }
        const pool = await getPoolByLpMint(locker.mint.toBase58());
        const base = pool.baseMint;
        const quote = pool.quoteMint;

        setBaseToken(base);
        setQuoteToken(quote);
        setSelectedPool(pool);

        const value = await getVaultByLpMint(pool.lpMint);
        const list = await getLocksByMint(pool.lpMint);

        if (list) {
          setLockList(list);
        }
        if (value !== null) {
          setLock(value);
        }
      }
    } else {
      router.push("/launch/lock");
    }
  }, [poolList]);
  const initUserBalance = useCallback(async () => {
    if (selectedPool) {
      const tokenAccount = tokenAccounts
        ? tokenAccounts?.getByMint(new PublicKey(selectedPool?.lpMint))
        : null;

      const tokenBalance =
        tokenAccount && tokenAccount.decimals
          ? Number(tokenAccount.account.amount) /
            Math.pow(10, tokenAccount.decimals)
          : 0;
      setTokenBalance(tokenBalance);
    }
  }, [publicKey]);
  useEffect(() => {
    fetchPoolData();
    initUserBalance();
  }, [poolList]);

  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-xl ">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md ">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <Button
            className="rounded-lg h-[30px] flex flex-2 gap-2"
            onClick={() => {
              router.back();
            }}
          >
            <svg
              width="7"
              height="11"
              viewBox="0 0 7 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.1633 10.6633C5.85499 10.9717 5.35513 10.9717 5.04682 10.6633L0.836287 6.45277C0.527977 6.14446 0.527977 5.64459 0.836287 5.33628L5.04682 1.12576C5.35513 0.817454 5.85499 0.817454 6.1633 1.12576C6.47161 1.43407 6.47161 1.93393 6.1633 2.24224L2.51102 5.89453L6.1633 9.54681C6.47161 9.85512 6.47161 10.355 6.1633 10.6633Z"
                fill="black"
              />
            </svg>
            <span> Back To Lockers</span>
          </Button>
          <Button className="rounded-lg h-[30px]">Lock liquidity</Button>
        </div>
        <hr className="border border-[rgba(168, 168, 168, 0.10)] " />
        <div className="flex flex-col gap-4  md:justify-between md:items-center">
          <Container className="bg-[#0F0F0F] p-2 flex gap-3 justify-center items-center h-[60px]">
            <span className="text-[#FCFCFC] text-[16px] font-medium">
              Manage Your Liquidity Locker
            </span>
          </Container>
          <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col min-h-[50px] my-1">
            <span className="text-muted-foreground text-xs uppercase">
              selected liquidity pool tokens:
            </span>
            <div className="flex justify-start items-center">
              {baseToken && (
                <FallbackImage
                  src={
                    baseToken.logoURI
                      ? baseToken.logoURI
                      : "/images/No_Logo_Found_Guacamole-min.png"
                  }
                  className="rounded-full object-contain"
                  unoptimized
                  width={30}
                  height={30}
                  alt={baseToken.logoURI}
                />
              )}
              {quoteToken && (
                <FallbackImage
                  src={
                    quoteToken.logoURI
                      ? quoteToken.logoURI
                      : "/images/No_Logo_Found_Guacamole-min.png"
                  }
                  className="rounded-full object-contain"
                  unoptimized
                  width={30}
                  height={30}
                  alt={quoteToken.name}
                />
              )}
              {baseToken && quoteToken && (
                <span className="text-[#FFFF] ml-2">
                  {baseToken.symbol}/{quoteToken.symbol}
                </span>
              )}
            </div>
          </Container>
          <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col min-h-[50px] my-1">
            <span className="text-muted-foreground text-xs uppercase">
              LOCKED AMOUNT
            </span>
            {lockerInfo &&
              selectedPool &&
              lockerInfo.lockedAmount.toNumber() /
                Math.pow(10, selectedPool.lpDecimals)}
          </Container>
          <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col min-h-[50px] my-1">
            <span className="text-muted-foreground text-xs uppercase">
              CHOSEN UNLOCK DATE
            </span>
            <span className="text-muted-foreground text-xs">
              {lockerInfo &&
                dayjs(new Date(lockerInfo.unlockTime.toNumber())).format(
                  "llll"
                )}
            </span>
          </Container>
          <Container className="bg-[#0F0F0F] p-3 flex gap-3 justify-center items-center h-max">
            <p className="text-primary text-xs text-center">
              Liquidity pool tokens cannot be withdrawn under any circumstances
              until the timer has expired. Select the “Relock Liquidity” option
              if you wish to extend the lock period.
            </p>
          </Container>
          <Button
            className="my-1 min-h-[50px] w-full"
            onClick={() => {
              if (selectedPool) {
                router.push(`/launch/lock/view/${selectedPool.poolId}`);
              }
            }}
          >
            View Public Locker Page
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="w-full">
              <Button
                className="my-1 min-h-[50px] w-full"
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                Relock Liquidity
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle>
                <span className="text-[#FCFCFC] text-[16px] font-medium">
                  {" "}
                  Relock Liquidity
                </span>
              </DialogTitle>
              <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col min-h-[50px] my-1">
                <span className="text-muted-foreground text-xs uppercase">
                  LOCKED AMOUNT
                </span>
                {lockerInfo &&
                  selectedPool &&
                  lockerInfo.lockedAmount.toNumber() /
                    Math.pow(10, selectedPool.lpDecimals)}
              </Container>

              <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col">
                <span className="text-[#FFFF] uppercase text-sm">
                  CHOOSE UNLOCK DATE
                </span>
                <div className="w-full relative">
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      setShowCalendar(true);
                    }}
                    className={cn(
                      "w-full justify-start text-left font-normal px-1",
                      !lockDate && "text-muted-foreground"
                    )}
                  >
                    {lockDate ? (
                      format(lockDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                  {showCalendar && (
                    <Container className="bg-[#0F0F0F] absolute max-w-xs">
                      <Calendar
                        mode="single"
                        selected={lockDate}
                        onSelect={setLockDate}
                        initialFocus
                        onDayClick={(day, modifiers) => {
                          const currentLock = lockerInfo.unlockTime.toNumber();
                          if (currentLock >= day.getTime()) {
                            toast({
                              variant: "destructive",
                              title: "Error",
                              description:
                                "You need to select a date higher than current unlock date",
                            });
                            setLockDate(new Date(Date.now()));
                          } else {
                            setShowCalendar(false);
                          }
                        }}
                      />
                    </Container>
                  )}
                </div>
                {/* <DateInput
                  selectedDate={lockDate}
                  handleSelectDate={(date) => {
                    setLockDate(date);
                  }}
                /> */}
              </Container>
              <Button
                onClick={() => {
                  if (selectedPool && publicKey) {
                    handleExtendLockTime(
                      lockDate.getTime(),
                      selectedPool.lpMint,
                      publicKey
                    ).then(() => {
                      setIsDialogOpen(false);
                    });
                  }
                }}
              >
                Confirm
              </Button>
            </DialogContent>
          </Dialog>

          <Button
            className="my-1 min-h-[50px] w-full"
            disabled={Date.now() < lockDate.getTime()}
            onClick={() => {
              if (selectedPool && publicKey) {
                handleUnlock(selectedPool.lpMint, publicKey);
              }
            }}
          >
            Withdraw Liquidity
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Page;
