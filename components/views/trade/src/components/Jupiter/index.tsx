"use client";
import {
  FIDA_MINT,
  retry,
  useSolBalance,
  useTokenAccounts,
} from "@bonfida/hooks";
import { GrRefresh } from "react-icons/gr";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import round from "lodash/round";
import { InlineResponse200MarketInfos } from "@jup-ag/api";
import { NATIVE_MINT } from "@solana/spl-token";
import { TokenInfo } from "@solana/spl-token-registry";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Paths from "@/config/routes";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  WalletDisconnectButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import {
  PublicKey,
  Transaction,
  VersionedTransaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { useInterval, useLocalStorageState } from "ahooks";
import { nanoid } from "nanoid";
import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import emoji from "../../assets/no-route.png";
import { getFeeAddress } from "../../utils/fees";
import Loading from "../Loading";
import { Balance } from "./Balance";
import { SelectCoin } from "./SelectCoin";
import { Slippage } from "./Slippage";
import { Buffer } from "buffer";
// Token Mints
export const INPUT_MINT_ADDRESS =
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // USDC
export const OUTPUT_MINT_ADDRESS =
  "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR"; // Guac
import { useJupiterApiContext } from "../../contexts";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { RenderUpdate } from "@/components/ui/RenderUpdate";
import dynamic from "next/dynamic";
import Details from "./details";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { SwapRoutes } from "./swap-routes";
import { RefreshCw, RefreshCwIcon } from "lucide-react";
import { Links } from "@/config/links";
import NavigationList from "@/components/ui/navigation-list";
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

interface IJupiterFormProps {
  showDetails: boolean;
}

const JupiterForm: FunctionComponent<IJupiterFormProps> = ({ showDetails }) => {
  const [firstLoad, setFirstLoad] = useState(false);

  const searchParams = useSearchParams();

  const CustomInputMintAddress =
    searchParams.get("inputMint") ?? INPUT_MINT_ADDRESS;
  const CustomOutputMintAddress =
    searchParams.get("outputMint") ?? OUTPUT_MINT_ADDRESS;

  const { connected, publicKey, signAllTransactions, sendTransaction } =
    useWallet();
  const { connection } = useConnection();
  const { tokenMap, routeMap, loaded, api } = useJupiterApiContext();
  const { toast } = useToast();
  const [routes, setRoutes] = useState<Awaited<ReturnType<any>>["data"]>([]);

  const [slippage, setSlippage] = useLocalStorageState("slippage", {
    defaultValue: 1,
  });
  const [selectedRoute, setSelectedRoute] = useState<any | null>(null);
  const [inputTokenInfo, setInputTokenInfo] = useState<
    TokenInfo | null | undefined
  >(tokenMap.get(CustomInputMintAddress) as TokenInfo);
  const [outputTokenInfo, setOutputTokenInfo] = useState<
    TokenInfo | null | undefined
  >(tokenMap.get(CustomOutputMintAddress) as TokenInfo);
  const [hasRoute, setHasRoute] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [loadingRoute, setLoadingRoute] = useState(true); // Loading by default
  const { data: tokenAccounts, refresh: refreshToken } = useTokenAccounts(
    connection,
    publicKey
  );
  const [inputAmout, setInputAmount] = useState("10");
  const { data: solBalance, refresh: refreshSol } = useSolBalance(
    connection,
    publicKey
  );
  useMemo(() => {
    setInputTokenInfo(tokenMap.get(CustomInputMintAddress) as TokenInfo);
    setOutputTokenInfo(tokenMap.get(CustomOutputMintAddress) as TokenInfo);
  }, [tokenMap, CustomInputMintAddress, CustomOutputMintAddress]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.Buffer = Buffer;
    }
  }, [typeof window]);

  // Good to add debounce here to avoid multiple calls
  const fetchRoute = React.useCallback(() => {
    if (!inputTokenInfo || !outputTokenInfo) return;
    setLoadingRoute(true);
    api
      .v4QuoteGet({
        amount: (
          parseFloat(inputAmout) * Math.pow(10, inputTokenInfo?.decimals)
        ).toString(),
        inputMint: inputTokenInfo?.address,
        outputMint: outputTokenInfo?.address,

        feeBps: 50,
      })
      .then(({ data }) => {
        if (data) {
          setHasRoute(
            data.length > 0 &&
              !!data[0].outAmount &&
              Number(data[0].outAmount) > 0
          );
          setRoutes(data);
        }
      })
      .finally(() => {
        setLoadingRoute(false);
      });
  }, [api, inputAmout, inputTokenInfo, outputTokenInfo]);

  useEffect(() => {
    fetchRoute();
  }, [fetchRoute]);

  const bestRoute = routes?.[0];

  useEffect(() => {
    if (!firstLoad && bestRoute) {
      setSelectedRoute(bestRoute);
      setFirstLoad(true);
    }
  }, [loaded, bestRoute]);

  useEffect(() => {
    setFirstLoad(false);
  }, [inputTokenInfo, outputTokenInfo, loadingRoute]);

  // ensure outputMint can be swapable to inputMint
  useEffect(() => {
    if (inputTokenInfo) {
      const possibleOutputs = routeMap.get(inputTokenInfo.address);

      if (
        possibleOutputs &&
        !possibleOutputs?.includes(outputTokenInfo?.address || "")
      ) {
        setHasRoute(false);
      }
    } else {
      setHasRoute(false);
    }
  }, [inputTokenInfo, outputTokenInfo]);
  const handleSwap = async () => {
    if (!outputTokenInfo?.address) return;

    const wSol = inputTokenInfo?.address === NATIVE_MINT.toBase58();

    const parsedAmount = parseFloat(inputAmout);
    if (
      !parsedAmount ||
      isNaN(parsedAmount) ||
      !isFinite(parsedAmount) ||
      !inputTokenInfo?.address
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold">Invalid amount</p>
          </div>
        ),
      });
    }

    const tokenAccount = tokenAccounts?.getByMint(
      new PublicKey(inputTokenInfo?.address as string)
    );

    const userBalances =
      wSol && solBalance
        ? solBalance.uiAmount
        : tokenAccount?.decimals
        ? Number(tokenAccount?.account.amount) /
          Math.pow(10, tokenAccount?.decimals)
        : null;

    if (!userBalances) {
      return toast({
        variant: "destructive",
        title: "Error",
        description: (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold">Could not find user balances</p>
          </div>
        ),
      });
    }

    if (userBalances < parsedAmount) {
      return toast({
        variant: "destructive",
        title: "Error",
        description: (
          <p className="text-xs font-bold">
            Not enough balances (only have {round(userBalances, 2)}
            {inputTokenInfo.symbol})
          </p>
        ),
      });
    }

    const txids: string[] = [];
    try {
      if (!loadingRoute && selectedRoute && publicKey && signAllTransactions) {
        setSwapping(true);

        const { pubkey: feeAccount, ix } = await getFeeAddress(
          connection,
          new PublicKey(outputTokenInfo.address),
          publicKey
        );

        let feeTx: Transaction | undefined = undefined;
        if (ix) {
          feeTx = new Transaction().add(ix);
          const { blockhash } = await connection.getLatestBlockhash();
          feeTx.feePayer = publicKey;
          feeTx.recentBlockhash = blockhash;
          const txId = await sendTransaction(feeTx, connection, {
            skipPreflight: true,
            maxRetries: 5,
          });
          console.log("FEE", txId);
          // sendAndConfirmTransaction(connection,feeTx)
          // const sig = await sendTransaction(feeTx, connection);
          // const latestBlockHash = await connection.getLatestBlockhash();
          // await connection.confirmTransaction({
          //   blockhash: latestBlockHash.blockhash,
          //   lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          //   signature: sig,
          // })
          //await connection.confirmTransaction(sig, 'confirmed');
        }

        const { swapTransaction } = await api.v4SwapPost({
          body: {
            route: selectedRoute,
            userPublicKey: publicKey.toBase58(),
            feeAccount: feeAccount.toBase58(),
            computeUnitPriceMicroLamports: 1000,
          },
        });

        if (swapTransaction) {
          const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
          var transaction =
            VersionedTransaction.deserialize(swapTransactionBuf);
          //await signAllTransactions([transaction]);
          const txid = await sendTransaction(transaction, connection);
          // const rawTransaction = transaction.serialize()
          // const txid = await connection.sendRawTransaction(rawTransaction, {
          //   skipPreflight: true,
          //   maxRetries: 5
          // });
          // const latestBlockHash = await connection.getLatestBlockhash();
          // await connection.confirmTransaction({
          //   blockhash: latestBlockHash.blockhash,
          //   lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          //   signature: txid,
          // })
          //await connection.confirmTransaction(txid);
          //console.log(`https://solscan.io/tx/${txid}`);
          toast({
            variant: "success",
            title: "Success",
            description: (
              <div className="flex flex-col gap-1">
                <p>Transaction sent successfully.</p>
                <Link href={`https://solscan.io/tx/${txid}`}>
                  View on solscan
                </Link>
              </div>
            ),
          });
        }
      }
    } catch (e) {
      console.error("Error", e);
      const isError = e instanceof Error;
      if (isError && e.message.includes("Transaction simulation")) {
        toast({
          variant: "destructive",
          title: "Error",
          description: (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold">
                Transaction simulation failed.
              </p>
            </div>
          ),
        });

        // toast.update(toastId.current, {
        //   type: toast.TYPE.INFO,
        //   autoClose: 5_000,
        //   render: () => (
        //     <RenderUpdate
        //       updateText="Transaction simulation failed"
        //       load={false}
        //     />
        //   ),
        // });
      } else if (isError && e.message.includes("blockhash")) {
        // toast.update(toastId.current, {
        //   type: toast.TYPE.INFO,
        //   autoClose: 5_000,
        //   render: () => (
        //     <RenderUpdate updateText="Blockhash not found" load={false} />
        //   ),
        //   toastId: toastId.current,
        // });
        toast({
          variant: "destructive",
          title: "Error",
          description: (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold">Blockhash not found</p>
            </div>
          ),
        });
      } else if (
        isError &&
        e.message.includes("Transaction was not confirmed") &&
        txids.length > 0
      ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: (
            <div className="flex flex-col gap-1">
              <p>Transaction failed to confirm. Inspect it on the explorer.</p>
              <Link href={`https://solscan.io/tx/${txids}`}>
                View on solscan
              </Link>
            </div>
          ),
        });
      } else if (
        isError &&
        e.message.includes("Transaction was not confirmed")
      ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: (
            <div className="flex flex-col gap-1">
              <p>Transaction failed to confirm. </p>
              {/* <Link href={`https://solscan.io/tx/${txids}`}>
                View on solscan
              </Link> */}
            </div>
          ),
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: (
            <div className="flex flex-col gap-1">
              <p>Transaction failed to confirm. </p>
              {/* <Link href={`https://solscan.io/tx/${txids}`}>
                View on solscan
              </Link> */}
            </div>
          ),
        });
      }
    }
    refreshToken();
    refreshSol();
    setSwapping(false);
  };

  const handleSwitch = () => {
    const _ = { ...inputTokenInfo } as TokenInfo;
    setInputTokenInfo(outputTokenInfo);
    setOutputTokenInfo(_);
  };

  const outputAmount =
    bestRoute &&
    (bestRoute.outAmount || 0) / Math.pow(10, outputTokenInfo?.decimals || 1);

  const refresh = async () => {
    if (swapping) return;
    fetchRoute();
    refreshToken();
    refreshSol();
  };

  useInterval(() => {
    refresh();
  }, 15_000);

  const [inputPriceInUSD, setInputPriceInUSD] = useState(0);
  const [outputPriceInUSD, setOutputPriceInUSD] = useState(0);
  const getValueInUsd = async (token: TokenInfo, amount: number, setPrice) => {
    if (!token) return;
    const { data } = await axios.get(
      "https://price.jup.ag/v4/price?ids=" + token.symbol
    );
    for (var prop in data.data) {
      const value = data.data[prop].price;
      setPrice(value * (Number(amount) || 0));
      break;
    }
  };
  useEffect(() => {
    getValueInUsd(inputTokenInfo, Number(inputAmout), setInputPriceInUSD);
  }, [inputTokenInfo, inputAmout]);
  useEffect(() => {
    getValueInUsd(outputTokenInfo, Number(outputAmount), setOutputPriceInUSD);
  }, [outputTokenInfo, outputAmount]);

  // useEffect(() => {
  //   const getPrice = async () => {
  //     const res = await axios.get('https://price.jup.ag/v4/price?ids=SOl');
  //     const data = res.data;
  //     console.log(data);
  //   };
  //   getPrice();
  // }, [inputAmout, inputTokenInfo, outputTokenInfo, loadingRoute]);

  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <div className="w-full rounded-[15px] bg-foreground  sm:max-w-[450px] ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 !h-7">
            {pathname === "/trade" ? (
              <Link
                href={"/trade/swap"}
                className="text-sm bg-primary text-primary-foreground py-2 px-4 h-7 flex items-center justify-center rounded-lg "
              >
                Open Full Page
              </Link>
            ) : pathname == "/terminal" ? (
              <Link
                href={"/trade/swap"}
                className="text-sm bg-primary text-primary-foreground py-2 px-4 h-7 flex items-center justify-center rounded-lg "
              >
                Go to Swap Page
              </Link>
            ) : (
              <NavigationList filter="Trade" />
            )}
          </div>
          <div className=" flex flex-row items-center justify-end gap-1 h-7 text-primary">
            <div
              onClick={() => !loadingRoute && refresh()}
              className=" h-full aspect-square flex items-center justify-center cursor-pointer rounded-xl !bg-background p-2 text-primary "
            >
              <RefreshCwIcon className="text-accent" />
            </div>
            <Slippage slippage={slippage || 0} setSlippage={setSlippage} />

            <WalletMultiButtonDynamic
              startIcon={undefined}
              className="!rounded-lg  h-7 px-3 py-[6px] font-normal text-sm hidden lg:flex bg-primary text-primary-foreground hover:!bg-primary"
            />
          </div>
        </div>
        <Separator className="mt-5" />

        <div className="mt-4 flex flex-col justify-between gap-2 px-2">
          <div className="flex items-center justify-end  sm:justify-between">
            <h1 className="text-sm text-muted-foreground hidden sm:block">
              Swap This:
            </h1>
            <Balance
              tokenAccounts={tokenAccounts}
              token={inputTokenInfo}
              setInput={setInputAmount}
              solBalance={solBalance}
            />
          </div>
          {inputTokenInfo ? (
            <div className="flex flex-col gap-4 rounded-xl bg-background p-2  sm:p-4 ">
              <div className="flex flex-col w-full sm:flex-row items-center  gap-2 rounded-lg   text-white">
                <div className=" w-full rounded-xl">
                  <SelectCoin
                    tokenInfo={inputTokenInfo}
                    setCoin={setInputTokenInfo}
                    isInput={true}
                  />
                </div>
                <div className="flex flex-col gap-2 text-right h-full w-full">
                  <Input
                    value={inputAmout}
                    type="number"
                    onChange={(e) => setInputAmount(e.target.value.trim())}
                    className={cn(
                      "w-full h-full rounded-none  text-right text-xl font-medium transition-all duration-200 ease-in-out "
                    )}
                  />
                  <p className=" text-xs text-muted-foreground">
                    {inputPriceInUSD} USD
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Skeleton className="h-[116px] w-full  rounded-xl " />
          )}
          <div className="flex w-full flex-row justify-center ">
            <div
              className="h-[32px] w-[32px] cursor-pointer rounded-lg bg-background  p-2"
              onClick={handleSwitch}
            >
              <HiOutlineSwitchVertical className=" h-full w-full rotate-45  text-white  " />
            </div>
          </div>
          {outputTokenInfo ? (
            <div className=" flex flex-col justify-between gap-2">
              <div className="flex items-center justify-end  sm:justify-between">
                <h1 className="text-sm hidden text-muted-foreground sm:block">
                  To Receive:
                </h1>
                <Balance
                  tokenAccounts={tokenAccounts}
                  token={outputTokenInfo}
                  solBalance={solBalance}
                />
              </div>
              <div className=" flex flex-col gap-4 rounded-xl bg-background p-2  sm:p-4  ">
                <div className=" flex w-full flex-col sm:flex-row items-center gap-2 rounded-lg ">
                  <div className="w-full  rounded-xl">
                    <SelectCoin
                      tokenInfo={outputTokenInfo}
                      setCoin={setOutputTokenInfo}
                    />
                  </div>
                  <div className="flex flex-col gap-2 text-right w-full">
                    <div className="w-full overflow-hidden text-ellipsis rounded-xl border-none bg-transparent text-right text-xl font-medium  outline-none">
                      {(outputAmount &&
                        outputAmount.toLocaleString(undefined, {
                          maximumFractionDigits: 6,
                        })) ||
                        "0"}
                    </div>

                    <p className="text-muted-foreground text-xs">
                      {outputPriceInUSD} USD
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Skeleton className="h-[116px] w-full  rounded-xl border border-[#E5E7EB]" />
          )}
          {outputTokenInfo &&
          bestRoute &&
          routes &&
          !loadingRoute &&
          outputTokenInfo &&
          tokenMap ? (
            <SwapRoutes
              bestRoute={bestRoute}
              hasRoute={hasRoute}
              loadingRoute={loadingRoute}
              outputAmount={outputAmount}
              outputTokenInfo={outputTokenInfo}
              routes={routes}
              selectedRoute={selectedRoute}
              setSelectedRoute={setSelectedRoute}
              tokenMap={tokenMap}
            />
          ) : (
            <Skeleton className="h-6 w-full  " />
          )}
          {connected ? (
            <div className="mt-4">
              <Button
                onClick={handleSwap}
                disabled={swapping || !loaded || !hasRoute}
                className="flex bg-primary hover:!bg-primary text-primary-foreground items-center justify-center w-full py-5 h-14"
              >
                {swapping ? (
                  <div className="flex flex-row justify-center text-black">
                    <span className="mr-2 ">Swapping</span>
                    <Loading />
                  </div>
                ) : (
                  "Swap"
                )}
              </Button>
            </div>
          ) : (
            <div className="mt-4 flex flex-row justify-center">
              <WalletMultiButtonDynamic
                startIcon={undefined}
                className=" flex bg-primary hover:!bg-primary text-primary-foreground items-center justify-center w-full py-5 h-14"
                style={{ borderRadius: "12px" }}
              >
                Connect Wallet
              </WalletMultiButtonDynamic>
            </div>
          )}
          {showDetails && (
            <div>
              {outputTokenInfo && inputTokenInfo && !loadingRoute ? (
                <Details
                  selectRoute={selectedRoute}
                  toTokenInfo={outputTokenInfo}
                  fromTokenInfo={inputTokenInfo}
                  loading={loadingRoute}
                  routes={routes}
                />
              ) : (
                <Skeleton className="mt-4 h-[106px] w-full  border border-primary rounded-xl  " />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JupiterForm;
