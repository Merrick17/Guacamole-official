import React, { FC, useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  useManifest,
  useTrader,
  dexterity,
  useProduct,
} from '../../context/dexterity';
import { PublicKey } from '@solana/web3.js';
import { Button } from '../ui/button';
import { formatPubKey, handleCopy } from '@/lib/utils';
//import { notify } from "../utils/notifications";
//import { formatPubKey, handleCopy } from 'utils/util';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type TraderAccount = {
  pubkey: PublicKey;
  trg: any;
};

interface TraderAccountDropdownProps {
  accounts: TraderAccount[];
  onSelect: (value: string) => void;
}

export const TraderAccountDropdown: FC<TraderAccountDropdownProps> = ({
  accounts,
  onSelect,
}) => {
  return (
    // <select
    //   onChange={(e) => onSelect(e.target.value)}
    //   className="text-black text-xl"
    // >
    //   <option value="default">Select a Trader Account</option>

    // </select>
    <Select onValueChange={(value) => onSelect(value)}>
      <SelectTrigger className="w-full bg-foreground h-12 rounded-md px-5 ">
        <SelectValue placeholder="Select An Account" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          <SelectLabel>Select a Trader Account</SelectLabel>
          {accounts.map((trg, index) => (
            <SelectItem key={index} value={trg.pubkey.toBase58()}>
              {formatPubKey(trg.pubkey.toBase58())}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const SelectTraderAccounts: FC = () => {
  const { publicKey } = useWallet();
  const { manifest } = useManifest(); // Assuming createTRG is the function to create a new TRG
  const [trgsArr, setTrgsArr] = useState<TraderAccount[]>([]);
  const [selectedTrg, setSelectedTrg] = useState<string>('');
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

  const handleCreateTRG = useCallback(async () => {
    try {
      await manifest.createTrg(new PublicKey(mpgPubkey));
      //fetchTraderAccounts();
    } catch (error: any) {
      //notify({ type: 'error', message: `Creating Trader Account failed!`, description: error?.message });
    }
  }, [fetchTraderAccounts, manifest]);

  const handleSelection = useCallback(
    async (selectedValue: string) => {
      if (selectedValue == 'default') return;
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
    <div className="flex flex-col  justify-center  rounded-lg p-4 mt-4 gap-5">
      <h1 className="text-sm mb-4 text-muted-foreground">
        Select or create a trading account
      </h1>

      {trgsArr.length > 0 ? (
        <div className="w-full  flex flex-col items-center space-y-4">
          <TraderAccountDropdown
            accounts={trgsArr}
            onSelect={handleSelection}
          />
          {/* <span
              className="ml-5 cursor-pointer"
              onClick={() => {
                handleCopy(selectedTrg, 'Trg Pubkey');
              }}
            ></span> */}
          <Button
            onClick={handleCreateTRG}
            disabled={!publicKey}
            className={`w-full `}
            size="lg"
          >
            Create New Trader Account
          </Button>
          <Button
            onClick={fetchTraderAccounts}
            disabled={!publicKey}
            size="lg"
            className="w-full"
          >
            Load Trader Accounts
          </Button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center space-y-4">
          <Button
            onClick={fetchTraderAccounts}
            disabled={!publicKey}
            className="w-full"
            size="lg"
          >
            Load Trader Accounts
          </Button>
          <Button
            onClick={handleCreateTRG}
            disabled={!publicKey}
            className={`w-full `}
            size="lg"
          >
            Create New Trader Account
          </Button>
        </div>
      )}
      <div className="bg-foreground p-5 rounded-lg">
        <h3 className="text-muted-foreground text-sm">Step 1</h3>
        <p className="text-xs">Create or load a trading account.</p>
      </div>
      <div className="bg-foreground p-5 rounded-lg">
        <h3 className="text-muted-foreground text-sm">Step 2</h3>
        <p className="text-xs">Fund your trading collateral.</p>
      </div>
      <div className="bg-foreground p-5 rounded-lg">
        <h3 className="text-muted-foreground text-sm">Step 3</h3>
        <p className="text-xs">Place trades on supported markets.</p>
      </div>
    </div>
  );
};
