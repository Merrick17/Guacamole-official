import Container from '@/components/common/container';
import CoinChart from './coin-chart';

const SwapCharts = () => {
  return (
    <Container className="py-10 px-14 flex flex-col gap-10">
      <CoinChart />
      <CoinChart />
    </Container>
  );
};

export default SwapCharts;
