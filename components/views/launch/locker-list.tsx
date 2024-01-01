"use client";
import FallbackImage from "@/components/common/FallbackImage";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
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

import { PoolExtended } from "@/hooks/use-pool-list";
import { cn } from "@/lib/utils";
import { TokenInfo } from "@solana/spl-token-registry";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import numeral from "numeral";
import { useCallback, useEffect, useState } from "react";
import { useJupiterApiContext } from "../trade/src/contexts";
import { useLockerTools } from "@/context/locker.context";
dayjs.extend(relativeTime);
const checkRemainder = (nb: number) => {
  return nb % 2;
};
const Pagination = ({
  activePage,
  changePage,
  totalItems,
}: {
  activePage: number;
  totalItems: number;
  changePage: (nbr: number) => void;
}) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return totalPages > 1 ? (
    <ul className="inline-flex -space-x-px text-sm bg-foreground">
      <li>
        <button
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-foreground border border-e-0 rounded-s-lg hover:bg-primary hover:text-black "
          onClick={() => {
            changePage(activePage - 1);
          }}
          disabled={activePage === 1}
        >
          Previous
        </button>
      </li>
      {Array.from({ length: totalPages }).map((_, ind) => (
        <li key={ind}>
          <button
            onClick={() => {
              changePage(ind + 1);
            }}
            className={`flex items-center justify-center px-3 h-8 text-black border  ${
              activePage === ind + 1 ? "bg-primary" : "bg-foreground "
            } hover:bg-primary hover:text-black ${
              activePage === ind + 1 ? "text-black" : "text-primary"
            } `}
          >
            {ind + 1}
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => {
            changePage(activePage + 1);
          }}
          className="flex items-center justify-center px-3 h-8 leading-tight  bg-foreground border rounded-e-lg text-primary hover:bg-primary hover:text-black"
          disabled={activePage === totalPages}
        >
          Next
        </button>
      </li>
    </ul>
  ) : (
    <></>
  );
};

const RenderItem = ({
  lock,
  index,
  checkRemainder,
  pool,
  quote,
  base,
  liquidity,
  ratio,
}: {
  lock: any;
  index: number;
  pool: PoolExtended;
  quote: TokenInfo;
  base: TokenInfo;
  liquidity: any;
  ratio: any;
  checkRemainder: (nbr: number) => number;
}) => {
  const [firstLockTime, setFirstLockTime] = useState<any | null>(null);

  useEffect(() => {
    setFirstLockTime(lock.unlockTime);
  });
  const displayName = () => {
    const tokenName = base && quote ? `${base.symbol}/${quote.symbol}` : "N/A";

    return tokenName;
  };
  return (
    <TableRow
      key={index.toString()}
      className={cn(
        "text-xs md:text-sm lg:text-base ",
        checkRemainder(index) == 1 && "bg-[#0F0F0F]"
      )}
    >
      <TableCell className="font-medium w-full md:w-max overflow-x-auto ">
        <div className="w-full flex flex-row items-center  gap-2 lg:gap-5">
          {pool ? (
            <img
              src={
                pool.provider == "RAYDIUM"
                  ? "/images/launch/raydium.png"
                  : "/images/launch/logo-meteora-symbol.svg"
              }
              className="w-[20px] h-[20px]  cursor-pointer mr-10 shrink-0"
            />
          ) : (
            <Loader2 className="animate-spin h-10 w-10 text-primary   " />
          )}
          <div className="flex flex-2 justify-center items-center relative shrink-0">
            {!base ? (
              <Loader2 className="animate-spin h-10 w-10 text-primary   " />
            ) : (
              <FallbackImage
                height={25}
                width={25}
                alt=""
                src={`${base ? base.logoURI : null}`}
                className="w-[25px] h-[25px]   rounded-full absolute left-[-15px]  shrink-0 "
              />
            )}

            {quote ? (
              <FallbackImage
                height={25}
                width={25}
                alt=""
                src={`${quote ? quote.logoURI : null}`}
                className="w-[30px] h-[30px]   rounded-full shrink-0 "
              />
            ) : (
              <Loader2 className="animate-spin h-10 w-10 text-primary   " />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[#FFF]">{displayName()}</span>
            <span className="text-muted-foreground">
              Liquidity: $
              {pool.liquidity ? numeral(pool.liquidity).format("0,0.000") : 0}{" "}
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
            ${numeral(liquidity).format("0,0.00")}%
          </span>
          <span className="text-muted-foreground">
            Next{" "}
            {firstLockTime && firstLockTime !== "N/A"
              ? dayjs(Date.now()).to(new Date(firstLockTime).toISOString())
              : "in Infinity"}
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
            {numeral(ratio).format("0,0.00")}%
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Link
          href={`/launch/lock/view/${pool ? pool.poolId : ""}`}
          className="text-primary"
        >
          View Vault
        </Link>
      </TableCell>
    </TableRow>
  );
};
const LockerList = () => {
  const { push } = useRouter();
  const [lockerList, setLockerList] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const {
    //getTotalVaults,

    vaultsData,
    getPaginatedData,
  } = useLockerTools();
  const { tokenList } = useJupiterApiContext();
  const [activePage, setActivePage] = useState<number>(1);
  const [searchToken, setSearchToken] = useState("");

  const router = useRouter();
  const handleChangePage = (nbr: number) => {
    setActivePage(nbr);
  };

  const initVaultList = useCallback(async () => {
    // const vaults = await getAllVaultsParsedAndPaginated(activePage, 10);
    const vaults = getPaginatedData(activePage, 10);
    const total = vaultsData.length;
    setTotalItems(total);
    setLockerList(vaults);
  }, [activePage, vaultsData]);

  useEffect(() => {
    //newInit();
    initVaultList();
  }, [initVaultList]);
  const handleSearch = async (search: string) => {
    if (search !== "") {
      const token = tokenList.find(
        (elm) => elm.name.includes(search) || elm.symbol.includes(search)
      );

      if (token) {
        const filteredVaults = vaultsData.filter(
          (vault) =>
            vault.base.address == token.address ||
            vault.quote.address == token.address
        );
        setLockerList(filteredVaults);
      } else {
        setLockerList([]);
      }
    } else {
      const vaults = getPaginatedData(activePage, 10);
      setLockerList(vaults);
    }
  };

  return (
    <Container className="bg-foreground rounded-md lg:max-w-5xl">
      <div className="w-full flex flex-col mb-5  md:flex-row   md:justify-between items-center text-black  gap-2 py-3">
        <Select
          defaultValue="tpp"
          onValueChange={(value) => {
            if (value == "token") {
              router.push("/launch/create-spl-token");
            }
          }}
        >
          <SelectTrigger className="w-full lg:w-[250px] h-[30px] max-sm:w-full  font-medium ">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tpp">Liquidity Lockers </SelectItem>
            <SelectItem value="token">Create Token</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-col-reverse w-full md:flex-row md:justify-end md:items-center gap-2 ">
          <div className="">
            <SearchInput
              className="text-muted-foreground"
              placeholder="Search For Locked Liquidity By Token"
              value={searchToken}
              onChange={(e) => {
                setSearchToken(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>

          <Button onClick={() => push("/launch/lock/create")} size="sm">
            Manage Lockers
          </Button>
        </div>
      </div>
      <Table className="max-sm:w-96 max-sm:overflow-x-auto min-h-[200px] ">
        <TableHeader>
          <TableRow className="bg-[#0F0F0F] border-none">
            <TableHead className="uppercase">Collection</TableHead>
            <TableHead className="uppercase">Locked liquidity</TableHead>
            <TableHead className="uppercase">LOCK RATIO</TableHead>
            <TableHead className="text-right uppercase">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {lockerList.map(
            ({ lock, pool, quote, base, lockedLiquidity, ratio }, ind) => (
              <RenderItem
                lock={lock}
                pool={pool}
                quote={quote}
                base={base}
                checkRemainder={checkRemainder}
                index={ind}
                liquidity={lockedLiquidity}
                ratio={ratio}
              />
            )
          )}
        </TableBody>
      </Table>
      {lockerList.length != 0 && (
        <div className="flex flex-1 justify-end w-full mt-3">
          <Pagination
            totalItems={totalItems}
            activePage={activePage}
            changePage={handleChangePage}
          />
        </div>
      )}
    </Container>
  );
};

export default LockerList;
