"use client";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { SelectTraderAccounts } from "@/components/common/TraderAccountDropDown";
import { useWallet } from "@solana/wallet-adapter-react";
import { useManifest, useProduct, useTrader } from "@/context/dexterity";
import { DexterityWallet } from "@hxronetwork/dexterity-ts";
import { useEffect, useMemo, useState } from "react";
import PreceptualModal from "@/components/common/PreceptualModal";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import NavigationList from "@/components/ui/navigation-list";
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const formSchema = z.object({
  upOrDown: z.boolean(),
  tradeQuantity: z.string(),
  slippage: z.string(),
  size: z.string(),
});
const PerpetualsForm = () => {
  const [tab, setTab] = useState<"future" | "spot" | "swap">("spot");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upOrDown: true,
      tradeQuantity: "0",
      slippage: "0",
      size: "0",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const { publicKey, signTransaction, signAllTransactions, connected } =
    useWallet();
  const { manifest } = useManifest();
  const { trader } = useTrader();
  const [isOpen, setIsOpen] = useState(false);
  const { selectedProduct, setIndexPrice, setMarkPrice } = useProduct();

  useMemo(async () => {
    const DexWallet: DexterityWallet = {
      publicKey,
      signTransaction,
      signAllTransactions,
    };
    manifest?.setWallet(DexWallet);
  }, [publicKey, manifest, trader]);

  useEffect(() => {}, [trader, setIndexPrice, setMarkPrice]);
  return (
    <>
      {isOpen && (
        <PreceptualModal
          isOpen={isOpen}
          handleClose={() => {
            setIsOpen(false);
          }}
        />
      )}
      <Container className="bg-background px-5 py-7  flex flex-col gap-5 col-span-2 ">
        <div className="flex items-center justify-between">
          <NavigationList filter="Trade" />

          {!connected ? (
            <WalletMultiButtonDynamic
              startIcon={undefined}
              className="!rounded-lg  h-7 px-3 py-[6px] font-normal text-sm hidden lg:flex bg-primary text-primary-foreground hover:!bg-primary"
            />
          ) : (
            <>
              {" "}
              <Button
                className=" h-7 rounded-lg text-sm"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Deposit / Withdraw
              </Button>
            </>
          )}
        </div>
        <Form {...form}>
          {trader ? (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" bg-background space-y-8 "
            >
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                  Will the price go up or down?
                </p>
                <div className="flex items-center justify-between gap-4">
                  <Button
                    className={cn(
                      " rounded-lg text-sm w-full flex items-center justify-center gap-2",
                      form.watch("upOrDown")
                        ? "bg-[#8bd796] hover:!bg-[#8bd796]"
                        : "bg-background hover:!bg-background text-white"
                    )}
                    size="lg"
                    onClick={() => form.setValue("upOrDown", true)}
                  >
                    <BiUpArrowAlt />
                    Up
                  </Button>

                  <Button
                    className={cn(
                      " rounded-lg text-sm w-full  flex items-center justify-center gap-2",
                      !form.watch("upOrDown")
                        ? "bg-[#8bd796] hover:!bg-[#8bd796]"
                        : "bg-background hover:!bg-background text-white"
                    )}
                    size="lg"
                    onClick={() => form.setValue("upOrDown", false)}
                  >
                    <BiDownArrowAlt />
                    Down
                  </Button>
                </div>
              </div>
              <FormField
                control={form.control}
                name="tradeQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Trade Quantity
                    </FormLabel>
                    <FormControl className="bg-foreground">
                      <div className="flex items-center justify-between gap-4">
                        <Input type="number" placeholder="0" {...field} />
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            className="text-accent bg-background text-xs"
                            onClick={() =>
                              form.setValue(
                                "tradeQuantity",
                                String(Number(form.watch("tradeQuantity")) / 2)
                              )
                            }
                          >
                            1/2
                          </Button>
                          <Button
                            size="icon"
                            className="text-accent bg-background text-xs"
                            onClick={() =>
                              form.setValue(
                                "tradeQuantity",
                                String(Number(form.watch("tradeQuantity")) * 2)
                              )
                            }
                          >
                            x2
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slippage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Slippage Tolerance
                    </FormLabel>
                    <FormControl className="bg-foreground">
                      <Input
                        min={0}
                        max={1}
                        step="0.01"
                        type="number"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-muted-foreground justify-between">
                      <p>trade Size (USDC)</p>{" "}
                      <p className="text-accent">View Margin Requirements</p>
                    </FormLabel>
                    <FormControl className="bg-foreground">
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full " size="lg">
                Place Trade
              </Button>
            </form>
          ) : (
            <SelectTraderAccounts />
          )}
        </Form>

        <div className="text-muted-foreground text-sm flex items-center justify-between gap-4">
          <p>
            GUAC/Avotar Discount:{" "}
            <span className="text-[#8bd796] ">Save up to 50%</span>
          </p>

          <BsFillInfoCircleFill />
        </div>
      </Container>
    </>
  );
};

export default PerpetualsForm;
