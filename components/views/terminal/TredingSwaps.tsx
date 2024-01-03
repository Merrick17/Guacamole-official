"use client";
import { Skeleton } from "@/components/ui/skeleton";
// import { useJupStat } from "@/context/jup.stats";
import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import Container from "../../common/container";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import routes from "@/config/routes";
import { useGetTrendingToday } from "@/hooks/use-get-trending-today";
import { convert } from "@/lib/numbers";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { useJupiterApiContext } from "../trade/src/contexts";
interface TrendingSwapsProps {
  className?: string;
}
// USDC, USDT, USDCet, mSOL, bSOL, JitoSOL, stSOL, UXD, ETH, USDTet

const TrendingSwaps: FC<TrendingSwapsProps> = React.memo(({ className }) => {
  const [selectedValue, setSelectedValue] = useState("trending");
  //const { data, isLoading } = useJupStat();
  const { trending, loading } = useGetTrendingToday({
    maxNumberOfTokens: 9,
  });

  return (
    <>
      <Container
        className={cn(
          "flex flex-col max-h-[560px] bg-foreground gap-5 overflow-y-auto",
          className
        )}
      >
        <div className=" text-black">
          <Badge className="w-[150px] h-[27px] rounded-lg inline-flex items-center border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 ">
            Trending Swaps
          </Badge>
          {/* <Select
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
          </Select> */}
        </div>
        {/* {selectedValue == "trending" ? (
          <div className="flex flex-col gap-[10px] w-full max-h-[530px] overflow-auto no-scrollbar">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="w-full min-h-[92px]" />
              ))
            ) : (
              <>
                {data.volumeByPairs.map((elm, ind) => (
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
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="w-full min-h-[92px]" />
              ))
            ) : (
              <>
                {data.topBuys.map((elm, ind) => (
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
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="w-full min-h-[92px]" />
              ))
            ) : (
              <>
                {data.topSells.map((elm, ind) => (
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
        )} */}
        <div className=" flex flex-col  gap-5 overflow-y-auto no-scrollbar">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="w-full min-h-[92px]" />
            ))
          ) : (
            <>
              {trending.map((x) => (
                <TrendingItem key={x.symbol} {...x} />
              ))}
            </>
          )}
        </div>
      </Container>
    </>
  );
});

export default TrendingSwaps;

type TrendingItemProps = {
  className?: string;
  symbol: string;
  amount: number;
  mint: string;
};
const TrendingItem: FC<TrendingItemProps> = ({
  className,
  amount,
  symbol,
  mint,
}) => {
  const { tokenMap } = useJupiterApiContext();
  const token = tokenMap.get(mint);
  const [marketPrice, setMarketPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMarketCapV2 = async () => {
      if (token) {
        const { data } = await axios.get(
          `https://price.jup.ag/v4/price?ids=${token.address}`
        );

        setMarketPrice(data["data"][token.address]["price"]);
      }
    };
    const getMarketCap = async () => {
      console.log("TOKEN", token);
      if (token && token.extensions) {
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/coins/" +
            token.extensions.coingeckoId
        );

        setMarketPrice(data.market_data.current_price.usd);
      }
    };
    // getMarketCap();
    getMarketCapV2();
  }, [token]);

  return (
    <div className="p-5 flex flex-row justify-between items-center rounded-lg bg-background  hover:border-[var(--accent)]  hover:border">
      <div className="flex flex-row items-center  gap-2 lg:gap-5">
        <img
          src={
            token && token.logoURI
              ? token.logoURI
              : "/images/No_Logo_Found_Guacamole-min.png"
          }
          className="w-5 h-5 lg:w-10 lg:h-10 rounded-full hidden"
          alt="logo"
          onLoad={(e) => {
            setLoading(false);
            e.currentTarget.classList.remove("hidden");
          }}
        />
        {loading && (
          <Loader2 className="w-5 h-5 lg:w-10 lg:h-10 rounded-full animate-spin" />
        )}

        <div className="flex flex-col gap-1 ">
          <div className="flex items-center gap-1 lg:gap-2">
            <p className="uppercase text-xs lg:text-sm">{symbol}</p>
            <div className="text-xs flex items-center bg-foreground text-primary  rounded-sm px-2 py-1 ">
              <Link
                href={`https://explorer.solana.com/address/${mint}`}
                rel="noopener noreferrer"
                target="_blank"
                className="text-xs flex items-center text-primary  rounded-[4px] px-2 py-[2px] "
              >
                <span className=" max-w-[22px]  lg:max-w-[44px] text-ellipsis overflow-hidden">
                  {mint}
                </span>
                <BiLinkExternal />
              </Link>
            </div>
          </div>
          <p className=" text-xs lg:text-base max-w-[80px]  lg:max-w-full text-muted-foreground text-ellipsis overflow-hidden">
            {"$" + convert(marketPrice)}
          </p>
        </div>
      </div>
      <Link href={routes.trade.swap + `?outputMint=${mint}`}>
        <Button className="h-4 px-3 lg:h-6 lg:px-4 lg:py-2">Trade</Button>
      </Link>
    </div>
  );
};
