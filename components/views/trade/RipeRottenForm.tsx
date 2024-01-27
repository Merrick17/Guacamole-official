import FallbackImage from "@/components/common/FallbackImage";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavigationList from "@/components/ui/navigation-list";
import { getWeb3Config } from "@/constants/config";
import { useParimutuel } from "@/context/parimutuel";
import { useSetting } from "@/context/setting";
import { MarketBoardItem, useMarket } from "@/hooks/use-market";
import { AmountFormating } from "@/lib/utils";
import {
  MarketPairEnum,
  ParimutuelWeb3,
  PositionSideEnum,
  calculateNetOdd,
} from "@hxronetwork/parimutuelsdk";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useMemo, useState } from "react";
import { useInterval } from "react-use";
import _get from "lodash/get";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PositionDialog from "./riperotten/PositionDialog";
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
const RipeRottenForm = () => {
  const networksArr = ["USDC", "BONK"];
  const usdcMarkets = ["BTC-USD", "SOL-USD"];
  const bonkMarkets = ["SOL-USD"];

  const { connection } = useConnection();

  const { parimutuels, getPositions, markets, web3 } = useParimutuel();
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
    selectedParimutuel,
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
  const [isRipeModalOpen, setIsRipeModalOpen] = useState<boolean>(false);
  const [isRottenModalOpen, setIsRottenModalOpen] = useState<boolean>(false);
  const parimutuelAccount = useMemo(
    () =>
      parimutuels.find(
        (parimutuel) => parimutuel.pubkey.toBase58() === selectedParimutuel
      ),
    [parimutuels, selectedParimutuel]
  );
  const { parimutuel } = parimutuelAccount?.info || {};
  const longPosition = parimutuel?.activeLongPositions.toNumber() ?? 0;
  const shortPosition = parimutuel?.activeShortPositions.toNumber() ?? 0;
  const poolSize = longPosition + shortPosition;
  useEffect(() => {
    const market_key = web3
      ? _get(web3?.config.markets, [
          selectedMarketPair,
          "MARKET_60S",
        ])?.toString()
      : "";
    setSelectedMarketKey(market_key);
  }, []);

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
    // console.log("Upcoming markets", nextFiveUpcomingParimuels);
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
    <Container className="bg-background px-5 py-7  flex flex-col gap-5 col-span-2 border ">
      <div className="flex items-center justify-between">
        <NavigationList filter="Trade" />

        <Button
          size="sm"
          className="h-7 trade-bg"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.open(
                `https://docs.guacamole.gg/products-and-features/trade/gamified-crypto-futures`,
                "_blank"
              );
            }
          }}
        >
          View Tutorial
        </Button>
      </div>
      <div className="flex w-full flex-col">
        <div className="w-full h-[23px] trade-bg-2  flex items-center justify-between p-4 rounded-t-lg">
          <span className="text-black text-sm font-medium">SOL/USD</span>
          <span className="text-black text-sm font-medium">Upcoming Round</span>
        </div>
        <div className="w-full h-[23px]   flex items-center justify-between p-4 border border-[rgba(168, 168, 168, 0.10)]">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Pool</span>
            <FallbackImage
              src={"/icons/earn/usd-coin-usdc-logo.svg"}
              height={16}
              width={16}
              className="rounded-full"
            />
            <span className="text-muted-foreground">
              {ourLockedParimutuel &&
                AmountFormating(
                  ourLockedParimutuel.pool.poolSize,
                  fixedNetworkDigits
                )}
            </span>
          </div>
          <span className="text-muted-foreground">{countDownTime}</span>
        </div>
        <div className="flex flex-col items-center justify-center  border border-[rgba(168, 168, 168, 0.10)] p-5">
          <div className="flex flex-col w-full relative">
            <div className="flex justify-center items-center gap-4 w-full relative h-[200px]">
              <FallbackImage
                src={"/images/trade/buy.svg"}
                height={90}
                width={410}
                className="opacity-30 absolute bottom-[-23px] z-0"
              />
              <div className="flex justify-center items-center gap-1 z-10 pt-10">
                <FallbackImage
                  src={"/icons/earn/usd-coin-usdc-logo.svg"}
                  height={16}
                  width={16}
                />
                <span className="text-[#FFF]">
                  {" "}
                  {ourParimutuel
                    ? AmountFormating(
                        ourParimutuel.pool.long,
                        fixedNetworkDigits
                      )
                    : "Guacking..."}
                </span>
              </div>
              <div className="flex justify-center items-center gap-1 z-10 pt-10">
                <span className="text-[#FFF]">
                  {" "}
                  {longPayout ? longPayout : "Guacking..."} Payout
                </span>
              </div>
            </div>
            <PositionDialog
              isDialogOpen={isRipeModalOpen}
              countDown={countDownTime}
              position={PositionSideEnum.LONG}
              onOpenChange={setIsRipeModalOpen}
            />
            <Button
              className="guac-bg  absolute bottom-4  shadow-2xl rounded-xl p-2 top-shadow w-full z-10"
              onClick={() => {
                setIsRipeModalOpen(true);
              }}
            >
              Ripe
            </Button>
          </div>
          <div className="bg-foreground rounded-md p-2 border border-[rgba(168, 168, 168, 0.10)] w-full flex items-center justify-center">
            <span className="text-[14px] text-[#FCFCFC]">
              {" "}
              {selectedMarketPair}: ${truncateToThirdDecimal(livePrice)}
            </span>
            {/* <Input placeholder="Enter GUAC Amount To Bet Here" className="w-full"/> */}
          </div>
          <div className="flex flex-col w-full relative">
            <PositionDialog
              isDialogOpen={isRottenModalOpen}
              countDown={countDownTime}
              position={PositionSideEnum.SHORT}
              onOpenChange={setIsRottenModalOpen}
            />
            <Button
              className="earn-bg  absolute top-4  shadow-2xl rounded-xl p-2 top-shadow w-full z-10"
              onClick={() => {
                setIsRottenModalOpen(true);
              }}
            >
              Rotten
            </Button>
            <div className="flex justify-center items-center gap-4 w-full relative h-[200px]">
              <FallbackImage
                src={"/images/trade/sell.svg"}
                height={130}
                width={410}
                className="opacity-30 absolute top-[-17px] z-0"
              />
              <div className="flex justify-center items-center gap-1 z-10 pb-10">
                <FallbackImage
                  src={"/icons/earn/usd-coin-usdc-logo.svg"}
                  height={16}
                  width={16}
                />
                <span className="text-[#FFF] ">
                  {" "}
                  {ourParimutuel
                    ? AmountFormating(
                        ourParimutuel.pool.short,
                        fixedNetworkDigits
                      )
                    : "Guacking..."}
                </span>
              </div>
              <div className="flex justify-center items-center gap-1 z-10 pb-10">
                <span className="text-[#FFF]">
                  {shortPayout ? shortPayout : "Guacking..."} Payout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="w-full h-[23px] guac-bg  flex items-center justify-between p-4 rounded-t-lg">
          <span className="text-black text-sm font-medium">SOL/USD</span>
          <span className="text-black text-sm font-medium">Current Round</span>
        </div>
        <div className="w-full h-[23px]   flex items-center justify-between p-4 border border-[rgba(168, 168, 168, 0.10)]">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Pool</span>
            <FallbackImage
              src={"/icons/earn/usd-coin-usdc-logo.svg"}
              height={16}
              width={16}
              className="rounded-full"
            />
            <span className="text-muted-foreground">
              {ourLockedParimutuel &&
                AmountFormating(
                  ourLockedParimutuel.pool.poolSize,
                  fixedNetworkDigits
                )}
            </span>
          </div>
          <span className="text-muted-foreground">{countDownTime}</span>
        </div>
        <div className="flex flex-col items-center w-full gap-6 p-3 border border-[rgba(168, 168, 168, 0.10)]">
          <div className="flex justify-center items-center gap-5">
            <div className="flex justify-center items-center gap-1 z-10 ">
              <FallbackImage
                src={"/icons/earn/usd-coin-usdc-logo.svg"}
                height={16}
                width={16}
              />
              <span className="text-[#FFF]">
                {" "}
                {ourLockedParimutuel
                  ? AmountFormating(
                      ourLockedParimutuel.pool.long,
                      fixedNetworkDigits
                    )
                  : 0}
              </span>
            </div>
            <span className="text-[#FFF]">
              {longLockedPayout ? longLockedPayout : 0} Payout
            </span>
          </div>
          <div className=" w-full guac-bg h-[140px] rounded-md overflow-hidden relative flex flex-col items-center justify-center">
            <FallbackImage
              src={"/images/toast/success.png"}
              height={350}
              width={250}
              className="opacity-30 absolute top-[-60px]  z-0"
            />
            <span className="text-black text-[12px] font-normal z-10">
              Locked Price:{" "}
              {ourLockedParimutuel && difference
                ? "$ " +
                  (
                    Math.round(ourLockedParimutuel.locked.price * 1000) / 1000
                  ).toFixed(3)
                : ""}
            </span>
            <span className="text-black text-[16px] font-medium z-10">
              Ripe by
              {difference
                ? "$" + AmountFormating(difference, fixedMarketDigits)
                : "Loading..."}
            </span>
            <span className="text-black text-[12px] font-normal z-10">
              Current Price ${truncateToThirdDecimal(livePrice)}
            </span>
          </div>
          <div className="flex justify-center items-center gap-5">
            <div className="flex justify-center items-center gap-1 z-10 ">
              <FallbackImage
                src={"/icons/earn/usd-coin-usdc-logo.svg"}
                height={16}
                width={16}
              />
              <span className="text-[#FFF]">
                {" "}
                {ourLockedParimutuel
                  ? AmountFormating(
                      ourLockedParimutuel.pool.short,
                      fixedNetworkDigits
                    )
                  : 0}
              </span>
            </div>
            <span className="text-[#FFF]">
              {shortLockedPayout ? shortLockedPayout : 0} Payout
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RipeRottenForm;
