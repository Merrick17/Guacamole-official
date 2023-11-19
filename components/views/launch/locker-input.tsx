import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useLockerTools from "@/hooks/use-locker";
import { usePool } from "@/hooks/use-pool-list";
import { PublicKey } from "@solana/web3.js";

import { FC, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
interface LockerInputProps {
  handleStepChange: (nbr: number) => void;
}
const LockerInput: FC<LockerInputProps> = ({ handleStepChange }) => {
  const [lockerList, setLockerList] = useState([]);
  const [mintAdr, setMintAdr] = useState("");
  const { initNewVault, getAllVaults, handleCloseVault } = useLockerTools();
  const { poolList, setSelectedPool } = usePool();
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const initVaults = async () => {
    const vaults = await getAllVaults();

    //console.log("Vaults",vaults)
    setLockerList(vaults);
  };
  useEffect(() => {
    initVaults();
  }, [lockerList]);
  const handleCreateVault = async () => {
    const selectedPool = poolList.find(
      (elm) => elm.lpMint == mintAdr.replace(/\s/g, "")
    );
    setSelectedPool(selectedPool);
    await initNewVault(
      new PublicKey(selectedPool.lpMint),
      selectedPool.lpDecimals
    );
    setIsCreateOpen(false);
    handleStepChange(2);
  };
  return (
    <>
      <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col">
        <span className="text-muted-foreground text-xs">
          Use the locker to prove to your community that you have locked
          liquidity. This tool is mainly for token developers. Please read our
          documentation.
        </span>
        <span className="text-[#FFFF]">Guacamole Liquidity Lockers Offer:</span>
        <span className="text-muted-foreground text-xs">
          Verified on-chain time based locks
        </span>
        <span className="text-muted-foreground text-xs">
          Easily shareable liquidity locker pages
        </span>
        <span className="text-muted-foreground text-xs">
          Included relocking mechanims
        </span>
      </Container>
      <Container className="bg-[#0F0F0F] p-2 flex gap-3 flex-col">
        <span className="text-muted-foreground text-xs">
          Enter the Raydium pair address you would like to lock liquidity for:
        </span>
        <Input
          placeholder="Raydium pair address"
          className="w-full"
          value={mintAdr}
          onChange={(e) => {
            setMintAdr(e.target.value);
          }}
        />
      </Container>
      <Container className="bg-[#0F0F0F] p-3 flex gap-3 flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/images/launch/guac.png"
              className="h-[30px] w-[30px] rounded-full"
            />
            <img
              src="/images/launch/sol.png"
              className="h-[30px] w-[30px] rounded-full"
            />
            <span className="text-[#FFF] text-sm">GUAC / SOL </span>
          </div>
          <span>0</span>
        </div>
      </Container>
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <Button
          className="bg-primary rounded-lg h-[50px] w-full mt-3"
          disabled={mintAdr == ""}
          onClick={() => {
            const vault = lockerList.find(
              (elm) => elm.account.mint.toBase58() == mintAdr.replace(/\s/g, "")
            );

            if (!vault) {
              setIsCreateOpen(true);
            } else {
              const selectedPool = poolList.find(
                (elm) => elm.lpMint == mintAdr.replace(/\s/g, "")
              );
              console.log("Pool", selectedPool);
              setSelectedPool(selectedPool);
              handleStepChange(2);
            }
          }}
        >
          Lock This Liquidity{" "}
        </Button>
        <Button
          className="bg-primary rounded-lg h-[50px] w-full mt-3"
          disabled={mintAdr == ""}
          onClick={() => {
            handleCloseVault(mintAdr);
          }}
        >
          Close Pool
        </Button>

        <DialogContent closeBtn={false}>
          <DialogHeader>
            <DialogTitle>
              <div className="relative">
                <h2 className="text-base   text-center ">No Vault Available</h2>
                <DialogTrigger asChild>
                  <AiOutlineArrowLeft className=" absolute w-4 h-4 top-1/2 -left-2 -translate-y-1/2 cursor-pointer" />
                </DialogTrigger>
              </div>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex w-full h-auto flex-col justify-center items-center">
            <div className="flex flex-col">
              <p className="text-muted-foreground">
                there is no vault initialized for this token mint would you like
                to create one ?
              </p>
              <p className="text-xs text-muted-foreground">
                note it will take a minimum of 0.0001 to create it{" "}
              </p>
            </div>
            <div className="flex justify-between items-center mt-1">
              <Button
                variant="ghost"
                className="text-primary"
                onClick={() => {
                  handleCreateVault();
                }}
              >
                Confirm
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsCreateOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LockerInput;
