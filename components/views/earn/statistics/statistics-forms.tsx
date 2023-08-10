import { FC } from 'react';
import StatisticsCardContainer from './statistics-card-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DepositForm from './deposit-form';
import WithdrawForm from './withdraw-form';

interface StatisticsFormsProps {}

const StatisticsForms: FC<StatisticsFormsProps> = () => {
  return (
    <StatisticsCardContainer>
      <Tabs defaultValue="deposit" className="flex flex-col gap-6">
        <TabsList>
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>
        <TabsContent value="deposit">
          <DepositForm />
        </TabsContent>
        <TabsContent value="withdraw">
          <WithdrawForm />
        </TabsContent>
        <footer className="flex items-center justify-between text-sm ">
          <p className="text-black/50 font-medium">Virtual Price</p>
          <p className="text-black/75 font-semibold">1.042058371</p>
        </footer>
      </Tabs>
    </StatisticsCardContainer>
  );
};

export default StatisticsForms;
