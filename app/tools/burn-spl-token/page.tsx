"use client";
import NftCard from "@/components/common/nft-card";
import ToolHeader from "@/components/common/tool-header";
import {
  Metaplex,
  toBigNumber,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  SYSVAR_INSTRUCTIONS_PUBKEY,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token-v1";
import {
  createBurnEditionNftInstruction,
  createBurnNftInstruction,
  PROGRAM_ADDRESS,
  PROGRAM_ID,
  createBurnInstruction,
} from "@metaplex-foundation/mpl-token-metadata";
import { BN, utils } from "@coral-xyz/anchor";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import useWalletTokens from "@/lib/tokens/useWalletTokens";
import Tool from "@/components/common/info-card";
import { useToast } from "@/components/ui/use-toast";

const BurnSplToken = () => {
  const { connection } = useConnection();

  const wallet = useWallet();
  const metaplex = new Metaplex(connection);
  const [userSPL, setUserSPL] = useState<any | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isBurning, setIsBurning] = useState<boolean>(false);
  const [currentTx, setCurrentTx] = useState<number | null>(null);
  const [totalTx, setTotalTx] = useState<number | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [toBurn, setToBurn] = useState<any>([]);

  async function getUserSPLToken() {
    if (!wallet.publicKey) {
      setUserSPL([]);
      return;
    }
    const publickey = wallet.publicKey;
    setIsFetched(false);

    const allTokens: any = [];

    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "AwM0UoO6r1w8XNOA");

    const tokenResponse = await fetch(
      "https://api.shyft.to/sol/v1/wallet/all_tokens?network=mainnet-beta&wallet=" +
      publickey.toBase58(),
      { method: "GET", headers: myHeaders, redirect: "follow" }
    );
    const tokenInfo = (await tokenResponse.json()).result;

    console.log(tokenInfo);

    const tokens = tokenInfo.filter((m: any) => {
      const balance = m.balance;
      return balance != 0;
    });

    tokens.map((token: any) => {
      const mint = token.address;
      const logoURI =
        token.info.image != ""
          ? token.info.image
          : "https://arweave.net/WCMNR4N-4zKmkVcxcO2WImlr2XBAlSWOOKBRHLOWXNA";
      const tokenAccount = token.associated_account;
      const amount = token.balance;
      let name = token.info.name.trim();
      if (name == "") {
        name = mint.slice(0, 4) + "..." + mint.slice(-4);
      }
      allTokens.push({
        name: name,
        logoURI: logoURI,
        tokenAccount: tokenAccount,
        mint: mint,
        amount: amount,
      });
    });

    allTokens.sort(function (a: any, b: any) {
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      }
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      }
      return 0;
    });

    setUserSPL(allTokens);
    setIsFetched(true);
    console.log("user SPL tokens", allTokens);
  }

  useEffect(() => {
    getUserSPLToken();
  }, [wallet.publicKey]);

  const BurnTokens = async () => {
    const publickey = wallet.publicKey;
    try {
      if (toBurn[0] != undefined && publickey) {
        setIsBurning(true);
        setSuccess(false);
        setMessage("");
        const nbPerTx = 5;
        let nbTx: number;
        if (toBurn.length % nbPerTx == 0) {
          nbTx = toBurn.length / nbPerTx;
        } else {
          nbTx = Math.floor(toBurn.length / nbPerTx) + 1;
        }
        setTotalTx(nbTx);

        for (let i = 0; i < nbTx; i++) {
          setCurrentTx(i + 1);
          let Tx = new Transaction();

          let bornSup: number;

          if (i == nbTx - 1) {
            bornSup = toBurn.length;
          } else {
            bornSup = nbPerTx * (i + 1);
          }

          for (let j = nbPerTx * i; j < bornSup; j++) {
            const account = new PublicKey(toBurn[j].tokenAccount);
            const mint = new PublicKey(toBurn[j].mint);
            const amount = toBurn[j].amount;

            const tokenInfo = await connection.getParsedAccountInfo(mint);

            // @ts-ignore
            const decimals = tokenInfo.value?.data.parsed.info.decimals;

            const burnInstruction = Token.createBurnInstruction(
              TOKEN_PROGRAM_ID,
              mint,
              account,
              publickey,
              [],
              amount * 10 ** decimals
            );

            const closeInstruction = Token.createCloseAccountInstruction(
              TOKEN_PROGRAM_ID,
              account,
              publickey,
              publickey,
              []
            );
            Tx.add(burnInstruction, closeInstruction);
          }

          const signature = await wallet.sendTransaction(Tx, connection);
          const confirmed = await connection.confirmTransaction(
            signature,
            "processed"
          );
          console.log("confirmation", signature);
        }
        setToBurn([]);
        setIsBurning(false);
        setSuccess(true);
        await getUserSPLToken();
      } else {
        setMessage("Please choose at least one token to burn first!");
        setSuccess(false);
      }
    } catch (error) {
      await getUserSPLToken();
      setToBurn([]);
      setIsBurning(false);
      console.log(error);
    }
  };
  const SelectButton = ({ token }: { token: any }) => {
    const [isSelected, setIsSelected] = useState(false);
    const tokenAccount = token.tokenAccount;
    const mint = token.mint;
    const amount = token.amount;
    const data = { tokenAccount: tokenAccount, mint: mint, amount: amount };

    return (
      <div>
        {!isSelected ? (
          <Button
            size="sm"
            variant="default"
            onClick={() => {
              setIsSelected(true);
              toBurn.push(data);
            }}
          >
            <span className="text-xs">Select</span>
          </Button>
        ) : (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              setIsSelected(false);
              toBurn.splice(toBurn.indexOf(data), 1);
            }}
          >
            Unselect
          </Button>
        )}
      </div>
    );
  };
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      {wallet.connected ? (
        <div className=" mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-lg bg-white px-6 py-5">
          <ToolHeader
            title="Burn SPL Tokens To Redeem $SOL"
            burnAll
            handleBurn={BurnTokens}
            tutorialLink="https://docs.guacamole.gg/products-and-features/tools/burn-spl-tokens"
          />
          <hr className="border-dashed border-[#E5E7EB]" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
            {userSPL &&
              userSPL.map((token, index) => (
                <NftCard
                  key={token.mint + index}
                  title="<Insert NFT Name>"
                  image=""
                  token={token}
                  SelectButton={<SelectButton token={token} key={token.mint} />}
                />
              ))}
            {userSPL && userSPL.length === 0 && (
              <p className="text-gray-400 text-sm mt-4">
                You don`t have any accounts yet
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Tool
            name="Please connect your wallet"
            description="You will need to connect a supported Solana wallet to continue! Press the button below to explore the options."
            image="/images/connect-wallet-tool.png"
            connectWallet
          />
        </div>
      )}
    </main>
  );
};

export default BurnSplToken;
