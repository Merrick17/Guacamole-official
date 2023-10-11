import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { FC } from 'react';

interface DepositFormProps {}

const DepositForm: FC<DepositFormProps> = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <header className="text-muted-foreground ">Enter deposit amount:</header>
      <form className="rounded-lg p-4 flex flex-row gap-4 items-center bg-background ">
        <Image src="/icons/earn/sol.svg" width={32} height={32} alt="solana" />
        <div className="w-full">
          <h1 className="font-semibold">SOL</h1>

          <p className="  text-xs ">
            <span className="text-white/50">Balance </span>
            <span className="text-white/[0.35]">22.936590397</span>
          </p>
        </div>
        <Input
          placeholder="0.00"
          className="w-full  h-full  text-right  placeholder:text-xl text-xl font-semibold"
          type="number"
        />
      </form>
      <Button size="lg">Deposit</Button>
    </div>
  );
};

export default DepositForm;
