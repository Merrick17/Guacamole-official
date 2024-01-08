import { useSetting } from "@/context/setting";
import React, { useEffect, useMemo } from "react";

interface CoinPriceProps {
  market: string;
}

function truncateToThirdDecimal(num: number): string {
  const truncatedNum = Math.floor(num * 1000) / 1000;
  let formattedNum = truncatedNum.toFixed(3);
  if (truncatedNum >= 1000) {
    formattedNum = truncatedNum
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return formattedNum;
}

const CoinPrice: React.FC<CoinPriceProps> = ({ market }) => {
  const { livePrice, setLivePrice } = useSetting();

  useEffect(() => {
    const ws = new WebSocket("wss://price-dev.bitbloxrgs.com/ws");

    ws.onopen = () => {
      console.log("Websocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      //console.log("Market",market); 
      //console.log("DATA", data);
      const dataMarketPair = data.from_sym + data.to_sym;

      if (dataMarketPair == market) {
        setLivePrice(data.price);
      //  console.log(" PRICE", data.price);
      }
    };

    ws.onclose = () => {
      console.log("Websocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [market, setLivePrice]);
  useMemo(() => {
    console.log("Live PRICE", livePrice);
  }, [livePrice]);
  return <>${truncateToThirdDecimal(livePrice)}</>;
};

export default CoinPrice;
