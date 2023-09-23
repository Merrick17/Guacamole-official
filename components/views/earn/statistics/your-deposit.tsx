"use client"
import useTokenPrice from "@/hooks/useTokenPrice";
import StatisticsCardContainer from "./statistics-card-container";

const YourDeposit = ({
  uiState,
  symbol,
  decimals,
}: {
  uiState: any;
  symbol: string;
  decimals: number;
}) => {
  const {priceData} = useTokenPrice(symbol)
  return (
    <StatisticsCardContainer>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">Your Deposits</p>
        <h1 className=" text-3xl font-medium ">
          {decimals
            ? `${uiState.userTVL.toFixed(decimals)} ${symbol}`
            : 0}
        </h1>
        <p className="text-muted-foreground">$ {priceData && priceData['data'][symbol] ? `${priceData['data'][symbol].price*uiState.userTVL}`:0 } </p>
      </div>
    </StatisticsCardContainer>
  );
};

export default YourDeposit;
