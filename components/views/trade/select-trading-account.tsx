'use client';
import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dexterity, useManifest, useProduct, useTrader } from '@/context/dexterity';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useCallback, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

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
  } = useTrader();


  const callbacks = {
    onGettingBlockHashFn: () => { },
    onGotBlockHashFn: () => { },
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
    if (!amount || !publicKey || !manifest) {
      console.log({ amount, publicKey })
      return
    };
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


  return (
    <Container className="p-3 bg-background flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          Select A Trading Account
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          Withdraw or Deposit {'(USDC)'}
        </p>
        <div className="bg-foreground px-5 rounded-lg">
          <Input
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter Amount"
            className="placeholder:text-[#FCFCFC] placeholder:text-sm placeholder:font-medium "
          />
        </div>
      </div>
      <Button
        color="primary"
        className="w-full h-14 mb-4 uppercase bg-[#8BD796] "
        onClick={handleDeposit}
        disabled={amount === null || isLoading}
      >
        Deposit
      </Button>
      <Button
        color="primary"
        className="w-full h-14 mb-4 uppercase bg-[#FF8F8F]"
        onClick={handleWithdraw}
        disabled={amount === null || isLoading}
      >
        Withdraw
      </Button>
    </Container>
  );
};

export default SelectTradingAccount;
