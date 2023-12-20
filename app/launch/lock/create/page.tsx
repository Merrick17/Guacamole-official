"use client";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LockerInput from "@/components/views/launch/locker-input";
import LockerInputDetails from "@/components/views/launch/locker-input-details";
import { JupiterApiProvider } from "@/components/views/trade/src/contexts";
import useLockerTools from "@/hooks/use-locker";
import { PoolProvider, usePool } from "@/hooks/use-pool-list";
import { TokenInfo } from "@solana/spl-token-registry";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FallbackImage from "@/components/common/FallbackImage";
const LockItem = ({ lock }) => {
  const { poolList, getPoolByLpMint } = usePool();

  const [poolInfo, setPoolInfo] = useState(null);
  const [baseToken, setBaseToken] = useState<TokenInfo | null>(null);
  const [quoteToken, setQuoteToken] = useState<TokenInfo | null>(null);

  const initInfo = async () => {
    if (lock) {
      const pool = await getPoolByLpMint(lock.account.mint.toBase58());

      const base = pool.baseMint;
      const quote = pool.quoteMint;
      setPoolInfo(pool);
      setQuoteToken(quote);
      setBaseToken(base);
    }
  };
  useEffect(() => {
    initInfo();
  }, [lock]);
  return (
    <Container className="bg-[#0F0F0F] px-[15px] py-[16px] flex gap-3 justify-between h-[60px] my-[5px]">
      <div className="flex justify-start items-center">
        {baseToken && (
          <FallbackImage
            unoptimized
            src={
              baseToken.logoURI
                ? baseToken.logoURI
                : "/images/No_Logo_Found_Guacamole-min.png"
            }
            className="rounded-full object-contain"
            alt={baseToken.name}
            width={30}
            height={30}
          />
        )}
        {quoteToken && (
          <FallbackImage
            unoptimized
            src={
              quoteToken.logoURI
                ? quoteToken.logoURI
                : "/images/No_Logo_Found_Guacamole-min.png"
            }
            className="rounded-full object-contain"
            alt={quoteToken.name}
            width={30}
            height={30}
          />
        )}
        {baseToken && quoteToken && (
          <span className="text-[#FFFF] ml-2">
            {baseToken.symbol}/{quoteToken.symbol}
          </span>
        )}
      </div>
      {lock && (
        <Link href={`/launch/lock/manage/${lock.publicKey.toBase58()}`}>
          {" "}
          <span className="text-[16px] font-medium text-[#FAFAFA]">→</span>
        </Link>
      )}
    </Container>
  );
};
const Page = () => {
  const { getLocksByOwner } = useLockerTools();
  const [step, setStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [userLocks, setUserLocks] = useState<any[]>([]);
  const { connected, publicKey } = useWallet();
  const changeStep = (newStep: number) => {
    setStep(newStep);
  };
  const initUserLocks = useCallback(async () => {
    if (connected) {
      const lockers = await getLocksByOwner(publicKey.toBase58());
      //console.log("Lockers", lockers);
      setUserLocks(lockers);
    }
  }, [publicKey, connected]);
  useEffect(() => {
    initUserLocks();
  }, [initUserLocks]);
  const router = useRouter();
  return (
    <PoolProvider>
      <JupiterApiProvider>
        <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-2xl ">
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
            <hr className="border-dashed border-[rgba(168_168_168_0.10)]" />

            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
              <Button
                className={`${
                  activeTab == 1
                    ? "bg-primary"
                    : "bg-[#0F0F0F] text-muted-foreground"
                } w-full rounded-lg h-[34px]`}
                onClick={() => {
                  setActiveTab(1);
                }}
              >
                Create New Lock
              </Button>
              <Button
                className={`${
                  activeTab == 2
                    ? "bg-primary"
                    : "bg-[#0F0F0F] text-muted-foreground"
                } w-full rounded-lg h-[34px]`}
                onClick={() => {
                  setActiveTab(2);
                }}
              >
                Manage / Withdraw
              </Button>
            </div>
            {activeTab == 1 ? (
              <div className="w-full h-full flex flex-col gap-3">
                <Container className="bg-[#0F0F0F] p-2 flex gap-3 justify-center items-center">
                  <span className="text-[#FCFCFC] text-[16px] font-medium">
                    Create A New Liquidity Locker
                  </span>
                </Container>
                {step == 1 ? (
                  <LockerInput handleStepChange={changeStep} />
                ) : (
                  <LockerInputDetails />
                )}
              </div>
            ) : (
              <div className=" w-full h-full flex flex-col gap-3">
                <Container className="bg-[#0F0F0F] p-2 flex gap-3 justify-center items-center h-[60px]">
                  <span className="text-[#FCFCFC] text-[16px] font-medium">
                    Manage Your Liquidity Lockers
                  </span>
                </Container>
                <Container className="bg-[#0F0F0F] p-3 flex gap-3 flex-col min-h-[70px] my-5">
                  <span className="text-muted-foreground text-xs uppercase">
                    Enter the pair address you would like to ACCESS:
                  </span>
                  <Input placeholder="Pair Address" className="w-full" />
                </Container>
                <p className="text-muted-foreground text-xs">
                  The following lockers are associated with this account:
                </p>

                {userLocks.map((lock) => (
                  <LockItem lock={lock} />
                ))}
              </div>
            )}
          </div>
        </main>
      </JupiterApiProvider>
    </PoolProvider>
  );
};

export default Page;
