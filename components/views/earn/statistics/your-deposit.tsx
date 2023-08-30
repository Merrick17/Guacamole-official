import StatisticsCardContainer from './statistics-card-container';

const YourDeposit = () => {
  return (
    <StatisticsCardContainer>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">Your Deposits</p>
        <h1 className=" text-3xl font-medium ">0.00 SOL</h1>
        <p className="text-muted-foreground">0.00 vSOL</p>
      </div>
    </StatisticsCardContainer>
  );
};

export default YourDeposit;
