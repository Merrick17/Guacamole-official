"use client";
import { Button } from "@/components/ui/button";
import routes from "@/config/routes";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { useJupiterApiContext } from "../trade/src/contexts";
import axios from "axios";
import { convert } from "@/lib/numbers";
import { Loader2 } from "lucide-react";

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
        <Button className="h-8 px-3 lg:h-10 lg:px-4 lg:py-2">Trade</Button>
      </Link>
    </div>
  );
};

export default TrendingItem;
