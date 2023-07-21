//import { InlineResponseDefaultMarketInfos } from '@jup-ag/api';
import { TokenInfo } from '@solana/spl-token-registry';
import { formatTokens, formatRoute } from '../../utils/swap-route';
import clsx from 'clsx';

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
  return (
    <div
      className={clsx(
        'relative',
        selected && 'bg-black border-2 border-black border-solid ',
        'rounded-xl '
      )}
    >
      {/* Badge */}
      {isBestRoute && (
        <div className="absolute left-0 top-[-11px] rounded-[5px] bg-black px-2 py-[1px] text-sm font-bold text-white">
          Best price
        </div>
      )}

      <div className="flex flex-row items-center justify-between  bg-[#E5E7EB] px-4 py-5 rounded-xl">
        <span className="font-normal text-xs">{formatRoute(route)}</span>
        {/* <span className="text-sm font-bold opacity-80">
            {formatTokens(tokenMap, route)}
          </span> */}
        {/* Output amount */}
        <div className="text-sm font-medium  text-black">{amount}</div>
      </div>
    </div>
  );
};
