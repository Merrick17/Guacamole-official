"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useWalletTokens from "@/lib/tokens/useWalletTokens";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Image from "next/image";
import { useEffect, useState } from "react";

const formSchema = z.object({
  stake: z.boolean(),
  amount: z.number().positive(),
});

const NftStakeForm = () => {
  const [solBalance, setSolBalance] = useState(0);
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const walletTokens = useWalletTokens();
  const [guacInfo, setGuacInfo] = useState(null);
  //AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR
  const fetchSolBalance = async () => {
    try {
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {}
  };
  useEffect(() => {
    if (connected && publicKey) {
      console.log("Wallet", walletTokens);
      const msSol = walletTokens.find(
        (elm) =>
          elm.account.mint.toBase58() ==
          "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR"
      );
      //console.log("MsOL",msSol)
      setGuacInfo(msSol);
      fetchSolBalance();
    }
  }, [publicKey, walletTokens]);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stake: true,
      amount: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
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
                    onClick={() => form.setValue("stake", true)}
                    variant={
                      form.watch("stake") === true ? "default" : "secondary"
                    }
                  >
                    Stake GUAC
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
                    onClick={() => form.setValue("stake", false)}
                    variant={
                      form.watch("stake") === false ? "default" : "secondary"
                    }
                  >
                    Unstake GUAC
                  </Button>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <p className="text-muted-foreground">Enter deposit amount:</p>

        <div className="rounded-lg p-4 flex flex-row gap-4 items-center bg-background ">
          <Image src={"/images/logo.png"} width={32} height={32} alt="solana" />
          <div className="w-full">
            <h1 className="font-semibold">
            GUAC
            </h1>
            <p className=" text-xs ">
              <span className="text-white/50">Balance </span>
              <span className="text-white/[0.35]">
                {connected && guacInfo
                  ? Number(guacInfo.account.amount) /
                    Math.pow(10, guacInfo.decimals)
                  : 0}
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
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button disabled variant="secondary">
          Coming Soon
        </Button>
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <p>Estimated Points Per Day</p>
          <p>--</p>
        </div>
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <p>Points to required for NFT</p>
          <p>--</p>
        </div>
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <p>Total GUAC Staked In Pool</p>
          <p>--</p>
        </div>
      </form>
      <div className="p-6 w-full">
        <Button
          size="lg"
          className="w-full"
          variant="secondary"
         
        >
          <p className="text-primary">Contents Of This Pool Not Loaded Yet.</p>
        </Button>
      </div>
    </Form>
  );
};

export default NftStakeForm;
