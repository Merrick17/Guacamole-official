"use client";
import { FC, useState } from "react";
import StatisticsCardContainer from "./statistics-card-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DepositForm from "./deposit-form";
import WithdrawForm from "./withdraw-form";
import { TokenInfo } from "@solana/spl-token-registry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import numeral from "numeral";
import * as z from "zod";
import useTokenPrice from "@/hooks/useTokenPrice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Container from "@/components/common/container";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LiquidityAllocation from "./liquidity-allocation";
import { Modal } from "../../play/Modal";
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
const formSchema = z.object({
  depositOrWithdraw: z.boolean(),
  amount: z.number().positive(),
});
interface StatisticsFormsProps {
  vaultImpl: any;
  uiState: IData;
  token: TokenInfo;
  deposit: (amount: number) => void;
  withdrawBalance: (amount: number) => void;
  vaultInfo?: any;
}

const StatisticsForms: FC<StatisticsFormsProps> = ({
  vaultImpl,
  token,
  uiState,
  deposit,
  withdrawBalance,
  vaultInfo,
}) => {
  const { loading, priceData } = useTokenPrice(token ? token.symbol : "USDC");
  const [showDetails, setShowDetails] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      depositOrWithdraw: true,
      amount: 1,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.depositOrWithdraw) {
      await deposit(values.amount);
    } else {
      await withdrawBalance(values.amount);
    }
  }
  return (
    <>
      {showDetails && (
        <Modal
          onClose={() => {
            setShowDetails(false);
          }}
        >
          <LiquidityAllocation
            allocations={uiState.strategyAllocation}
            symbol={token ? token.symbol : ""}
          />
        </Modal>
      )}
      <div className="w-full bg-background p-2 rounded-lg">
        <p className="text-center text-muted-foreground">
          Dynamic {token ? token.symbol : ""} Lending Vault
        </p>
      </div>
      <Container className="w-full rounded-lg bg-background p-6  flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">
            Your {token ? token.symbol : ""} Vault Deposits
          </p>
          <h1 className=" text-3xl font-medium ">
            {" "}
            {uiState.userLPBalance} {token ? token.symbol : ""}
          </h1>
          <p className="text-muted-foreground text-xs">
            $
            {!loading && priceData && token && priceData["data"][token.symbol]
              ? numeral(
                  priceData["data"][token.symbol].price * uiState.userLPBalance
                ).format("0,0.000")
              : 0}
          </p>
        </div>
        <Button className="text-muted-foreground bg-foreground font-medium px-4 py-2 rounded-lg">
          {vaultInfo ? vaultInfo.long_apy.toFixed(3) : "N/A"}
        </Button>
      </Container>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-6 rounded-lg border border-[#1A1E1D]"
        >
          <div className="flex items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="depositOrWithdraw"
              render={({ field }) => (
                <FormItem className="w-full p-0">
                  <FormControl>
                    <Button
                      className="w-full"
                      size="sm"
                      type="button"
                      onClick={() => form.setValue("depositOrWithdraw", true)}
                      variant={
                        form.watch("depositOrWithdraw") === true
                          ? "default"
                          : "secondary"
                      }
                    >
                      Deposit {token ? token.symbol : ""}
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="depositOrWithdraw"
              render={({ field }) => (
                <FormItem className="w-full p-0">
                  <FormControl>
                    <Button
                      className="w-full"
                      size="sm"
                      type="button"
                      onClick={() => form.setValue("depositOrWithdraw", false)}
                      variant={
                        form.watch("depositOrWithdraw") === false
                          ? "default"
                          : "secondary"
                      }
                    >
                      Withdraw {token ? token.symbol : ""}
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {form.watch("depositOrWithdraw") ? (
            <>
              <header className="text-muted-foreground">
                Enter deposit amount:
              </header>

              <div className="rounded-lg p-4 flex flex-row gap-4 items-center bg-background ">
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
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="0.00"
                          className="w-full  h-full  text-right  placeholder:text-xl text-xl font-semibold"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button size="lg" type="submit">
                Deposit
              </Button>
            </>
          ) : (
            <>
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
                  <h1 className="font-semibold">{token ? token.symbol : ""}</h1>

                  <p className="  text-xs ">
                    <span className="text-white/50">Balance </span>
                    <span className="text-white/[0.35]">
                      {uiState.userLPBalance}
                    </span>
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="0.00"
                          className="w-full  h-full  text-right  placeholder:text-xl text-xl font-semibold"
                          type="number"
                          step="any"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
              <Button size="lg" disabled={uiState.userLPBalance == 0}>
                Withdraw
              </Button>
            </>
          )}
        </form>
      </Form>
      <div className="flex flex-col gap-4 p-3 rounded-lg text-sm text-muted-foreground border border-[#1A1E1D]">
        <footer className="flex items-center justify-between text-sm ">
          <p className="text-muted-foreground font-medium">Virtual Price</p>
          <p className="text-muted-foreground font-semibold">
            {uiState.virtualPrice}
          </p>
        </footer>
      </div>
      <div className="p-6 w-full">
        <Button
          size="lg"
          className="w-full"
          variant="secondary"
          onClick={() => {
            setShowDetails(true);
          }}
        >
          <p className="text-primary">View Vault Allocation Breakdown</p>
        </Button>
      </div>
    </>
  );
};

export default StatisticsForms;
