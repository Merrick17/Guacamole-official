import Container from '@/components/common/container';
import { useProduct, useTrader } from '@/context/dexterity';
import { cn, timeSince } from '@/lib/utils';
import { useCallback, useEffect } from 'react';

const TableDetails = () => {
  const { selectedProduct } = useProduct();
  const {
    trader,
    cashBalance,
    setCashBalance,
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
    setOrderData,
    setPositionsData,
  } = useTrader();

  const updateAccountInfo = useCallback(async () => {
    if (!trader) return;
    const cashBalance = Number(
      trader.getExcessInitialMarginWithoutOpenOrders()
    );
    const openPositionsValue = Number(trader.getPositionValue());
    const portfolioValue = Number(trader.getPortfolioValue());
    const initialMarginReq = Number(trader.getRequiredInitialMargin());
    const maintananceMarginReq = Number(trader.getRequiredMaintenanceMargin());
    const accountHealth =
      portfolioValue > initialMarginReq * 2
        ? 'Very Healthy'
        : portfolioValue > initialMarginReq * 1.5
        ? 'Healthy'
        : portfolioValue > initialMarginReq
        ? 'Healthy, at risk'
        : portfolioValue > maintananceMarginReq * 1.5
        ? 'Unhealthy, at risk'
        : portfolioValue > maintananceMarginReq
        ? 'Very unhealthy, reduce your risk'
        : 'Liquidatable';
    const allTimePnl = Number(trader.getPnL());
    const positions = Array.from(trader.getPositions());

    setOrderData(
      //@ts-ignore
      Array.from(
        await Promise.all(trader.getOpenOrders([selectedProduct.name]))
      )
    );
    setPositionsData(positions);
    setCashBalance(cashBalance);
    setOpenPositionsValue(openPositionsValue);
    setPortfolioValue(portfolioValue);
    setInitialMarginReq(initialMarginReq);
    setMaintananceMarginReq(maintananceMarginReq);
    setAccountHealth(accountHealth);
    setAllTimePnl(allTimePnl);
    setUpdated(true);
    setAccountLeverage(portfolioValue / (portfolioValue - Math.abs(openPositionsValue)));
    setLastUpdated(Date.now());
  }, [trader, selectedProduct]); 

  useEffect(() => {
    if (trader) {
      trader.connect(updateAccountInfo, updateAccountInfo);

      return () => {
        trader.disconnect();
      };
    }
  }, [updateAccountInfo, trader]);
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
