import Container from '@/components/common/container';

const TableDetails = () => {
  return (
    <Container className="p-3 flex flex-col gap-4 bg-background text-muted-foreground rounded-xl">
      <div className="flex items-center justify-between">
        <p>Cash Balance</p>
        <p>$1,009.59</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Portfolio Value</p>
        <p>$1,009.914</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Account Health</p>
        <p>Very Healthy</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Open Positions Value</p>
        <p>$5.926</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Initial Margin Req.</p>
        <p>$0.324</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Maintenance Margin Req.</p>
        <p>$0.162</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Account Effective Leverage:</p>
        <p>3117.019</p>
      </div>
      <div className="flex items-center justify-between">
        <p>All Time PnL</p>
        <p>$-0.086</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Last Updated</p>
        <p>0 Seconds Ago</p>
      </div>
    </Container>
  );
};

export default TableDetails;
