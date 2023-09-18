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
            //notify({ type: 'error', message: `Selecting Trader Account failed!`, description: error?.message });
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
                            <span className="text-sm mb-4 text-muted-foreground">withdraw or Deposit (USDC)</span>
                            <span className="text-sm mb-4 text-muted-primary"> Cash Balance: $10.,042.24</span>
                        </div>
                        <Input
                          placeholder="Enter Amount"

                            max={100}
                            min={0}
                            className="bg-black h-[40px] rounded-[8px] mb-4 pl-5 text-left text-lg font-bold focus:outline-none"
                        />
                        <>
                            <Button color="primary" className="w-full h-14 mb-4 uppercase bg-[#8BD796] ">deposit</Button>
                            <Button color="primary" className="w-full h-14 mb-4 uppercase bg-[#FF8F8F]">Withdraw</Button>
                        </>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default PreceptualModal;
