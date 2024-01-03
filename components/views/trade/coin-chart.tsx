import Container from "@/components/common/container";
import React, { FC, useEffect, useState } from "react";

import { useJupiterApiContext } from "./src/contexts";
import { TokenInfo } from "@solana/spl-token-registry";
import axios from "axios";
import { convert } from "@/lib/numbers";
import { Loader } from "@/components/games/Roulette/trash.styles";
import FallbackImage from "@/components/common/FallbackImage";

const data = [
  {
    sell: 44,
    buy: 80,
  },
];

type CoinChartProps = {
  coinMint: string;
};
const CoinChart: FC<CoinChartProps> = ({ coinMint }) => {
  const [price, setPrice] = useState(0);
  const [buyPercent, setBuyPercent] = useState<string>("0");
  const [sellPercent, setSellPercent] = useState<string>("0");

  const getValueInUsd = async (token: TokenInfo, amount: number) => {
    if (!token) return;
    const { data } = await axios.get(
      "https://price.jup.ag/v4/price?ids=" + token.symbol
    );
    for (var prop in data.data) {
      const value = data.data[prop].price;
      setPrice(value * (Number(amount) || 0));
      break;
    }
  };
  const getSellAndBuy = async (token: TokenInfo) => {
    const data = await fetch("https://stats.jup.ag/info/day");
    const json = await data.json();
    const buy = Number(
      json.lastXTopBuy.filter((x: any) => x.symbol === token.symbol)[0].amount
    );
    const sell = Number(
      json.lastXTopSell.filter((x: any) => x.symbol === token.symbol)[0].amount
    );

    const buyPercent = ((buy / (buy + sell)) * 100).toFixed(3);
    const sellPercent = ((sell / (buy + sell)) * 100).toFixed(3);
    setBuyPercent(buyPercent);
    setSellPercent(sellPercent);
  };

  const { tokenMap } = useJupiterApiContext();
  const coin = tokenMap.get(coinMint);
  useEffect(() => {
    getValueInUsd(coin, 1);
    getSellAndBuy(coin);
  }, [coin]);
  return (
    <Container className="bg-foreground  flex flex-col gap-10">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-foreground p-2 rounded-lg">
            <FallbackImage
              src={coin.logoURI}
              className="w-6 h-6"
              alt="logo"
              width={24}
              height={24}
            />
          </div>
          <h1 className="text-lg font-semibold">{coin.symbol}</h1>
        </div>
        <p className="font-semibold text-base lg:text-2xl">${convert(price)}</p>
      </div>
      <div className="bg-background rounded-lg border border-[#fcfcfc1a] py-5 flex flex-col gap-5 w-full text-black font-medium text-xs capitalize">
        {buyPercent == "0" || sellPercent == "" ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {" "}
            <div
              className="mx-3 w-full rounded-lg bg-[#8BD796] h-10  flex items-center justify-start p-3 "
              style={{
                width: buyPercent + "%",
              }}
            >
              <h1>BUYS: {buyPercent}%</h1>
            </div>
            <div
              className="mx-3 w-full rounded-lg bg-[#FF8F8F] h-10  flex items-center justify-start p-3"
              style={{
                width: sellPercent + "%",
              }}
            >
              <h1>SELLS: {sellPercent}%</h1>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default CoinChart;
