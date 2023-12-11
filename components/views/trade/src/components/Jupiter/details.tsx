import { cn } from "@/lib/utils";
import { QuoteResponse } from "@jup-ag/api";
import { RouteInfo, SwapMode } from "@jup-ag/react-hook";
import { TokenInfo } from "@solana/spl-token-registry";
import { useMemo } from "react";
import { formatNumber } from "../../misc/utils";
import ExchangeRate from "./ExchangeRate";

const Details = ({
  selectRoute,
  toTokenInfo,
  fromTokenInfo,
  routes,
  loading,
  quoteResponse,
}: {
  loading: boolean;
  routes: RouteInfo[];
  fromTokenInfo: TokenInfo;
  selectRoute: any;
  toTokenInfo: TokenInfo;
  quoteResponse: QuoteResponse;
}) => {
  // const rateParams = {
  //   inAmount: selectRoute?.inAmount || routes?.[0]?.inAmount || ZERO, // If there's no selectedRoute, we will use first route value to temporarily calculate
  //   inputDecimal: fromTokenInfo.decimals || 0,
  //   outAmount: selectRoute?.outAmount || routes?.[0]?.outAmount || ZERO, // If there's no selectedRoute, we will use first route value to temporarily calculate
  //   outputDecimal: toTokenInfo?.decimals || 0,
  // };
  const rateParams = {
    inAmount: quoteResponse
      ? Number(quoteResponse.inAmount) / Math.pow(10, fromTokenInfo.decimals)
      : 0,
    outAmount: quoteResponse
      ? Number(quoteResponse.outAmount) / Math.pow(10, toTokenInfo.decimals)
      : 0,
    inputDecimal: fromTokenInfo.decimals || 0,
    outputDecimal: toTokenInfo?.decimals || 0,
  };
  const priceImpact = quoteResponse ? Number(quoteResponse.priceImpactPct) : 0;
  // const priceImpact = formatNumber.format(
  //   new Decimal(selectRoute?.priceImpactPct || 0).mul(100).toDP(4).toNumber()
  // );
  const priceImpactText =
    Number(priceImpact) < 0.1
      ? `< ${formatNumber.format(0.1)}%`
      : `~ ${priceImpact}%`;

  // const otherAmountThresholdText = useMemo(() => {
  //   if (!toTokenInfo || !selectRoute) return "-";
  //   if (selectRoute?.otherAmountThreshold) {
  //     const amount = new Decimal(
  //       selectRoute.otherAmountThreshold.toString()
  //     ).div(Math.pow(10, toTokenInfo.decimals));

  //     const amountText = formatNumber.format(amount.toNumber());
  //     return `${amountText} ${toTokenInfo.symbol}`;
  //   }
  //   return "-";
  // }, [selectRoute]);
  const otherAmountThresholdText = useMemo(() => {
    if (!toTokenInfo || !quoteResponse) return "-";
    if (quoteResponse?.otherAmountThreshold) {
      const amount =
        Number(quoteResponse.otherAmountThreshold) /
        Math.pow(10, toTokenInfo.decimals);
      // const amount = new Decimal(
      //   selectRoute.otherAmountThreshold.toString()
      // ).div(Math.pow(10, toTokenInfo.decimals));

      const amountText = formatNumber.format(amount);
      return `${amountText} ${toTokenInfo.symbol}`;
    }
    return "-";
  }, [quoteResponse]);
  return (
    <div
      className={cn("mt-4 space-y-4 border border-background rounded-xl p-3")}
    >
      <div className="flex items-center justify-between text-xs ">
        <div className="text-muted-foreground">{<span>Rate</span>}</div>
        {rateParams.inAmount > 0 && rateParams.outAmount > 0 ? (
          <ExchangeRate
            loading={loading}
            rateParams={rateParams}
            fromTokenInfo={fromTokenInfo}
            toTokenInfo={toTokenInfo}
            reversible={true}
          />
        ) : (
          <span className="text-muted-foreground">{"-"}</span>
        )}
        {/* {JSBI.greaterThan(rateParams.inAmount, ZERO) &&
        JSBI.greaterThan(rateParams.outAmount, ZERO) ? (
          <ExchangeRate
            loading={loading}
            rateParams={rateParams}
            fromTokenInfo={fromTokenInfo}
            toTokenInfo={toTokenInfo}
            reversible={true}
          />
        ) : (
          <span className="text-muted-foreground">{"-"}</span>
        )} */}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div>
          <span>Price Impact</span>
        </div>
        <div>{priceImpactText}</div>
      </div>

      <div className="flex items-center justify-between text-xs  text-muted-foreground ">
        <div className="">
          {/* {selectRoute?.swapMode === SwapMode.ExactIn ? (
            <span>Minimum Received</span>
          ) : (
            <span>Maximum Consumed</span>
          )} */}
          {quoteResponse?.swapMode == SwapMode.ExactIn ? (
            <span>Minimum Received</span>
          ) : (
            <span>Maximum Consumed</span>
          )}
        </div>
        <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {otherAmountThresholdText}
        </div>
      </div>
    </div>
  );
};

export default Details;
