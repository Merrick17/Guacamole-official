import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  SelectTraderAccounts,
  TraderAccountDropdown,
} from "./TraderAccountDropDown";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  useManifest,
  useProduct,
  useTrader,
  dexterity,
} from "@/context/dexterity";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
type TraderAccount = {
  pubkey: PublicKey;
  trg: any;
};
interface PerceptuaModalProps {
  isOpen: boolean;
  handleClose: () => void;
}
const PreceptualModal = ({ isOpen, handleClose }: PerceptuaModalProps) => {
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
    setOrderData,
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

    setOrderData(
      //@ts-ignore
      Array.from(
        await Promise.all(trader.getOpenOrders([selectedProduct.name]))
      )
    );
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

  const [amount, setAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [depositStatus, setDepositStatus] = useState<
    "idle" | "processing" | "success" | "failed"
  >("idle");
  const [withdrawStatus, setWithdrawStatus] = useState<
    "idle" | "processing" | "success" | "failed"
  >("idle");

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
      handleClose();
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
      handleClose();
    }
  }, [amount, publicKey, manifest, trader, selectedProduct]);
  useEffect(() => {
    fetchTraderAccounts();
  }, [publicKey]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent closeBtn={false} className="overflow-auto">
        <DialogHeader>
          <DialogTitle className=" flex flex-row items-center justify-center">
            <h2 className="text-base capitalize font-medium ">
              Manage Your Account
            </h2>
          </DialogTitle>
          <DialogDescription>
            <TraderAccountDropdown
              accounts={trgsArr}
              onSelect={handleSelection}
            />
            <div className="flex flex-row items-center justify-between">
              <span className="text-sm mb-4 text-muted-foreground">
                withdraw or Deposit (USDC)
              </span>
              <span className="text-sm mb-4 text-muted-primary">
                {" "}
                Cash Balance: ${updated ? cashBalance : 0}
              </span>
            </div>
            <Input
              max={100}
              min={0}
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="bg-black h-[40px] rounded-[8px] mb-4 pl-5 text-left text-lg font-bold focus:outline-none"
            />
            <>
              <Button
                color="primary"
                className="w-full h-14 mb-4 uppercase bg-[#8BD796] "
                onClick={handleDeposit}
                disabled={amount === null || isLoading}
              >
                deposit
              </Button>
              <Button
                color="primary"
                className="w-full h-14 mb-4 uppercase bg-[#FF8F8F]"
                onClick={handleWithdraw}
                disabled={amount === null || isLoading}
              >
                Withdraw
              </Button>
            </>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PreceptualModal;
