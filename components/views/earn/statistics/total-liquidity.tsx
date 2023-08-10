import StatisticsCardContainer from './statistics-card-container';

const TotalLiquidity = () => {
  return (
    <StatisticsCardContainer className="bg-[#F0FDF4]">
      <div className="flex  flex-row justify-between items-start font-semibold text-black/50 text-sm">
        <div className="flex flex-col gap-2">
          <header>
            <p>Total Liquidity</p>
            <h1 className="text-[#272A32] text-3xl ">Total Liquidity</h1>
          </header>
          <p className="font-normal">$764,829.44</p>
        </div>
        <div>
          <p>APY</p>
          <h1 className="text-[#272A32] text-3xl ">3.13%</h1>
        </div>
      </div>
    </StatisticsCardContainer>
  );
};

export default TotalLiquidity;
