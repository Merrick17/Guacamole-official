import { useProduct, useTrader } from "@/context/dexterity";
import { useWebSocket } from "@/context/websocket";
import { BsChevronDown } from "react-icons/bs";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SelectedCoin } from "./SelectCoin";
import Container from "./container";
import { useEffect } from "react";

type SelectedCoinProps = {
  high: string;
  low: string;
  coin: string[];
  onClick?: () => void;
};
const PerceptualMarketHeader = () => {
  const {
    indexPrice,
    selectedProduct,
  } = useProduct();
  const { selectedMarket, selectMarket, candles } = useWebSocket();
  const { trader } = useTrader();
  const { setSelectedProductIndex } = useProduct();
  useEffect(() => {}, [candles]);

  return (
    <Container className="w-full flex justify-between items-center bg-background py-6 px-9">
      <div className="flex  flex-row items-center gap-3">
        <img
          src={selectedMarket.coinLogo}
          alt="bitcoin"
          className="w-10 h-10"
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
            <SelectedCoin
              {...selectedMarket}
              // high={
              //   candles[candles.length - 1] ? candles[candles.length - 1].h : ''
              // }
              // low={
              //   candles[candles.length - 1] ? candles[candles.length - 1].l : ''
              // }
            />
            <Button size="icon">
              <BsChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuItem>
              <SelectedCoin
                coin={["BTC", "Bitcoin", "PYTH:BTCUSD"]}
                onClick={() => {
                  selectMarket({
                    high: "25,901.41",
                    low: "25,534.37",
                    coin: ["BTC", "Bitcoin", "PYTH:BTCUSD"],
                    coinLogo: "/images/tokens/BTC.png",
                    name: "BTCUSD-PERP",
                  });
                  setSelectedProductIndex({
                    index: 0,
                    name: "BTCUSD-PERP",
                    minSize: 0.0001,
                    exponent: 4,
                  });
                }}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SelectedCoin
                coin={["ETH", "Ethereum", "PYTH:ETHUSD"]}
                onClick={() => {
                  selectMarket({
                    high: "25,901.41",
                    low: "25,534.37",
                    coin: ["ETH", "Ethereum", "PYTH:ETHUSD"],
                    coinLogo: "/images/tokens/ETH.png",
                    name: "ETHUSD-PERP",
                  });
                  setSelectedProductIndex({
                    index: 1,
                    name: "ETHUSD-PERP",
                    minSize: 0.001,
                    exponent: 3,
                  });
                }}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SelectedCoin
                coin={["SOL", "Solana", "PYTH:SOLUSD"]}
                onClick={() => {
                  selectMarket({
                    high: "25,901.41",
                    low: "25,534.37",
                    coin: ["SOL", "Solana", "PYTH:SOLUSD"],
                    coinLogo: "/images/tokens/SOL.png",
                    name: "SOLUSD-PERP",
                  });
                  setSelectedProductIndex({
                    index: 2,
                    name: "SOLUSD-PERP",
                    minSize: 0.1,
                    exponent: 1,
                  });
                }}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <p className="text-[#8BD796] text-3xl font-medium">
          $
          {candles[candles.length - 1] ? (
            <>
              {candles[candles.length - 1].o.split(".")[0]}
              <span className="text-lg">
                .{candles[candles.length - 1].o.split(".")[1]}
              </span>
            </>
          ) : (
            "N/A" // Display "N/A" or any other default value when candles[candles.length - 1].o is undefined
          )}
        </p>
        <p className="text-muted-foreground text-[10px] text-right">
          INDEX PRICE: $ {markPrice ? markPrice : "N/A"}
        </p>
      </div>
    </Container>
  );
};

export default PerceptualMarketHeader;
