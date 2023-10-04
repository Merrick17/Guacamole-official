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
import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "@bonfida/hooks";

type SelectedCoinProps = {
  high: string;
  low: string;
  coin: string[];
  onClick?: () => void;
};
const PerceptualMarketHeader = () => {
  const { indexPrice, selectedProduct, markPrice } = useProduct();
  const { selectedMarket, selectMarket, candles } = useWebSocket();
  const { trader } = useTrader();
  const { setSelectedProductIndex } = useProduct();
  const { width } = useWindowSize();
  useEffect(() => {}, [candles, markPrice]);

  const selectedIndexPrice: number = useMemo(() => {
    if (!indexPrice || !selectedProduct) return;
    return indexPrice.find((p) => p.index === selectedProduct.index).price;
  }, [indexPrice, selectedProduct]);

  return (
    <Container className="w-full flex justify-between items-center bg-background py-6 px-9">
      {width > 1000 ? (
        <>
          <div className="flex  flex-row items-center gap-3">
            <img
              src={selectedMarket.coinLogo}
              alt="bitcoin"
              className="w-10 h-10"
            />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
                <SelectedCoin {...selectedMarket} />
                <Button size="icon">
                  <BsChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <SelectedCoin
                    coin={["BTC", "Bitcoin", "HXRO:BTCUSD", "0"]}
                    onClick={() => {
                      selectMarket({
                        high: "25,901.41",
                        low: "25,534.37",
                        coin: ["BTC", "Bitcoin", "HXRO:BTCUSD"],
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
                    coin={["ETH", "Ethereum", "HXRO:ETHUSD", "1"]}
                    onClick={() => {
                      selectMarket({
                        high: "25,901.41",
                        low: "25,534.37",
                        coin: ["ETH", "Ethereum", "HXRO:ETHUSD"],
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
                    coin={["SOL", "Solana", "HXRO:SOLUSD", "2"]}
                    onClick={() => {
                      selectMarket({
                        high: "25,901.41",
                        low: "25,534.37",
                        coin: ["SOL", "Solana", "HXRO:SOLUSD"],
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
                <DropdownMenuItem>
                  <SelectedCoin
                    coin={["OPOS", "Only-possible-on-Solana", "HXRO:OPOS0D", "6"]}
                    onClick={() => {
                      selectMarket({
                        high: "25,901.41",
                        low: "25,534.37",
                        coin: [
                          "OPOS",
                          "Only-possible-on-Solana",
                          "HXRO:OPOS0D",
                        ],
                        coinLogo: "/static/coins/opos-logo.png",
                        name: "OPOS0D",
                      });
                      setSelectedProductIndex({
                        index: 6,
                        name: "OPOS0D",
                        minSize: 1,
                        exponent: 0,
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
              INDEX PRICE: $ {selectedIndexPrice ?? 0}
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          {" "}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row lg:flex-row items-center justify-between gap-2 w-full">
              <SelectedCoin {...selectedMarket} />
              <Button size="icon">
                <BsChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem>
                <SelectedCoin
                  coin={["BTC", "Bitcoin", "HXRO:BTCUSD", "0"]}
                  onClick={() => {
                    selectMarket({
                      high: "25,901.41",
                      low: "25,534.37",
                      coin: ["BTC", "Bitcoin", "HXRO:BTCUSD"],
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
                  coin={["ETH", "Ethereum", "HXRO:ETHUSD", "1"]}
                  onClick={() => {
                    selectMarket({
                      high: "25,901.41",
                      low: "25,534.37",
                      coin: ["ETH", "Ethereum", "HXRO:ETHUSD"],
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
                  coin={["SOL", "Solana", "HXRO:SOLUSD", "2"]}
                  onClick={() => {
                    selectMarket({
                      high: "25,901.41",
                      low: "25,534.37",
                      coin: ["SOL", "Solana", "HXRO:SOLUSD"],
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
              <DropdownMenuItem>
                <SelectedCoin
                  coin={["OPOS", "Only-possible-on-Solana", "HXRO:OPOS0D", "6"]}
                  onClick={() => {
                    selectMarket({
                      high: "25,901.41",
                      low: "25,534.37",
                      coin: ["OPOS", "Only-possible-on-Solana", "HXRO:OPOS0D"],
                      coinLogo: "/static/coins/opos-logo.png",
                      name: "OPOS0D",
                    });
                    setSelectedProductIndex({
                      index: 6,
                      name: "OPOS0D",
                      minSize: 1,
                      exponent: 0,
                    });
                  }}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex flex-col items-start mt-3">
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
              INDEX PRICE: $ {selectedIndexPrice ?? 0}
            </p>
          </div>
        </div>
      )}
    </Container>
  );
};

export default PerceptualMarketHeader;
