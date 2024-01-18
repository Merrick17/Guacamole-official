"use client";
import FallbackImage from "@/components/common/FallbackImage";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { useJupiterApiContext } from "@/components/views/trade/src/contexts";
import { abbreviate } from "@/components/views/trade/src/utils/abbreviate";
import { useLockerTools } from "@/context/locker.context";

import { usePool } from "@/hooks/use-pool-list";
import { TokenInfo } from "@solana/spl-token-registry";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import numeral from "numeral";
import { useCallback, useEffect, useState } from "react";
dayjs.extend(relativeTime);
const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { poolList, getPoolByLpMint, getPoolByPoolId } = usePool();
  const [selectedPool, setSelectedPool] = useState<any>(null);
  const { tokenList, api } = useJupiterApiContext();
  const [baseToken, setBaseToken] = useState<TokenInfo | null>(null);
  const [quoteToken, setQuoteToken] = useState<TokenInfo | null>(null);
  const [lock, setLock] = useState(null);
  const { getVaultByLpMint, getLocksByMint } = useLockerTools();
  const [poolAdr, setPoolAdr] = useState("");
  const [lockList, setLockList] = useState([]);

  const fetchPoolData = useCallback(async () => {
    const adr = params["address"] as string;
    //console.log("ADR", adr);
    if (adr !== "") {
      setPoolAdr(adr);
      const pool = await getPoolByPoolId(adr);

      //console.log("Pool Details", pool);
      const base = pool.baseMint;
      const quote = pool.quoteMint;

      setBaseToken(base);
      setQuoteToken(quote);
      setSelectedPool(pool);

      const value = await getVaultByLpMint(pool.lpMint);
      const list = await getLocksByMint(pool.lpMint);
      //console.log("Value", value);
      if (list) {
        setLockList(list);
      }
      if (value !== null) {
        setLock(value);
      }
    }
  }, []);

  useEffect(() => {
    fetchPoolData();
  }, [poolList]);

  const calculateLiquidityRatio = () => {
    if (lock && selectedPool) {
      //console.log("Selected Pool", selectedPool);
      const lockedAmount =
        lock.account.lockedAmount.toNumber() /
        Math.pow(10, selectedPool.lpDecimals);
      //console.log("Locked aMount", lockedAmount);
      const tokenAmount = selectedPool.tokenAmount;
      const percentage = (lockedAmount / tokenAmount) * 100;

      return percentage.toFixed(3);
    } else {
      return 0;
    }
  };
  const calculateLiquidity = () => {
    if (lock && selectedPool) {
      const lockedAmount =
        lock.account.lockedAmount.toNumber() /
        Math.pow(10, selectedPool.lpDecimals);

      const tokenAmount = selectedPool.tokenAmount;

      const liquidity = (lockedAmount / tokenAmount) * selectedPool.liquidity;
      return liquidity.toFixed(2);
    } else {
      return 0;
    }
  };
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-3 lg:px-8 py-6 md:px-16 md:py-12  max-w-2xl ">
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
          <Button
            className="rounded-lg h-[30px]"
            onClick={() => {
              router.push("/launch/lock/create");
            }}
          >
            Lock liquidity
          </Button>
        </div>
        <hr className="border-dashed border-[rgba(168_168_168_0.10)]" />
        <div className="w-full h-[40px] flex rounded-lg justify-center items-center bg-[#0F0F0F]">
          <div className="text-[#A8A8A8] w-full flex items-center justify-center gap-1 text-[14px]">
            {selectedPool
              ? selectedPool.provider == "RAYDIUM"
                ? "Raydium"
                : "Meteora"
              : ""}{" "}
            Pool Address:{" "}
            <Link
              href={`https://solscan.io/account/${poolAdr}`}
              className="text-[#8BD796] "
            >
              <div className="flex items-center justify-center gap-1 flex-nowrap">
                <span>{abbreviate(poolAdr, 4)}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M4.26465 2V3H1.76465V8.5H7.26465V6H8.26465V9C8.26465 9.13261 8.21197 9.25979 8.1182 9.35355C8.02444 9.44732 7.89726 9.5 7.76465 9.5H1.26465C1.13204 9.5 1.00486 9.44732 0.911095 9.35355C0.817326 9.25979 0.764648 9.13261 0.764648 9V2.5C0.764648 2.36739 0.817326 2.24021 0.911095 2.14645C1.00486 2.05268 1.13204 2 1.26465 2H4.26465ZM9.76465 0.5V4.5H8.76465V2.2065L4.86815 6.1035L4.16115 5.3965L8.05715 1.5H5.76465V0.5H9.76465Z"
                    fill="#8BD796"
                  />
                </svg>
              </div>
            </Link>{" "}
          </div>
        </div>
        <Container className="bg-[#0F0F0F] flex-col items-center flex">
          <h5 className="text-muted-foreground text-[12px] uppercase">
            Locked Liquidity
          </h5>
          <p className="text-primary text-[20px]">
            {calculateLiquidityRatio()}%
          </p>
        </Container>
        <div className=" flex flex-1 justify-evenly gap-2">
          {baseToken && (
            <div className=" w-[267.609px] h-[256px] p-5  overflow-hidden rounded-lg relative border-2 border-[#a8a8a8] border-opacity-10">
              <FallbackImage
                src={
                  baseToken.logoURI
                    ? baseToken.logoURI
                    : "/images/No_Logo_Found_Guacamole-min.png"
                }
                height={"100%"}
                width={"100%"}
                className="w-full h-full object-cover transform scale-[2] opacity-25 absolute top-0 bottom-0 left-0 right-0 z-0"
                alt="Guac Image"
              />
              <div className="w-[232px] h-[216px] rounded-lg bg-[#0F0F0F] border-2 border-[#a8a8a8] border-opacity-10 z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                <FallbackImage
                  src={
                    baseToken.logoURI
                      ? baseToken.logoURI
                      : "/images/No_Logo_Found_Guacamole-min.png"
                  }
                  className="h-[46px] w-[46px] rounded-full"
                  height={46}
                  width={46}
                />
                <p className="text-[#FFFF] font-medium text-[24px]">
                  {baseToken.symbol}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Link
                    href={`https://solscan.io/token/${baseToken.address}`}
                    className="text-[#8BD796] "
                  >
                    <div className="flex items-center justify-center gap-1 flex-nowrap">
                      <span>{abbreviate(baseToken.address, 4)}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M4.26465 2V3H1.76465V8.5H7.26465V6H8.26465V9C8.26465 9.13261 8.21197 9.25979 8.1182 9.35355C8.02444 9.44732 7.89726 9.5 7.76465 9.5H1.26465C1.13204 9.5 1.00486 9.44732 0.911095 9.35355C0.817326 9.25979 0.764648 9.13261 0.764648 9V2.5C0.764648 2.36739 0.817326 2.24021 0.911095 2.14645C1.00486 2.05268 1.13204 2 1.26465 2H4.26465ZM9.76465 0.5V4.5H8.76465V2.2065L4.86815 6.1035L4.16115 5.3965L8.05715 1.5H5.76465V0.5H9.76465Z"
                          fill="#8BD796"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {quoteToken && (
            <div className=" w-[267.609px] h-[256px] p-5  overflow-hidden rounded-lg relative border-2 border-[#a8a8a8] border-opacity-10">
              <img
                src={quoteToken.logoURI}
                className="w-full h-full object-cover transform scale-[2] opacity-25 absolute top-0 bottom-0 left-0 right-0 z-0"
                alt="Guac Image"
              />
              <div className="w-[232px] h-[216px] rounded-lg bg-[#0F0F0F] border-2 border-[#a8a8a8] border-opacity-10 z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                <img
                  src={quoteToken.logoURI}
                  className="h-[46px] w-[46px] rounded-full"
                />
                <p className="text-[#FFFF] font-medium text-[24px]">
                  {quoteToken.symbol}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Link
                    href={`https://solscan.io/token/${quoteToken.address}`}
                    className="text-[#8BD796] "
                  >
                    <div className="flex items-center justify-center gap-1 flex-nowrap">
                      <span>{abbreviate(quoteToken.address, 4)}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M4.26465 2V3H1.76465V8.5H7.26465V6H8.26465V9C8.26465 9.13261 8.21197 9.25979 8.1182 9.35355C8.02444 9.44732 7.89726 9.5 7.76465 9.5H1.26465C1.13204 9.5 1.00486 9.44732 0.911095 9.35355C0.817326 9.25979 0.764648 9.13261 0.764648 9V2.5C0.764648 2.36739 0.817326 2.24021 0.911095 2.14645C1.00486 2.05268 1.13204 2 1.26465 2H4.26465ZM9.76465 0.5V4.5H8.76465V2.2065L4.86815 6.1035L4.16115 5.3965L8.05715 1.5H5.76465V0.5H9.76465Z"
                          fill="#8BD796"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full h-[40px] flex rounded-lg  justify-evenly items-center  bg-[#0F0F0F] ">
          <Button className="bg-transparent" onClick={fetchPoolData}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6875 6.32812C12.9375 5.60938 12.0781 5.03906 11.1094 4.61719C10.1406 4.19531 9.10938 3.98438 8.01562 3.98438C6.57812 3.98438 5.24219 4.34375 4.00781 5.0625C2.77344 5.78125 1.79688 6.75781 1.07812 7.99219C0.359375 9.22656 0 10.5625 0 12C0 13.4375 0.359375 14.7734 1.07812 16.0078C1.79688 17.2422 2.77344 18.2188 4.00781 18.9375C5.24219 19.6562 6.57812 20.0156 8.01562 20.0156C9.85938 20.0156 11.4922 19.4531 12.9141 18.3281C14.3359 17.2031 15.2812 15.7656 15.75 14.0156H13.6875C13.25 15.1719 12.5156 16.125 11.4844 16.875C10.4531 17.625 9.29688 18 8.01562 18C6.92188 18 5.91406 17.7344 4.99219 17.2031C4.07031 16.6719 3.34375 15.9453 2.8125 15.0234C2.28125 14.1016 2.01562 13.0938 2.01562 12C2.01562 10.9062 2.28125 9.89844 2.8125 8.97656C3.34375 8.05469 4.07031 7.32812 4.99219 6.79688C5.91406 6.26562 6.92188 6 8.01562 6C8.82812 6 9.59375 6.15625 10.3125 6.46875C11.0312 6.78125 11.6719 7.21875 12.2344 7.78125L9 11.0156H16.0312V3.98438L13.6875 6.32812Z"
                fill="#D6776A"
              />
            </svg>
          </Button>
          <Link
            href={`/trade/swap?outputMint=${
              quoteToken ? quoteToken.address : ""
            }&inputMint=${baseToken ? baseToken.address : ""}`}
            className="text-[#BBB0DB]"
            target="_blank"
          >
            Swap
          </Link>
          <Link
            href={`${
              selectedPool
                ? selectedPool.provider == "RAYDIUM"
                  ? "https://raydium.io/pools/"
                  : `https://app.meteora.ag/pools/${poolAdr}`
                : ""
            }`}
            target="_blank"
            className="text-muted-foreground flex items-center justify-center gap-3"
          >
            {selectedPool
              ? selectedPool.provider == "RAYDIUM"
                ? "Raydium"
                : "Meteora"
              : "N/A"}{" "}
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2538_7835)">
                <path
                  d="M0.646484 9.28906L5.94336 3.99219H2.63867V3.00781H7.63086V8H6.64648V4.69531L1.34961 9.99219L0.646484 9.28906Z"
                  fill="#B9BABB"
                />
              </g>
              <defs>
                <clipPath id="clip0_2538_7835">
                  <rect
                    width="12"
                    height="12"
                    fill="white"
                    transform="matrix(1 0 0 -1 0.646484 12.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Link>
          <Link
            href={`https://solscan.io/account/${poolAdr}`}
            className="text-muted-foreground flex items-center justify-center gap-3"
          >
            Solscan{" "}
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2538_7835)">
                <path
                  d="M0.646484 9.28906L5.94336 3.99219H2.63867V3.00781H7.63086V8H6.64648V4.69531L1.34961 9.99219L0.646484 9.28906Z"
                  fill="#B9BABB"
                />
              </g>
              <defs>
                <clipPath id="clip0_2538_7835">
                  <rect
                    width="12"
                    height="12"
                    fill="white"
                    transform="matrix(1 0 0 -1 0.646484 12.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
        <Container className="border-2 flex-col items-start flex mt-2 space-y-4 ">
          <div className="flex items-center justify-between text-xs w-full ">
            <div className="text-muted-foreground">
              <span>Total LP Tokens</span>
            </div>
            <div className="text-muted-foreground">
              <span>
                {selectedPool
                  ? numeral(selectedPool.tokenAmount).format("0,0.000")
                  : 0}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs w-full ">
            <div className="text-muted-foreground">
              <span>Total Locked LP</span>
            </div>
            <div className="text-muted-foreground">
              <span>
                {lock && selectedPool
                  ? numeral(
                      lock.account.lockedAmount.toNumber() /
                        Math.pow(10, selectedPool.lpDecimals)
                    ).format("0,0.000")
                  : 0}
              </span>
            </div>
          </div>
        </Container>
        <Container className="bg-[#0F0F0F] flex-col items-center gap-2 flex justify-center">
          <h5 className="text-muted-foreground font-semibold  uppercase text-[#FFF]">
            Liquidity Locks
          </h5>
          <p className="text-muted-foreground text-center text-[12px]">
            Please note that only the Liquidity Provider (LP) tokens are locked,
            not the corresponding dollar value of these positions, which
            fluctuates with market changes. Additionally, as more participants
            contribute liquidity to the pool, new LP tokens are minted.
          </p>
        </Container>
        <Container className="bg-[#0F0F0F]  gap-2 flex justify-between items-center mt-2">
          <div className="flex flex-col items-start">
            <p className="text-primary text-[16px] ">${calculateLiquidity()}</p>
            <p className="text-muted-foreground text-[14px]">
              {lock && selectedPool
                ? lock.account.lockedAmount.toNumber() /
                  Math.pow(10, selectedPool.lpDecimals)
                : 0}{" "}
              LP tokens
            </p>
          </div>
          <div className="flex justify-end items-center gap-2">
            <div className="flex flex-col items-end">
              <p className=" text-[16px] ">
                {lockList.length != 0 &&
                  dayjs(Date.now()).to(
                    new Date(lockList[0].account.unlockTime.toNumber())
                  )}{" "}
              </p>
              <p className="text-muted-foreground text-[14px]">
                {lockList.length !== 0 &&
                  dayjs(Date.now()).format("MM/DD/YYYY hh:mm")}{" "}
              </p>
            </div>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2538_7886)">
                <path
                  d="M8.76562 17.0156C8.20312 17.0156 7.72656 16.8203 7.33594 16.4297C6.94531 16.0391 6.75 15.5625 6.75 15C6.75 14.4375 6.94531 13.9609 7.33594 13.5703C7.72656 13.1797 8.20312 12.9844 8.76562 12.9844C9.32812 12.9844 9.80469 13.1797 10.1953 13.5703C10.5859 13.9609 10.7812 14.4375 10.7812 15C10.7812 15.5625 10.5859 16.0391 10.1953 16.4297C9.80469 16.8203 9.32812 17.0156 8.76562 17.0156ZM14.7656 20.0156V9.98438H2.76562V20.0156H14.7656ZM14.7656 8.01562C15.3281 8.01562 15.8047 8.21094 16.1953 8.60156C16.5859 8.99219 16.7812 9.45312 16.7812 9.98438V20.0156C16.7812 20.5469 16.5859 21.0078 16.1953 21.3984C15.8047 21.7891 15.3281 21.9844 14.7656 21.9844H2.76562C2.20312 21.9844 1.72656 21.7891 1.33594 21.3984C0.945313 21.0078 0.75 20.5469 0.75 20.0156V9.98438C0.75 9.45312 0.945313 8.99219 1.33594 8.60156C1.72656 8.21094 2.20312 8.01562 2.76562 8.01562H3.75V6C3.75 5.09375 3.97656 4.25781 4.42969 3.49219C4.88281 2.72656 5.49219 2.11719 6.25781 1.66406C7.02344 1.21094 7.85938 0.984375 8.76562 0.984375C9.67188 0.984375 10.5078 1.21094 11.2734 1.66406C12.0391 2.11719 12.6484 2.72656 13.1016 3.49219C13.5547 4.25781 13.7812 5.09375 13.7812 6V8.01562H14.7656ZM8.76562 3C7.92188 3 7.21094 3.28906 6.63281 3.86719C6.05469 4.44531 5.76562 5.15625 5.76562 6V8.01562H11.7656V6C11.7656 5.15625 11.4766 4.44531 10.8984 3.86719C10.3203 3.28906 9.60938 3 8.76562 3Z"
                  fill="#D6776A"
                />
              </g>
              <defs>
                <clipPath id="clip0_2538_7886">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="matrix(1 0 0 -1 0.75 24)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default Page;
