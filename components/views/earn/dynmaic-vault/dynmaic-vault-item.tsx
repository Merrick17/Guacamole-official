"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FC, useEffect, useMemo, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useJupiterApiContext } from "../../trade/src/contexts";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import VaultImpl, { KEEPER_URL } from "@mercurial-finance/vault-sdk";
import { PublicKey } from "@solana/web3.js";
export type DynmaicVaultItemProps = {
  image?: string;
  title?: string;
  walletBalance?: string;
  yourDeposit?: string;
  VirtualPrice?: string;
  TVL?: string;
  estimatedAPY?: string;
  item?: any;
};
const DynmaicVaultItem: FC<DynmaicVaultItemProps> = ({
  image,
  title,
  walletBalance,
  yourDeposit,
  VirtualPrice,
  TVL,
  estimatedAPY,
  item,
}) => {
  const { tokenMap } = useJupiterApiContext();
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  const [token, setToken] = useState(null);

  const [vaultImpl, setvaultImp] = useState(null);
  const [info, setInfo] = useState(null);
  console.log("Item", item);
  const initVaultImpl = async () => {
    const vault = await VaultImpl.create(connection, token, {
      affiliateId: new PublicKey(item.pubkey), // Replace with your own Partner ID
    });
    vault.getAffiliateInfo().then((resp) => {
      console.log("Resp", resp);
    });

    // setvaultImp(vault);
    // const vaultInfo = await vault.getAffiliateInfo();
    // console.log("Vault", vaultInfo);
    // setInfo(vaultInfo);
  };
  useMemo(() => {
    const tkn = tokenMap.get(item.token_address);
    setToken(tkn);
  }, [token]);
  useEffect(() => {
    initVaultImpl();
  }, [connected, vaultImpl]);

  return (
    <div className="py-4 px-5 border border-transparent bg-background rounded-lg flex flex-col gap-3 hover:border-primary transition-colors duration-500 ease-in-out text-center ">
      <header className="flex items-center justify-center">
        {token && (
          <Image src={token.logoURI} width={40} height={40} alt={title} />
        )}
      </header>
      <h1 className="text-3xl">{item.symbol} VAULT</h1>
      <Separator className="bg-foreground" />
      <div className="flex flex-col gap-1 capitalize text-muted-foreground">
        <div className="flex items-center justify-between">
          <h2>Wallet Balance</h2>
          <p>{walletBalance}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2>Your Deposits</h2>
          <p>{yourDeposit}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2>Virtual Price</h2>
          <p>{VirtualPrice}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2>TVL</h2>
          <p>{TVL}</p>
        </div>
      </div>
      <Separator className="bg-foreground" />
      <div>
        <h1 className="text-[32px] font-medium">
          {item.average_apy.toFixed(3)}%
        </h1>
        <div className="flex items-center gap-1 justify-center text-muted-foreground">
          <h2 className="text-sm ">Estimated APY</h2>
          <AiOutlineQuestionCircle />
        </div>
      </div>
      <Button>View Vault</Button>
    </div>
  );
};

export default DynmaicVaultItem;
