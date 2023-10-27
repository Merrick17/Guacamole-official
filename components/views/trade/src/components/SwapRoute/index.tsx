//import { InlineResponseDefaultMarketInfos } from '@jup-ag/api';
import { TokenInfo } from "@solana/spl-token-registry";
import { formatTokens, formatRoute } from "../../utils/swap-route";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const SwapRoute = ({
  selected,
  route,
  tokenMap,
  amount,
  isBestRoute,
}: {
  selected: boolean;
  route: any[];
  tokenMap: Map<string, TokenInfo>;
  amount: number;
  isBestRoute?: boolean;
}) => {
  const pathname = usePathname();
  return (
    <div
      className={clsx(
        "relative text-[#fcfcfc] bg-background ",
        selected &&
          `border-2 ${
            pathname.includes("trade") ? "border-primary" : "border-[#BBB0DB]"
          } border-solid`,
        "rounded-xl "
      )}
    >
      {/* Badge */}
      {isBestRoute && (
        <div
          className={`absolute left-0 top-[-11px] rounded-[5px]  ${
            pathname.includes("trade") ? "bg-primary" : "bg-[#BBB0DB]"
          } px-2 py-[1px] text-sm font-bold text-primary-foreground`}
        >
          Best price
        </div>
      )}

      <div className="flex flex-row items-center justify-between   px-4 py-5 rounded-xl">
        <span className="font-normal text-xs">{formatRoute(route)}</span>
        {/* <span className="text-sm font-bold opacity-80">
            {formatTokens(tokenMap, route)}
          </span> */}
        {/* Output amount */}
        <div className="text-sm font-medium  ">{amount}</div>
      </div>
    </div>
  );
};
