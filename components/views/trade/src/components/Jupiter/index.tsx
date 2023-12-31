'use client';
import {
  FIDA_MINT,
  retry,
  useSolBalance,
  useTokenAccounts,
} from '@bonfida/hooks';
import { GrRefresh } from 'react-icons/gr';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import round from 'lodash/round';
import { InlineResponse200MarketInfos } from '@jup-ag/api';
import { NATIVE_MINT } from '@solana/spl-token';
import { TokenInfo } from '@solana/spl-token-registry';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletDisconnectButton,
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import {
  PublicKey,
  Transaction,
  VersionedTransaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { useInterval, useLocalStorageState } from 'ahooks';
import { nanoid } from 'nanoid';
import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import emoji from '../../assets/no-route.png';
import { getFeeAddress } from '../../utils/fees';
import Loading from '../Loading';
import { SwapRoute } from '../SwapRoute';
import { Balance } from './Balance';
import { SelectCoin } from './SelectCoin';
import { Slippage } from './Slippage';
import { Buffer } from 'buffer';
// Token Mints
export const INPUT_MINT_ADDRESS =
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC
export const OUTPUT_MINT_ADDRESS =
  'AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR'; // Guac

import { useJupiterApiContext } from '../../contexts';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { RenderUpdate } from '@/components/ui/RenderUpdate';
import dynamic from 'next/dynamic';
import { SwapRoutes } from './swap-routes';
import Details from './details';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

interface IJupiterFormProps {}

const JupiterForm: FunctionComponent<IJupiterFormProps> = (props) => {
  const toastId = useRef(nanoid());
  const [firstLoad, setFirstLoad] = useState(false);
  const { connected, publicKey, signAllTransactions, sendTransaction } =
    useWallet();
  const { connection } = useConnection();
  const { tokenMap, routeMap, loaded, api } = useJupiterApiContext();
  const [routes, setRoutes] = useState<Awaited<ReturnType<any>>['data']>([]);

  const [slippage, setSlippage] = useLocalStorageState('slippage', {
    defaultValue: 1,
  });
  const [selectedRoute, setSelectedRoute] = useState<any | null>(null);
  const [inputTokenInfo, setInputTokenInfo] = useState<
    TokenInfo | null | undefined
  >(tokenMap.get(INPUT_MINT_ADDRESS) as TokenInfo);
  const [outputTokenInfo, setOutputTokenInfo] = useState<
    TokenInfo | null | undefined
  >(tokenMap.get(OUTPUT_MINT_ADDRESS) as TokenInfo);
  const [hasRoute, setHasRoute] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [loadingRoute, setLoadingRoute] = useState(true); // Loading by default
  const { data: tokenAccounts, refresh: refreshToken } = useTokenAccounts(
    connection,
    publicKey
  );
  const [inputAmout, setInputAmount] = useState('10');
  const { data: solBalance, refresh: refreshSol } = useSolBalance(
    connection,
    publicKey
  );

  useMemo(() => {
    setInputTokenInfo(tokenMap.get(INPUT_MINT_ADDRESS) as TokenInfo);
    setOutputTokenInfo(tokenMap.get(OUTPUT_MINT_ADDRESS) as TokenInfo);
  }, [tokenMap]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
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
        !possibleOutputs?.includes(outputTokenInfo?.address || '')
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
      return toast.info(<p className="text-xs font-bold">Invalid amount</p>);
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
      return toast.info(
        <p className="text-xs font-bold">Could not find user balances</p>
      );
    }

    if (userBalances < parsedAmount) {
      return toast.info(
        <p className="text-xs font-bold">
          Not enough balances (only have {round(userBalances, 2)}
          {inputTokenInfo.symbol})
        </p>
      );
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
          console.log('FEE', txId);
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
          console.log('HERE', swapTransaction);
          const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
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
          console.log(`https://solscan.io/tx/${txid}`);
        }
      }
    } catch (e) {
      console.error('Error', e);
      const isError = e instanceof Error;
      if (isError && e.message.includes('Transaction simulation')) {
        toast.update(toastId.current, {
          type: toast.TYPE.INFO,
          autoClose: 5_000,
          render: () => (
            <RenderUpdate
              updateText="Transaction simulation failed"
              load={false}
            />
          ),
        });
      } else if (isError && e.message.includes('blockhash')) {
        toast.update(toastId.current, {
          type: toast.TYPE.INFO,
          autoClose: 5_000,
          render: () => (
            <RenderUpdate updateText="Blockhash not found" load={false} />
          ),
          toastId: toastId.current,
        });
      } else if (
        isError &&
        e.message.includes('Transaction was not confirmed') &&
        txids.length > 0
      ) {
        toast.update(toastId.current, {
          type: toast.TYPE.INFO,
          autoClose: 5_000,
          render: () => (
            <RenderUpdate
              updateText="Transaction failed to confirm. Inspect it on the explorer"
              load={false}
              signatures={txids}
            />
          ),
        });
      } else if (
        isError &&
        e.message.includes('Transaction was not confirmed')
      ) {
        toast.update(toastId.current, {
          type: toast.TYPE.INFO,
          autoClose: 5_000,
          render: () => (
            <RenderUpdate
              updateText="Transaction failed to confirm"
              load={false}
            />
          ),
        });
      } else {
        toast.update(toastId.current, {
          type: toast.TYPE.ERROR,
          autoClose: 5_000,
          render: () => (
            <RenderUpdate updateText="Transaction failed 🤯" load={false} />
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

  if (!bestRoute) return <Loading />;

  return (
    <>
      <div className="w-full rounded-[15px] bg-white  sm:w-[450px] ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 !h-7">
            <Button className=" h-full rounded-lg text-sm">Swap</Button>
            <Button
              disabled
              variant="secondary"
              className="h-full rounded-lg text-sm"
            >
              TWAMM
            </Button>
          </div>
          <div className=" flex flex-row items-center justify-end gap-1 h-7">
            <div
              onClick={() => !loadingRoute && refresh()}
              className=" h-full aspect-square flex items-center justify-center cursor-pointer rounded-xl !bg-[#E5E7EB] p-2 text-black"
              color="white"
            >
              <GrRefresh className="h-full  " />
            </div>
            <Slippage slippage={slippage || 0} setSlippage={setSlippage} />

            <WalletMultiButtonDynamic
              startIcon={undefined}
              className="!rounded-lg  h-7 px-3 py-[6px] font-normal text-sm hidden sm:flex "
            />
          </div>
        </div>
        <Separator className="mt-5" />

        <div className="mt-4 flex flex-col justify-between gap-[5px]">
          <div className="flex flex-col gap-4 rounded-xl border border-[#E5E7EB] px-4 py-5 ">
            <div className="flex w-full flex-row items-center  gap-2 rounded-lg bg-white  text-black">
              <div className=" w-full rounded-xl">
                <SelectCoin
                  tokenInfo={inputTokenInfo}
                  setCoin={setInputTokenInfo}
                />
              </div>
              <Input
                value={inputAmout}
                type="number"
                onChange={(e) => setInputAmount(e.target.value.trim())}
                className="w-full rounded-xl border-none bg-transparent text-right text-xl font-medium  outline-none"
              />
            </div>

            <Balance
              tokenAccounts={tokenAccounts}
              token={inputTokenInfo}
              setInput={setInputAmount}
              solBalance={solBalance}
            />
          </div>
          <div className="flex w-full flex-row justify-center">
            <div className="h-[32px] w-[32px] cursor-pointer rounded-lg border border-[#E5E7EB] bg-[#E5E7EB] p-2">
              <HiOutlineSwitchVertical
                onClick={handleSwitch}
                className=" h-full w-full rotate-45 text-black  "
              />
            </div>
          </div>
          <div className=" flex flex-col gap-4 rounded-xl border border-[#E5E7EB] px-4 py-5 ">
            <div className="flex w-full flex-row items-center gap-2 rounded-lg bg-white ">
              <div className="w-full  rounded-xl">
                <SelectCoin
                  tokenInfo={outputTokenInfo}
                  setCoin={setOutputTokenInfo}
                />
              </div>
              <div className="w-full overflow-hidden text-ellipsis rounded-xl border-none bg-transparent text-right text-xl font-medium  outline-none">
                {outputAmount.toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                })}
              </div>
            </div>

            <Balance
              tokenAccounts={tokenAccounts}
              token={outputTokenInfo}
              solBalance={solBalance}
            />
          </div>
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
          {connected ? (
            <div className="mt-4">
              <Button
                onClick={handleSwap}
                disabled={swapping || !loaded || !hasRoute}
                className="h-[50px] w-full rounded-xl bg-black p-2 font-bold uppercase"
              >
                {swapping ? (
                  <div className="flex flex-row justify-center text-black">
                    <span className="mr-2 ">Swapping</span>
                    <Loading />
                  </div>
                ) : (
                  'Swap'
                )}
              </Button>
            </div>
          ) : (
            <div className="mt-4 flex flex-row justify-center">
              <WalletMultiButtonDynamic
                startIcon={undefined}
                className="h-full flex items-center justify-center w-full "
                style={{ borderRadius: '12px' }}
              >
                Connect Wallet
              </WalletMultiButtonDynamic>
            </div>
          )}
          {outputTokenInfo && inputTokenInfo && (
            <Details
              selectRoute={selectedRoute}
              toTokenInfo={outputTokenInfo}
              fromTokenInfo={inputTokenInfo}
              loading={loadingRoute}
              routes={routes}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default JupiterForm;
