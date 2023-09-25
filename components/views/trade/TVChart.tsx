"use client";
import CandleChart from "@/components/common/CandleChart";
import PerceptualMarketHeader from "@/components/common/perceptual-market-header";
import { cn } from "@/lib/utils";
import { FC, useRef, useState } from "react";

const TVChart = ({ productSelect }: { productSelect: string }) => {
  
  const tradingViewWidget = useRef<any>();


  return (
    <div className="flex flex-col gap-5 w-full ">
      <PerceptualMarketHeader />
      {/* <Container className="w-full flex justify-between items-center bg-background py-6 px-9">
        <div className="flex  flex-row items-center gap-3">
          <img
            src="https://s3-alpha-sig.figma.com/img/06d4/7896/9aaaf2099933ebf7f9bdfbc97b0ce80b?Expires=1694995200&Signature=IP0TeXLpzWxKotY1t9R-3FG5w4HvgGEEWhmWP6iMtrP9NEW-NSACybcTW0d7cqqb~NvFLgoveDItaaiGScH8Fr9Hlq2j5oRzLqtKS09QKqK670363Sbb9BabbeX~SW6sjPDWOvfg9cN3~lVhtDTtWKU79H-6q2P4wqCkjdYlapZcpToEqMQQKyrcRJovMcZFKaOfFdWhZcDP0hw-osdjVJsgoIChxh~8vfz5VWwuBw7DNLdYTYUrHYpfiLsc4MfjDjgdWQHJwgG3Cev9xjp3HqmscAE4daTibQD2Zg~iPBw7~vkObBdufr5tqir3wVno~PEPrqtKtkMnB23BFSAbSw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt="bitcoin"
            className="w-10 h-10"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
              <SelectedCoin {...SelectedProduct} />
              <Button size="icon">
                <BsChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem>
                <SelectedCoin
                  coin={["BTC", "Bitcoin", "PYTH:BTCUSD"]}
                  high="25,901.41"
                  low="25,534.37"
                  marketName=""
                  onClick={() => {
                    setSelectedProduct({
                      high: "25,901.41",
                      low: "25,534.37",
                      coin: ["BTC", "Bitcoin", "PYTH:BTCUSD"],
                      marketName: "",
                    });
                  }}
                />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SelectedCoin
                  coin={["ETH", "Ethereum", "PYTH:ETHUSD"]}
                  high="25,901.41"
                  low="25,534.37"
                  marketName=""
                  onClick={() => {
                    setSelectedProduct({
                      high: "25,901.41",
                      low: "25,534.37",
                      coin: ["ETH", "Ethereum", "PYTH:ETHUSD"],
                      marketName: "",
                    });
                  }}
                />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SelectedCoin
                  coin={["SOL", "Solana", "PYTH:SOLUSD"]}
                  high="25,901.41"
                  low="25,534.37"
                  marketName=""
                  onClick={() => {
                    setSelectedProduct({
                      high: "25,901.41",
                      low: "25,534.37",
                      coin: ["SOL", "Solana", "PYTH:SOLUSD"],
                      marketName: "",
                    });
                  }}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-[#8BD796] text-3xl font-medium">
          $25,620<span className="text-lg">.31</span>
        </p>
      </Container> */}
      <CandleChart />
      {/* <div id={containerId.current} style={{ height: 512, width: '100%' }} />
      <Script
        src="https://s3.tradingview.com/tv.js"
        strategy="lazyOnload"
        crossOrigin="anonymous"
        onLoad={() => {
          // @ts-ignore
          removeWidget();
          tradingViewWidget.current = new window.TradingView.widget({
            ...defaultConfig,
            studies_overrides: {
              // 'Overlay.candleStyle.upColor': '#47C5D8',
              // 'Overlay.candleStyle.downColor': '#E3627D',
              'Overlay.candleStyle.barColorsOnPrevClose': true,
            },
            overrides: {
              'mainSeriesProperties.candleStyle.upColor': '#32CD99',
              'mainSeriesProperties.candleStyle.downColor': '#F23B69',
              'mainSeriesProperties.candleStyle.borderUpColor': '#32CD99',
              'mainSeriesProperties.candleStyle.borderDownColor': '#F23B69',
              'mainSeriesProperties.candleStyle.wickUpColor': '#32CD99',
              'mainSeriesProperties.candleStyle.wickDownColor': '#F23B69',
              'paneProperties.background': 'rgba(0,0,0,0)',
              'paneProperties.backgroundType': 'solid',
              // 'scalesProperties.lineColor': '#262c2e',
            },
            symbol: `PYTH:${handleReturnCoin(productSelect)}`,
            interval: '1',
            container_id: containerId.current,
            backgroundColor: '#000000',
          });
        }}
      /> */}
    </div>
  );
};

export default TVChart;

type SelectedCoinProps = {
  high: string;
  low: string;
  coin: string[];
  marketName: string;
  onClick?: () => void;
};
const SelectedCoin: FC<SelectedCoinProps> = ({ high, low, coin, onClick }) => {
  return (
    <div className="flex flex-col items-start w-full" onClick={onClick}>
      <p className="text-muted-foreground font-medium">
        {coin.map((item, index) => (
          <>
            {index !== 0 && index !== coin.length && <span> | </span>}
            <span key={index} className={cn(index === 0 && "text-[#fcfcfc]")}>
              {item}
            </span>
          </>
        ))}
      </p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <p>
          H: <span className="text-[#8BD796]">{high}</span>
        </p>
        <p>
          L: <span className="text-[#FF4949]">{low}</span>
        </p>
      </div>
    </div>
  );
};
