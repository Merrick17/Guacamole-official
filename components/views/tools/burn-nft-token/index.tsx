"use client";
import Container from "@/components/common/container";
import NftCard from "@/components/common/nft-card";
import ToolHeader from "@/components/common/tool-header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useWalletTokens from "@/lib/tokens/useWalletTokens";
import { utils } from "@coral-xyz/anchor";
import { Metaplex, toBigNumber } from "@metaplex-foundation/js";
import {
  PROGRAM_ADDRESS,
  PROGRAM_ID,
  createBurnInstruction,
  createBurnNftInstruction,
} from "@metaplex-foundation/mpl-token-metadata-old";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token-v1";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import Link from "next/link";
import { useEffect, useState } from "react";

const BurnNftToken = () => {
  const { connection } = useConnection();
  const { toast } = useToast();
  const wallet = useWallet();
  const metaplex = new Metaplex(connection);
  const [userNFT, setUserNFT] = useState<any | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isBurning, setIsBurning] = useState<boolean>(false);
  const [currentTx, setCurrentTx] = useState<number | null>(null);
  const [totalTx, setTotalTx] = useState<number | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [toBurn, setToBurn] = useState<any>([]);
  const walletTokens = useWalletTokens();
  async function getUserNFT() {
    if (!wallet.publicKey) {
      setUserNFT([]);
      return;
    }
    const publickey = wallet.publicKey;
    setIsFetched(false);

    const userNFTs = await metaplex
      .nfts()
      .findAllByOwner({ owner: wallet.publicKey });

    console.log(userNFTs);

    const seed1 = Buffer.from(utils.bytes.utf8.encode("metadata"));
    const seed2 = Buffer.from(PROGRAM_ID.toBytes());
    const seed4 = Buffer.from(utils.bytes.utf8.encode("edition"));

    const userNFTMetadata = await Promise.all(
      userNFTs.map(async (token) => {
        // @ts-ignore
        const mintPublickey = token.mintAddress;
        const mint = mintPublickey.toBase58();
        let name = token.name.trim();
        let logoURI: string;
        const collectionAddress = token.collection?.address;
        let collectionMetadata: string | undefined = undefined;

        if (collectionAddress) {
          const [collectionMetadataPDA, _bump3] =
            PublicKey.findProgramAddressSync(
              [seed1, seed2, Buffer.from(collectionAddress.toBytes())],
              PROGRAM_ID
            );
          collectionMetadata = collectionMetadataPDA.toBase58();
        }
        const seed3 = Buffer.from(mintPublickey.toBytes());
        const [_masterEditionPDA, _bump2] = PublicKey.findProgramAddressSync(
          [seed1, seed2, seed3, seed4],
          PROGRAM_ID
        );
        const masterEditionPDA = _masterEditionPDA.toBase58();
        const metadataAccount = token.address.toBase58();
        const NFTloaded = await metaplex
          .nfts()
          .findByMint({ mintAddress: mintPublickey });

        if (name == "" && NFTloaded.json?.name && NFTloaded.json?.name != "") {
          name = NFTloaded.json?.name.trim();
        }
        if (NFTloaded.json?.image && NFTloaded.json?.image != "") {
          logoURI = NFTloaded.json?.image;
        } else {
          logoURI = "/images/Guacamole_Image_Unknown.png";
        }

        // @ts-ignore
        const isMasterEdition = NFTloaded?.edition?.isOriginal;
        // const edition = NFTloaded.
        const tokenAccount = (
          await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mintPublickey,
            publickey
          )
        ).toBase58();

        return {
          name,
          logoURI,
          metadataAccount,
          mint,
          tokenAccount,
          masterEditionPDA,
          collectionMetadata,
          isMasterEdition,
        };
      })
    );
    userNFTMetadata.sort(function (a, b) {
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      }
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      }
      return 0;
    });
    setUserNFT(userNFTMetadata);
    setIsFetched(true);
    console.log("user NFTs", userNFTMetadata);
  }

  useEffect(() => {
    getUserNFT();
  }, [wallet.publicKey]);

  const BurnTokens = async () => {
    if (wallet.connected) {
      const publickey = wallet.publicKey;
      try {
        if (toBurn[0] != undefined && publickey) {
          // console.log("To Burn", toBurn);
          // const metaplex = Metaplex.make(connection)
          //   .use(walletAdapterIdentity(wallet))
          // const parameters = {
          //   mintAddress: new PublicKey(toBurn[0].mint)
          // }
          // const tx = await metaplex.nfts().delete(parameters);
          // console.log("Tx",tx);
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

            const seed1 = Buffer.from(utils.bytes.utf8.encode("metadata"));
            const seed2 = Buffer.from(PROGRAM_ID.toBytes());
            const seed4 = Buffer.from(utils.bytes.utf8.encode("edition"));

            for (let j = nbPerTx * i; j < bornSup; j++) {
              const tokenAccount = new PublicKey(toBurn[j].tokenAccount);
              const mint = new PublicKey(toBurn[j].mint);
              const masterEditionPDA = new PublicKey(
                toBurn[j].masterEditionPDA
              );
              const metadataAccount = new PublicKey(toBurn[j].metadataAccount);
              const _collectionMetadata = toBurn[j].collectionMetadata;
              const isMasterEdition = toBurn[j].isMasterEdition;
              let burnAccount;
              const tokenRecord = metaplex
                .nfts()
                .pdas()
                .tokenRecord({ mint: mint, token: tokenAccount });
              let collectionMetadata: PublicKey | undefined = undefined;

              if (_collectionMetadata) {
                collectionMetadata = new PublicKey(_collectionMetadata);
              }
              if (isMasterEdition == true) {
                const tokenRecordInfo = await connection.getAccountInfo(
                  tokenRecord
                );
                if (tokenRecordInfo) {
                  const burn = createBurnInstruction(
                    {
                      authority: publickey,
                      metadata: metadataAccount,
                      collectionMetadata: collectionMetadata,
                      edition: masterEditionPDA,
                      mint: mint,
                      token: tokenAccount,
                      tokenRecord: tokenRecord,
                      systemProgram: SystemProgram.programId,
                      sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
                      splTokenProgram: TOKEN_PROGRAM_ID,
                    },
                    {
                      burnArgs: {
                        __kind: "V1",
                        amount: toBigNumber(1),
                      },
                    }
                  );
                  Tx.add(burn);
                } else {
                  if (_collectionMetadata) {
                    burnAccount = {
                      metadata: metadataAccount,
                      owner: publickey,
                      mint: mint,
                      tokenAccount: tokenAccount,
                      masterEditionAccount: masterEditionPDA,
                      splTokenProgram: TOKEN_PROGRAM_ID,
                      collectionMetadata: collectionMetadata,
                    };
                  } else {
                    burnAccount = {
                      metadata: metadataAccount,
                      owner: publickey,
                      mint: mint,
                      tokenAccount: tokenAccount,
                      masterEditionAccount: masterEditionPDA,
                      splTokenProgram: TOKEN_PROGRAM_ID,
                    };
                    const burnInstruction = createBurnNftInstruction(
                      burnAccount,
                      new PublicKey(PROGRAM_ADDRESS)
                    );
                    // add the burn instruction to the transaction
                    Tx.add(burnInstruction);
                  }
                }
              } else {
                const getbalance = await connection.getTokenAccountBalance(
                  tokenAccount
                );
                const decimals = getbalance.value.decimals;
                const balance = getbalance.value.uiAmount;

                const burnInstruction = Token.createBurnInstruction(
                  TOKEN_PROGRAM_ID,
                  mint,
                  tokenAccount,
                  publickey,
                  [],
                  balance! * 10 ** decimals
                );

                const closeInstruction = Token.createCloseAccountInstruction(
                  TOKEN_PROGRAM_ID,
                  tokenAccount,
                  publickey,
                  publickey,
                  []
                );
                Tx.add(burnInstruction, closeInstruction);
              }

              // const seed3 = Buffer.from(mint.toBytes());
              // const seed5 = Buffer.from(Math.floor(edition/248));

              // const [editionMarkerAccount, _bump] = PublicKey.findProgramAddressSync(
              //   [seed1, seed2, seed3, seed4, seed5],
              //   PROGRAM_ID
              // );

              // const burnEditionAccount = {
              //   metadata: metadataAccount,
              //   owner: publickey,
              //   printEditionMint: mint,
              //   masterEditionMint: ,
              //   printEditionTokenAccount: tokenAccount,
              //   masterEditionTokenAccount: ,
              //   masterEditionAccount: parent,
              //   printEditionAccount: masterEditionPDA,
              //   editionMarkerAccount: editionMarkerAccount,
              //   splTokenProgram: TOKEN_PROGRAM_ID,
              // }
              // const burnEdition = createBurnEditionNftInstruction(burnEditionAccount, new PublicKey(PROGRAM_ADDRESS))
            }

            const signature = await wallet.sendTransaction(Tx, connection);
            const confirmed = await connection.confirmTransaction(
              signature,
              "processed"
            );
            console.log("confirmation", signature);
            toast({
              variant: "success",
              title: "Success",
              description: (
                <div className="flex flex-col gap-2">
                  <p>Your NFTs have been burned!</p>
                  <Link
                    href={`https://solscan.io/tx/${signature}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-5 py-2 uppercase text-sm rounded-md text-center"
                  >
                    View on solscan
                  </Link>
                </div>
              ),
            });
          }
          setToBurn([]);
          setIsBurning(false);
          setSuccess(true);

          await getUserNFT();
        } else {
          setMessage("Please choose at least one NFT to burn first!");
          setSuccess(false);
          setIsBurning(false);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Please choose at least one NFT to burn first!",
          });
        }
      } catch (error) {
        await getUserNFT();
        setToBurn([]);
        setIsBurning(false);
        console.log(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occured, please try again later!",
        });
      }
    }
  };
  const SelectButton = ({ token }: { token: any }) => {
    const [isSelected, setIsSelected] = useState(false);
    const tokenAccount = token.tokenAccount;
    const mint = token.mint;
    const masterEditionPDA = token.masterEditionPDA;
    const metadataAccount = token.metadataAccount;
    const collectionMetadata = token.collectionMetadata;
    const isMasterEdition = token.isMasterEdition;

    const data = {
      tokenAccount: tokenAccount,
      mint: mint,
      masterEditionPDA: masterEditionPDA,
      metadataAccount: metadataAccount,
      collectionMetadata: collectionMetadata,
      isMasterEdition: isMasterEdition,
    };

    return (
      <div>
        {!isSelected ? (
          <Button
            size="sm"
            variant="default"
            className="guac-bg"
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
            className="earn-bg"
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
    <Container className="bg-foreground mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-lg  px-6 py-5  shadow-md">
      <ToolHeader
        title="Burn NFT To Redeem $SOL"
        burnAll
        handleBurn={BurnTokens}
        tutorialLink="https://docs.guacamole.gg/products-and-features/tools/burn-solana-nft"
      />
      <hr className="border border-[rgba(168, 168, 168, 0.10)] " />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {userNFT &&
          userNFT.map((token, index) => (
            <NftCard
              key={token.mint + index}
              title="<Insert NFT Name>"
              image=""
              token={token}
              SelectButton={<SelectButton token={token} key={token.mint} />}
            />
          ))}
        {userNFT && userNFT.length === 0 && (
          <p className="text-gray-400 text-sm mt-4">
            You don`t have any NFTs yet
          </p>
        )}
      </div>
    </Container>
  );
};

export default BurnNftToken;
