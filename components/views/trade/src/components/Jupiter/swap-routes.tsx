import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RiRouteFill } from "react-icons/ri";
import { SwapRoute } from "../SwapRoute";
//InlineResponse200MarketInfos
import { QuoteResponse } from "@jup-ag/api";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { usePathname } from "next/navigation";

export const SwapRoutes = ({
  routes,
  bestRoute,
  tokenMap,
  outputAmount,
  selectedRoute,
  loadingRoute,
  hasRoute,
  setSelectedRoute,
  outputTokenInfo,
  quote,
}: {
  setSelectedRoute: (arg: any) => void;
  routes: any;
  bestRoute: any;
  tokenMap: any;
  outputAmount: any;
  selectedRoute: any;
  loadingRoute: boolean;
  outputTokenInfo: any;
  hasRoute: any;
  quote: QuoteResponse;
}) => {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  return (
    <Dialog open={visible} onOpenChange={() => setVisible(false)}>
      <div
        className={`flex flex-row items-center w-full overflow-hidden  ${
          pathname.includes("trade") ? "text-primary" : "text-[#BBB0DB]"
        } text-xs gap-1 w`}
        onClick={() => hasRoute && setVisible(true)}
      >
        <div className="flex items-center gap-1 bg-background rounded-xl px-2 py-1">
          {/* <span>{hasRoute ? routes.length : 0}</span> */}
          <span>{hasRoute ? quote.routePlan.length : 0}</span>
          <RiRouteFill className="-rotate-90" />
        </div>
        {hasRoute ? (
          <>
            {/* using
            <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {selectedRoute?.marketInfos?.[0]?.label}
            </span> */}
            via {quote.routePlan.map((elm) => elm.swapInfo.label).join(" , ")}
          </>
        ) : (
          <>No route found</>
        )}
      </div>
      {/* <DialogContent closeBtn={false} className="overflow-auto">
        <DialogHeader>
          <DialogTitle className="relative">
            <h2 className="text-base   text-center ">Select Route</h2>
            <AiOutlineArrowLeft
              className=" absolute w-4 h-4 top-1/2 -left-2 -translate-y-1/2 cursor-pointer"
              onClick={() => setVisible(false)}
            />
          </DialogTitle>
          <DialogDescription className="!mt-4">
            <div className="flex flex-col gap-4 px-1">
              <p className="text-xs text-muted-foreground mb-10">
                This Jupiter powered system automatically selects a route with
                the best price, however you can select a route manually.
              </p>
              {loadingRoute && (
                <div className="h-[216px]">
                  <progress className="progress h-[72px] w-full rounded-xl"></progress>
                  <progress className="progress h-[72px] w-full rounded-xl"></progress>
                  <progress className="progress h-[72px] w-full rounded-xl"></progress>
                </div>
              )}
              {!hasRoute && !loadingRoute && (
                <div className="flex flex-row justify-center">
                  <span className="mr-2 text-lg font-bold">No route found</span>
                  <img
                    className="h-[30px] w-[30px]"
                    src={"/images/no-route.png"}
                  />
                </div>
              )}
              {!loadingRoute &&
                !!bestRoute &&
                !!bestRoute.marketInfos &&
                !!outputAmount &&
                !!hasRoute && (
                  <button onClick={() => setSelectedRoute(bestRoute)}>
                    <SwapRoute
                      isBestRoute={true}
                      route={bestRoute.marketInfos}
                      tokenMap={tokenMap}
                      selected={bestRoute === selectedRoute}
                      amount={outputAmount}
                    />
                  </button>
                )}
              {!loadingRoute &&
                hasRoute &&
                routes
                  ?.slice(1)
                  ?.filter((e: any) => !!e.marketInfos && !!e.outAmount)
                  .map((r: any, idx: number) => {
                    return (
                      <button
                        onClick={() => setSelectedRoute(r)}
                        key={`route-${idx}`}
                      >
                        <SwapRoute
                          route={
                            r.marketInfos as any[]
                          }
                          tokenMap={tokenMap}
                          amount={
                            (r.outAmount as number) /
                            Math.pow(10, outputTokenInfo?.decimals || 0)
                          }
                          selected={r === selectedRoute}
                        />
                      </button>
                    );
                  })}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent> */}
    </Dialog>
  );
};
