"use client";
import EarnHeader from "@/components/common/earn-header";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ApyPerformance from "../statistics/apy-performance";
import LiquidityAllocation from "../statistics/liquidity-allocation";
import StatisticsCardContainer from "../statistics/statistics-card-container";
import StatisticsForms from "../statistics/statistics-forms";
import TotalLiquidity from "../statistics/total-liquidity";
import YourDeposit from "../statistics/your-deposit";
import { useNetworkConfiguration } from "@/context/network-configuration";
import { VaultStateAPI } from "@/lib/dynamic-vaults";
import { getColorByName, getUserbalance, toLamports } from "@/lib/utils";
import VaultImpl, { KEEPER_URL } from "@mercurial-finance/vault-sdk";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useJupiterApiContext } from "../../trade/src/contexts";
import { fromLamports } from "../../trade/src/misc/utils";
import useVaultInfo from "@/hooks/use-vault-info";
import BN from "bn.js";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import LiquidityAllocationChart from "../statistics/liquidity-allocation-chart";

interface IData {
  virtualPrice: number;
  tvl: number;
  userTVL: number;
  userLPBalance: number;
  userTokenBalance: number;
  strategyAllocation: {
    name: string;
    liquidity: number;
    allocation: string;
    maxAllocation: number;
  }[];
}

const initialData: IData = Object.freeze({
  virtualPrice: 0,
  tvl: 0,
  userTVL: 0,
  userLPBalance: 0,
  userTokenBalance: 0,
  strategyAllocation: [],
});
const DetailVaultContainer = ({ tokenAdr }: { tokenAdr: string }) => {
  const { publicKey, sendTransaction, connected, signTransaction } =
    useWallet();
  const [vaultInfo, setVaultInfo] = useState<any>(null);
  const { data, isLoading, error } = useVaultInfo();
  const { tokenMap } = useJupiterApiContext();
  const { toast } = useToast();
  const { connection } = useConnection();
  const [token, setToken] = useState<any | null>(null);
  const [vaultImpl, setVaultImpl] = useState<VaultImpl | null>(null);
  const [info, setInfo] = useState<any | null>(null);
  const { networkConfiguration } = useNetworkConfiguration();
  const URL = KEEPER_URL[networkConfiguration];

  // Vault State
  const [vaultUnlockedAmount, setVaultUnlockedAmount] = useState<number>(0);
  const [vaultStateAPI, setVaultStateAPI] = useState<VaultStateAPI>({
    enable: false,
    token_amount: 0,
    total_amount: 0,
    lp_supply: 0,
    strategies: [],
  });

  // Vault State to display
  const [uiState, setUiState] = useState<IData>(initialData);

  // User balances
  const [userLPBalanceInLamports, setUserLPBalanceInLamports] = useState(0);
  const [userTokenBalanceInLamports, setUserTokenBalanceInLamports] =
    useState(0);

  // User interaction
  const [loading, setLoading] = useState(false);
 
  useMemo(() => {
    if (!isLoading && data) {
      const item = data.find((elm) => elm.token_address == tokenAdr);
      setVaultInfo(item);
    }
  }, [isLoading, vaultInfo]);
  const initVaultImpl = useCallback(async () => {
    if (token && connection) {
      const vault = await VaultImpl.create(connection, token, {
        affiliateId: new PublicKey(
          "EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC"
        ), // Replace with your own Partner ID
      });

      vault.getAffiliateInfo().then((resp) => {
        setInfo(resp);
      });

      setVaultImpl(vault);
    }
  }, [token, connection]);

  useEffect(() => {
    const tkn = tokenMap.get(tokenAdr);
    setToken(tkn);
  }, [tokenMap, tokenAdr]);

  useEffect(() => {
    initVaultImpl();
  }, [initVaultImpl]);

  const fetchVaultInformation = useCallback(async () => {
    if (vaultImpl && token) {
      const unlockedAmount = await vaultImpl.getWithdrawableAmount();
      setVaultUnlockedAmount(unlockedAmount.toNumber());

      const vaultsStateResponse = await fetch(
        `${URL}/vault_state/${token.address}`
      );
      const vaultsState = (await vaultsStateResponse.json()) as VaultStateAPI;
      setVaultStateAPI(vaultsState);
    }
  }, [vaultImpl, token, URL]);

  const fetchUserBalance = useCallback(async () => {
    if (!token || !publicKey) return setUserLPBalanceInLamports(0);

    try {
      const userLpBalance = await vaultImpl.getUserBalance(publicKey);
      setUserLPBalanceInLamports(userLpBalance.toNumber());

      const userTokenBalance = await getUserbalance(
        connection,
        new PublicKey(token.address),
        publicKey
      );
      setUserTokenBalanceInLamports(userTokenBalance);
    } catch (error) {
      console.log("Error getting user lp or token balance", error);
    }
  }, [token, vaultImpl, publicKey, connection]);

  useEffect(() => {
    fetchVaultInformation();
  }, [fetchVaultInformation]);

  useEffect(() => {
    fetchUserBalance();
  }, [fetchUserBalance]);

  useEffect(() => {
    if (vaultImpl && info && vaultInfo) {
  
      const virtualPrice =
        vaultUnlockedAmount / vaultImpl.lpSupply.toNumber() || 0;
      // Vault reserves + all strategy allocations
      const totalAllocation = vaultStateAPI.strategies.reduce(
        (acc, item) => acc + item.liquidity,
        vaultStateAPI.token_amount
      );

      setUiState({
        virtualPrice,
        tvl:
          vaultInfo.usd_rate *
          fromLamports(Number(vaultInfo.token_amount), token.decimals),
        userTVL:
          Number(
            fromLamports(Number(userLPBalanceInLamports), token.decimals)
          ) * virtualPrice,
        userLPBalance: fromLamports(
          Number(userLPBalanceInLamports),
          token.decimals
        ),
        userTokenBalance: fromLamports(
          Number(userTokenBalanceInLamports),
          token.decimals
        ),
        strategyAllocation: vaultStateAPI.strategies
          .map((item) => ({
            name: item.strategy_name,
            liquidity: item.liquidity,
            allocation: ((item.liquidity / totalAllocation) * 100).toFixed(0),
            maxAllocation: item.max_allocation,
          }))
          .concat({
            name: "Vault Reserves",
            liquidity: vaultStateAPI.token_amount,
            allocation: (
              (vaultStateAPI.token_amount / totalAllocation) *
              100
            ).toFixed(0),
            maxAllocation: 0,
          })
          .sort((a, b) => b.liquidity - a.liquidity),
      });

      if (!publicKey) {
        setUiState((prev) => ({
          ...prev,
          userLPBalance: 0,
          userTVL: 0,
          userTokenBalance: 0,
        }));
      }
    }
  }, [
    publicKey,
    vaultImpl,
    info,
    vaultUnlockedAmount,
    userLPBalanceInLamports,
    userTokenBalanceInLamports,
    vaultStateAPI,
    token,
  ]);
  const depositToken = async (amount: number) => {
    if (!publicKey)
      return toast({
        variant: "destructive",
        title: "Wallet not connected",
        description: "Please Connect your wallet",
      });

    try {
      if (Number(amount) <= 0 || loading) return;

      const amountInLamports = toLamports(Number(amount), token.decimals);
      const tx = await vaultImpl.deposit(publicKey, new BN(amountInLamports));
      const signedTx = await signTransaction(tx);
      const txid = await connection.sendRawTransaction(signedTx.serialize());

      await connection.confirmTransaction({
        signature: txid,
        ...(await connection.getLatestBlockhash()),
      });
      toast({
        variant: "success",
        title: "Success",
        description: (
          <div className="flex flex-col gap-2">
            <p>Your SOL has been staked!</p>
            <Link
              href={`https://solscan.com/tx/${txid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-5 py-2 uppercase text-sm rounded-md text-center"
            >
              View on solscan
            </Link>
          </div>
        ),
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      fetchUserBalance();
    }
  };
  const withdrawBalance = async (amount: number) => {
    if (!publicKey)
      return toast({
        variant: "destructive",
        title: "Wallet not connected",
        description: "Please Connect your wallet",
      });

    try {
      if (Number(amount) <= 0 || loading) return;

      const amountInLamports = toLamports(Number(amount), token.decimals);
      const tx = await vaultImpl.withdraw(publicKey, new BN(amountInLamports));
      const signedTx = await signTransaction(tx);
      const txid = await connection.sendRawTransaction(signedTx.serialize());

      await connection.confirmTransaction({
        signature: txid,
        ...(await connection.getLatestBlockhash()),
      });
      toast({
        variant: "success",
        title: "Success",
        description: (
          <div className="flex flex-col gap-2">
            <p>Your SOL has been staked!</p>
            <Link
              href={`https://solscan.com/tx/${txid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-5 py-2 uppercase text-sm rounded-md text-center"
            >
              View on solscan
            </Link>
          </div>
        ),
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      fetchUserBalance();
    }
  };

  return (
    <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md ">
      <EarnHeader
        title={`Dynamic $${token ? token.symbol : ""} Vault`}
        tutorialLink="https://docs.guacamole.gg/products-and-features/earn/dynamic-lending-vaults"
        viewAll={true}
      />
      <hr className="border-dashed border-background" />

      <StatisticsForms
        uiState={uiState}
        vaultImpl={vaultImpl}
        token={token}
        deposit={depositToken}
        withdrawBalance={withdrawBalance}
        vaultInfo={vaultInfo}
      />
     
    </div>
  );
};

export default DetailVaultContainer;
