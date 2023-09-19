'use client';
import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { cn } from '@/lib/utils';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import { SelectTraderAccounts } from '@/components/common/TraderAccountDropDown';
import { useWallet } from '@solana/wallet-adapter-react';
import { dexterity, useManifest, useProduct, useTrader } from '@/context/dexterity';
import { DexterityWallet } from '@hxronetwork/dexterity-ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PreceptualModal from '@/components/common/PreceptualModal';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PublicKey } from '@solana/web3.js';
import { toast } from '@/hooks/use-toast';
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
const formSchema = z.object({
  upOrDown: z.boolean(),
  tradeQuantity: z.string(),
  slippage: z.string(),
  size: z.string(),
});
const PerpetualsForm = () => {
  const [tab, setTab] = useState<'future' | 'spot' | 'swap'>('future');
  const { publicKey, signTransaction, signAllTransactions, connected } =
    useWallet();
  const { manifest } = useManifest();
  const { trader } = useTrader();
  const [isOpen, setIsOpen] = useState(false);
  const { selectedProduct, setIndexPrice, setMarkPrice, markPrice } = useProduct();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upOrDown: true,
      tradeQuantity: '0',
      slippage: '0',
      size: '0',
    },
  });
  useMemo(async () => {
    const DexWallet: DexterityWallet = {
      publicKey,
      signTransaction,
      signAllTransactions,
    };
    manifest?.setWallet(DexWallet);
  }, [publicKey, manifest, trader]);

  useEffect(() => { }, [trader, setIndexPrice, setMarkPrice]);
  useEffect(() => {
    const tradeQuantity = form.watch('tradeQuantity');
    const newSize = (parseFloat(tradeQuantity) * markPrice).toFixed(2);
    console.log("Mark Price",markPrice)
    form.setValue('size', newSize);
  }, [form, markPrice]);

  // Watch changes to size and update tradeQuantity
  useEffect(() => {
    const size = form.watch('size');
    const newTradeQuantity = (parseFloat(size) / markPrice).toFixed(2);
    form.setValue('tradeQuantity', newTradeQuantity);
  }, [form, markPrice]);

  const handlePlaceOrder = async (slippage: number, orderType: string, size: number) => {

    const callbacks = {
      onGettingBlockHashFn: () => { },
      onGotBlockHashFn: () => { },
      onConfirm: (txn: string) => toast({ variant: 'success', title: 'Order Placed Successfully!', description: txn })
    }
    const priceFraction = dexterity.Fractional.New(orderType === 'SHORT' ? markPrice - ((markPrice * slippage) / 100) : markPrice + ((markPrice * slippage) / 100), 0);
    const sizeFraction = dexterity.Fractional.New(size * 10 ** selectedProduct.exponent, selectedProduct.exponent);
    const referralTrg = process.env.NEXT_PUBLIC_REFERRER_TRG_MAINNET

    try {

      await trader.newOrder(
        selectedProduct.index,
        orderType === 'SHORT' ? false : true,
        priceFraction,
        sizeFraction,
        false,
        new PublicKey(referralTrg),
        Number(process.env.NEXT_PUBLIC_REFERRER_BPS!),
        null,
        null,
        callbacks
      );
      //setIsSuccess(true);
    } catch (error: any) {
      //setIsSuccess(false);
      toast({ variant: 'destructive', title: 'Placing order failed!', description: error?.message });
    } finally {
      toast({ variant: 'success', title: `Market ${orderType} Order Placed Successfully!` });
      //setIsLoading(false);
    }
  }


  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const size = Number(values.size);
    const slippage = Number(values.slippage);
    const qty = Number(values.tradeQuantity);
    const position = values.upOrDown ? "LONG" : "SHORT"
    await handlePlaceOrder(slippage, position, qty)

  }

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
          <Select
            defaultValue="spot"
            onValueChange={(value: 'future' | 'spot' | 'swap') => setTab(value)}
          >
            <SelectTrigger className="text-black bg-primary w-max h-7 rounded-lg text-sm ">
              <SelectValue placeholder="Spot" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectGroup>
                <SelectItem value="spot" className="hover:text-black">
                  Spot
                </SelectItem>
                <SelectItem value="swap" className="hover:text-black">
                  Swap
                </SelectItem>
                <SelectItem value="future" className="hover:text-black">
                  Future
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {!connected ? (
            <WalletMultiButtonDynamic
              startIcon={undefined}
              className="!rounded-lg  h-7 px-3 py-[6px] font-normal text-sm hidden lg:flex bg-primary text-primary-foreground hover:!bg-primary"
            />
          ) : (
            <>
              {' '}
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
          {trader  ? (
            <>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" bg-background space-y-8 "
              >
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground">
                    Will the price go up or down?
                  </p>
                  <div className="flex items-center justify-between gap-4 font-medium  ">
                    <Button
                      className={cn(
                        ' rounded-lg  w-full flex items-center justify-center gap-2',
                        form.watch('upOrDown')
                          ? 'bg-[#8bd796] hover:!bg-[#8bd796]'
                          : 'bg-background hover:!bg-background text-white'
                      )}
                      size="lg"
                      onClick={() => form.setValue('upOrDown', true)}
                    >
                      <BiUpArrowAlt />
                      Up
                    </Button>

                    <Button
                      className={cn(
                        ' rounded-lg text-sm w-full  flex items-center justify-center gap-2',
                        !form.watch('upOrDown')
                          ? 'bg-destructive hover:!bg-destructive'
                          : 'bg-background hover:!bg-background text-white'
                      )}
                      size="lg"
                      onClick={() => form.setValue('upOrDown', false)}
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
                      <FormLabel className=" capitalizefont-medium text-muted-foreground flex items-center justify-between">
                        <p>Trade Quantity</p>
                        <p>Min. Trade: 0.0001</p>
                      </FormLabel>
                      <FormControl className="bg-foreground px-4 py-[10px] rounded-lg ">
                        <div className="flex items-center justify-between gap-4 ">
                          <img
                            src="/icons/earn/sol.svg"
                            alt="sol"
                            className="w-5 h-5"
                          />
                          <Input type="number" placeholder="0" {...field} />
                          <div className="flex items-center gap-1">
                            <Button
                              size="icon"
                              className="text-accent bg-background text-xs"
                              onClick={() =>
                                form.setValue(
                                  'tradeQuantity',
                                  String(
                                    Number(form.watch('tradeQuantity')) / 2
                                  )
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
                                  'tradeQuantity',
                                  String(
                                    Number(form.watch('tradeQuantity')) * 2
                                  )
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
                      <FormLabel className=" capitalizefont-medium text-muted-foreground">
                        Slippage Tolerance
                      </FormLabel>

                      <FormControl className=" px-4 py-[10px] bg-foreground w-max rounded-lg">
                        <div className="flex flex-row items-center gap-2">
                          <div className="w-full flex items-center ">
                            <Input
                              min={0}
                              max={1}
                              step="0.01"
                              type="number"
                              placeholder="0"
                              value={Number(form.watch('slippage')).toFixed(2)}
                              {...field}
                            />
                            <span> %</span>
                          </div>
                          <div className="h-full w-max flex flex-col text-muted-foreground ">
                            <button
                              onClick={() =>
                                form.setValue(
                                  'slippage',
                                  String(Number(form.watch('slippage')) + 0.01)
                                )
                              }
                            >
                              <ChevronUp className="h-4 w-4  cursor-pointer" />
                            </button>
                            <button
                              onClick={() =>
                                form.setValue(
                                  'slippage',
                                  String(Number(form.watch('slippage')) - 0.01)
                                )
                              }
                            >
                              <ChevronDown className="h-4 w-4  cursor-pointer" />
                            </button>
                          </div>
                        </div>
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
                      <FormLabel className=" capitalize font-medium flex items-center text-muted-foreground justify-between">
                        <p>trade Size (USDC)</p>{' '}
                        <p className="text-accent">View Margin Requirements</p>
                      </FormLabel>
                      <FormControl className=" px-4 py-[10px] bg-foreground w-full rounded-lg ">
                        <div className="flex flex-row items-center gap-5">
                          <img
                            src="/icons/earn/sol.svg"
                            alt="sol"
                            className="w-5 h-5"
                          />

                          <Input type="number" placeholder="0" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full " size="lg">
                  Place Trade
                </Button>
              </form>
              <p className="text-muted-foreground text-xs">
                View market details and manage all open positions below. Trading
                fee of 15bps is applied to all trades.
              </p>
            </>
          ) : (
            <SelectTraderAccounts />
          )}
        </Form>
        <div className="text-muted-foreground text-sm flex items-center justify-between gap-4">
          <p>
            GUAC/Avotar Discount:{' '}
            <span className="text-[#8bd796] ">Save up to 50%</span>
          </p>

          <BsFillInfoCircleFill />
        </div>
      </Container>
    </>
  );
};

export default PerpetualsForm;
