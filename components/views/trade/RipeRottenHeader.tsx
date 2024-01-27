import { RipeRottenSelectCoin } from "@/components/common/RipeRottenSelectCoin";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParimutuel } from "@/context/parimutuel";
import { useSetting } from "@/context/setting";
import { useWindowSize } from "@bonfida/hooks";
import { MarketPairEnum } from "@hxronetwork/parimutuelsdk";
import _get from "lodash/get";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import CoinPrice from "./riperotten/CoinPrice";
import { SelectedRipeRottenMarket } from "./riperotten/SelectedRipeRottenMarket";
const RipeRottenHeader = () => {
  const { width } = useWindowSize();
  const { web3 } = useParimutuel();

  const { setSelectedMarketPair, setSelectedMarketKey, selectedMarketPair } =
    useSetting();
  const [selectedMarket, setSelectedMarket] = useState({
    coin: ["SOL", "Solana"],
    logo: "/images/trade/sol_guac.png",
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
      logo: "/images/trade/sol_guac.png",
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
        <RipeRottenSelectCoin
          coin={market.coin}
          onClick={() => handleSelectMarket(market)}
        />
      </DropdownMenuItem>
    ));
  };

  // Add logic for the price display and index price, if needed

  return (
    <Container className="w-full flex justify-between items-center bg-background py-6 px-9 border">
      {width > 1000 ? (
        <>
          <div className="flex flex-row items-center gap-2">
            <img
              src={selectedMarket.logo}
              alt={selectedMarket.name}
              className="w-10 h-10"
            />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full bg-[#141414] p-3 rounded-[10px] border-[1px] border-[rgba(168, 168, 168, 0.10)] min-w-[240px]">
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
            <DropdownMenuTrigger className="flex flex-row items-center justify-between gap-2 w-full min-w-[244px]">
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
            <p className="text-[#8BD796] text-3xl font-medium">
              {" "}
              <CoinPrice market={selectedMarketPair} />
            </p>
          </div>
        </div>
      )}
    </Container>
  );
};

export default RipeRottenHeader;
