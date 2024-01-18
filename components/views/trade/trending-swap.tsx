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
        "px-5 py-[10px] bg-foreground flex flex-row items-center overflow-hidden w-full  gap-6 rounded-lg border border-[rgba(168, 168, 168, 0.10)] shadow-lg",
        className
      )}
    >
      <Button className="whitespace-nowrap h-8 px-3 trade-bg lg:h-10 lg:px-4 lg:py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
        >
          <path
            d="M15.2976 10.5868C13.7662 6.60725 8.31387 6.39267 9.63063 0.608681C9.72817 0.179515 9.26974 -0.152113 8.8991 0.0722235C5.35848 2.15953 2.81274 6.3439 4.94882 11.8255C5.12439 12.2742 4.59768 12.6936 4.21729 12.401C2.45185 11.0647 2.26653 9.14324 2.42259 7.76795C2.48111 7.26076 1.81786 7.01691 1.535 7.43632C0.871741 8.45072 0.19873 10.0894 0.19873 12.5571C0.569374 18.0192 5.18291 19.6968 6.84105 19.9114C9.21122 20.2138 11.7765 19.7749 13.6199 18.0875C15.6487 16.205 16.39 13.2008 15.2976 10.5868ZM6.24607 15.4929C7.65062 15.1516 8.3724 14.1372 8.56747 13.2398C8.88935 11.845 7.63111 10.4795 8.47969 8.27515C8.80156 10.0991 11.6692 11.2403 11.6692 13.2301C11.7472 15.6978 9.07467 17.8143 6.24607 15.4929Z"
            fill="black"
          />
        </svg>
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
