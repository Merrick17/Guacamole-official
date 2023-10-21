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
import {
  BiChevronDown,
  BiChevronUp,
  BiDownArrowAlt,
  BiUpArrowAlt,
} from "react-icons/bi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import * as z from "zod";

import NavigationList from "@/components/ui/navigation-list";
import { useWebSocket } from "@/context/websocket";
import { useToast } from "@/hooks/use-toast";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { Product, ProductMap } from "./perpetual-constants";
import useWalletTokens from "@/lib/tokens/useWalletTokens";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [upOrDown, setUpOrDown] = useState(true);
  const [slippage, setSlippage] = useState("1");
  const [size, setSize] = useState("0");
  const { publicKey, signTransaction, signAllTransactions, connected } =
    useWallet();
  const { manifest } = useManifest();
  const { trader, cashBalance } = useTrader();
  const { toast } = useToast();
  const { candles } = useWebSocket();
  const [isOpen, setIsOpen] = useState(false);
  const { selectedProduct, setIndexPrice, setMarkPrice, markPrice } =
    useProduct();
  const [guac, setGuac] = useState(null);
  const [guacBalance, setGuacBalance] = useState(0);
  const [marketPrice, setMarketPrice] = useState(0);
  const walletTokens = useWalletTokens();
  const [tradeQuantity, setTradeQuantity] = useState(
    selectedProduct.minSize.toString()
  );
  const getFeesBps = (number: number) => {
    switch (true) {
      case number > 4000000000 && number < 10000000000:
        return 9;
      case number >= 10000000000 && number < 20000000000:
        return 8;
      case number >= 20000000000 && number < 40000000000:
        return 7;
      case number >= 40000000000:
        return 6;
      default:
        return 10;
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upOrDown: true,
      tradeQuantity: "0.10",
      slippage: "0",
      size: "0",
    },
  });
  useEffect(() => {
    if (connected && publicKey) {
      console.log("Wallet", walletTokens);
      const guacInfo = walletTokens.find(
        (elm) =>
          elm.account.mint.toBase58() ==
          "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR"
      );
      console.log("MsOL", guacInfo);
      if (guacInfo) {
        const balance = Number(guacInfo.account.amount) / guacInfo.decimals;
        console.log("Balance", balance);
        setGuacBalance(balance);
        setGuac(guacInfo);
      }
    }
  }, [publicKey, walletTokens]);
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

  const selectedMarketPrice = useMemo(() => {
    if (!markPrice || !selectedProduct || !(markPrice.length > 0)) return 0;
    return markPrice.find((p) => p.index === selectedProduct.index).price;
  }, [selectedProduct, markPrice]);

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
        ? Number(
            (
              selectedMarketPrice -
              (selectedMarketPrice * slippage) / 100
            ).toFixed(ProductMap.get(selectedProduct.index).priceTrim)
          ) *
            10 ** 10
        : Number(
            (
              selectedMarketPrice +
              (selectedMarketPrice * slippage) / 100
            ).toFixed(ProductMap.get(selectedProduct.index).priceTrim)
          ) *
            10 ** 10,
      10
    );
    const sizeFraction = dexterity.Fractional.New(
      size * 10 ** selectedProduct.exponent,
      selectedProduct.exponent
    );
    const referralTrg =
      process.env.NEXT_PUBLIC_REFERRER_TRG_MAINNET ||
      "2G7UzceMvGWAxa37dXTu1MXbSe9P9G3Xeu22UD9HCwUw";

    console.log(
      JSON.stringify({
        open: {
          index: selectedProduct.index,
          orderType: orderType === "SHORT" ? false : true,
          priceFraction,
          sizeFraction,
          isIOC: false,
          referPubkey: new PublicKey(referralTrg),
          bpsfee: getFeesBps(guacBalance),
          clientOrderId: null,
          matchLimit: null,
          callbacks,
        },
      })
    );

    try {
      await trader.newOrder(
        selectedProduct.index,
        orderType === "SHORT" ? false : true,
        priceFraction,
        sizeFraction,
        true,
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
      console.log(error);
      toast({
        variant: "destructive",

        title: "Placing order failed!",
        description: error?.message,
      });
    } finally {
    }
  };

  const placeOrder = async () => {
    const position = upOrDown ? "LONG" : "SHORT";
    await handlePlaceOrder(position, Number(slippage), Number(tradeQuantity));
  };

  const [product, setProduct] = useState<Product>(ProductMap.get(0));

  useMemo(() => {
    setProduct(ProductMap.get(selectedProduct.index));
    setTradeQuantity(selectedProduct.minSize.toString());
  }, [selectedProduct]);

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

          <Button
            size="sm"
            className="h-7"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open(
                  `https://docs.guacamole.gg/products-and-features/trade/gamified-crypto-futures`,
                  "_blank"
                );
              }
            }}
          >
            View Tutorial
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
                      " rounded-lg text-sm w-full uppercase gap-2",
                      upOrDown
                        ? "bg-[#8bd796] hover:!bg-[#8bd796]"
                        : "bg-[#141414]  text-white hover:!bg-[#141414] "
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
                      " rounded-lg text-sm w-full uppercase ",
                      !upOrDown
                        ? "bg-destructive hover:!bg-destructive"
                        : "bg-[#141414] text-white  hover:!bg-[#141414] "
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
                      <p> Trade Size {`(${product.base})`}</p>{" "}
                      <p> Min. Trade: {product.minSize}</p>
                    </FormLabel>
                    <FormControl className="bg-foreground px-4 py-2 h-10">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-5">
                          <div className="w-5 h-5 shrink-0">
                            <img
                              src={product.baseLogo}
                              alt={product.base}
                              className="w-5 h-5"
                            />
                          </div>
                          <Input
                            min={product.minSize}
                            type="text"
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
                              // form.setValue(
                              //   "tradeQuantity",
                              //   String(Number(form.watch("tradeQuantity")) / 2)
                              // )
                              {
                                setTradeQuantity((prevVal) =>
                                  (Number(prevVal) / 2).toString()
                                );
                                const newSize = (
                                  parseFloat(tradeQuantity) * marketPrice
                                ).toFixed(2);
                                setSize(newSize);
                              }
                            }
                          >
                            1/2
                          </Button>
                          <Button
                            size="icon"
                            className="text-accent bg-background text-xs h-6 w-9  py-1 px-[10px]"
                            onClick={() => {
                              setTradeQuantity((prevVal) =>
                                (Number(prevVal) * 2).toString()
                              );
                              const newSize = (
                                parseFloat(tradeQuantity) * marketPrice
                              ).toFixed(2);
                              setSize(newSize);
                            }}
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
                      <p>Estimated {`(${product.quote})`}</p>{" "}
                      <p className="text-accent">
                        Cash Balance: {(cashBalance ?? 0).toLocaleString()}
                      </p>
                    </FormLabel>
                    <FormControl className="bg-foreground px-4 py-2 h-10">
                      <div className=" flex items-center gap-5">
                        <div className="w-5 h-5">
                          <img
                            src={product.quoteLogo}
                            alt={product.quote}
                            className="w-5 h-5"
                          />
                        </div>
                        <h5 className="text-sm font-medium">
                          $
                          {(
                            selectedMarketPrice * Number(tradeQuantity ?? 0) -
                            (Number(slippage) / 100) *
                              (selectedMarketPrice * Number(tradeQuantity ?? 0))
                          ).toLocaleString()}
                        </h5>
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
            GUAC/Avotar Discount:{" "}
            <Link
              className="text-[#8bd796] "
              href={
                "https://docs.guacamole.gg/products-and-features/trade/gamified-crypto-futures#fee-structure-and-discounts"
              }
              target="_blank"
            >
              Save up to 40%
            </Link>
          </p>

          <BsFillInfoCircleFill />
        </div>
      </Container>
    </>
  );
};

export default PerpetualsForm;
