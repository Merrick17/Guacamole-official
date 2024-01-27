"use client";

import FallbackImage from "@/components/FallBackImage";
import Container from "@/components/common/container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RipeRottenForm from "@/components/views/trade/RipeRottenForm";
import { getWeb3Config } from "@/constants/config";
import { useParimutuel } from "@/context/parimutuel";
import { useSetting } from "@/context/setting";
import { MarketBoardItem, useMarket } from "@/hooks/use-market";
import { AmountFormating, cn } from "@/lib/utils";
import {
  ConfigEnum,
  MarketPairEnum,
  ParimutuelWeb3,
  calculateNetOdd,
} from "@hxronetwork/parimutuelsdk";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useInterval } from "ahooks";
import _get from "lodash/get";
import getConfig from "next/config";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const TVChartContainer = dynamic(
  () => import("@/components/views/trade/RipeRottenTVChart"),
  {
    ssr: false,
  }
);

const RipeOrRotten = () => {
  const networksArr = ["USDC", "BONK"];
  const usdcMarkets = ["BTC-USD", "SOL-USD"];
  const bonkMarkets = ["SOL-USD"];

  const { connection } = useConnection();
  const { web3, setWeb3 } = useParimutuel();
  const {
    selectedMarketPair,
    setSelectedMarketPair,
    setSelectedParimutuel,
    setPositionSide,
    setDecimalPlaces,
    setSelectedMarketKey,
    livePrice,
    setSelectedNetwork,
    selectedNetwork,
  } = useSetting();

  const { connected, publicKey } = useWallet();
  const { nextFiveUpcomingParimuels, liveParimutuels, lastParimutuel } =
    useMarket();

  const [ourParimutuel, setOurParimutuel] = useState<
    MarketBoardItem | undefined
  >(undefined);
  const [ourLockedParimutuel, setOurLockedParimutuel] = useState<
    MarketBoardItem | undefined
  >(undefined);
  const [countDownTime, setCountDownTime] = useState<string>("");
  const [locksTime, setLockTime] = useState<number>(0);
  const [longPayout, setLongPayout] = useState<string>("");
  const [shortPayout, setShortPayout] = useState<string>("");
  const [longLockedPayout, setLongLockedPayout] = useState<string>("");
  const [shortLockedPayout, setShortLockedPayout] = useState<string>("");
  const [winningSide, setWinningSide] = useState<string>("");
  const [arrow, setArrow] = useState<string>("");
  const [difference, setDifference] = useState<number>(0);
  const [userPosition, setUserPosition] = useState<string>("");
  const [userLockedPosition, setUserLockedPosition] = useState<string>("");
  const [showUserLost, setShowUserLost] = useState<boolean>(false);
  const [showUserWon, setShowUserWon] = useState<boolean>(false);
  const [marketsArr, setMarketsArr] = useState<string[]>(bonkMarkets);
  const [fixedNetworkDigits, setFixedNetworkDigits] = useState<number>(2);
  const [fixedMarketDigits, setFixedMarketDigits] = useState<number>(3);
  const [lastBonk, setLastBonk] = useState<string>("");
  const [previousPosition, setPreviousPosition] = useState<number[]>([]);

  const handleNetworkChange = (value: string) => {
    setSelectedNetwork(value);
    setMarketsArr(value === "USDC" ? usdcMarkets : bonkMarkets);
    const config = getWeb3Config(value);
    const myWeb3 = new ParimutuelWeb3(config, connection);
    setWeb3(myWeb3);
    let myMarket = "BTC-USD";
    if (value === "BONK") {
      setDecimalPlaces(5);
      myMarket = "SOL-USD";
      setFixedNetworkDigits(0);
    } else if (value === "USDC") {
      setDecimalPlaces(6);
      myMarket = "BTC-USD";
      //if (APP_ENV === ConfigEnum.DEV) setDecimalPlaces(9);
      setFixedNetworkDigits(2);
    }
    const market_pair =
      myMarket === "BTC-USD" ? MarketPairEnum.BTCUSD : MarketPairEnum.SOLUSD;
    setSelectedMarketPair(market_pair);
    const market_key = myWeb3
      ? _get(myWeb3?.config.markets, [market_pair, "MARKET_60S"])?.toString()
      : "";
    setSelectedMarketKey(market_key);
    setFixedMarketDigits(selectedMarketPair === MarketPairEnum.SOLUSD ? 3 : 2);
  };

  const handleMarketChange = (value: string) => {
    const market_pair =
      value === "BTC-USD" ? MarketPairEnum.BTCUSD : MarketPairEnum.SOLUSD;
    setSelectedMarketPair(market_pair);
    const market_key = web3
      ? _get(web3?.config.markets, [market_pair, "MARKET_60S"])?.toString()
      : "";
    setSelectedMarketKey(market_key);
    setFixedMarketDigits(selectedMarketPair === MarketPairEnum.SOLUSD ? 3 : 2);
  };

  useEffect(() => {
    //handleNetworkChange("USDC");
    const market_key = web3
      ? _get(web3?.config.markets, [
          selectedMarketPair,
          "MARKET_60S",
        ])?.toString()
      : "";
    setSelectedMarketKey(market_key);
  }, []);

  const bonked_style = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    flexDirection: "column",
    zIndex: 99999,
  } as object;

  const calculatePnl = (
    position: number,
    priceDifference: number,
    odds: number
  ) => (priceDifference > 0 ? position * odds - position : -position);

  const wonOrNot = () => {
    if (lastParimutuel.length === 0) return;

    const {
      key: { parimutuelPubkey },
      position,
      locked,
      settled,
      pool,
    } = lastParimutuel[0];
    const stringKey = parimutuelPubkey.toString();
    const lockedPrice = locked.price;
    const settledPrice = settled.price;
    const longOdds = (pool.poolSize * 0.95) / pool.long;
    const shortOdds = (pool.poolSize * 0.95) / pool.short;
    const priceDifference = settledPrice - lockedPrice;

    if (position.long + position.short <= 0 || stringKey === lastBonk) return;

    let pnl = 0;
    if (position.long > 0) {
      pnl += calculatePnl(position.long, priceDifference, longOdds);
    }
    if (position.short > 0) {
      pnl += calculatePnl(position.short, -priceDifference, shortOdds);
    }

    setLastBonk(stringKey);

    if (pnl === 0) return;

    const winLossStatus = pnl > 0 ? "WON" : "LOST";
    const showStatusFunction = pnl > 0 ? setShowUserWon : setShowUserLost;
    showStatusFunction(true);

    setPreviousPosition([
      position.long,
      position.short,
      lockedPrice,
      settledPrice,
      pnl,
    ]);
    console.log(`USER ${winLossStatus} `, pnl, ` ${selectedNetwork}`);
  };

  function payoutFormating(
    sideSize: number,
    poolSize: number,
    rake: number
  ): string {
    const num = parseFloat(calculateNetOdd(sideSize, poolSize, rake)) * 100;
    const truncatedNum = Math.floor(num * 1000) / 1000;
    let formattedNum = "+" + truncatedNum.toFixed(1) + "%";
    if (truncatedNum >= 1000) {
      formattedNum =
        "+" +
        truncatedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        "%";
    }
    return formattedNum;
  }

  useInterval(() => {
    setShowUserLost(false);
    setShowUserWon(false);

    const upcoming_bonk_market = nextFiveUpcomingParimuels[0];
    const locked_bonk_market = liveParimutuels[0];

    if (upcoming_bonk_market) {
      setOurParimutuel(upcoming_bonk_market);
      setSelectedParimutuel(upcoming_bonk_market.key.parimutuelPubkey);
      setLockTime(upcoming_bonk_market.time.startTime);

      const longPayout = payoutFormating(
        upcoming_bonk_market.pool.long,
        upcoming_bonk_market.pool.poolSize,
        0.05
      );
      const shortPayout = payoutFormating(
        upcoming_bonk_market.pool.short,
        upcoming_bonk_market.pool.poolSize,
        0.05
      );
      setLongPayout(longPayout);
      setShortPayout(shortPayout);

      let user_position = "";
      if (upcoming_bonk_market.position.long > 0) {
        user_position =
          "BONK: " +
          AmountFormating(
            upcoming_bonk_market.position.long,
            fixedNetworkDigits
          );
      }
      if (upcoming_bonk_market.position.short > 0) {
        user_position =
          "BUST: " +
          AmountFormating(
            upcoming_bonk_market.position.short,
            fixedNetworkDigits
          );
      }
      setUserPosition(user_position);
    }

    if (locked_bonk_market) {
      wonOrNot();
      setOurLockedParimutuel(locked_bonk_market);
      const locked_price = locked_bonk_market.locked.price;
      let diff = livePrice - locked_price;
      if (locked_price == 0 || livePrice == 0) {
        diff = 0;
      }
      setDifference(Math.abs(diff));

      let arrow_img_src = "/up-arrow.png";
      let winning_side = "BONK";
      if (diff < 0) {
        arrow_img_src = "/down-arrow.png";
        winning_side = "BUST";
      }
      setArrow(arrow_img_src);
      setWinningSide(winning_side);
      let user_position = "";
      if (locked_bonk_market.position.long > 0) {
        user_position =
          "BONK: " +
          AmountFormating(locked_bonk_market.position.long, fixedNetworkDigits);
      }
      if (locked_bonk_market.position.short > 0) {
        user_position =
          "BUST: " +
          AmountFormating(
            locked_bonk_market.position.short,
            fixedNetworkDigits
          );
      }
      setUserLockedPosition(user_position);

      const longPayout = payoutFormating(
        locked_bonk_market.pool.long,
        locked_bonk_market.pool.poolSize,
        0.05
      );
      const shortPayout = payoutFormating(
        locked_bonk_market.pool.short,
        locked_bonk_market.pool.poolSize,
        0.05
      );

      setLongLockedPayout(longPayout);
      setShortLockedPayout(shortPayout);
    }
  }, 500);

  useInterval(() => {
    let formattedTime = "00:00:00";
    if (locksTime) {
      let s = locksTime - new Date().getTime();
      const ms = s % 1000;
      s = (s - ms) / 1000;
      const secs = s % 60;
      s = (s - secs) / 60;
      const mins = s % 60;
      const hrs = (s - mins) / 60;

      let formatedSecs = secs.toString();
      let formatedMins = mins.toString();
      let formatedHrs = hrs.toString();

      if (secs < 10) {
        formatedSecs = "0" + secs.toString();
      }
      if (mins < 10) {
        formatedMins = "0" + mins.toString();
      }
      if (hrs < 10) {
        formatedHrs = "0" + hrs.toString();
      }

      formattedTime = formatedHrs + ":" + formatedMins + ":" + formatedSecs;
      if (hrs < 0 || mins < 0 || secs < 0) {
        formattedTime = "00:00:00";
      }
    }
    setCountDownTime(formattedTime);
  }, 1000);


  return (
    <>
      <main className="container mx-auto  items-center flex flex-col  gap-14 px-3 lg:px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
        <div
          className={cn(
            "flex flex-col gap-10  w-full z-20  rounded-lg bg-background  "
          )}
        >
          <Container className="w-full bg-foreground grid  z-20  grid-cols-1 lg:grid-cols-12 gap-[10px] px-5 py-7 rounded-[8px] border border-[rgba(168, 168, 168, 0.10)]">
            <div className="col-span-1 lg:col-span-4 ">
              <RipeRottenForm />
            </div>
            <div className="flex flex-1 justify-center col-span-1 lg:col-span-8">
              <TVChartContainer />
            </div>
          </Container>
        </div>
        {/* <Container className="bg-foreground w-full h-auto border border-[rgba(168, 168, 168, 0.10)]">
          <Table className="max-sm:w-96 max-sm:overflow-x-auto min-h-[200px] ">
            <TableHeader>
              <TableRow className="bg-[#0F0F0F] border-none">
                <TableHead className="uppercase">INDEX</TableHead>
                <TableHead className="uppercase text-center">STATUS</TableHead>
                <TableHead className="uppercase text-center">
                  Locked Price
                </TableHead>
                <TableHead className="uppercase text-center">
                  Last Price
                </TableHead>
                <TableHead className=" uppercase text-center">
                  NET CHANGE
                </TableHead>
                <TableHead className=" uppercase text-center">POOL </TableHead>
                <TableHead className=" uppercase text-center">
                  POSITION{" "}
                </TableHead>
                <TableHead className=" uppercase text-center">UP </TableHead>
                <TableHead className="uppercase text-center">DOWN </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((elm) => (
                <TableRowRender />
              ))}
           
            </TableBody>
          </Table>
        </Container> */}
      </main>
    </>
  );
};

export default RipeOrRotten;
