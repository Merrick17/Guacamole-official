"use client";
import Container from "@/components/common/container";
import ToolHeader from "@/components/common/tool-header";
import CreateSplTokenForm from "@/components/views/tools/create-spl-token/create-spl-token-form";
import useWalletTokens from "@/lib/tokens/useWalletTokens";
import { Metaplex } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { getMint, createSetAuthorityInstruction,AuthorityType } from "@solana/spl-token";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import NftCard from "@/components/common/nft-card";
import { Button } from "@/components/ui/button";
import { useJupiterApiContext } from "@/components/views/trade/src/contexts";
import { PublicKey, Transaction } from "@solana/web3.js";
import { Token } from "@solana/spl-token-v1";
import { toast } from "@/hooks/use-toast";
//import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Create Solana SPL Token | Guacamole",
//   description:
//     "Easily create your own SPL token on the Solana network with this easy to use no-code interface on Guacamole. Connect your wallet, enter your parameters, and mint your tokens!",
// };

const Revoke = () => {
  const walletTokens = useWalletTokens();
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const metaplex = new Metaplex(connection);
  const [filtredTokens, setFiltredTokens] = useState([]);
  const { tokenMap } = useJupiterApiContext();
  const [toRevoke, setToRevoke] = useState<any>([]);
  const SelectButton = ({ token }: { token: any }) => {
    console.log("Account", token);
    const [isSelected, setIsSelected] = useState(false);
    const tokenAccount = token.pubkey;

    return (
      <div>
        {!isSelected ? (
          <Button
            size="sm"
            variant="default"
            className="!bg-[#8BD796]"
            onClick={() => {
              setIsSelected(true);
              toRevoke.push(tokenAccount);
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
              toRevoke.splice(toRevoke.indexOf(tokenAccount), 1);
            }}
          >
            Unselect
          </Button>
        )}
      </div>
    );
  };
  const fetchTokens = async () => {
    if (publicKey) {
      const mints = walletTokens.map(async (elm) => {
        let token = null;
        try {
          token = await metaplex
            .nfts()
            .findByMint({ mintAddress: elm.account.mint });
        } catch (error) {
          //console.log("Error", error.message);
        }
        //  console.log("TOKEN",token)
        return {
          ...elm,
          tokenInfo: await getMint(connection, elm.account.mint),
          name: token && token.json ? token.json.name : "Unknwon Token",
          logoURI: token && token.json ? token.json.image : null,
        };
      });
      const response = await Promise.all(mints);

      const filtred = response.filter(
        (elm) =>
          elm.tokenInfo &&
          elm.tokenInfo.mintAuthority &&
          elm.tokenInfo.mintAuthority.toBase58() == publicKey.toBase58()
      );
      console.log("Resp", filtred);
      setFiltredTokens(filtred);
    }
  };
  useEffect(() => {
    fetchTokens();
    //getMint(connection, mints[0]).then((resp)=>{
    //console.log(resp);
    // });
  }, [walletTokens]);
  const handleRevoke = async () => {
    try {
      console.log("TO REVOKE", toRevoke);
      if (toRevoke[0] != undefined && publicKey) {
        console.log("Here");
        const nbPerTx = 5;
        let nbTx: number;
        if (toRevoke.length % nbPerTx == 0) {
          nbTx = toRevoke.length / nbPerTx;
        } else {
          nbTx = Math.floor(toRevoke.length / nbPerTx) + 1;
        }

        for (let i = 0; i < nbTx; i++) {
          //setCurrentTx(i + 1);
          let Tx = new Transaction();

          let bornSup: number;

          if (i == nbTx - 1) {
            bornSup = toRevoke.length;
          } else {
            bornSup = nbPerTx * (i + 1);
          }

          for (let j = nbPerTx * i; j < bornSup; j++) {
            const account = new PublicKey(toRevoke[j]);
            const cancelAuthorityInstruction = createSetAuthorityInstruction(
              account,
              publicKey,
              0,
              null,
              [],
              TOKEN_PROGRAM_ID
            );
            // const RevokeInstruction = Token.createRevokeInstruction(
            //   TOKEN_PROGRAM_ID,
            //   account,
            //   publicKey,
            //   []
            // );
            Tx.add(cancelAuthorityInstruction);
            //Tx.add(RevokeInstruction);
          }

          const signature = await sendTransaction(Tx, connection);
          const confirmed = await connection.confirmTransaction(
            signature,
            "processed"
          );
          console.log("confirmation", signature);
          toast({ variant: "success", title: "Transaction Sent" });
        }
        setToRevoke([]);

        //await getUserTokenDelegated();
      } else {
      }
    } catch (error) {
      //await getUserTokenDelegated();

      console.log(error);
    }
  };
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <Container className=" mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-lg px-6 py-5  shadow-md">
        <ToolHeader
          title="Revoke Authority "
          revokeAll
          handleBurn={() => {
            handleRevoke();
          }}
          tutorialLink="https://docs.guacamole.gg/products-and-features/tools/burn-spl-tokens"
        />
        <hr className="border-dashed border-[#E5E7EB]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {filtredTokens &&
            filtredTokens.map((token, index) => (
              <NftCard
                key={token.mint + index}
                title={
                  token && token.tokenData
                    ? token.tokenData.json.name
                    : "Unknown Token"
                }
                image={
                  token && token.tokenData
                    ? token.tokenData.json.image
                    : "Unknown Token"
                }
                token={token}
                SelectButton={<SelectButton token={token} key={token.mint} />}
              />
            ))}
          {filtredTokens && filtredTokens.length === 0 && (
            <p className="text-gray-400 text-sm mt-4">
              You don`t have any accounts yet
            </p>
          )}
        </div>
      </Container>
    </main>
  );
};

export default Revoke;
