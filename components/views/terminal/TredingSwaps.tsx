"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTrendingToday } from "@/hooks/use-get-trending-today";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Container from "../../common/container";
import { JupiterApiProvider } from "../trade/src/contexts";
import TrendingItem from "./trending-item";
import { useJupStat } from "@/context/jup.stats";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TopItem from "./top-item";

interface TrendingSwapsProps {
  className?: string;
}
// USDC, USDT, USDCet, mSOL, bSOL, JitoSOL, stSOL, UXD, ETH, USDTet

const TrendingSwaps: FC<TrendingSwapsProps> = ({ className }) => {
  const [selectedValue, setSelectedValue] = useState("trending");
  const { volumeByPairs, topBuys, topSells } = useJupStat();
  useEffect(() => {
   
  }, [TrendingSwaps]);
  return (
    <JupiterApiProvider>
      <Container
        className={cn(
          "flex flex-col max-h-[560px] bg-foreground gap-5 overflow-y-auto",
          className
        )}
      >
        <div className=" text-black">
          <Select
            defaultValue="trending"
            value={selectedValue}
            onValueChange={(value) => {
              setSelectedValue(value);
            }}
          >
            <SelectTrigger className="w-[150px] h-[27px] guac-btn rounded-lg inline-flex items-center border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending Swaps </SelectItem>
              <SelectItem value="top-b">Top Buys</SelectItem>
              <SelectItem value="top-s">Top Sells</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {selectedValue == "trending" ? (
          <div className="flex flex-col gap-[10px] w-full max-h-[530px] overflow-auto no-scrollbar">
            {volumeByPairs.length == 0 ? (
              Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="w-full min-h-[92px]" />
              ))
            ) : (
              <>
                {volumeByPairs.map((elm, ind) => (
                  <TrendingItem
                    sellTokenSymbol={elm.name.split("/")[0]}
                    buyTokenSymbol={elm.name.split("/")[1]}
                    key={ind.toString()}
                    volume={elm.value}
                  />
                ))}
              </>
            )}
          </div>
        ) : selectedValue == "top-b" ? (
          <div className="flex flex-col gap-[10px] w-full max-h-[530px] overflow-auto no-scrollbar">
            {topBuys.length == 0 ? (
              Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="w-full min-h-[92px]" />
              ))
            ) : (
              <>
                {topBuys.map((elm, ind) => (
                  <TopItem
                    symbol={elm.symbol}
                    key={ind.toString()}
                    amount={elm.amount}
                    mint={elm.mint}
                    side="buy"
                  />
                ))}
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-[10px] w-full max-h-[530px] overflow-auto no-scrollbar">
            {topSells.length == 0 ? (
              Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="w-full min-h-[92px]" />
              ))
            ) : (
              <>
                {topSells.map((elm, ind) => (
                  <TopItem
                    symbol={elm.symbol}
                    key={ind.toString()}
                    amount={elm.amount}
                    mint={elm.mint}
                    side="sell"
                  />
                ))}
              </>
            )}
          </div>
        )}
      </Container>
    </JupiterApiProvider>
  );
};

export default TrendingSwaps;
