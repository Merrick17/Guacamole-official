"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { MarinadeUtils } from "@marinade.finance/marinade-ts-sdk";
import { WalletError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import useMarinadeData from "@/hooks/use-marinade-data";
import numeral from "numeral";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useMarinade } from "@/context/Marinade";
import useWalletTokens from "@/lib/tokens/useWalletTokens";
const formSchema = z.object({
  stake: z.boolean(),
  amount: z.number().positive(),
});

const LiquidityStackingForm = () => {
  const [solBalance, setSolBalance] = useState<number>(0);
  const [mSolData, setMSolData] = useState(null);
  const { connected, publicKey, sendTransaction } = useWallet();
  const { toast } = useToast();
  const { data, isLoading } = useMarinadeData();
  const { connection } = useConnection();
  const { marinade } = useMarinade();
  const walletTokens = useWalletTokens();

  const fetchSolBalance = async () => {
    try {
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {}
  };
  useEffect(() => {
    if (connected && publicKey) {
     
      const msSol = walletTokens.find(
        (elm) =>
          elm.account.mint.toBase58() ==
          "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"
      );
     
      setMSolData(msSol);
      fetchSolBalance();
    }
  }, [publicKey, isLoading, walletTokens]);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stake: true,
      amount: 1,
    },
  });
  const stakeSol = async () => {
    try {
      const { transaction } = await marinade.deposit(
        MarinadeUtils.solToLamports(form.getValues("amount"))
      );
      const transactionSignature = await sendTransaction(
        transaction,
        connection,
        { skipPreflight: true }
      );

      toast({
        variant: "success",
        title: "Success",
        description: (
          <div className="flex flex-col gap-2">
            <p>Your SOL has been staked!</p>
            <Link
              href={`https://solscan.com/tx/${transactionSignature}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-5 py-2 uppercase text-sm rounded-md text-center"
            >
              View on solscan
            </Link>
          </div>
        ),
      });
    } catch (err) {
      console.log("Error", err);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
    }
  };
  const unstakeSol = async () => {
    try {
      const { transaction } = await marinade.liquidUnstake(
        MarinadeUtils.solToLamports(form.getValues("amount"))
      );
      const transactionSignature = await sendTransaction(
        transaction,
        connection
      );
      toast({
        variant: "success",
        title: "Success",
        description: (
          <div className="flex flex-col gap-2">
            <p>Your SOL has been staked!</p>
            <Link
              href={`https://solscan.com/tx/${transactionSignature}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-5 py-2 uppercase text-sm rounded-md text-center"
            >
              View on solscan
            </Link>
          </div>
        ),
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values.stake) {
      console.log(values);
      await stakeSol();
    } else {
      await unstakeSol();
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-6 rounded-lg border border-[#1A1E1D]"
        >
          <div className="flex items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="stake"
              render={({ field }) => (
                <FormItem className="w-full p-0">
                  <FormControl>
                    <Button
                      className={`${
                        form.watch("stake") === true ? "earn-bg" : ""
                      } w-full`}
                      size="sm"
                      type="button"
                      onClick={() => form.setValue("stake", true)}
                      variant={
                        form.watch("stake") === true ? "default" : "secondary"
                      }
                    >
                      Stake SOL
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stake"
              render={({ field }) => (
                <FormItem className="w-full p-0">
                  <FormControl>
                    <Button
                      className={`${
                        form.watch("stake") === false ? "earn-bg" : ""
                      } w-full`}
                      size="sm"
                      type="button"
                      onClick={() => form.setValue("stake", false)}
                      variant={
                        form.watch("stake") === false ? "default" : "secondary"
                      }
                    >
                      Unstake mSOL
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <p className="text-muted-foreground">Enter deposit amount:</p>

          <div className="rounded-lg p-4 flex flex-row gap-4 items-center bg-background ">
            <Image
              src={
                form.getValues("stake") == true
                  ? "/icons/earn/sol.svg"
                  : "/images/msol_logo_guac.png"
              }
              width={32}
              height={32}
              alt="solana"
            />
            <div className="w-full">
              <h1 className="font-semibold">
                {form.getValues("stake") == true ? "SOL" : "mSOL"}
              </h1>
              <p className="text-xs ">
                <span className="text-white/50">Balance </span>
                <span className="text-white/[0.35]">
                  {" "}
                  {/* {!connected ? "connect to display balance" :  solBalance} */}
                  {connected
                    ? form.getValues("stake") == true
                      ? solBalance
                      : mSolData &&
                        Number(mSolData.account.amount) /
                          Math.pow(10, mSolData.decimals)
                    : "connect to display balance"}
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
                      {...field}
                      placeholder="0.00"
                      className="w-full  h-full  text-right  placeholder:text-xl text-xl font-semibold"
                      type="number"
                      onChange={(e) => {
                        const numericValue = parseFloat(e.target.value);
                        field.onChange(numericValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="earn-bg">
            {form.watch("stake") === true ? "Stake" : "Unstake"} SOL for mSOL
          </Button>
          <div className="flex items-center justify-between text-muted-foreground text-sm">
            <p>You Will Receive</p>
            <p>
              {!isLoading && data["currentPrice"]
                ? form.getValues("stake") == false
                  ? (form.watch("amount") * data["currentPrice"]).toFixed(3)
                  : (form.watch("amount") / data["currentPrice"]).toFixed(3)
                : "--"}
            </p>
          </div>
        </form>
      </Form>
      <div className="flex flex-col gap-4 p-3 rounded-lg text-sm text-muted-foreground border border-[#1A1E1D]">
        <div className="flex items-center justify-between">
          <p>Total SOL Staked</p>
          <p>
            {!isLoading &&
              data &&
              numeral(data["tlv"].staked_sol).format("0,0")}{" "}
            SOL
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>Total mSOL Supply</p>
          <p>
            {!isLoading && data && numeral(data["totalSupply"]).format("0,0")}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>Shared Between</p>
          <p>130 Validators</p>
        </div>
      </div>
    </>
  );
};

export default LiquidityStackingForm;
