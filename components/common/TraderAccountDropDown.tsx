import React, { FC, useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useManifest, useTrader, dexterity, useProduct } from '../../context/dexterity';
import { PublicKey } from '@solana/web3.js';
import { Button } from '../ui/button';
import { formatPubKey, handleCopy } from '@/lib/utils';
//import { notify } from "../utils/notifications";
//import { formatPubKey, handleCopy } from 'utils/util';

type TraderAccount = {
    pubkey: PublicKey;
    trg: any
};

interface TraderAccountDropdownProps {
    accounts: TraderAccount[];
    onSelect: (value: string) => void;
}

const TraderAccountDropdown: FC<TraderAccountDropdownProps> = ({ accounts, onSelect }) => {
    return (
        <select onChange={(e) => onSelect(e.target.value)} className='text-black text-xl'>
            <option value="default">Select a Trader Account</option>
            {accounts.map((trg, index) => (
                <option key={index} value={trg.pubkey.toBase58()}>{formatPubKey(trg.pubkey.toBase58())}</option>
            ))}
        </select>
    );
};

export const SelectTraderAccounts: FC = () => {
    const { publicKey } = useWallet();
    const { manifest } = useManifest();  // Assuming createTRG is the function to create a new TRG
    const [trgsArr, setTrgsArr] = useState<TraderAccount[]>([]);
    const [selectedTrg, setSelectedTrg] = useState<string>('');
    const { setTrader } = useTrader()
    const { mpgPubkey } = useProduct()

    useEffect(() => {
        fetchTraderAccounts();
    }, [publicKey]);

    const fetchTraderAccounts = useCallback(async () => {
        if (!publicKey) return;
        if (!manifest) return;
        if (!manifest.fields) return
        if (!manifest.fields.wallet) return
        if (!manifest.fields.wallet.publicKey) return;

        try {
            const trgs = await manifest.getTRGsOfOwner(publicKey, new PublicKey(mpgPubkey));
            setTrgsArr(trgs);
        } catch (error: any) {
            //notify({ type: 'error', message: `Selecting Trader Account failed!`, description: error?.message });
        }
    }, [publicKey, manifest]);

    const handleCreateTRG = useCallback(async () => {
        try {
            console.log("MPG KEY", mpgPubkey)
            await manifest.createTrg(new PublicKey(mpgPubkey));
            //fetchTraderAccounts();
        } catch (error: any) {
            console.log("Error creating", error)
            //notify({ type: 'error', message: `Creating Trader Account failed!`, description: error?.message });
        }
    }, [fetchTraderAccounts, manifest]);

    const handleSelection = useCallback(async (selectedValue: string) => {
        if (selectedValue == "default") return
        setSelectedTrg(selectedValue);
        console.log({ selectedValue })
        const trader = new dexterity.Trader(manifest, new PublicKey(selectedValue))
        const trg = await manifest.getTRG(new PublicKey(selectedValue))
        console.log('Huh ', { trg })
        await trader.update()
        await manifest.updateOrderbooks(new PublicKey(mpgPubkey));
        setTrader(trader)
    }, [manifest, setTrader]);

    return (
        <div className="flex flex-col items-center justify-center border border-white rounded-lg p-4 mt-4">
            <h1 className="text-2xl mb-4">Select or Create a Trader Account</h1>

            {trgsArr.length > 0 ? (
                <div className="w-full flex flex-col items-center space-y-4">
                    <div><TraderAccountDropdown accounts={trgsArr} onSelect={handleSelection} />
                        <span className='ml-5 cursor-pointer' onClick={() => { handleCopy(selectedTrg, 'Trg Pubkey') }}>📋</span></div>
                    <Button

                        onClick={fetchTraderAccounts}
                        disabled={!publicKey}
                        className={`w-full text-md rounded-md ${publicKey ? 'bg-gradient-to-br from-[#80ff7d] to-[#80ff7d] hover:from-white hover:to-purple-300 text-black' : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                        🔄 Load Trader Accounts
                    </Button>
                </div>
            ) : (
                <div className="w-full flex flex-col items-center space-y-4">
                    <Button

                        onClick={fetchTraderAccounts}
                        disabled={!publicKey}
                        className={`w-full text-md rounded-md ${publicKey ? 'bg-gradient-to-br from-[#80ff7d] to-[#80ff7d] hover:from-white hover:to-purple-300 text-black' : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                        🔄 Load Trader Accounts
                    </Button>
                    <Button

                        onClick={handleCreateTRG}
                        disabled={!publicKey}
                        className={`w-full text-md rounded-md ${publicKey ? 'bg-gradient-to-br from-[#80ff7d] to-[#80ff7d] hover:from-white hover:to-purple-300 text-black' : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                        ➕ Create New Trader Account
                    </Button>
                </div>
            )}
        </div>
    );

};
