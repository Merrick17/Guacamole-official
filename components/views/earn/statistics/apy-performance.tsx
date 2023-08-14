import ApyPerformanceChart from './apy-performance-chart';
import StatisticsCardContainer from './statistics-card-container';

const ApyPerformance = () => {
  return (
    <StatisticsCardContainer className="flex flex-col h-full gap-6">
      <header className="text-lg font-semibold">APY Performance</header>
      <ApyPerformanceChart />
    </StatisticsCardContainer>
  );
};

export default ApyPerformance;
