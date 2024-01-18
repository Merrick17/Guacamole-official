"use client";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Metadata } from "next";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  stake: z.boolean(),
  amount: z.number().positive(),
});

const Page = async () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stake: true,
      amount: 1,
    },
  });
  const onSubmit = (data) => {};
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-3 lg:px-8 py-6 md:px-16 md:py-12   max-w-2xl ">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md ">
        {/* <EarnHeader
          title="Dynamic SOL Vault"
          tutorialLink="https://docs.guacamole.gg/products-and-features/earn/liquid-solana-staking"
          hideSecondBtn
        /> */}
        <hr className="border-dashed border-background" />
        <Container className="p-5 font-medium bg-background flex flex-col justify-center items-center gap-1">
          <p className="text-[#FFFF] text-3xl">Solana Play Pool</p>
          <h1 className=" text-[#A8A8A8] text-[20px]">
            LP Price <span className="text-[#8BD796]"> 1.021 SOL</span>
          </h1>
        </Container>
        <Container className="w-full rounded-lg bg-background p-6  flex flex-row items-center justify-between relative overflow-hidden">
          <Image
            src="/images/play/bg/main.gif"
            width={350}
            height={400}
            alt="guac background"
            className="-z-0 absolute sm:translate-x-[40%] right-0 rotate-[18deg] opacity-30  "
          />
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">
              Your SOL Pool Deposits
            </p>
            <h1 className=" text-3xl font-medium text-[#FFFF]"> 102.42 SOL</h1>
            <p className="text-muted-foreground text-xs">$2,042.34</p>
          </div>
          {/* <Button className="text-[#8BD796] bg-foreground font-medium px-4 py-2 rounded-lg">
          {vaultInfo ? `${vaultInfo.long_apy.toFixed(3)}%` : "N/A"} APY
        </Button> */}
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
                        className={`${
                          form.watch("stake") === true ? "game-btn" : ""
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
                          form.watch("stake") === false ? "game-btn" : ""
                        } w-full`}
                        size="sm"
                        type="button"
                        onClick={() => form.setValue("stake", false)}
                        variant={
                          form.watch("stake") === false
                            ? "default"
                            : "secondary"
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

            <div className="rounded-lg p-4 flex flex-row gap-4 items-center h-[75px] bg-background border-[1px] border-[rgba(168, 168, 168, 0.10)]">
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
                  <span className="text-white/[0.35]"></span>
                </p>
              </div>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className=" ">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="0.00"
                        className="w-full    text-right  placeholder:text-xl text-xl font-semibold"
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
            <Button type="submit" className="guac-bg h-14">
              Deposit SOL to Play Pool
            </Button>
          </form>
        </Form>
        <div className="flex flex-col gap-4 p-3 rounded-lg text-sm text-muted-foreground border border-[#1A1E1D]">
          <div className="flex items-center justify-between">
            <p>Total Pool Liquidity</p>
            <p>32,735.93 SOL</p>
          </div>
          <div className="flex items-center justify-between">
            <p>LP Token Supply</p>
            <p>32,735.93 SOL</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Max Payout</p>
            <p>1 SOL</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 justify-center items-center">
              <p>Circulating Bonus </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M7.7 3.5H6.3V6.3H3.5V7.7H6.3V10.5H7.7V7.7H10.5V6.3H7.7V3.5ZM7 0C3.136 0 0 3.136 0 7C0 10.864 3.136 14 7 14C10.864 14 14 10.864 14 7C14 3.136 10.864 0 7 0ZM7 12.6C3.913 12.6 1.4 10.087 1.4 7C1.4 3.913 3.913 1.4 7 1.4C10.087 1.4 12.6 3.913 12.6 7C12.6 10.087 10.087 12.6 7 12.6Z"
                  fill="#FFE81B"
                />
              </svg>
            </div>

            <p>100 SOL</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 justify-center items-center">
              <p>Jackpot </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M7.7 3.5H6.3V6.3H3.5V7.7H6.3V10.5H7.7V7.7H10.5V6.3H7.7V3.5ZM7 0C3.136 0 0 3.136 0 7C0 10.864 3.136 14 7 14C10.864 14 14 10.864 14 7C14 3.136 10.864 0 7 0ZM7 12.6C3.913 12.6 1.4 10.087 1.4 7C1.4 3.913 3.913 1.4 7 1.4C10.087 1.4 12.6 3.913 12.6 7C12.6 10.087 10.087 12.6 7 12.6Z"
                  fill="#FFE81B"
                />
              </svg>
            </div>

            <p>100 SOL</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Total Plays </p>
            <p>7,421</p>
          </div>
        </div>
        <div className="flex items-center justify-center w-full gap-3">
          <Button type="submit" className="w-full h-14" variant="secondary">
            <p className="text-primary">View Pool Program Details</p>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Page;
