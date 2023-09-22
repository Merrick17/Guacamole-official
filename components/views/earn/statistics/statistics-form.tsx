'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { MarinadeUtils } from '@marinade.finance/marinade-ts-sdk';
import { WalletError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useMarinadeData from '@/hooks/use-marinade-data';
import numeral from 'numeral';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useMarinade } from '@/context/Marinade';
import Container from '@/components/common/container';
const formSchema = z.object({
  stake: z.boolean(),
  amount: z.number().positive(),
});

const StatisticsForm = () => {
  const [solBalance, setSolBalance] = useState<number>(0);
  const { connected, publicKey, sendTransaction } = useWallet();
  const { toast } = useToast();
  const { data, isLoading } = useMarinadeData();
  const { connection } = useConnection();
  const { marinade } = useMarinade();

  const fetchSolBalance = async () => {
    try {
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {}
  };
  useEffect(() => {
    console.log('Data', data);
    if (connected && publicKey) {
      fetchSolBalance();
    }
  }, [publicKey, isLoading]);
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
      console.log('Val', form.getValues('amount'));
      const { transaction } = await marinade.deposit(
        MarinadeUtils.solToLamports(form.getValues('amount'))
      );
      const transactionSignature = await sendTransaction(
        transaction,
        connection,
        { skipPreflight: true }
      );
      console.log('TX', transactionSignature);
      toast({
        variant: 'success',
        title: 'Success',
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
      console.log('Error', err);
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
    }
  };
  const unstakeSol = async () => {
    try {
      const { transaction } = await marinade.liquidUnstake(
        MarinadeUtils.solToLamports(form.getValues('amount'))
      );
      const transactionSignature = await sendTransaction(
        transaction,
        connection
      );
      toast({
        variant: 'success',
        title: 'Success',
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
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form submitted with values:', values);
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
      <div className="w-full bg-background p-2 rounded-lg">
        <p className="text-center text-muted-foreground">
          Dynamic SOL Lending Vault
        </p>
      </div>
      <Container className="w-full rounded-lg bg-background p-6  flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">
            Your SOL Vault Deposits
          </p>
          <h1 className=" text-3xl font-medium ">102.42 SOL</h1>
          <p className="text-muted-foreground text-xs">$2,042.34</p>
        </div>
        <div className="bg-foreground font-medium px-4 py-2 rounded-lg">
          <p>2.32% APY</p>
        </div>
      </Container>
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
                      className="w-full"
                      size="sm"
                      type="button"
                      onClick={() => form.setValue('stake', true)}
                      variant={
                        form.watch('stake') === true ? 'default' : 'secondary'
                      }
                    >
                      Deposit SOL
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
                      className="w-full"
                      size="sm"
                      type="button"
                      onClick={() => form.setValue('stake', false)}
                      variant={
                        form.watch('stake') === false ? 'default' : 'secondary'
                      }
                    >
                      Withdraw SOL
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <p className="text-muted-foreground">Enter deposit amount:</p>

          <div className="rounded-lg p-4 flex flex-row gap-4 items-center bg-background ">
            <Image
              src="/icons/earn/sol.svg"
              width={32}
              height={32}
              alt="solana"
            />
            <div className="w-full">
              <h1 className="font-semibold">SOL</h1>
              <p className="text-xs ">
                <span className="text-white/50">Balance </span>
                <span className="text-white/[0.35]">
                  {' '}
                  {!connected ? 'connect to display balance' : solBalance}
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
          <Button size="lg" type="submit">
            DEPOSIT SOL
          </Button>
        </form>
      </Form>
      <div className="flex flex-col gap-4 p-3 rounded-lg text-sm text-muted-foreground border border-[#1A1E1D]">
        <div className="flex items-center justify-between">
          <p>Total Vault Liquidity</p>
          <p>32,735.93 SOL</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Virtual Token Price</p>
          <p>1.042058371</p>
        </div>
      </div>
      <div className="p-6 w-full">
        <Button size="lg" className="w-full">
          View Vault Allocation Breakdown
        </Button>
      </div>
    </>
  );
};

export default StatisticsForm;
