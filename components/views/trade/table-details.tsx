import Container from '@/components/common/container';
import { useProduct, useTrader } from '@/context/dexterity';
import { cn, timeSince } from '@/lib/utils';
import { useCallback, useEffect } from 'react';

const TableDetails = () => {
  const { selectedProduct } = useProduct();
  const {
    cashBalance,
    openPositionsValue,
    setOpenPositionsValue,
    portfolioValue,
    setPortfolioValue,
    initialMarginReq,
    setInitialMarginReq,
    maintananceMarginReq,
    setMaintananceMarginReq,
    accountHealth,
    setAccountHealth,
    allTimePnl,
    setAllTimePnl,
    updated,
    setUpdated,
    lastUpdated,
    setLastUpdated,
    setAccountLeverage,
    accountLeverage,
    setPositionsData,
  } = useTrader();
  
  return (
    <Container className="p-3 flex flex-col gap-4 bg-background text-muted-foreground rounded-xl">
      {updated && (
        <>
          {' '}
          <div className="flex items-center justify-between">
            <p>Cash Balance</p>
            <p>${cashBalance.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Portfolio Value</p>
            <p>${portfolioValue.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Account Health</p>
            <p>{accountHealth}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Open Positions Value</p>
            <p>${openPositionsValue.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Initial Margin Req.</p>
            <p>${initialMarginReq.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Maintenance Margin Req.</p>
            <p>${maintananceMarginReq.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Account Effective Leverage:</p>
            <p>x{accountLeverage.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>All Time PnL</p>
            <p
              className={cn(
                allTimePnl > 0 ? 'text-destructive' : 'text-[#8BD796]'
              )}
            >
              ${allTimePnl.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Last Updated</p>
            <p>{timeSince(lastUpdated)}</p>
          </div>
        </>
      )}
    </Container>
  );
};

export default TableDetails;
