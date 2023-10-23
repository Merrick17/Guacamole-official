"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTrendingToday } from "@/hooks/use-get-trending-today";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, useEffect } from "react";
import Container from "../../common/container";
import { JupiterApiProvider } from "../trade/src/contexts";
import TrendingItem from "./trending-item";
import { useJupStat } from "@/context/jup.stats";

interface TrendingSwapsProps {
  className?: string;
}
// USDC, USDT, USDCet, mSOL, bSOL, JitoSOL, stSOL, UXD, ETH, USDTet

const TrendingSwaps: FC<TrendingSwapsProps> = ({ className }) => {
  const { trending, loading } = useGetTrendingToday({
    maxNumberOfTokens: 9,
  });
  const { volumeByPairs, topBuys, topSells } = useJupStat();
  useEffect(() => {}, [TrendingSwaps]);
  return (
    <JupiterApiProvider>
      <Container
        className={cn(
          "flex flex-col max-h-[560px] bg-foreground gap-5 overflow-y-auto",
          className
        )}
      >
        <div className="flex flex-row gap-2 items-center">
          <div className="shrink-0 w-5 aspect-square">
            <Image
              src="/images/home/trending.png"
              width={20}
              height={20}
              alt="trending"
            />
          </div>
          <h1 className="text-lg lg:text-xl capitalize">Trending Swaps</h1>
        </div>
        <div className=" flex flex-col  gap-5 overflow-y-auto no-scrollbar">
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
      </Container>
    </JupiterApiProvider>
  );
};

export default TrendingSwaps;
