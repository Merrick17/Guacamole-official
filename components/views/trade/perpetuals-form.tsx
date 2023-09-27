"use client";
import PreceptualModal from "@/components/common/PreceptualModal";
import { SelectTraderAccounts } from "@/components/common/TraderAccountDropDown";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  dexterity,
  useManifest,
  useProduct,
  useTrader,
} from "@/context/dexterity";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DexterityWallet } from "@hxronetwork/dexterity-ts";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import * as z from "zod";

import NavigationList from "@/components/ui/navigation-list";
import { useWebSocket } from "@/context/websocket";
import { useToast } from "@/hooks/use-toast";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
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
  const [tab, setTab] = useState<"future" | "spot" | "swap">("future");
  const [upOrDown, setUpOrDown] = useState(true);

  const [slippage, setSlippage] = useState("1");
  const [size, setSize] = useState("0");
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
      tradeQuantity: "0",
      slippage: "0",
      size: "0",
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
      toast({ variant: "default", title: "Fetching BlockHash..." }),
    onGotBlockHashFn: () =>
      toast({ variant: "success", title: "Got BlockHash!" }),
    onConfirm: (txn: string) =>
      toast({
        variant: "success",
        title: "Order Placed Successfully!",
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
      console.log("Market Price", markPrice);
      if (!markPrice) {
        console.log("markPrice is falsy");
      }

      if (!slippage) {
        console.log("slippage is falsy");
      }

      if (!size) {
        console.log("size is falsy");
      }

      if (!publicKey) {
        console.log("publicKey is falsy");
      }

      if (!manifest) {
        console.log("manifest is falsy");
      }

      if (!selectedProduct) {
        console.log("selectedProduct is falsy");
      }
      return;
    }

    const priceFraction = dexterity.Fractional.New(
      orderType === "SHORT"
        ? markPrice - (markPrice * slippage) / 100
        : markPrice + (markPrice * slippage) / 100,
      0
    );
    const sizeFraction = dexterity.Fractional.New(
      size * 10 ** selectedProduct.exponent,
      selectedProduct.exponent
    );
    const referralTrg = process.env.NEXT_PUBLIC_REFERRER_TRG_MAINNET || "EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC";

    try {
      await trader.newOrder(
        selectedProduct.index,
        orderType === "SHORT" ? false : true,
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
        variant: "success",
        title: `Market ${orderType} Order Placed Successfully!`,
      });
    } catch (error: any) {
      console.log(error)
      toast({
        variant: "destructive",

        title: "Placing order failed!",
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
    const position = upOrDown ? "LONG" : "SHORT";
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
                      " rounded-lg text-sm w-full flex items-center justify-center gap-2",
                      upOrDown
                        ? "bg-[#8bd796] hover:!bg-[#8bd796]"
                        : "bg-background hover:!bg-background text-white"
                    )}
                    size="lg"
                    onClick={() => {
                      setUpOrDown(true);
                    }}
                  >
                    <BiUpArrowAlt />
                    Up
                  </Button>

                  <Button
                    className={cn(
                      " rounded-lg text-sm w-full  flex items-center justify-center gap-2",
                      !upOrDown
                        ? "bg-[#8bd796] hover:!bg-[#8bd796]"
                        : "bg-background hover:!bg-background text-white"
                    )}
                    size="lg"
                    onClick={() => {
                      //alert("Clicked")
                      setUpOrDown(false);
                    }}
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
                      Slippage Tolerance (%)
                    </FormLabel>
                    <FormControl className="bg-foreground">
                      <Input
                        min={0}
                        max={1}
                        step="0.01"
                        type="number"
                        placeholder="0"
                        // {...field}
                        value={slippage}
                        onChange={(e) => {
                          setSlippage(e.target.value);
                        }}
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
                      <Input
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
                      />
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
