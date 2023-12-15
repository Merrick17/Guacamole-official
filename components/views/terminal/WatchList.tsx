import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";
import numeral from "numeral";
import { useMemo } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { useJupiterApiContext } from "../trade/src/contexts";

import useLocalStorageState from "use-local-storage-state";
const WatchList = () => {
  const { tokenMap } = useJupiterApiContext();
  const [watchList, setWatchList, { isPersistent }] = useLocalStorageState(
    "watchList",
    {
      defaultValue: [],
      storageSync: true,
    }
  );

  useMemo(() => {
    console.log("Watch List", watchList);
  }, [watchList]);

  const checkRemainder = (nb: number) => {
    return nb % 2;
  };
  const addToWatchList = (token: any) => {
    setWatchList([...watchList, token]);
  };
  const removeFromWatch = (token: any) => {
    const filtred = watchList.filter((elm) => elm.symbol !== token.symbol);
    setWatchList(filtred);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="uppercase">Token Information</TableHead>
          <TableHead className="uppercase">Buy Volume (24h)</TableHead>
          <TableHead className="uppercase">Sell Volume (24h)</TableHead>
          <TableHead className="text-right uppercase">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {watchList.map((token, ind: number) => (
          <TableRow
            key={ind.toString()}
            className={`${checkRemainder(ind) == 1 ? "bg-[#0F0F0F]" : ""}`}
          >
            <TableCell className="font-medium">
              <div className="flex flex-row items-center  gap-2 lg:gap-5">
                {watchList.find((tkn) => tkn.symbol == token.symbol) ? (
                  <img
                    src={"/icons/star_filled.svg"}
                    className="w-[20px] h-[20px]  cursor-pointer "
                    onClick={() => {
                      removeFromWatch(token);
                    }}
                  />
                ) : (
                  <img
                    src={"/icons/star.svg"}
                    className="w-[20px] h-[20px]  cursor-pointer "
                    onClick={() => {
                      addToWatchList(token);
                    }}
                  />
                )}
                <img
                  src={tokenMap.get(token.mint)?.logoURI}
                  className="w-5 h-5 lg:w-10 lg:h-10 rounded-full "
                />

                <div className="flex flex-col gap-1 ">
                  <div className="flex items-start gap-1 lg:gap-2">
                    <div className="flex flex-col items-start w-full">
                      <p className="uppercase text-xs lg:text-sm">
                        {token.symbol}
                      </p>
                      <p className="uppercase text-[14px] text-muted-foreground lg:text-sm">
                        ${token.usdPrice.toFixed(3)}
                      </p>
                    </div>
                    <div className="text-xs flex items-center bg-foreground text-primary  rounded-sm px-2 py-1 ">
                      <Link
                        href={`https://explorer.solana.com/address/${token.mint}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-xs flex items-center text-primary  rounded-[4px] px-2 py-[2px] "
                      >
                        <span className=" max-w-[22px]  lg:max-w-[44px] text-ellipsis overflow-hidden">
                          {token.mint}
                        </span>
                        <BiLinkExternal />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              {" "}
              <p
                className={cn(
                  ` text-xs lg:text-base max-w-[80px]  lg:max-w-full text-muted-foreground text-ellipsis overflow-hidden`,
                  token.buyVolume > token.sellVolume
                    ? "text-[#8BD796]"
                    : "text-[#A8A8A8]"
                )}
              >
                {"$" + numeral(token.buyVolume).format("0,0.000")}
              </p>
            </TableCell>
            <TableCell>
              {" "}
              <p
                className={cn(
                  ` text-xs lg:text-base max-w-[80px]  lg:max-w-full text-muted-foreground text-ellipsis overflow-hidden`,
                  token.sellVolume > token.buyVolume
                    ? "text-[#FF8F8F]"
                    : "text-[#A8A8A8]"
                )}
              >
                {"$" + numeral(token.sellVolume).format("0,0.000")}
              </p>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-center">
                <Link
                  href={`/terminal?outputMint=${token.mint}`}
                  className=" text-[#BBB0DB]"
                >
                  Trade
                </Link>
                <span>|</span>
                <Link
                  href={`/terminal/coin/${token.mint}?outputMint=${token.mint}`}
                  target="_blank"
                  className=" text-[#8bd796]"
                >
                  View
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WatchList;
