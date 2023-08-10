import StatisticsCardContainer from './statistics-card-container';

const YourDeposit = () => {
  return (
    <StatisticsCardContainer className="bg-[#F0FDF4]">
      <div className="flex flex-col gap-2">
        <p>Your Deposits</p>
        <h1 className="text-[#272A32] text-3xl ">0.00 SOL</h1>
        <p className="font-normal">0.00 vSOL</p>
      </div>
    </StatisticsCardContainer>
  );
};

export default YourDeposit;
