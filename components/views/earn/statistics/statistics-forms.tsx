"use client"
import { FC, useState } from "react";
import StatisticsCardContainer from "./statistics-card-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DepositForm from "./deposit-form";
import WithdrawForm from "./withdraw-form";
import { TokenInfo } from "@solana/spl-token-registry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
interface IData {
  virtualPrice: number;
  tvl: number;
  userTVL: number;
  userLPBalance: number;
  userTokenBalance: number;
  strategyAllocation: {
    name: string;
    liquidity: number;
    allocation: string;
    maxAllocation: number;
  }[];
}
interface StatisticsFormsProps {
  vaultImpl: any;
  uiState: IData;
  token: TokenInfo;
  deposit: (amount: number) => void;
  withdrawBalance: (amount: number) => void;
}

const StatisticsForms: FC<StatisticsFormsProps> = ({
  vaultImpl,
  token,
  uiState,
  deposit,
  withdrawBalance,
}) => {
  const [despositAmount, setDepositAmount] = useState(0);
  const [withDrawAmount, setwithDrawAmount] = useState(0);
  return (
    <StatisticsCardContainer className="bg-foreground border border-[#1A1E1D]">
      <Tabs defaultValue="deposit" className="flex flex-col gap-6">
        <TabsList>
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>
        <TabsContent value="deposit">
         
          <div className="flex flex-col gap-6 w-full">
            <header className="text-muted-foreground ">
              Enter deposit amount:
            </header>
            <form className="rounded-lg p-4 flex flex-row gap-4 items-center bg-background ">
              {token && (
                <Image
                  src={token.logoURI}
                  width={32}
                  height={32}
                  alt="solana"
                />
              )}
              <div className="w-full">
                <h1 className="font-semibold">{token?.symbol}</h1>

                <p className="  text-xs ">
                  <span className="text-white/50">Balance </span>
                  <span className="text-white/[0.35]">
                    {uiState.userTokenBalance}
                  </span>
                </p>
              </div>
              <Input
                value={despositAmount}
                placeholder="0.00"
                className="w-full  h-full  text-right  placeholder:text-xl text-xl font-semibold"
                type="number"
                onChange={(e) => {
                  setDepositAmount(parseFloat(e.target.value));
                }}
              />
            </form>
            <Button
              size="lg"
              onClick={async () => {
                await deposit(despositAmount);
                setDepositAmount(0);
              }}
            >
              Deposit
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="withdraw">
        
          <div className="flex flex-col gap-6 w-full">
            <header className="text-muted-foreground ">
              Enter withdraw amount:
            </header>
            <form className="rounded-lg p-4 flex flex-row gap-4 items-center bg-background ">
              {token && (
                <Image
                  src={token.logoURI}
                  width={32}
                  height={32}
                  alt="solana"
                />
              )}
              <div className="w-full">
                <h1 className="font-semibold">v{token ? token.symbol : ""}</h1>
                <p className="text-muted-foreground  text-xs ">
                  Balance {uiState.userLPBalance}
                </p>
              </div>
              <Input
                value={withDrawAmount}
                placeholder="0.00"
                className="w-full  h-full  text-right  placeholder:text-xl text-xl font-semibold"
                type="number"
                step="any"
                onChange={(e) => {
                  setwithDrawAmount(parseFloat(e.target.value));
                }}
              />
            </form>
            <Button
              size="lg"
              disabled={uiState.userLPBalance == 0}
              onClick={async () => {
                await withdrawBalance(withDrawAmount);
                setwithDrawAmount(0);
              }}
            >
              Withdraw
            </Button>
          </div>
        </TabsContent>
        <footer className="flex items-center justify-between text-sm ">
          <p className="text-muted-foreground font-medium">Virtual Price</p>
          <p className="text-muted-foreground font-semibold">
            {uiState.virtualPrice}
          </p>
        </footer>
      </Tabs>
    </StatisticsCardContainer>
  );
};

export default StatisticsForms;
