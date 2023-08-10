import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { FC } from 'react';

interface DepositFormProps {}

const DepositForm: FC<DepositFormProps> = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <header className="text-black/75 ">Enter deposit amount:</header>
      <form className="rounded-lg p-4 flex flex-row gap-4 items-center border border-[#D1D5DB]">
        <Image src="/icons/earn/sol.svg" width={32} height={32} alt="solana" />
        <div className="w-full">
          <h1 className="font-semibold">SOL</h1>
          <p className="text-black/50  text-xs ">Balance 22.936590397</p>
        </div>
        <Input
          placeholder="0.00"
          className="w-full  h-full  text-right placeholder:text-[#9CA3AF] placeholder:text-xl text-xl font-semibold"
          type="number"
        />
      </form>
      <Button size="lg">Deposit</Button>
    </div>
  );
};

export default DepositForm;
