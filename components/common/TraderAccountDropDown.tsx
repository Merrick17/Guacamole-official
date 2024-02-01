import React, { FC, useState, useEffect, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  useManifest,
  useTrader,
  dexterity,
  useProduct,
} from "../../context/dexterity";
import { PublicKey } from "@solana/web3.js";
import { Button } from "../ui/button";
import { formatPubKey, handleCopy } from "@/lib/utils";
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
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Group, GroupPubkeyMap } from "../views/trade/perpetual-constants";
import { BsChevronDown } from "react-icons/bs";

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
      <SelectTrigger className="w-full bg-foreground h-12 rounded-md px-5 border border-[rgba(168, 168, 168, 0.10)]">
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
  const [selectedTrg, setSelectedTrg] = useState<string>("");
  const { setTrader } = useTrader();
  const { mpgPubkey, setMpgPubkey } = useProduct();
  const [selectedGroup, setSelectedGroup] = useState<Group>(
    GroupPubkeyMap.get(0)
  );
  useEffect(() => {
    fetchTraderAccounts();
  }, [publicKey, mpgPubkey]);

  const fetchTraderAccounts = useCallback(async () => {
    //alert("Working");
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
      //console.log("TGRS", trgs.map((elm)=>elm.pubkey.toBase58()));
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Selecting Trader Account failed!`,
        description: error?.message,
      });
    }
  }, [publicKey, manifest, mpgPubkey]);

  const handleCreateTRG = useCallback(async () => {
    try {
      const newTrg = await manifest.createTrg(new PublicKey(mpgPubkey));
      if (newTrg) {
        toast({
          variant: "success",
          title: "Successfully created new Trader Account!",
          description: `Trader Account PublicKey: ${newTrg.toBase58()}`,
        });
      }
      fetchTraderAccounts();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Creating Trader Account failed!`,
        description: error?.message,
      });
    }
  }, [fetchTraderAccounts, manifest, mpgPubkey]);

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
    [manifest, setTrader, mpgPubkey]
  );
  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
    setMpgPubkey(group.pubkey);
  };
  const renderGroupOptions = () => {
    return Array.from(GroupPubkeyMap.values()).map((group) => (
      <DropdownMenuItem
        className="w-full"
        key={group.pubkey}
        onClick={() => handleSelectGroup(group)}
      >
        {group.name}
      </DropdownMenuItem>
    ));
  };
  const renderGroupDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full text-[#FFFF] bg-foreground h-12 rounded-md px-5 border border-[rgba(168, 168, 168, 0.10)] flex justify-between">
          <span>{selectedGroup?.name || "Select Group"}</span> <BsChevronDown color="#FFF" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {renderGroupOptions()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
  return (
    <div className="flex flex-col  justify-center  rounded-lg  mt-4 gap-5">
      <h1 className="text-sm mb-4 text-muted-foreground">
        Select or create a trading account
      </h1>
      <div className="w-full  flex flex-col items-center space-y-4">
        {renderGroupDropdown()}
        <TraderAccountDropdown accounts={trgsArr} onSelect={handleSelection} />

        <div className="flex justify-between items-center gap-2 w-full">
          <Button
            onClick={handleCreateTRG}
            disabled={!publicKey}
            className={`w-full trade-bg`}
            size="lg"
          >
            CREATE
          </Button>
          <Button
            onClick={fetchTraderAccounts}
            disabled={!publicKey}
            size="lg"
            className="w-full trade-bg"
          >
            LOAD
          </Button>
        </div>
      </div>

      <div className="bg-foreground p-5 rounded-lg border border-[rgba(168, 168, 168, 0.10)]">
        <h3 className="text-muted-foreground text-sm">Step 1</h3>
        <p className="text-xs">Create or load a trading account.</p>
      </div>
      <div className="bg-foreground p-5 rounded-lg border border-[rgba(168, 168, 168, 0.10)]">
        <h3 className="text-muted-foreground text-sm">Step 2</h3>
        <p className="text-xs">Fund your trading collateral.</p>
      </div>
      <div className="bg-foreground p-5 rounded-lg border border-[rgba(168, 168, 168, 0.10)]">
        <h3 className="text-muted-foreground text-sm">Step 3</h3>
        <p className="text-xs">Place trades on supported markets.</p>
      </div>
    </div>
  );
};
