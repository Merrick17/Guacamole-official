"use client";
import Container from "@/components/common/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { AccentColors } from "@/config/themes";
import { useSelectedToken } from "@/context/coin-details";
import { useJupStat } from "@/context/jup.stats";
import { cn } from "@/lib/utils";
import Link from "next/link";
import numeral from "numeral";
import { FunctionComponent, useEffect, useState } from "react";
interface YieldInfoProps extends React.HTMLAttributes<HTMLDivElement> {}

const YieldInfo: FunctionComponent<YieldInfoProps> = ({
  className,
  ...rest
}) => {
  const { poolDetails, selectedToken } = useSelectedToken();

  return (
    <Container
      className={cn(
        "p-5 flex flex-col bg-foreground gap-5 max-h-[580px]",
        className
      )}
    >
      <div className="w-full flex items-center justify-between text-black">
        <div className=" text-black">
          <Badge>Liquidity Pools</Badge>
        </div>
        <Badge
          className="rounded-lg"
          style={{
            backgroundColor: AccentColors.red,
          }}
        >
          <Link href={"/earn/explore"}>Start Earning</Link>
        </Badge>
      </div>
      <div className="flex flex-col gap-[10px] w-full max-h-[530px] overflow-auto no-scrollbar">
        {poolDetails.length != 0
          ? poolDetails.map((pool) => (
              <PoolItem
                info={pool}
                name={pool.attributes.name}
                dex={pool.relationships.dex.data.id}
                volume={pool.attributes.volume_usd.h24}
                tvl={pool.attributes.reserve_in_usd}
              />
            ))
          : Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="w-full min-h-[92px]" />
            ))}
      </div>
    </Container>
  );
};

type PoolItemProps = {
  name: string;
  dex: string;

  volume: any;
  tvl?: any;
  info: any;
};

const PoolItem: FunctionComponent<PoolItemProps> = ({
  name,
  dex,
  tvl,
  volume,
  info,
}) => {
  const [open, setOpen] = useState(false);
  const { selectedToken } = useSelectedToken();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full cursor-pointer ">
          <Container className="hover:border-2 cursor-pointer px-3 py-[10px] bg-background hover:border-primary flex items-center justify-between gap-4 w-full">
            <div className="text-xs  flex items-start gap-[10px]">
              <div className="text-xs  flex items-start flex-col gap-2">
                <h1 className="font-medium">{name}</h1>
                <p className="text-muted-foreground ">
                  {" "}
                  {dex.charAt(0).toUpperCase()}
                  {dex.slice(1)}
                </p>
              </div>
            </div>
            <div className="text-xs  flex flex-col items-end gap-2 h-full">
              <p className="font-medium text-right">
                ${numeral(tvl).format("0,0")} TVL
              </p>
              <div className=" py-[2px] rounded-full text-right mt-auto text-[#a8a8a8]">
                ${numeral(volume).format("0,0")} 24H VOL
              </div>
            </div>
          </Container>
        </DialogTrigger>

        <DialogContent closeBtn={true}>
          <DialogHeader>
            {/* <DialogTitle>
              <div className="relative">
                <h2 className="text-base   text-center ">Tokens</h2>
                <DialogTrigger asChild>
                  <AiOutlineArrowLeft className=" absolute w-4 h-4 top-1/2 -left-2 -translate-y-1/2 cursor-pointer" />
                </DialogTrigger>
              </div>
            </DialogTitle> */}
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center pb-3 border-b-2 border-[#FFFFF]">
            <div className="text-xs  flex items-center gap-[10px]">
              <div className="text-xs  flex flex-col ">
                <h1 className="font-medium">{name}</h1>
                <p className="text-muted-foreground ">
                  {dex.charAt(0).toUpperCase()}
                  {dex.slice(1)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 p-0">
            <div className="flex justify-between items-center w-full my-2">
              <p className="text-muted-foreground text-xs ">Pool TVL: </p>
              <p className="text-muted-foreground text-xs ">
                {" "}
                $ {numeral(tvl).format("0,0.000")}
              </p>
            </div>
            <div className="flex justify-between items-center w-full my-2">
              <p className="text-muted-foreground text-xs ">Volume (24hr): </p>
              <p className="text-muted-foreground text-xs ">
                ${numeral(volume).format("0,0.000")}
              </p>
            </div>
            <div className="flex justify-between items-center w-full my-2">
              <p className="text-muted-foreground text-xs ">
                Buy Transactions (24hr):{" "}
              </p>
              <p className="text-muted-foreground text-xs ">
                {" "}
                {info ? info.attributes.transactions["h24"].buys : 0}
              </p>
            </div>
            <div className="flex justify-between items-center w-full my-2">
              <p className="text-muted-foreground text-xs ">
                Sell Transactions (24hr):{" "}
              </p>
              <p className="text-muted-foreground text-xs ">
                {" "}
                {info ? info.attributes.transactions["h24"].sells : 0}
              </p>
            </div>
          </div>
          <DialogFooter className="border-t-2 py-3 justify-center items-center flex w-full border-[#FFFFF]">
            <Button
              className="w-full"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open(
                    `https://solscan.io/account/${info.id.split("_")[1]}`,
                    "blank"
                  );
                }
              }}
            >
              View Pool in Explorer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default YieldInfo;
