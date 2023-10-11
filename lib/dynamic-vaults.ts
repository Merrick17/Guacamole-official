import { toLamports } from "@/components/views/trade/src/misc/utils";
import { PublicKey } from "@solana/web3.js";
import axios from "axios";
import BN from "bn.js";
import { getUserbalance } from "./utils";

const apiUrl = "https://merv2-api.mercurial.finance/vault_info";
export enum StrategyType {
  PortFinanceWithoutLM = "PortFinanceWithoutLM",
  PortFinanceWithLM = "PortFinanceWithLM",
  SolendWithoutLM = "SolendWithoutLM",
  SolendWithLM = "SolendWithLM",
  ApricotWithoutLM = "ApricotWithoutLM",
  Francium = "Francium",
  Mango = "Mango",
  Vault = "Vault",
}

export type VaultStateAPI = {
  enable: boolean;
  token_amount: number;
  total_amount: number;
  lp_supply: number;
  strategies: Array<{
    pubkey: string;
    reserve: string;
    strategy_type: StrategyType;
    strategy_name: string;
    liquidity: number;
    reward: number;
    max_allocation: number;
  }>;
};

const fetchVaultInfo = async () => {
  try {
    const response = await axios.get(apiUrl);
    const vaultInfoData = response.data;
    return vaultInfoData;
  } catch (error) {
    return null;
  }
};
// Utility function to fetch vault information
const fetchVaultInformation = async (
  vaultImpl,
  tokenInfo,
  setVaultUnlockedAmount,
  URL
) => {
  const unlockedAmount = await vaultImpl.getWithdrawableAmount();
  setVaultUnlockedAmount(unlockedAmount.toNumber());

  const vaultsStateResponse = await fetch(
    `${URL}/vault_state/${tokenInfo.address}`
  );
  const vaultsState = (await vaultsStateResponse.json()) as VaultStateAPI;
  return vaultsState;
};

// Utility function to fetch user balance
const fetchUserBalance = async (
  vaultImpl,
  publicKey,
  tokenInfo,
  connection
) => {
  if (!tokenInfo || !publicKey)
    return {
      userLpBalance: 0,
      userTokenBalance: 0,
    };

  try {
    const userLpBalance = await vaultImpl.getUserBalance(publicKey);
    {
    }

    const userTokenBalance = await getUserbalance(
      connection,
      new PublicKey(tokenInfo.address),
      publicKey
    );

    return {
      userLpBalance: userLpBalance.toNumber(),
      userTokenBalance: userTokenBalance,
    };
  } catch (error) {
    console.log("Error getting user lp or token balance", error);
  }
};

// Utility function to deposit
const deposit = async (
  publicKey,
  loading,
  depositAmount,
  tokenInfo,
  vaultImpl,
  signTransaction,
  connection,
  setDepositAmount,
  fetchUserBalance
) => {
  if (!publicKey) return alert("Please connect your wallet");

  try {
    if (Number(depositAmount) <= 0 || loading) return;

    const amountInLamports = toLamports(
      Number(depositAmount),
      tokenInfo.decimals
    );
    const tx = await vaultImpl.deposit(publicKey, new BN(amountInLamports));
    const signedTx = await signTransaction(tx);
    const txid = await connection.sendRawTransaction(signedTx.serialize());

    await connection.confirmTransaction({
      signature: txid,
      ...(await connection.getLatestBlockhash()),
    });
  } catch (error) {
    console.log(error);
  } finally {

    fetchUserBalance();
  }
};

// Utility function to withdraw
const withdraw = async (
  publicKey,
  loading,
  withdrawAmount,
  tokenInfo,
  vaultImpl,
  signTransaction,
  connection,
  setWithdrawAmount,
  fetchUserBalance
) => {
  if (!publicKey) return alert("Please connect your wallet");

  try {
    if (Number(withdrawAmount) <= 0 || loading) return;

    const amountInLamports = toLamports(
      Number(withdrawAmount),
      tokenInfo.decimals
    );
    const tx = await vaultImpl.withdraw(publicKey, new BN(amountInLamports));
    const signedTx = await signTransaction(tx);
    const txid = await connection.sendRawTransaction(signedTx.serialize());

    await connection.confirmTransaction({
      signature: txid,
      ...(await connection.getLatestBlockhash()),
    });
  } catch (error) {
    console.log(error);
  } finally {
  
    fetchUserBalance();
  }
};

export { fetchVaultInformation, fetchUserBalance, deposit, withdraw };

export { fetchVaultInfo };
