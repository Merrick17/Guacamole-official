import StatisticsCardContainer from './statistics-card-container';

const TotalLiquidity = () => {
  return (
    <StatisticsCardContainer>
      <div className="flex  flex-row justify-between items-start  text-sm">
        <div className="flex flex-col gap-2">
          <header>
            <p className="text-muted-foreground">Total Liquidity</p>
            <h1 className=" font-semibold  text-3xl ">32,735.93 SOL</h1>
          </header>
          <p className=" text-muted-foreground">$764,829.44</p>
        </div>
        <div>
          <p className="text-muted-foreground">APY</p>
          <h1 className=" text-3xl font-semibold ">3.13%</h1>
        </div>
      </div>
    </StatisticsCardContainer>
  );
};

export default TotalLiquidity;
