"use client";
import { TraderAccountDropdown } from "@/components/common/TraderAccountDropDown";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  dexterity,
  useManifest,
  useProduct,
  useTrader,
} from "@/context/dexterity";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
type TraderAccount = {
  pubkey: PublicKey;
  trg: any;
};

const SelectTradingAccount = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [depositStatus, setDepositStatus] = useState<
    "idle" | "processing" | "success" | "failed"
  >("idle");
  const [withdrawStatus, setWithdrawStatus] = useState<
    "idle" | "processing" | "success" | "failed"
  >("idle");
  const { publicKey } = useWallet();
  const { manifest } = useManifest(); // Assuming createTRG is the function to create a new TRG
  const [trgsArr, setTrgsArr] = useState<TraderAccount[]>([]);
  const [selectedTrg, setSelectedTrg] = useState<string>("");
  const { setTrader } = useTrader();
  const { mpgPubkey } = useProduct();
  const { selectedProduct } = useProduct();
  const {
    trader,
    cashBalance,
    setCashBalance,
    openPositionsValue,
    setOpenPositionsValue,
    portfolioValue,
    setPortfolioValue,
    initialMarginReq,
    setInitialMarginReq,
    maintananceMarginReq,
    setMaintananceMarginReq,
    accountHealth,
    setAccountHealth,
    allTimePnl,
    setAllTimePnl,
    updated,
    setUpdated,
    lastUpdated,
    setLastUpdated,
    setAccountLeverage,
    accountLeverage,
    setPositionsData,
  } = useTrader();

  const updateAccountInfo = useCallback(async () => {
    if (!trader) return;
    const cashBalance = Number(
      trader.getExcessInitialMarginWithoutOpenOrders()
    );
    const openPositionsValue = Number(trader.getPositionValue());
    const portfolioValue = Number(trader.getPortfolioValue());
    const initialMarginReq = Number(trader.getRequiredInitialMargin());
    const maintananceMarginReq = Number(trader.getRequiredMaintenanceMargin());
    const accountHealth =
      portfolioValue > initialMarginReq * 2
        ? "Very Healthy"
        : portfolioValue > initialMarginReq * 1.5
        ? "Healthy"
        : portfolioValue > initialMarginReq
        ? "Healthy, at risk"
        : portfolioValue > maintananceMarginReq * 1.5
        ? "Unhealthy, at risk"
        : portfolioValue > maintananceMarginReq
        ? "Very unhealthy, reduce your risk"
        : "Liquidatable";
    const allTimePnl = Number(trader.getPnL());
    const positions = Array.from(trader.getPositions());

    setPositionsData(positions);
    setCashBalance(cashBalance);
    setOpenPositionsValue(openPositionsValue);
    setPortfolioValue(portfolioValue);
    setInitialMarginReq(initialMarginReq);
    setMaintananceMarginReq(maintananceMarginReq);
    setAccountHealth(accountHealth);
    setAllTimePnl(allTimePnl);
    setUpdated(true);
    setAccountLeverage(portfolioValue / initialMarginReq);
    setLastUpdated(Date.now());
  }, [trader, selectedProduct]); // Removed markPrice and indexPrice

  useEffect(() => {
    if (trader) {
      trader.connect(updateAccountInfo, updateAccountInfo);

      return () => {
        trader.disconnect();
      };
    }
  }, [updateAccountInfo, trader]);

  useEffect(() => {
    fetchTraderAccounts();
  }, [publicKey]);

  const fetchTraderAccounts = useCallback(async () => {
    if (!publicKey) return;
    if (!manifest) return;
    if (!manifest.fields) return;
    if (!manifest.fields.wallet) return;
    if (!manifest.fields.wallet.publicKey) return;

    try {
      const trgs = await manifest.getTRGsOfOwner(
        publicKey,
        new PublicKey(mpgPubkey)
      );
      setTrgsArr(trgs);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Selecting Trader Account failed!`,
        description: error?.message,
      });
    }
  }, [publicKey, manifest]);

  const handleSelection = useCallback(
    async (selectedValue: string) => {
      if (selectedValue == "default") return;
      setSelectedTrg(selectedValue);
      const trader = new dexterity.Trader(
        manifest,
        new PublicKey(selectedValue)
      );
      const trg = await manifest.getTRG(new PublicKey(selectedValue));
      await trader.update();
      await manifest.updateOrderbooks(new PublicKey(mpgPubkey));
      setTrader(trader);
    },
    [manifest, setTrader]
  );

  const callbacks = {
    onGettingBlockHashFn: () => {},
    onGotBlockHashFn: () => {},
    onConfirm: async (txn: string) => {
      toast({
        variant: "success",
        title: "Deposited successfully into trader account!",
        description: (
          <div className="flex flex-col gap-1">
            <p>Transaction sent successfully.</p>
            <Link href={`https://solscan.io/tx/${txn}`}>View on solscan</Link>
          </div>
        ),
      });
      setDepositStatus("success");
      console.log("HERE CONFIRMED");
    },
  };

  const handleDeposit = useCallback(async () => {
    if (!amount || !publicKey || !manifest) return;
    try {
      setIsLoading(true);
      setDepositStatus("processing");
      await trader.deposit(dexterity.Fractional.New(amount, 0), callbacks);
    } catch (error: any) {
      setDepositStatus("failed");
      toast({
        variant: "destructive",
        title: "Deposit failed!",
        description: error?.message,
      });
      //notify({ type: 'error', message: 'Deposit failed!', description: error?.message });
    } finally {
      setIsLoading(false);
    }
  }, [amount, publicKey, manifest, trader, selectedProduct]);

  const handleWithdraw = useCallback(async () => {
    if (!amount || !publicKey || !manifest) return;

    try {
      setIsLoading(true);
      setWithdrawStatus("processing");
      await trader.withdraw(dexterity.Fractional.New(amount, 0));
      setWithdrawStatus("success");
    } catch (error: any) {
      setWithdrawStatus("failed");
      toast({
        variant: "destructive",
        title: "Withdrawal failed!",
        description: error?.message,
      });
      //notify({ type: 'error', message: 'Withdrawal failed!', description: error?.message });
    } finally {
      toast({
        variant: "success",
        title: "Success",
        description: "Withdrawn successfully from trader account!",
      });
      //notify({ type: 'success', message: 'Withdrawn successfully from trader account!' });
      setIsLoading(false);
    }
  }, [amount, publicKey, manifest, trader, selectedProduct]);

  useEffect(() => {
    fetchTraderAccounts();
  }, [publicKey]);

  return (
    <Container className="bg-foreground p-3 bg-background flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          Select A Trading Account
        </p>
      </div>
      <TraderAccountDropdown accounts={trgsArr} onSelect={handleSelection} />
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          Withdraw or Deposit {"(USDC)"}
        </p>
        <div className="bg-foreground px-5 rounded-lg">
          <Input
            value={amount}
            type="number"
            step="0.1"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Enter Amount"
            className="placeholder:text-[#FCFCFC] placeholder:text-sm placeholder:font-medium "
          />
        </div>
      </div>
      <Button
        size="lg"
        variant="success"
        className="font-extrabold uppercase text-xs guac-bg"
        onClick={handleDeposit}
        disabled={amount === null || isLoading}
      >
        Deposit
      </Button>
      <Button
        size="lg"
        variant="destructive"
        className="font-extrabold uppercase text-xs earn-bg"
        onClick={handleWithdraw}
        disabled={amount === null || isLoading}
      >
        Withdraw
      </Button>
      <div className="flex w-full gap-4 ">
        <Button
          size="lg"
          variant="success"
          className="font-extrabold uppercase trade-bg text-xs w-full"
          onClick={() => {
            navigator.clipboard.writeText(selectedTrg);
            toast({
              variant: "success",
              title: "Copied to clipboard",
            });
          }}
        >
         Copy Address
        </Button>
        <Button
          size="lg"
          variant="destructive"
          className="font-extrabold uppercase text-xs w-full earn-bg "
          onClick={handleDeposit}
          disabled
        >
          Close Account
        </Button>
      </div>
    </Container>
  );
};

export default SelectTradingAccount;
