'use client';
import PreceptualModal from '@/components/common/PreceptualModal';
import { SelectTraderAccounts } from '@/components/common/TraderAccountDropDown';
import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  dexterity,
  useManifest,
  useProduct,
  useTrader,
} from '@/context/dexterity';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { DexterityWallet } from '@hxronetwork/dexterity-ts';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BiChevronDown,
  BiChevronUp,
  BiDownArrowAlt,
  BiUpArrowAlt,
} from 'react-icons/bi';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import * as z from 'zod';

import NavigationList from '@/components/ui/navigation-list';
import { useWebSocket } from '@/context/websocket';
import { useToast } from '@/hooks/use-toast';
import { PublicKey } from '@solana/web3.js';
import Link from 'next/link';
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
  const [upOrDown, setUpOrDown] = useState(true);

  const [slippage, setSlippage] = useState('1');
  const [size, setSize] = useState('0');
  const { publicKey, signTransaction, signAllTransactions, connected } =
    useWallet();
  const { manifest } = useManifest();
  const { trader } = useTrader();
  const { toast } = useToast();
  const { candles } = useWebSocket();
  const [isOpen, setIsOpen] = useState(false);
  const { selectedProduct, setIndexPrice, setMarkPrice, markPrice } =
    useProduct();
  const [marketPrice, setMarketPrice] = useState(0);
  const [tradeQuantity, setTradeQuantity] = useState(
    selectedProduct.minSize.toString()
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upOrDown: true,
      tradeQuantity: '0.10',
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
  useEffect(() => {
    setSize((selectedProduct.minSize * marketPrice).toString());
  }, [selectedProduct, marketPrice]);
  useEffect(() => {
    if (candles.length > 0) {
      setMarketPrice(Number(candles[candles.length - 1].o));
    }
  }, [trader, setIndexPrice, candles, markPrice]);
  const callbacks = {
    onGettingBlockHashFn: () =>
      toast({ variant: 'default', title: 'Fetching BlockHash...' }),
    onGotBlockHashFn: () =>
      toast({ variant: 'success', title: 'Got BlockHash!' }),
    onConfirm: (txn: string) =>
      toast({
        variant: 'success',
        title: 'Order Placed Successfully!',
        description: (
          <div className="flex flex-col gap-1">
            <p>Transaction sent successfully.</p>
            <Link href={`https://solscan.io/tx/${txn}`}>View on solscan</Link>
          </div>
        ),
      }),
  };
  // Watch changes to size and update tradeQuantity
  // useMemo(() => {
  //   const tradeQuantity = form.watch("tradeQuantity");
  //   const newSize = (parseFloat(tradeQuantity) * marketPrice).toFixed(2);

  //   form.setValue("size", newSize);
  // }, [form.getValues('tradeQuantity'), candles]);
  // useMemo(() => {
  //   const size = form.watch("size");
  //   const newTradeQuantity = (parseFloat(size) / marketPrice).toFixed(2);
  //   form.setValue("tradeQuantity", newTradeQuantity);
  // }, [form.getValues('size'), candles]);
  // const handlePlaceOrder = async (
  //   slippage: number,
  //   orderType: string,
  //   size: number
  // ) => {
  //   const callbacks = {
  //     onGettingBlockHashFn: () => {},
  //     onGotBlockHashFn: () => {},
  //     onConfirm: (txn: string) =>
  //       toast({
  //         variant: "success",
  //         title: "Order Placed Successfully!",
  //         description: (
  //           <div className="flex flex-col gap-1">
  //             <p>Transaction sent successfully.</p>
  //             <Link href={`https://solscan.io/tx/${txn}`}>View on solscan</Link>
  //           </div>
  //         ),
  //       }),
  //   };
  //   const priceFraction = dexterity.Fractional.New(
  //     orderType === "SHORT"
  //       ? marketPrice - (marketPrice * slippage) / 100
  //       : marketPrice + (marketPrice * slippage) / 100,
  //     0
  //   );
  //   const sizeFraction = dexterity.Fractional.New(
  //     size * 10 ** selectedProduct.exponent,
  //     selectedProduct.exponent
  //   );
  //   const referralTrg = process.env.NEXT_PUBLIC_REFERRER_TRG_MAINNET;

  //   try {
  //     await trader.newOrder(
  //       selectedProduct.index,
  //       orderType === "SHORT" ? false : true,
  //       priceFraction,
  //       sizeFraction,
  //       false,
  //       new PublicKey(referralTrg),
  //       Number(process.env.NEXT_PUBLIC_REFERRER_BPS!),
  //       null,
  //       null,
  //       callbacks
  //     );
  //     //setIsSuccess(true);
  //   } catch (error: any) {
  //     //setIsSuccess(false);
  //     toast({
  //       variant: "destructive",
  //       title: "Placing order failed!",
  //       description: error?.message,
  //     });
  //   } finally {
  //     toast({
  //       variant: "success",
  //       title: `Market ${orderType} Order Placed Successfully!`,
  //     });
  //     //setIsLoading(false);
  //   }
  // };
  // const handlePlaceOrder = useCallback(
  //   async (orderType: string, slippage: number, size: number) => {
  //     console.log(
  //       markPrice,
  //       slippage,
  //       size,
  //       publicKey.toBase58(),
  //       manifest,
  //       selectedProduct
  //     );
  //     if (
  //       !markPrice ||
  //       !slippage ||
  //       !size ||
  //       !publicKey ||
  //       !manifest ||
  //       !selectedProduct
  //     )
  //       return;

  //     const priceFraction = dexterity.Fractional.New(
  //       orderType === "SHORT"
  //         ? markPrice - (markPrice * slippage) / 100
  //         : markPrice + (markPrice * slippage) / 100,
  //       0
  //     );
  //     const sizeFraction = dexterity.Fractional.New(
  //       size * 10 ** selectedProduct.exponent,
  //       selectedProduct.exponent
  //     );
  //     const referralTrg = process.env.NEXT_PUBLIC_REFERRER_TRG_MAINNET;

  //     try {
  //       await trader.newOrder(
  //         selectedProduct.index,
  //         orderType === "SHORT" ? false : true,
  //         priceFraction,
  //         sizeFraction,
  //         false,
  //         new PublicKey(referralTrg),
  //         Number(process.env.NEXT_PUBLIC_REFERRER_BPS!),
  //         null,
  //         null,
  //         callbacks
  //       );
  //     } catch (error: any) {
  //       toast({
  //         variant: "destructive",

  //         title: "Placing order failed!",
  //         description: error?.message,
  //       });
  //     } finally {
  //       toast({
  //         variant: "success",
  //         title: `Market ${orderType} Order Placed Successfully!`,
  //       });
  //     }
  //   },
  //   [
  //     slippage,
  //     size,
  //     upOrDown,
  //     publicKey,
  //     manifest,
  //     trader,
  //     selectedProduct,
  //     markPrice,
  //   ]
  // );
  const handlePlaceOrder = async (
    orderType: string,
    slippage: number,
    size: number
  ) => {
    console.log(
      markPrice,
      slippage,
      size,
      publicKey.toBase58(),
      manifest,
      selectedProduct
    );
    if (
      !markPrice ||
      !slippage ||
      !size ||
      !publicKey ||
      !manifest ||
      !selectedProduct
    ) {
      console.log('Market Price', markPrice);
      if (!markPrice) {
        console.log('markPrice is falsy');
      }

      if (!slippage) {
        console.log('slippage is falsy');
      }

      if (!size) {
        console.log('size is falsy');
      }

      if (!publicKey) {
        console.log('publicKey is falsy');
      }

      if (!manifest) {
        console.log('manifest is falsy');
      }

      if (!selectedProduct) {
        console.log('selectedProduct is falsy');
      }
      return;
    }

    const priceFraction = dexterity.Fractional.New(
      orderType === 'SHORT'
        ? markPrice - (markPrice * slippage) / 100
        : markPrice + (markPrice * slippage) / 100,
      0
    );
    const sizeFraction = dexterity.Fractional.New(
      size * 10 ** selectedProduct.exponent,
      selectedProduct.exponent
    );
    const referralTrg = process.env.NEXT_PUBLIC_REFERRER_TRG_MAINNET || "2G7UzceMvGWAxa37dXTu1MXbSe9P9G3Xeu22UD9HCwUw";

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
      toast({
        variant: 'success',
        title: `Market ${orderType} Order Placed Successfully!`,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: 'destructive',

        title: 'Placing order failed!',
        description: error?.message,
      });
    } finally {
    }
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    // const size = Number(values.size);
    // const slippage = Number(values.slippage);
    // const qty = Number(values.tradeQuantity);
    // const position = values.upOrDown ? "LONG" : "SHORT";
    // await handlePlaceOrder(slippage, position, size);
  }
  const placeOrder = async () => {
    const position = upOrDown ? 'LONG' : 'SHORT';
    await handlePlaceOrder(position, Number(slippage), Number(tradeQuantity));
  };
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

          <Button size="sm" className="h-7">
            view Tutorial
          </Button>
        </div>
        <Form {...form}>
          {trader ? (
            <form
              onSubmit={(e) => e.preventDefault()}
              className=" bg-background space-y-8 "
            >
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                  Will the price go up or down?
                </p>
                <div className="flex items-center justify-between gap-4">
                  <Button
                    className={cn(
                      ' rounded-lg text-sm w-full  gap-2',
                      upOrDown
                        ? 'bg-[#8bd796] hover:!bg-[#8bd796]'
                        : 'bg-background hover:!bg-background text-white'
                    )}
                    size="lg"
                    onClick={() => {
                      setUpOrDown(true);
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <BiUpArrowAlt className="h-4 shrink-0 font-bold" />
                      Up
                    </div>
                  </Button>

                  <Button
                    className={cn(
                      ' rounded-lg text-sm w-full ',
                      !upOrDown
                        ? 'bg-destructive hover:!bg-destructive'
                        : 'bg-background hover:!bg-background text-white'
                    )}
                    size="lg"
                    onClick={() => {
                      //alert("Clicked")
                      setUpOrDown(false);
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <BiDownArrowAlt className="h-4 shrink-0 font-bold" />
                      Down
                    </div>
                  </Button>
                </div>
              </div>
              <FormField
                control={form.control}
                name="tradeQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-muted-foreground justify-between  mb-3">
                      <p> Trade Size {'(BTC)'}</p> <p> Min. Trade: 0.0001</p>
                    </FormLabel>
                    <FormControl className="bg-foreground px-4 py-2 h-10">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-5">
                          <div className="w-5 h-5 shrink-0">
                            <img
                              src="/static/coins/bitcoin.png"
                              alt="usdc"
                              className="w-5 h-5"
                            />
                          </div>
                          <Input
                            type="number"
                            placeholder="0"
                            value={tradeQuantity}
                            onChange={(e) => {
                              setTradeQuantity(e.target.value);
                              const newSize = (
                                parseFloat(e.target.value) * marketPrice
                              ).toFixed(2);
                              setSize(newSize);
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            className="text-accent bg-background text-xs h-6 w-9 py-1 px-[10px]"
                            onClick={() =>
                              form.setValue(
                                'tradeQuantity',
                                String(Number(form.watch('tradeQuantity')) / 2)
                              )
                            }
                          >
                            1/2
                          </Button>
                          <Button
                            size="icon"
                            className="text-accent bg-background text-xs h-6 w-9  py-1 px-[10px]"
                            onClick={() =>
                              form.setValue(
                                'tradeQuantity',
                                String(Number(form.watch('tradeQuantity')) * 2)
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
                    <FormLabel className="text-muted-foreground  mb-3">
                      Slippage Tolerance (%)
                    </FormLabel>
                    <FormControl className="bg-foreground px-4 py-2 h-10 w-max">
                      <div className="w-full flex items-center gap-4">
                        <div className="flex items-center ">
                          <Input
                            min={0.1}
                            max={10}
                            step="0.01"
                            type="number"
                            placeholder="0"
                            // {...field}
                            value={slippage}
                            onChange={(e) => {
                              setSlippage(e.target.value);
                            }}
                          />
                          <span className="text-sm">%</span>
                        </div>
                        <div className="flex flex-col ">
                          <button
                            className="shrink-0"
                            onClick={() => {
                              setSlippage(
                                (parseFloat(slippage) + 0.01).toString()
                              );
                            }}
                          >
                            <BiChevronUp />
                          </button>
                          <button
                            className="shrink-0"
                            onClick={() => {
                              setSlippage(
                                (parseFloat(slippage) - 0.01).toString()
                              );
                            }}
                          >
                            <BiChevronDown />
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
                    <FormLabel className="flex items-center text-muted-foreground justify-between  mb-3">
                      <p>Estimated {'(USDC)'}</p>{' '}
                      <p className="text-accent">Cash Balance: $10,042.24</p>
                    </FormLabel>
                    <FormControl className="bg-foreground px-4 py-2 h-10">
                      <div className=" flex items-center gap-5">
                        <div className="w-5 h-5">
                          <img
                            src="/icons/earn/usd-coin-usdc-logo.svg"
                            alt="usdc"
                            className="w-5 h-5"
                          />
                        </div>
                        <h5 className="text-sm font-medium">2,562.02</h5>
                        {/* <Input
                          type="number"
                          placeholder="0"
                          value={size}
                          onChange={(e) => {
                            setSize(e.target.value);
                            const newTradeQuantity = (
                              Number(e.target.value) / marketPrice
                            ).toString();
                            setTradeQuantity(newTradeQuantity);
                          }}
                        /> */}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                onClick={placeOrder}
                className="w-full "
                size="lg"
              >
                Place Trade
              </Button>
            </form>
          ) : (
            <SelectTraderAccounts />
          )}
        </Form>
        <p className="text-muted-foreground text-sm">
          View market details and manage all open positions below. Starting
          trading fee of 10bps is applied to all trades.
        </p>

        <div className="text-muted-foreground text-sm flex items-center justify-between gap-4">
          <p>
            GUAC/Avotar Discount:{' '}
            <span className="text-[#8bd796] ">Save up to 40%</span>
          </p>

          <BsFillInfoCircleFill />
        </div>
      </Container>
    </>
  );
};

export default PerpetualsForm;
