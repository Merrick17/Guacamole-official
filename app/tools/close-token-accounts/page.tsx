"use client";
import Tool from "@/components/common/info-card";
import NftCard from "@/components/common/nft-card";
import ToolHeader from "@/components/common/tool-header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getTokensMetadata } from "@/lib/metadata";
import { Metaplex } from "@metaplex-foundation/js";
import { TOKEN_PROGRAM_ID, Token } from "@solana/spl-token-v1";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useEffect, useState } from "react";

const CloseTokenAccount = () => {
  const { connection } = useConnection();
  const { toast } = useToast();
  const { sendTransaction, publicKey, connected } = useWallet();
  const metaplex = new Metaplex(connection);

  const [emptyAccounts, setEmptyAccounts] = useState<any | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [currentTx, setCurrentTx] = useState<number | null>(null);
  const [totalTx, setTotalTx] = useState<number | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [allSelected, setAllSelected] = useState(false);
  const [toClose, setToClose] = useState<string[]>([]);

  async function getUserEmptyAccount() {
    if (!publicKey) {
      setEmptyAccounts([]);
      return;
    }
    const publickey = publicKey;
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

    const tokens = tokenInfo.filter((m: any) => {
      const balance = m.balance;
      return balance == 0;
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

    const { value: splAccounts } =
      await connection.getParsedTokenAccountsByOwner(
        publickey,
        {
          programId: new PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          ),
        },
        "processed"
      );

    const myNFTEmptyAccounts: any = [];

    const _myNFTEmptyAccounts = splAccounts
      .filter((m) => {
        const amount = m.account?.data?.parsed?.info?.tokenAmount?.uiAmount;
        return amount == 0;
      })
      .map((m) => {
        const tokenAccountaddress = m.pubkey.toBase58();
        const mintAdddress = m.account?.data?.parsed?.info?.mint;
        const _tokenAccount = allTokens.find(
          (token: any) => token.tokenAccount == tokenAccountaddress
        );
        if (_tokenAccount == undefined) {
          myNFTEmptyAccounts.push({ tokenAccountaddress, mintAdddress });
        }
      });

    console.log(myNFTEmptyAccounts);

    const myNFTEmptyAccountsMetadata = await getTokensMetadata(
      myNFTEmptyAccounts,
      connection
    );
    const userEmptyAccounts = allTokens.concat(myNFTEmptyAccountsMetadata);

    userEmptyAccounts.sort(function (a: any, b: any) {
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      }
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      }
      return 0;
    });

    setEmptyAccounts(userEmptyAccounts);
    setIsFetched(true);
    console.log("my empty accounts", userEmptyAccounts);
  }

  useEffect(() => {
    getUserEmptyAccount();
  }, [publicKey, connected]);

  function SelectButton(props: { tokenAccount: any }) {
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
      if (toClose.includes(props.tokenAccount)) {
        setIsSelected(true);
      } else {
        setIsSelected(false);
      }
    });
    return (
      <div>
        {!isSelected ? (
          <Button
            size="sm"
            variant="default"
            onClick={() => {
              setIsSelected(true);
              toClose.push(props.tokenAccount);
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
              toClose.splice(toClose.indexOf(props.tokenAccount), 1);
            }}
          >
            Unselect
          </Button>
        )}
      </div>
    );
  }

  const CloseAccounts = async () => {
    try {
      if (toClose[0] != undefined && connected) {
        setIsClosing(true);
        setSuccess(false);
        setMessage("");
        const nbPerTx = 5;
        let nbTx: number;
        if (toClose.length % nbPerTx == 0) {
          nbTx = toClose.length / nbPerTx;
        } else {
          nbTx = Math.floor(toClose.length / nbPerTx) + 1;
        }
        setTotalTx(nbTx);

        for (let i = 0; i < nbTx; i++) {
          setCurrentTx(i + 1);
          let Tx = new Transaction();

          let bornSup: number;

          if (i == nbTx - 1) {
            bornSup = toClose.length;
          } else {
            bornSup = nbPerTx * (i + 1);
          }

          for (let j = nbPerTx * i; j < bornSup; j++) {
            console.log("TO Close", toClose);
            const associatedAddress = new PublicKey(toClose[j]);

            const closeInstruction = await Token.createCloseAccountInstruction(
              TOKEN_PROGRAM_ID,
              associatedAddress,
              publicKey,
              publicKey,
              []
            );
            Tx.add(closeInstruction);
          }

          const signature = await sendTransaction(Tx, connection);
          const confirmed = await connection.confirmTransaction(
            signature,
            "processed"
          );
          console.log("confirmation", signature);
          toast({
            variant: "success",
            title: "Success",
            description: (
              <span>
                Transaction sent successfully ,
                <a href={`https://solscan.com/tx/${signature}`} target="_blank">
                  View on solscan
                </a>
              </span>
            ),
          });
        }
        setToClose([]);
        setAllSelected(false);
        setIsClosing(false);
        setSuccess(true);
        await getUserEmptyAccount();
      } else {
        toast({
          variant: "default",
          title: "Warning",
          description:
            "Please choose at least one token account to close first!",
        });

        setSuccess(false);
      }
    } catch (error) {
      await getUserEmptyAccount();
      setToClose([]);
      setAllSelected(false);
      setIsClosing(false);
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const SelectAll = () => {
    const _toClose = emptyAccounts.map((token: any) => {
      const tokenAccount = token.tokenAccount;
      return tokenAccount;
    });
    setToClose(_toClose);
    setAllSelected(true);
  };

  const UnselectAll = () => {
    setToClose([]);
    setAllSelected(false);
  };

  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      {connected ? (
        <div className=" mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-lg bg-white px-6 py-5">
          <ToolHeader
            title="Close Token Accounts"
            closeAll
            handleBurn={CloseAccounts}
            tutorialLink="https://docs.guacamole.gg/products-and-features/tools/close-empty-accounts"
          />
          <hr className="border-dashed border-[#E5E7EB]" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
            {emptyAccounts &&
              emptyAccounts.map((token, index) => (
                <NftCard
                  key={token.mint + index}
                  title="<Insert NFT Name>"
                  image=""
                  token={token}
                  SelectButton={
                    <SelectButton
                      tokenAccount={token.tokenAccount}
                      key={token.mint}
                    />
                  }
                />
              ))}
            {emptyAccounts && emptyAccounts.length === 0 && (
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

export default CloseTokenAccount;
