//@ts-nocheck
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useLockerTools from "@/hooks/use-locker";
import { PoolExtended, usePool } from "@/hooks/use-pool-list";
import { TokenInfo } from "@solana/spl-token-registry";
import { PublicKey } from "@solana/web3.js";

import { useTokenAccounts } from "@bonfida/hooks";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { FC, useEffect, useMemo, useState } from "react";
import { useJupiterApiContext } from "../trade/src/contexts";
interface LockerInputProps {
  handleStepChange: (nbr: number) => void;
}
const LockerInput: FC<LockerInputProps> = ({ handleStepChange }) => {
  const [lockerList, setLockerList] = useState([]);
  const { tokenList } = useJupiterApiContext();
  const [mintAdr, setMintAdr] = useState("");

  const { initNewVault, getAllVaults } = useLockerTools();
  const {
    poolList,
    setSelectedPool,
    selectedPool,
    getPoolByLpMint,
    setSelectedMintAdr,
  } = usePool();
  const [poolToUser, setPoolToUse] = useState<PoolExtended | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [baseToken, setBaseToken] = useState<TokenInfo | null>(null);
  const [quoteToken, setQuoteToken] = useState<TokenInfo | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { data: tokenAccounts, refresh: refreshToken } = useTokenAccounts(
    connection,
    publicKey
  );

  const initVaults = async () => {
    const vaults = await getAllVaults();

    //console.log("Vaults",vaults)
    setLockerList(vaults);
  };
  useEffect(() => {
    initVaults();
  }, [lockerList, poolList]);
  const handleCreateVault = async () => {
    // console.log("POol list", poolList);
    const poolFound = await getPoolByLpMint(mintAdr.replace(/\s/g, ""));

    if (poolFound) {
      setSelectedMintAdr(mintAdr);
      setSelectedPool(poolFound);
      const resp = await initNewVault(
        new PublicKey(poolFound.lpMint),
        poolFound.lpDecimals
      );
      if (resp) {
        setIsCreateOpen(false);
        handleStepChange(2);
      }
    }
  };
  const getUserInfo = async () => {
    const poolFound = await getPoolByLpMint(mintAdr.replace(/\s/g, ""));
    // console.log("Pool", poolFound);
    if (poolFound) {
      setPoolToUse(poolFound);
      const base = poolFound.baseMint;
      const quote = poolFound.quoteMint;
      setBaseToken(base);
      setQuoteToken(quote);
      const tokenAccount =
        tokenAccounts && poolFound
          ? tokenAccounts?.getByMint(new PublicKey(poolFound?.lpMint))
          : null;
      const balance =
        tokenAccount && tokenAccount.decimals
          ? Number(tokenAccount.account.amount) /
            Math.pow(10, tokenAccount.decimals)
          : 0;

      setTokenBalance(balance);
    }
  };
  useMemo(() => {
    getUserInfo();
  }, [publicKey, mintAdr, selectedPool]);
  return (
    <>
      <Container className="bg-[#0F0F0F] px-3 py-5 flex gap-3 flex-col">
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
        <span className="text-[#FCFCFC] uppercase text-xs">
          Enter the Raydium OR METEORA pair address.
        </span>
        <Input
          placeholder="Insert address"
          className="w-full"
          value={mintAdr}
          onChange={(e) => {
            setMintAdr(e.target.value);
          }}
        />
      </Container>
      <Container className="bg-[#0F0F0F] p-3 flex gap-3 flex-col">
        {baseToken && quoteToken && tokenBalance && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src={baseToken.logoURI}
                className="h-[30px] w-[30px] rounded-full"
              />
              <img
                src={quoteToken.logoURI}
                className="h-[30px] w-[30px] rounded-full"
              />
              <span className="text-[#FFF] text-sm">
                {baseToken.symbol} / {quoteToken.symbol}{" "}
              </span>
            </div>
            <span>{tokenBalance}</span>
          </div>
        )}
        {tokenBalance == 0 && (
          <span className="text-muted-foreground ">
            You do not hold any of this LP Mint Token
          </span>
        )}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <Button
            className="bg-primary rounded-lg h-[50px] w-full mt-3"
            disabled={mintAdr == "" || tokenBalance == 0}
            onClick={() => {
              const vault = lockerList.find(
                (elm) =>
                  elm.account.mint.toBase58() == mintAdr.replace(/\s/g, "")
              );

              if (!vault) {
                setIsCreateOpen(true);
              } else {
                
                setSelectedPool(poolToUser);
                handleStepChange(2);
              }
            }}
          >
            Lock This Liquidity{" "}
          </Button>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <div className="relative">
                  <span className="text-base   text-center ">
                    Vault Creation
                  </span>
                  {/* <DialogTrigger asChild>
                    <AiOutlineArrowLeft className=" absolute w-4 h-4 top-1/2 -left-2 -translate-y-1/2 cursor-pointer" />
                  </DialogTrigger> */}
                </div>
                <hr className="w-full my-2" />
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex w-full h-auto flex-col justify-center items-center">
              <div className="flex flex-col gap-6">
                <p className=" text-xs text-muted-foreground">
                  There is currently no open vault for this selected LP token.
                  To proceed with locking liquidity you will first need to
                  initialize a vault, which requires 0.0001 LP tokens.
                </p>
                <p className="text-xs text-muted-foreground">
                  Please be aware that this Solana program is currently
                  open-source and has not yet undergone a professional audit. We
                  encourage community participation and scrutiny; however, until
                  a comprehensive audit is completed, please understand that
                  using this program is at your own discretion and risk. We do
                  not guarantee the security or functionality of the program and
                  advise users to proceed with caution, especially in
                  transactions involving significant assets or funds.
                </p>
              </div>
              <div className="flex justify-start gap-3 items-start  w-full mt-3 border-t-[1px] pt-3">
                <Button
                  className="bg-[#8BD796]"
                  onClick={() => {
                    handleCreateVault();
                  }}
                >
                  Confirm
                </Button>
                <Button
                  onClick={() => {
                    setIsCreateOpen(false);
                  }}
                >
                  Decline
                </Button>
              </div>
            </div>
          </DialogContent>
          <DialogFooter></DialogFooter>
        </Dialog>
      </Container>
    </>
  );
};

export default LockerInput;
