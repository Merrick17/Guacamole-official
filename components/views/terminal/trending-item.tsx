"use client";
import { Button } from "@/components/ui/button";
import routes from "@/config/routes";
import { convert } from "@/lib/numbers";
import Link from "next/link";
import { FC, useState } from "react";
import { useJupiterApiContext } from "../trade/src/contexts";
import NftDialog from "./dialogs/NftDialog";

type TrendingItemProps = {
  className?: string;
  symbol?: string;
  amount?: number;
  mint?: string;
  sellTokenSymbol: string;
  buyTokenSymbol: string;
  volume?: number;
};
const TrendingItem: FC<TrendingItemProps> = ({
  className,
  amount,
  symbol,
  mint,
  sellTokenSymbol,
  buyTokenSymbol,
  volume,
}) => {
  const { tokenMap } = useJupiterApiContext();
  const sellToken = tokenMap.get(sellTokenSymbol);
  const buyToken = tokenMap.get(buyTokenSymbol);
  const [marketPrice, setMarketPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getMarketCapV2 = async () => {
  //     if (token) {
  //       const { data } = await axios.get(
  //         `https://price.jup.ag/v4/price?ids=${token.address}`
  //       );
  //       console.log("Market Data", data["data"][token.address]["price"]);
  //       setMarketPrice(data["data"][token.address]["price"]);
  //     }
  //   };
  //   const getMarketCap = async () => {
  //     console.log("TOKEN", token);
  //     if (token && token.extensions) {
  //       const { data } = await axios.get(
  //         "https://api.coingecko.com/api/v3/coins/" +
  //           token.extensions.coingeckoId
  //       );

  //       setMarketPrice(data.market_data.current_price.usd);
  //     }
  //   };

  //   getMarketCapV2();
  // }, [token]);

  return (
    <>
      <div className="p-6 hover:border-2 rounded-lg backdrop:blur-sm lg:shadow-lg hover:border-primary lg:drop-shadow-[0_2px_12px_12px_rgba(0,0,0,0.75)] px-3 py-[10px] bg-background flex items-center justify-between gap-4 w-full cursor-pointer">
        <div className="flex flex-row items-center  gap-1 lg:gap-3">
          <img
            src={sellToken?.logoURI}
            className="w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] rounded-full "
            alt="logo"
            onLoad={(e) => {
              setLoading(false);
              e.currentTarget.classList.remove("hidden");
            }}
          />
          <img
            src={buyToken?.logoURI}
            className="w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] rounded-full "
            alt="logo"
            onLoad={(e) => {
              setLoading(false);
              e.currentTarget.classList.remove("hidden");
            }}
          />
          {/* {loading && (
          <Loader2 className="w-5 h-5 lg:w-10 lg:h-10 rounded-full animate-spin" />
        )} */}

          <div className="flex flex-col gap-1 ">
            <div className="flex items-center text-xs gap-1 lg:gap-2">
              <h1 className="font-medium">
                {sellToken?.symbol}/ {buyToken?.symbol}
              </h1>
              {/* <div className="text-xs flex items-center bg-foreground text-primary  rounded-sm px-2 py-1 ">
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
            </div> */}
            </div>
            <p className="text-muted-foreground text-ellipsis overflow-hidden">
              {"$" + convert(Number(Number(volume).toFixed(3)))}
            </p>
          </div>
        </div>
        <Link
          href={
            routes.trade.swap +
            `?outputMint=${buyTokenSymbol}&inputMint=${sellTokenSymbol}`
          }
        >
          <Button className="h-6 px-3 lg:h-6 lg:px-4 lg:py-2">Trade</Button>
        </Link>
      </div>
    </>
  );
};

export default TrendingItem;
