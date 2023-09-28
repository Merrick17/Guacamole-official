'use client';
import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const SelectTradingAccount = () => {
  const [amount, setAmount] = useState(0);
  return (
    <Container className="p-3 bg-background flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          Select A Trading Account
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          withdraw or Deposit {'(USDC)'}
        </p>
        <div className="bg-foreground px-5 rounded-lg">
          <Input
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter Amount"
            className="placeholder:text-[#FCFCFC] placeholder:text-sm placeholder:font-medium "
          />
        </div>
      </div>
      <Button
        size="lg"
        variant="success"
        className="font-extrabold uppercase text-xs "
      >
        deposit
      </Button>
      <Button
        size="lg"
        variant="destructive"
        className="font-extrabold uppercase text-xs"
      >
        Withdraw
      </Button>
    </Container>
  );
};

export default SelectTradingAccount;
