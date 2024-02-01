"use client";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import {
  Metaplex,
  Nft,
  NftWithToken,
  Sft,
  SftWithToken,
} from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import FallbackImage from "@/components/FallBackImage";
import { BiCross, BiPencil } from "react-icons/bi";
import TokenManagerDialog from "./TokenManagerDialog";
const TokenManagementForm = () => {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  const metaplex = new Metaplex(connection);
  const [mintAdr, setMintAdr] = useState("");
  const [asset, setAsset] = useState<Sft | Nft | SftWithToken | NftWithToken>(
    undefined
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const getAllAssets = async () => {
    const nfts = await metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(mintAdr) });
    setAsset(nfts);
    console.log("NFT", nfts);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {" "}
      <div className="w-full h-[40px] flex rounded-lg justify-center items-center gap-5 bg-[#0F0F0F] border-[1px] border-[rgba(168, 168, 168, 0.10)]">
        <div className="text-[#FFF] w-full flex items-center justify-center gap-1 text-[24px] shadow-2xlg">
          Token Management Portal
        </div>
      </div>
      <div className="w-full h-[171px] flex flex-col rounded-lg bg-[#0F0F0F] border-[1px] border-[rgba(168, 168, 168, 0.10)] p-3 gap-2 shadow-2xl">
        <p className="text-muted-foreground text-[14px]">
          Use the token management portal to easily control aspects of your
          token ecosystem and the token itself.
        </p>
        <span className="text-[#FAFAFA]">
          Guacamole Token Management Includes:
        </span>
        <p className="text-muted-foreground text-[14px]">
          Update related token metadata
        </p>
        <p className="text-muted-foreground text-[14px]">
          Edit or revoke mint, freeze, and update authority
        </p>
      </div>
      <p className="text-muted-foreground text-[14px]">
        The following SPL token update authorities are associated with this
        account.
      </p>
      <div className="flex justify-center items-center gap-2">
        <SearchInput
          placeholder="Search For Token By Token Address"
          disabled={!connected}
          value={mintAdr}
          onChange={(e) => {
            setMintAdr(e.target.value);
          }}
        />
        <Button className="launch-bg" onClick={getAllAssets}>
          Search{" "}
        </Button>
        <TokenManagerDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          token={asset}
        />
      </div>
      {asset && (
        <div className="w-full min-h-[60px] p-4 flex justify-between items-center bg-[#0F0F0F] rounded-lg  border-[1px] border-[rgba(168, 168, 168, 0.10)] shadow-2xl ">
          <div className="flex justify-center items-center gap-3">
            <FallbackImage
              src={asset.json.image}
              alt={asset.symbol}
              height={30}
              width={30}
              className="rounded-full"
            />
            <span className="text-[#FAFAFA]">
              {asset.name} ({asset.symbol})
            </span>
          </div>
          {asset &&
          asset.updateAuthorityAddress.toBase58() == publicKey.toBase58() ? (
            <Button
              className="guac-bg"
              onClick={() => {
                setIsDialogOpen(true);
              }}
            >
              <BiPencil />
            </Button>
          ) : (
            <Button disabled className="launch-bg">
              <BiCross />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TokenManagementForm;
