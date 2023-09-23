import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useWallet } from '@solana/wallet-adapter-react';
import VaultImpl, { KEEPER_URL } from '@mercurial-finance/vault-sdk';
import { PublicKey } from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';
import { useNetworkConfiguration } from '@/context/network-configuration';
import { VaultStateAPI } from '@/lib/dynamic-vaults';

import { fromLamports, getUserbalance } from "@/lib/utils";
import { useJupiterApiContext } from "../../trade/src/contexts";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export type DynmaicVaultItemProps = {
  image?: string;
  title?: string;
  walletBalance?: string;
  yourDeposit?: string;
  VirtualPrice?: string;
  TVL?: string;
  estimatedAPY?: string;
  item?: any;
};

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

const DynmaicVaultItem: FC<DynmaicVaultItemProps> = ({
  image,
  title,
  walletBalance,
  yourDeposit,
  VirtualPrice,
  TVL,
  estimatedAPY,
  item,
}) => {
  const router = useRouter();
  const { tokenMap } = useJupiterApiContext();
  const { publicKey, connected } = useWallet();
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
  const [expanded, setExpanded] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const initVaultImpl = useCallback(async () => {
    if (token && connection) {
      const vault = await VaultImpl.create(connection, token, {
        affiliateId: new PublicKey(
          'EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC'
        ), // Replace with your own Partner ID
      });

      vault.getAffiliateInfo().then((resp) => {
      
        setInfo(resp);
      });

      setVaultImpl(vault);
    }
  }, [token, connection]);

  useEffect(() => {
    const tkn = tokenMap.get(item.token_address);
    setToken(tkn);
  }, [tokenMap, item.token_address]);

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
      console.log('Error getting user lp or token balance', error);
    }
  }, [token, vaultImpl, publicKey, connection]);

  useEffect(() => {
    fetchVaultInformation();
  }, [fetchVaultInformation]);

  useEffect(() => {
    fetchUserBalance();
  }, [fetchUserBalance]);

  useEffect(() => {
    const vaultInfo = item;
    if (vaultImpl && info) {
    
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
            name: 'Vault Reserves',
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
  if (!token) return null;

  return (
    <div className="py-4 px-5 border border-transparent bg-background rounded-lg flex flex-col gap-3 hover:border-primary transition-colors duration-500 ease-in-out text-center w-full min-w-[300px]">
      <header className="flex items-center justify-center">
        {token && (
          <Image src={token.logoURI} width={40} height={40} alt={title} />
        )}
      </header>
      <h1 className="text-3xl">{item.symbol} VAULT</h1>
      <Separator className="bg-foreground" />
      <div className="flex flex-col gap-1 capitalize text-muted-foreground">
        <div className="flex items-center justify-between">
          <h2>Wallet Balance</h2>
          <p>{uiState.userTokenBalance.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2>Your Deposits</h2>
          {token && (
            <p>{`${uiState.userTVL.toFixed(token.decimals)} ${
              token.symbol
            }`}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <h2>Virtual Price</h2>
          <p>{uiState.virtualPrice.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2>TVL</h2>
          <p>{uiState.tvl.toFixed(2)}</p>
        </div>
      </div>
      <Separator className="bg-foreground" />
      <div>
        <h1 className="text-[32px] font-medium">
          {item.average_apy.toFixed(3)}%
        </h1>
        <div className="flex items-center gap-1 justify-center text-muted-foreground">
          <h2 className="text-sm">Estimated APY</h2>
          <AiOutlineQuestionCircle />
        </div>
      </div>
      <Button
        onClick={() => {
          router.push(`/earn/single-vault/${token.address}`);
        }}
      >
        View Vault
      </Button>
    </div>
  );
};

export default DynmaicVaultItem;
