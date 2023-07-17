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
        selected && 'bg-[#97D19C]',
        'rounded-[6px] p-[2px]',
        'animate-gradient-x'
      )}
    >
      {/* Badge */}
      {isBestRoute && (
        <div className="absolute right-0 top-[-11px] rounded-[5px] bg-[#97D19C] px-2 py-[1px] text-sm font-bold text-white">
          Best price
        </div>
      )}

      <div className="flex flex-row items-center justify-between rounded-[5px] bg-[#E5E7EB] p-3">
        <div className="flex flex-col">
          <span className="font-bold text-black">{formatRoute(route)}</span>
          <span className="text-sm font-bold opacity-80">
            {formatTokens(tokenMap, route)}
          </span>
        </div>
        {/* Output amount */}
        <div className="text-xl font-bold">{amount}</div>
      </div>
    </div>
  );
};
