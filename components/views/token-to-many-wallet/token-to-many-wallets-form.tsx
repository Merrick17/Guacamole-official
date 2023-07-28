"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  getAllDomains,
  performReverseLookup,
  getHashedName,
  getNameAccountKey,
  getTwitterRegistry,
  NameRegistryState,
  transferNameOwnership,
} from "@bonfida/spl-name-service";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TldParser } from "@onsol/tldparser";
import { Metaplex } from "@metaplex-foundation/js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token-v1";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { SelectToken } from "../../common/select-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
const formSchema = z
  .object({
    reciverWallet1: z
      .string()
      .min(26, {
        message: "wallet address must be at least 26 characters.",
      })
      .max(35, {
        message: "wallet address must not be longer than 35 characters.",
      })
      .optional(),
    amount1: z
      .number()
      .min(1, {
        message: "amount must be at least 1.",
      })
      .optional(),
    reciverWallet2: z
      .string()
      .min(26, {
        message: "wallet address must be at least 26 characters.",
      })
      .max(35, {
        message: "wallet address must not be longer than 35 characters.",
      })
      .optional(),
    amount2: z
      .number()
      .min(1, {
        message: "amount must be at least 1 characters.",
      })
      .optional(),
    reciverWallet3: z
      .string()
      .min(26, {
        message: "wallet address must be at least 26 characters.",
      })
      .max(35, {
        message: "wallet address must not be longer than 35 characters.",
      })
      .optional(),
    amount3: z
      .number()
      .min(1, {
        message: "amount must be at least 1 characters.",
      })
      .optional(),
    reciverWallet4: z
      .string()
      .min(26, {
        message: "wallet address must be at least 26 characters.",
      })
      .max(35, {
        message: "wallet address must not be longer than 35 characters.",
      })
      .optional(),
    amount4: z
      .number()
      .min(1, {
        message: "amount must be at least 1 characters.",
      })
      .optional(),
    reciverWallet5: z
      .string()
      .min(26, {
        message: "wallet address must be at least 26 characters.",
      })
      .max(35, {
        message: "wallet address must not be longer than 35 characters.",
      })
      .optional(),
    amount5: z
      .number()
      .min(1, {
        message: "amount must be at least 1 characters.",
      })
      .optional(),
    reciverWallet6: z
      .string()
      .min(26, {
        message: "wallet address must be at least 26 characters.",
      })
      .max(35, {
        message: "wallet address must not be longer than 35 characters.",
      })
      .optional(),
    amount6: z
      .number()
      .min(1, {
        message: "amount must be at least 1 characters.",
      })
      .optional(),
  })
  .refine((data) => {
    const {
      reciverWallet1,
      amount1,
      amount2,
      amount3,
      amount4,
      amount5,
      amount6,
      reciverWallet2,
      reciverWallet3,
      reciverWallet4,
      reciverWallet5,
      reciverWallet6,
    } = data;
    if (!reciverWallet1 && !amount1) return true;
    if (reciverWallet1 && amount1) return true;
    if (!reciverWallet2 && !amount2) return true;
    if (reciverWallet2 && amount2) return true;
    if (!reciverWallet3 && !amount3) return true;
    if (reciverWallet3 && amount3) return true;
    if (!reciverWallet4 && !amount4) return true;
    if (reciverWallet4 && amount4) return true;
    if (!reciverWallet5 && !amount5) return true;
    if (reciverWallet5 && amount5) return true;
    if (!reciverWallet6 && !amount6) return true;
    if (reciverWallet6 && amount6) return true;

    return false;
  });

interface TokenToManyWalletsFormProps { }

const TokenToManyWalletsForm: FC<TokenToManyWalletsFormProps> = () => {
  // 1- form.
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const metaplex = new Metaplex(connection);
  const parser = new TldParser(connection);
  // 2- form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reciverWallet1: "",
      amount1: 1,
      reciverWallet2: "",
      amount2: 1,
      reciverWallet3: "",
      amount3: 1,
      reciverWallet4: "",
      amount4: 1,
      reciverWallet5: "",
      amount5: 1,
      reciverWallet6: "",
      amount6: 1,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //if (!form.formState.isValid) return;
    console.log("Values",values);
  }
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

  // const send = async () => {
  //   if (publicKey != null) {
  //     try {
  //       const token = selectedToken.account.mint.toBase58();
  //       const Receivers: any[] = [];
  //       for (let i = 0; i < receiverList.length; i++) {
  //         if (
  //           receiverList[i]["receiver"] != "" &&
  //           receiverList[i]["amount"] != ""
  //         ) {
  //           Receivers.push(receiverList[i]);
  //         }
  //       }

  //       if (Receivers.length != 0) {
  //         let Tx = new Transaction();
  //         for (let i = 0; i < Receivers.length; i++) {
  //           let receiverPubkey: PublicKey;
  //           if (Receivers[i]["receiver"].includes(".sol")) {
  //             const hashedName = await getHashedName(
  //               Receivers[i]["receiver"].replace(".sol", "")
  //             );
  //             const nameAccountKey = await getNameAccountKey(
  //               hashedName,
  //               undefined,
  //               new PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx") // SOL TLD Authority
  //             );
  //             const owner = await NameRegistryState.retrieve(
  //               connection,
  //               nameAccountKey
  //             );
  //             receiverPubkey = owner.registry.owner;
  //           } else if (
  //             !Receivers[i]["receiver"].includes(".sol") &&
  //             Receivers[i]["receiver"].includes(".")
  //           ) {
  //             const owner = await parser.getOwnerFromDomainTld(
  //               Receivers[i]["receiver"]
  //             );
  //             if (owner != undefined) {
  //               receiverPubkey = owner;
  //               console.log(receiverPubkey.toBase58());
  //             } else {
  //               receiverPubkey = new PublicKey("");
  //             }
  //           } else if (Receivers[i]["receiver"].includes("@")) {
  //             const handle = Receivers[i]["receiver"].replace("@", "");
  //             const registry = await getTwitterRegistry(connection, handle);
  //             receiverPubkey = registry.owner;
  //           } else if (
  //             !Receivers[i]["receiver"].includes(".") &&
  //             !Receivers[i]["receiver"].includes("@") &&
  //             !isValidSolanaAddress(Receivers[i]["receiver"])
  //           ) {
  //             const url =
  //               "https://xnft-api-server.xnfts.dev/v1/users/fromUsername?username=" +
  //               Receivers[i]["receiver"];
  //             const response = await fetch(url);
  //             const responseData = await response.json();
  //             receiverPubkey = new PublicKey(
  //               responseData.user.public_keys.find(
  //                 (key: any) => key.blockchain == "solana"
  //               ).public_key
  //             );
  //           } else {
  //             receiverPubkey = new PublicKey(Receivers[i]["receiver"]);
  //           }

  //           if (token == "So11111111111111111111111111111111111111112") {
  //             Tx.add(
  //               SystemProgram.transfer({
  //                 fromPubkey: publicKey,
  //                 toPubkey: receiverPubkey,
  //                 lamports: Receivers[i]["amount"] * LAMPORTS_PER_SOL,
  //               })
  //             );
  //           } else {
  //             const mint = new PublicKey(token);
  //             const destination_account = await Token.getAssociatedTokenAddress(
  //               ASSOCIATED_TOKEN_PROGRAM_ID,
  //               TOKEN_PROGRAM_ID,
  //               mint,
  //               receiverPubkey
  //             );
  //             const account = await connection.getAccountInfo(
  //               destination_account
  //             );

  //             if (account == null) {
  //               const createIx = Token.createAssociatedTokenAccountInstruction(
  //                 ASSOCIATED_TOKEN_PROGRAM_ID,
  //                 TOKEN_PROGRAM_ID,
  //                 mint,
  //                 destination_account,
  //                 receiverPubkey,
  //                 publicKey
  //               );

  //               Tx.add(createIx);
  //             }
  //             const source_account = await Token.getAssociatedTokenAddress(
  //               ASSOCIATED_TOKEN_PROGRAM_ID,
  //               TOKEN_PROGRAM_ID,
  //               mint,
  //               publicKey
  //             );
  //             const balanceResp = await connection.getTokenAccountBalance(
  //               source_account
  //             );
  //             const decimals = balanceResp.value.decimals;
  //             const transferIx = Token.createTransferInstruction(
  //               TOKEN_PROGRAM_ID,
  //               source_account,
  //               destination_account,
  //               publicKey,
  //               [],
  //               parseFloat(Receivers[i]["amount"]) * 10 ** decimals
  //             );
  //             Tx.add(transferIx);
  //           }
  //         }
  //         const signature = await wallet.sendTransaction(Tx, connection);
  //         const confirmed = await connection.confirmTransaction(
  //           signature,
  //           "processed"
  //         );
  //         console.log("confirmation", signature);
  //         getUserTokens();
  //         setIsSending(false);
  //         setSuccess(true);
  //         setSignature(signature);
  //       } else {
  //         setError("Please enter at least one receiver and one amount!");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       setIsSending(false);
  //       setSuccess(false);
  //       const err = (error as any)?.message;
  //       if (
  //         err.includes(
  //           "Cannot read properties of undefined (reading 'public_keys')"
  //         )
  //       ) {
  //         //setError("It is not a valid Backpack username");
  //       } else {
  //         //setError(err);
  //       }
  //     }
  //   }
  // };
  return (
    <Form {...form}>
      <SelectToken
        handleSelect={(token: any) => setSelectedToken(token)}
        selectedToken={selectedToken}
      />

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 pb-6">
        <div className="flex items-center  flex-col gap-2 md:flex-row md:justify-between md:gap-8 ">
          <FormField
            control={form.control}
            name="reciverWallet1"
            render={({ field }) => (
              <FormItem className="w-full md:w-2/3">
                <FormLabel className=" uppercase">
                  Reciver 1 Wallet Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="Insert Wallet Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount1"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormLabel className="uppercase">Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center  flex-col md:flex-row md:justify-between md:gap-8 ">
          <FormField
            control={form.control}
            name="reciverWallet2"
            render={({ field }) => (
              <FormItem className="w-full md:w-2/3">
                <FormLabel className="uppercase">
                  Reciver 2 Wallet Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="Insert Wallet Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount2"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormLabel className="uppercase">Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center  flex-col md:flex-row md:justify-between md:gap-8 ">
          <FormField
            control={form.control}
            name="reciverWallet3"
            render={({ field }) => (
              <FormItem className="w-full md:w-2/3">
                <FormLabel className="uppercase">
                  Reciver 3 Wallet Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="Insert Wallet Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount3"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormLabel className="uppercase">Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center  flex-col md:flex-row md:justify-between md:gap-8 ">
          <FormField
            control={form.control}
            name="reciverWallet4"
            render={({ field }) => (
              <FormItem className="w-full md:w-2/3">
                <FormLabel className="uppercase">
                  Reciver 4 Wallet Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="Insert Wallet Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount4"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormLabel className="uppercase">Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center  flex-col md:flex-row md:justify-between md:gap-8 ">
          <FormField
            control={form.control}
            name="reciverWallet5"
            render={({ field }) => (
              <FormItem className="w-full md:w-2/3">
                <FormLabel className="uppercase">
                  Reciver 5 Wallet Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="Insert Wallet Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount5"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormLabel className="uppercase">Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center  flex-col md:flex-row md:justify-between md:gap-8 ">
          <FormField
            control={form.control}
            name="reciverWallet6"
            render={({ field }) => (
              <FormItem className="w-full md:w-2/3">
                <FormLabel className="uppercase">
                  Reciver 6 Wallet Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="Insert Wallet Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount6"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormLabel className="uppercase">Amount</FormLabel>
                <FormControl>
                  <Input placeholder="amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className=" w-full py-4 font-medium">
        Send Tokens To Addresses
      </Button>
      </form>
     
    </Form>
  );
};

export default TokenToManyWalletsForm;
