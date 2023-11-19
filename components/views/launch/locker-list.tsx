"use client";
import Container from "@/components/common/container";
import { SearchInput } from "@/components/ui/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useLockerTools from "@/hooks/use-locker";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useJupiterApiContext } from "../trade/src/contexts";
import { usePool } from "@/hooks/use-pool-list";
import { TokenInfo } from "@solana/spl-token-registry";
import numeral from "numeral";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const checkRemainder = (nb: number) => {
  return nb % 2;
};

const RenderItem = ({
  lock,
  index,
  checkRemainder,
}: {
  lock: any;
  index: number;
  checkRemainder: (nbr: number) => number;
}) => {
  const { tokenList } = useJupiterApiContext();
  const { poolList } = usePool();
  const { getFirstLockByLp } = useLockerTools();
  const [selectedPool, setSelectedPool] = useState(null);
  const [baseToken, setBaseToken] = useState<TokenInfo | null>(null);
  const [quoteToken, setQuoteToken] = useState<TokenInfo | null>(null);
  const [firstLockTime, setFirstLockTime] = useState<number | null>(null);

  useEffect(() => {
    if (poolList.length !== 0 && lock) {
      const pool = poolList.find((elm) => elm.lpMint == lock.account.mint);
      const base = tokenList.find((elm) => elm.address == pool.baseMint);
      const quote = tokenList.find((elm) => elm.address == pool.quoteMint);

      setBaseToken(base);
      setQuoteToken(quote);
      setSelectedPool(pool);

      getFirstLockByLp(pool.lpMint).then((value) => {
        setFirstLockTime(value.account.unlockTime.toNumber());
      });
    }
  }, [poolList, selectedPool]);

  const displayName = () => {
    return baseToken && quoteToken
      ? `${baseToken.symbol}/${quoteToken.symbol}`
      : "N/A";
  };

  const calculateLiquidity = () => {
    if (lock && selectedPool) {
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
  return (
    <TableRow
      key={index.toString()}
      className={`${checkRemainder(index) == 1 ? "bg-[#0F0F0F]" : ""}`}
    >
      <TableCell className="font-medium">
        <div className="flex flex-row items-center  gap-2 lg:gap-5">
          <img
            src={"/images/launch/raydium.png"}
            className="w-[20px] h-[20px]  cursor-pointer mr-10"
          />
          <div className="flex flex-2 justify-center items-center relative">
            <img
              src={`${baseToken ? baseToken.logoURI : ""}`}
              className="w-[25px] h-[25px]   rounded-full absolute left-[-15px]  "
            />
            <img
              src={`${quoteToken ? quoteToken.logoURI : ""}`}
              className="w-[30px] h-[30px]   rounded-full "
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[#FFF]">{displayName()}</span>
            <span className="text-muted-foreground">
              Liquidity: $
              {selectedPool
                ? numeral(selectedPool.liquidity).format("0,0.000")
                : 0}{" "}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="text-[#FFFF] flex items-center justify-start gap-1">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
            >
              <path
                d="M8 4H7.42857V2.85714C7.42857 1.28 6.14857 0 4.57143 0C2.99429 0 1.71429 1.28 1.71429 2.85714V4H1.14286C0.514286 4 0 4.51429 0 5.14286V10.8571C0 11.4857 0.514286 12 1.14286 12H8C8.62857 12 9.14286 11.4857 9.14286 10.8571V5.14286C9.14286 4.51429 8.62857 4 8 4ZM2.85714 2.85714C2.85714 1.90857 3.62286 1.14286 4.57143 1.14286C5.52 1.14286 6.28571 1.90857 6.28571 2.85714V4H2.85714V2.85714ZM8 10.8571H1.14286V5.14286H8V10.8571ZM4.57143 9.14286C5.2 9.14286 5.71429 8.62857 5.71429 8C5.71429 7.37143 5.2 6.85714 4.57143 6.85714C3.94286 6.85714 3.42857 7.37143 3.42857 8C3.42857 8.62857 3.94286 9.14286 4.57143 9.14286Z"
                fill="#D6776A"
              />
            </svg>
            {calculateLiquidity()}%
          </span>
          <span className="text-muted-foreground">
            Next {firstLockTime ? dayjs().to(dayjs(firstLockTime)) : "Infinity"}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="text-[#FFFF] flex items-center justify-start gap-1">
            {" "}
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.63965 0C3.77565 0 0.639648 3.136 0.639648 7C0.639648 10.864 3.77565 14 7.63965 14C11.5036 14 14.6396 10.864 14.6396 7C14.6396 3.136 11.5036 0 7.63965 0ZM13.1906 6.3H8.33965V1.449C10.8666 1.764 12.8756 3.773 13.1906 6.3ZM2.03965 7C2.03965 4.151 4.18165 1.792 6.93965 1.449V12.551C4.18165 12.208 2.03965 9.849 2.03965 7ZM8.33965 12.551V7.7H13.1906C12.8756 10.227 10.8666 12.236 8.33965 12.551Z"
                fill="#D6776A"
              />
            </svg>
            89.3%
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Link href={"/launch/lock/view"} className="text-primary">
          Manage (1)
        </Link>
      </TableCell>
    </TableRow>
  );
};
const LockerList = () => {
  const [lockerList, setLockerList] = useState<any[]>([]);
  const { getAllVaults } = useLockerTools();

  const initVaultList = async () => {
    const vaults = await getAllVaults();
    setLockerList(vaults);
  };
  useEffect(() => {
    initVaultList();
  }, []);
  return (
    <Container className="bg-foreground rounded-md lg:max-w-5xl">
      <div className="w-full flex justify-between items-center text-black  gap-2 py-3">
        <Select defaultValue="tpp">
          <SelectTrigger className="lg:w-[170px] h-[30px] max-sm:w-full max-sm:mx-1 font-semibold ">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tpp">Liquidity Lockers </SelectItem>
            {/* <SelectItem value="vatr">Token Activity Tracking</SelectItem>
            <SelectItem value="vw">View Watchlist</SelectItem> */}
          </SelectContent>
        </Select>
        <div className="w-[400px]">
          <SearchInput placeholder="Search For Locked Liquidity By Token" />
        </div>

        <Link
          className="h-[30px] bg-primary px-3 rounded-lg text-md font-semibold text-center"
          href={"/launch/lock/create"}
        >
          Manage Lockers
        </Link>
      </div>
      <Table className="max-sm:w-96 max-sm:overflow-x-auto">
        <TableHeader>
          <TableRow className="bg-[#0F0F0F] border-none">
            <TableHead className="uppercase">Collection</TableHead>
            <TableHead className="uppercase">Locked liquidity</TableHead>
            <TableHead className="uppercase">LOCK RATIO</TableHead>
            <TableHead className="text-right uppercase">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {lockerList.map((lock, ind) => (
            <RenderItem
              lock={lock}
              index={ind}
              checkRemainder={checkRemainder}
            />
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-1 justify-end w-full mt-3">
        <ul className="inline-flex -space-x-px text-sm bg-foreground">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-foreground border border-e-0 rounded-s-lg hover:bg-primary hover:text-black "
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-muted-foreground bg-foreground border hover:bg-primary hover:text-black"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-muted-foreground bg-foreground border hover:bg-primary hover:text-black"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 text-black border  bg-primary hover:bg-primary hover:text-black"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-muted-foreground bg-foreground border hover:bg-primary hover:text-black"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-muted-foreground bg-foreground border hover:bg-primary hover:text-black"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight  bg-foreground border rounded-e-lg text-primary hover:bg-primary hover:text-black"
            >
              Next
            </a>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default LockerList;
{
  /* <Table className="max-sm:w-96 max-sm:overflow-x-auto">
          <TableHeader>
            <TableRow className="w-full">
              <TableHead className="uppercase"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton key={i} className="w-full min-h-[50px] my-3" />
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table> */
}
