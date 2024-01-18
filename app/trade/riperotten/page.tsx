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

  const TableRowRender = () => {
    return (
      <TableRow>
        <TableCell className="text-left max-w-[100px]">
          <div className=" flex justify-start items-center gap-3">
            <FallbackImage
              src={"/icons/earn/sol.svg"}
              height={30}
              width={30}
              className="rounded-md"
            />
            <span className="text-white text-sm">SOL (1-MIN)</span>
          </div>
        </TableCell>
        <TableCell className="text-left">
          <div className=" flex justify-start items-center gap-2 flex-col  flex-2 text-left">
            <span className="text-white text-sm">Upcoming</span>
            <span className="text-white text-sm">02:47</span>
          </div>
        </TableCell>
        <TableCell className="text-right">
          <div className=" flex justify-end items-center gap-2 flex-col  flex-2 text-right">
            <span className="text-white text-sm">-</span>
          </div>
        </TableCell>
        <TableCell className="text-left">
          <div className=" flex justify-end items-center gap-2 flex-col  flex-2 text-right">
            <span className="text-white text-sm">$64.5787</span>
          </div>
        </TableCell>
        <TableCell className="text-left">
          <div className=" flex justify-end items-center gap-2 flex-col  flex-2 text-right">
            <span className="text-white text-sm">-</span>
          </div>
        </TableCell>
        <TableCell className="text-left">
          <div className=" flex justify-start items-center gap-2   flex-2 text-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <g clip-path="url(#clip0_3173_3010)">
                <path
                  d="M12.6704 24C19.2978 24 24.6704 18.6274 24.6704 12C24.6704 5.37258 19.2978 0 12.6704 0C6.04299 0 0.67041 5.37258 0.67041 12C0.67041 18.6274 6.04299 24 12.6704 24Z"
                  fill="#C4C4C4"
                />
                <path
                  d="M12.6704 24C19.3204 24 24.6704 18.65 24.6704 12C24.6704 5.34996 19.3204 0 12.6704 0C6.02037 0 0.67041 5.34996 0.67041 12C0.67041 18.65 6.02037 24 12.6704 24Z"
                  fill="#2775CA"
                />
                <path
                  d="M15.9704 13.8996C15.9704 12.1496 14.9204 11.5496 12.8204 11.2997C11.3205 11.0996 11.0205 10.6997 11.0205 9.99961C11.0205 9.29956 11.5205 8.84963 12.5204 8.84963C13.4204 8.84963 13.9205 9.14963 14.1704 9.89963C14.2205 10.0496 14.3705 10.1496 14.5205 10.1496H15.3204C15.5204 10.1496 15.6704 9.99961 15.6704 9.79973V9.74963C15.4704 8.64961 14.5704 7.79963 13.4204 7.69966V6.49969C13.4204 6.29965 13.2704 6.14965 13.0205 6.09961H12.2705C12.0705 6.09961 11.9205 6.24961 11.8704 6.49969V7.64963C10.3704 7.84966 9.42051 8.84963 9.42051 10.0997C9.42051 11.7497 10.4205 12.3996 12.5204 12.6497C13.9205 12.8996 14.3705 13.1996 14.3705 13.9997C14.3705 14.7998 13.6704 15.3497 12.7205 15.3497C11.4204 15.3497 10.9704 14.7996 10.8204 14.0496C10.7705 13.8497 10.6205 13.7496 10.4705 13.7496H9.62046C9.42051 13.7496 9.27051 13.8996 9.27051 14.0996V14.1497C9.47046 15.3996 10.2705 16.2996 11.9205 16.5497V17.7497C11.9205 17.9496 12.0705 18.0996 12.3204 18.1497H13.0704C13.2704 18.1497 13.4204 17.9997 13.4705 17.7497V16.5497C14.9704 16.2996 15.9704 15.2496 15.9704 13.8996Z"
                  fill="white"
                />
                <path
                  d="M10.1199 19.15C6.21992 17.75 4.21988 13.4 5.66996 9.54996C6.41996 7.44992 8.06996 5.84996 10.1199 5.09996C10.32 5 10.4199 4.85 10.4199 4.59992V3.89996C10.4199 3.69992 10.32 3.54992 10.1199 3.5C10.0699 3.5 9.96988 3.5 9.91986 3.54992C5.16992 5.04992 2.56988 10.1 4.06988 14.85C4.96988 17.65 7.11992 19.8 9.91986 20.7C10.1199 20.8 10.32 20.7 10.3699 20.5C10.4199 20.45 10.4199 20.4 10.4199 20.3V19.6C10.4199 19.45 10.2699 19.25 10.1199 19.15ZM15.42 3.54992C15.2199 3.44996 15.0199 3.54992 14.97 3.74996C14.9199 3.8 14.9199 3.84992 14.9199 3.95V4.64996C14.9199 4.85 15.0699 5.04992 15.2199 5.15C19.1199 6.54992 21.12 10.9 19.6699 14.75C18.9199 16.85 17.2699 18.45 15.2199 19.2C15.0199 19.3 14.9199 19.45 14.9199 19.7V20.4C14.9199 20.6 15.0199 20.75 15.2199 20.8C15.27 20.8 15.3699 20.8 15.42 20.75C20.1699 19.25 22.77 14.2 21.27 9.44998C20.37 6.59996 18.1699 4.44992 15.42 3.54992Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_3173_3010">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.67041)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span className="text-white text-sm">0.00</span>
          </div>
        </TableCell>
        <TableCell className="text-left">
          <div className=" flex justify-start items-center gap-2 flex-col   flex-2 text-left">
            <span className="text-white text-sm">-</span>
          </div>
        </TableCell>
        <TableCell className="text-left">
          <div className=" flex justify-start items-center gap-2 flex-col  flex-2 text-left">
            <span className="text-white text-sm">Choose Ripe</span>
            <span className="text-[#74D882] text-sm">0.00-0.00X Payout</span>
          </div>
        </TableCell>
        <TableCell className="text-left">
          <div className=" flex justify-start items-center gap-2 flex-col  flex-2 text-left">
            <span className="text-white text-sm">Choose Rotten</span>
            <span className="text-[#FF6363] text-sm">0.00-0.00X Payout</span>
          </div>
        </TableCell>
      </TableRow>
    );
  };
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
