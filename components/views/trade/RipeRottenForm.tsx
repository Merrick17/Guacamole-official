import FallbackImage from "@/components/common/FallbackImage";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import NavigationList from "@/components/ui/navigation-list";
import React from "react";

const RipeRottenForm = () => {
  return (
    <Container className="bg-background px-5 py-7  flex flex-col gap-5 col-span-2 ">
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
              src={"/images/logo.png"}
              height={16}
              width={16}
              className="rounded-full"
            />
            <span className="text-muted-foreground">300.00m</span>
          </div>
          <span className="text-muted-foreground">0:19</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 border border-[rgba(168, 168, 168, 0.10)] p-5">
          <div className="flex flex-col w-full relative">
            <div className="flex justify-center items-center gap-4 w-full relative h-[200px]">
              <FallbackImage
                src={"/images/trade/buy.svg"}
                height={90}
                width={410}
                className="opacity-30 absolute bottom-0 z-0"
              />
              <div className="flex justify-center items-center gap-1 z-10 ">
                <FallbackImage
                  src={"/images/guac_token.png"}
                  height={16}
                  width={16}
                />
                <span className="text-[#FFF]">150.0m</span>
              </div>
              <div className="flex justify-center items-center gap-1 z-10">
                <span className="text-[#FFF]">1.91x Payout</span>
              </div>
            </div>
            <Button className="guac-bg  absolute bottom-0  shadow-2xl rounded-xl p-2 top-shadow w-full z-10">
              Ripe
            </Button>
          </div>
          <div className="flex flex-col w-full relative">
            <Button className="earn-bg  absolute top-0  shadow-2xl rounded-xl p-2 top-shadow w-full z-10">
              Rotten
            </Button>
            <div className="flex justify-center items-center gap-4 w-full relative h-[200px]">
              <FallbackImage
                src={"/images/trade/sell.svg"}
                height={90}
                width={410}
                className="opacity-30 absolute bottom-0 z-0"
              />
              <div className="flex justify-center items-center gap-1 z-10">
                <FallbackImage
                  src={"/images/guac_token.png"}
                  height={16}
                  width={16}
                />
                <span className="text-[#FFF]">150.0m</span>
              </div>
              <div className="flex justify-center items-center gap-1 z-10">
                <span className="text-[#FFF]">1.91x Payout</span>
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
              src={"/images/logo.png"}
              height={16}
              width={16}
              className="rounded-full"
            />
            <span className="text-muted-foreground">300.00m</span>
          </div>
          <span className="text-muted-foreground">0:19</span>
        </div>
        <div className="flex flex-col items-center w-full gap-6 p-3 border border-[rgba(168, 168, 168, 0.10)]">
          <div className="flex justify-center items-center gap-5">
            <div className="flex justify-center items-center gap-1 z-10 ">
              <FallbackImage
                src={"/images/guac_token.png"}
                height={16}
                width={16}
              />
              <span className="text-[#FFF]">150.0m</span>
            </div>
            <span className="text-[#FFF]">2.17x Payout</span>
          </div>
          <div className=" w-full guac-bg h-[97px] rounded-md overflow-hidden relative flex flex-col items-center justify-center">
            <FallbackImage
              src={"/images/toast/success.png"}
              height={350}
              width={250}
              className="opacity-30 absolute top-[-60px]  z-0"
            />
            <span className="text-black text-[12px] font-normal z-10">
              Locked Price $60.5518
            </span>
            <span className="text-black text-[16px] font-medium z-10">
              Ripe by $0.0175
            </span>
            <span className="text-black text-[12px] font-normal z-10">
              Last Price $60.5692
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RipeRottenForm;
