import React, { useState, useEffect } from "react";
import { useWindowSize } from "@bonfida/hooks";
import { BsChevronDown } from "react-icons/bs";
import Container from "@/components/common/container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SelectedCoin } from "@/components/common/SelectCoin";
import { Button } from "@/components/ui/button";
import { useSetting } from "@/context/setting";
import { useParimutuel } from "@/context/parimutuel";
import { MarketPairEnum } from "@hxronetwork/parimutuelsdk";
import _get from "lodash/get";
import CoinPrice from "./riperotten/CoinPrice";
import { SelectedRipeRottenMarket } from "./riperotten/SelectedRipeRottenMarket";
const RipeRottenHeader = () => {
  const { width } = useWindowSize();
  const { web3, setWeb3 } = useParimutuel();
  const marketList = ["BTC-USD", "SOL-USD"];
  const {
    selectedMarketKey,
    setSelectedMarketPair,
    setSelectedMarketKey,
    selectedMarketPair,
    selectedNetwork,
  } = useSetting();
  const [selectedMarket, setSelectedMarket] = useState({
    coin: ["SOL", "Solana"],
    logo: "/images/tokens/SOL.png",
    name: "SOL-USD",
    market_pair: MarketPairEnum.SOLUSD,
  });
  const handleMarketChange = (value: string) => {
    const market_pair =
      value === "BTC-USD" ? MarketPairEnum.BTCUSD : MarketPairEnum.SOLUSD;
    setSelectedMarketPair(market_pair);
    const market_key = web3
      ? _get(web3?.config.markets, [market_pair, "MARKET_60S"])?.toString()
      : "";
    setSelectedMarketKey(market_key);
  };
  useEffect(() => {
    const market_pair = MarketPairEnum.SOLUSD;
    setSelectedMarketPair(market_pair);
    const market_key = web3
      ? _get(web3?.config.markets, [market_pair, "MARKET_60S"])?.toString()
      : "";
    setSelectedMarketKey(market_key);
  }, []);
  // Add any other states and hooks you need

  // Dropdown menu items data
  const marketOptions = [
    // {
    //   coin: ["BTC", "Bitcoin"],
    //   logo: "/images/tokens/BTC.png",
    //   name: "BTC-USD",
    // },
    {
      coin: ["SOL", "Solana"],
      logo: "/images/tokens/SOL.png",
      name: "SOL-USD",
    },
    // Add other market options here
  ];

  const handleSelectMarket = (market) => {
    setSelectedMarket(market);
    //console.log("Selected MARKET", market);
    handleMarketChange(market.name);
  };

  const renderDropdownMenuItems = () => {
    return marketOptions.map((market, index) => (
      <DropdownMenuItem key={index}>
        <SelectedCoin
          coin={market.coin}
          onClick={() => handleSelectMarket(market)}
        />
      </DropdownMenuItem>
    ));
  };

  // Add logic for the price display and index price, if needed

  return (
    <Container className="w-full flex justify-between items-center bg-background py-6 px-9">
      {width > 1000 ? (
        <>
          <div className="flex flex-row items-center gap-3">
            <img
              src={selectedMarket.logo}
              alt={selectedMarket.name}
              className="w-10 h-10"
            />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full bg-[#141414] p-3 rounded-[10px] border-[1px] border-[rgba(168, 168, 168, 0.10)]">
                <SelectedRipeRottenMarket {...selectedMarket} />
                <Button size="icon" className="trade-bg">
                  <BsChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {renderDropdownMenuItems()}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <p className="text-[#8BD796] text-3xl font-medium">
              <CoinPrice market={selectedMarketPair} />
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row items-center justify-between gap-2 w-full">
              <SelectedRipeRottenMarket {...selectedMarket} />
              <Button size="icon">
                <BsChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {renderDropdownMenuItems()}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex flex-col items-start mt-3">
            <p className="text-[#8BD796] text-3xl font-medium"> <CoinPrice market={selectedMarketPair} /></p>
          </div>
        </div>
      )}
    </Container>
  );
};

export default RipeRottenHeader;
