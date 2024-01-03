"use client";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { useGetTrendingToday } from "@/hooks/use-get-trending-today";
import { FC } from "react";
import { useJupiterApiContext } from "./src/contexts";
import routes from "@/config/routes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CustomTicker from "@/components/common/custom-ticker";
import { usePathname } from "next/navigation";
import FallbackImage from "@/components/common/FallbackImage";
import React from "react";
interface TrendingSwapProps {
  className?: string;
}

const TrendingSwap: FC<TrendingSwapProps> = React.memo(({ className }) => {
  const { trending } = useGetTrendingToday({
    maxNumberOfTokens: 9,
  });
  return (
    <Container
      className={cn(
        "px-5 py-[10px] bg-foreground flex flex-row items-center overflow-hidden w-full  gap-6 rounded-lg",
        className
      )}
    >
      <Button className="whitespace-nowrap h-8 px-3 trade-bg lg:h-10 lg:px-4 lg:py-2">
        Trending Today
      </Button>
      <CustomTicker>
        {trending.map((x, idx) => (
          <TrendingSwapItem key={x.idx} {...x} idx={idx + 1} />
        ))}
      </CustomTicker>
    </Container>
  );
});

export default TrendingSwap;

type TrendingSwapItemProps = {
  className?: string;
  symbol: string;
  amount: number;
  mint: string;
  idx: number;
};
const TrendingSwapItem: FC<TrendingSwapItemProps> = ({
  amount,
  mint,
  symbol,
  className,
  idx,
}) => {
  const { tokenMap } = useJupiterApiContext();
  const token = tokenMap.get(mint);
  if (!token) return null;
  const pathname = usePathname();
  return (
    <Link
      href={
        pathname.includes("/terminal/coin")
          ? `/terminal/coin/${token.address}?outputMint=${mint}`
          : routes.trade.swap + `?outputMint=${mint}`
      }
      className=" text-xs lg:text-sm w-full   py-[6px] px-3 font-bold  flex flex-row items-center gap-1 rounded-lg"
    >
      <p className="uppercase">#{idx}</p>
      <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full shrink-0">
        <FallbackImage
          height={16}
          width={16}
          src={token.logoURI}
          className="w-4 h-4 lg:w-6 lg:h-6  rounded-full"
          alt="logo"
        />
      </div>
      <p className="uppercase">{token.symbol}</p>
    </Link>
  );
};
