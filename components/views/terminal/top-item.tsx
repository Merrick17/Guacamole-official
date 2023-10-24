"use client";
import { Button } from "@/components/ui/button";
import routes from "@/config/routes";
import { convert } from "@/lib/numbers";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useJupiterApiContext } from "../trade/src/contexts";
import numeral from "numeral";
type TopItemProps = {
  className?: string;
  symbol?: string;
  amount?: number;
  mint?: string;
  side?: string;
};
const TopItem: FC<TopItemProps> = ({
  className,
  amount,
  symbol,
  mint,
  side,
}) => {
  const { tokenMap } = useJupiterApiContext();
  const token = tokenMap.get(mint);

  const [marketPrice, setMarketPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const inputMint =
    side == "buy" ? "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" : mint;
  const outputMint =
    side == "sell" ? "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" : mint;
  useEffect(() => {
    console.log("Side", side == "buy", side == "sell");
  }, [side]);
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
    <div className="p-6 rounded-lg backdrop:blur-sm lg:shadow-lg lg:drop-shadow-[0_2px_12px_12px_rgba(0,0,0,0.75)] px-3 py-[10px] bg-background flex items-center justify-between gap-4 w-full">
      <div className="flex flex-row items-center  gap-2 lg:gap-5">
        <img
          src={token?.logoURI}
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
          <div className="flex items-center gap-1 lg:gap-2">
            <p className="uppercase text-xs text-[12px] font-medium">
              {symbol}
            </p>
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
          <p className=" text-xs lg:text-base max-w-[80px] text-[12px] font-normal lg:max-w-full text-muted-foreground text-ellipsis overflow-hidden">
            ${numeral(amount).format("0,0.000")}
          </p>
        </div>
      </div>
      <Link
        href={"/terminal" + `?outputMint=${outputMint}&inputMint=${inputMint}`}
      >
        <Button className="h-8 px-3 lg:h-10 lg:px-4 lg:py-2">Trade</Button>
      </Link>
    </div>
  );
};

export default TopItem;
