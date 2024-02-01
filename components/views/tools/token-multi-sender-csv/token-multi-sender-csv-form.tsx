"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import Papa from "papaparse";

import { FC, FormEvent, FormEventHandler, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SelectToken } from "@/components/common/select-token";
import { useToast } from "@/hooks/use-toast";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token-v1";
import {
  getAllDomains,
  performReverseLookup,
  getHashedName,
  getNameAccountKey,
  getTwitterRegistry,
  NameRegistryState,
  transferNameOwnership,
} from "@bonfida/spl-name-service";
import { TldParser } from "@onsol/tldparser";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import Link from "next/link";
interface TokenMultiSenderCsvFormProps {}

const TokenMultiSenderCsvForm: FC<TokenMultiSenderCsvFormProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [currentTx, setCurrentTx] = useState<number | null>(null);
  const [totalTx, setTotalTx] = useState<number | null>(null);
  const { toast } = useToast();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const parser = new TldParser(connection);
  const isValidSolanaAddress = (address: string) => {
    try {
      // this fn accepts Base58 character
      // and if it pass we suppose Solana address is valid
      new PublicKey(address);
      return true;
    } catch (error) {
      // Non-base58 character or can't be used as Solana address
      return false;
    }
  };
  const onDropAccepted = useCallback(async (acceptedFiles: any) => {
    // Do something with the files
    await Papa.parse(acceptedFiles[0], {
      header: true,
      complete: function (results) {
        const data = results.data;
        const keys = Object.keys(data[0]);
        console.log("Keys", keys);
        if (
          !keys.includes("address") ||
          !keys.includes("token") ||
          !keys.includes("amount") ||
          keys.length !== 3
        ) {
          toast({
            title: "Invalid CSV file",
            description:
              "Please select a valid CSV file with the following headers: address, token, amount",
            variant: "destructive",
          });
        } else {
          setFile(acceptedFiles[0]);
          const rowsArray: any = [];

          // Iterating data to get column name
          results.data.map((d: any) => {
            rowsArray.push(Object.keys(d));
          });

          // Parsed Data Response in array format
          // @ts-ignore
          setCsvData(results.data);

          // get the headers of the CSV file
          setCsvHeaders(rowsArray[0]);
        }
      },
    });
  }, []);
  const onDropRejected = useCallback((fileRejections: any) => {
    // Do something with the files
    console.error("please select only one file of type CSV");
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDropAccepted,
    onDropRejected,
    accept: { "text/csv": [".csv"] },
  });
  const send = async () => {
    if (publicKey != null) {
      try {
        if (csvData.length != 0) {
          const nbTransferPerTx = 5;
          let nbTx: number;
          if (csvData.length % nbTransferPerTx == 0) {
            nbTx = csvData.length / nbTransferPerTx;
          } else {
            nbTx = Math.floor(csvData.length / nbTransferPerTx) + 1;
          }
          setTotalTx(nbTx);

          for (let i = 0; i < nbTx; i++) {
            let Tx = new Transaction();

            let bornSup: number;

            if (i == nbTx - 1) {
              bornSup = csvData.length;
            } else {
              bornSup = nbTransferPerTx * (i + 1);
            }

            setCurrentTx(i + 1);
            for (let j = nbTransferPerTx * i; j < bornSup; j++) {
              const receiver = csvData[j][csvHeaders[0]];
              if (receiver !== "") {
                console.log("Receiver", receiver);
                let receiverPubkey: PublicKey;
                if (receiver.includes(".sol")) {
                  const hashedName = await getHashedName(
                    receiver.replace(".sol", "")
                  );
                  const nameAccountKey = await getNameAccountKey(
                    hashedName,
                    undefined,
                    new PublicKey(
                      "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"
                    ) // SOL TLD Authority
                  );
                  const owner = await NameRegistryState.retrieve(
                    connection,
                    nameAccountKey
                  );
                  receiverPubkey = owner.registry.owner;
                } else if (
                  !receiver.includes(".sol") &&
                  receiver.includes(".")
                ) {
                  const owner = await parser.getOwnerFromDomainTld(receiver);
                  if (owner != undefined) {
                    receiverPubkey = owner;
                    console.log(receiverPubkey.toBase58());
                  } else {
                    receiverPubkey = new PublicKey("");
                  }
                } else if (receiver.includes("@")) {
                  const handle = receiver.replace("@", "");
                  const registry = await getTwitterRegistry(connection, handle);
                  receiverPubkey = registry.owner;
                } else if (
                  !receiver.includes(".") &&
                  !receiver.includes("@") &&
                  !isValidSolanaAddress(receiver)
                ) {
                  const url =
                    "https://xnft-api-server.xnfts.dev/v1/users/fromUsername?username=" +
                    receiver;
                  const response = await fetch(url);
                  const responseData = await response.json();
                  console.log("Response Data", responseData);
                  receiverPubkey = new PublicKey(
                    responseData.user.public_keys.find(
                      (key: any) => key.blockchain == "solana"
                    ).public_key
                  );
                } else {
                  receiverPubkey = new PublicKey(receiver);
                }

                const token = csvData[j][csvHeaders[1]];
                const amount = parseFloat(csvData[j][csvHeaders[2]]);

                if (token == "So11111111111111111111111111111111111111112") {
                  Tx.add(
                    SystemProgram.transfer({
                      fromPubkey: publicKey,
                      toPubkey: receiverPubkey,
                      lamports: amount * LAMPORTS_PER_SOL,
                    })
                  );
                } else if (token.includes(".sol")) {
                  const transferDomainIx = await transferNameOwnership(
                    connection,
                    token.replace(".sol", ""),
                    receiverPubkey,
                    undefined,
                    new PublicKey(
                      "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"
                    ) // SOL TLD Authority
                  );

                  Tx.add(transferDomainIx);
                } else {
                  const mint = new PublicKey(token);
                  const destination_account =
                    await Token.getAssociatedTokenAddress(
                      ASSOCIATED_TOKEN_PROGRAM_ID,
                      TOKEN_PROGRAM_ID,
                      mint,
                      receiverPubkey
                    );
                  const account = await connection.getAccountInfo(
                    destination_account
                  );

                  if (account == null) {
                    const createIx =
                      Token.createAssociatedTokenAccountInstruction(
                        ASSOCIATED_TOKEN_PROGRAM_ID,
                        TOKEN_PROGRAM_ID,
                        mint,
                        destination_account,
                        receiverPubkey,
                        publicKey
                      );

                    Tx.add(createIx);
                  }
                  const source_account = await Token.getAssociatedTokenAddress(
                    ASSOCIATED_TOKEN_PROGRAM_ID,
                    TOKEN_PROGRAM_ID,
                    mint,
                    publicKey
                  );
                  const balanceResp = await connection.getTokenAccountBalance(
                    source_account
                  );
                  const decimals = balanceResp.value.decimals;
                  const TransferIx = Token.createTransferInstruction(
                    TOKEN_PROGRAM_ID,
                    source_account,
                    destination_account,
                    publicKey,
                    [],
                    amount * 10 ** decimals
                  );
                  Tx.add(TransferIx);
                }
              }
            }
            const signature = await sendTransaction(Tx, connection);
            const confirmed = await connection.confirmTransaction(
              signature,
              "processed"
            );
            console.log("confirmation", signature);
            // toast({
            //   variant: 'success',
            //   title: 'Success',
            //   description: (
            //     <div className="flex flex-col gap-1">
            //       <p>Transaction sent successfully.</p>
            //       <Link href={`https://solscan.io/tx/${signature}`}>
            //         View on solscan
            //       </Link>
            //     </div>
            //   ),
            // });
            toast({
              variant: "success",
              title: "Woot Woot!",
              description: (
                <div className="flex flex-col gap-1">
                  <p>Transaction sent successfully.</p>
                  <Link
                    href={`https://solscan.io/tx/${signature}`}
                    className="bg-background h-[32px] w-[206px]"
                  >
                    View On Explorer
                  </Link>
                </div>
              ),
            });
          }
        } else {
        }
      } catch (error) {
        console.log(error);

        const err = (error as any)?.message;
        if (
          err.includes(
            "Cannot read properties of undefined (reading 'public_keys')"
          )
        ) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "It is not a valid Backpack username.",
          });
          //setError("It is not a valid Backpack username");
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: err.message,
          });
          //setError(err);
        }
      }
    }
  };

  // 2. Define a submit handler.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      console.log("No file selected");
      return;
    }
    send();
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className="space-y-6 pb-6">
      {!file ? (
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <Button type="button" className="w-full py-4 font-medium tools-bg">
            Select File To Upload
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 lg:flex lg:flex-row lg:justify-between lg:gap-4 ">
          <Button
            type="button"
            variant="destructive"
            className="w-full py-4 font-medium capitalize earn-bg"
            onClick={() => setFile(null)}
          >
            remove file
          </Button>
          <Button type="submit" className="w-full py-4 font-medium capitalize">
            apply
          </Button>
        </div>
      )}
    </form>
  );
};

export default TokenMultiSenderCsvForm;
