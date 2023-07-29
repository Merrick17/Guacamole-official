'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  getAllDomains,
  performReverseLookup,
  getHashedName,
  getNameAccountKey,
  getTwitterRegistry,
  NameRegistryState,
  transferNameOwnership,
} from '@bonfida/spl-name-service';
import { BsPersonAdd, BsTrash } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TldParser } from '@onsol/tldparser';
import { Metaplex } from '@metaplex-foundation/js';

import { FC, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { SelectToken } from '../../common/select-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token-v1';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
const formSchema = z.object({
  receivers: z
    .object({
      receiver: z.string().refine((val) => isValidSolanaAddress(val), {
        message: 'Invalid Solana address',
      }),
      amount: z.number().positive().int(),
    })
    .array(),
});

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

interface TokenToManyWalletsFormProps {}

const TokenToManyWalletsForm: FC<TokenToManyWalletsFormProps> = () => {
  // 1- form.
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const metaplex = new Metaplex(connection);
  const parser = new TldParser(connection);
  const { toast } = useToast();

  // 2- form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      receivers: [
        {
          receiver: '',
          amount: 1,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'receivers',
  });
  const send = async (receiverList: any[]) => {
    if (publicKey != null) {
      try {
        const token = selectedToken.account.mint.toBase58();
        const Receivers: any[] = [];
        for (let i = 0; i < receiverList.length; i++) {
          if (
            receiverList[i]['receiver'] != '' &&
            receiverList[i]['amount'] != ''
          ) {
            Receivers.push(receiverList[i]);
          }
        }

        if (Receivers.length != 0) {
          let Tx = new Transaction();
          for (let i = 0; i < Receivers.length; i++) {
            let receiverPubkey: PublicKey;
            if (Receivers[i]['receiver'].includes('.sol')) {
              const hashedName = await getHashedName(
                Receivers[i]['receiver'].replace('.sol', '')
              );
              const nameAccountKey = await getNameAccountKey(
                hashedName,
                undefined,
                new PublicKey('58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx') // SOL TLD Authority
              );
              const owner = await NameRegistryState.retrieve(
                connection,
                nameAccountKey
              );
              receiverPubkey = owner.registry.owner;
            } else if (
              !Receivers[i]['receiver'].includes('.sol') &&
              Receivers[i]['receiver'].includes('.')
            ) {
              const owner = await parser.getOwnerFromDomainTld(
                Receivers[i]['receiver']
              );
              if (owner != undefined) {
                receiverPubkey = owner;
                console.log(receiverPubkey.toBase58());
              } else {
                receiverPubkey = new PublicKey('');
              }
            } else if (Receivers[i]['receiver'].includes('@')) {
              const handle = Receivers[i]['receiver'].replace('@', '');
              const registry = await getTwitterRegistry(connection, handle);
              receiverPubkey = registry.owner;
            } else if (
              !Receivers[i]['receiver'].includes('.') &&
              !Receivers[i]['receiver'].includes('@') &&
              !isValidSolanaAddress(Receivers[i]['receiver'])
            ) {
              const url =
                'https://xnft-api-server.xnfts.dev/v1/users/fromUsername?username=' +
                Receivers[i]['receiver'];
              const response = await fetch(url);
              const responseData = await response.json();
              receiverPubkey = new PublicKey(
                responseData.user.public_keys.find(
                  (key: any) => key.blockchain == 'solana'
                ).public_key
              );
            } else {
              receiverPubkey = new PublicKey(Receivers[i]['receiver']);
            }

            if (token == 'So11111111111111111111111111111111111111112') {
              Tx.add(
                SystemProgram.transfer({
                  fromPubkey: publicKey,
                  toPubkey: receiverPubkey,
                  lamports: Receivers[i]['amount'] * LAMPORTS_PER_SOL,
                })
              );
            } else {
              const mint = new PublicKey(token);
              const destination_account = await Token.getAssociatedTokenAddress(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                mint,
                receiverPubkey
              );
              const account = await connection.getAccountInfo(
                destination_account
              );

              if (account == null) {
                const createIx = Token.createAssociatedTokenAccountInstruction(
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
              const transferIx = Token.createTransferInstruction(
                TOKEN_PROGRAM_ID,
                source_account,
                destination_account,
                publicKey,
                [],
                parseFloat(Receivers[i]['amount']) * 10 ** decimals
              );
              Tx.add(transferIx);
            }
          }
          const signature = await sendTransaction(Tx, connection);
          const confirmed = await connection.confirmTransaction(
            signature,
            'processed'
          );
          console.log('confirmation', signature);
          toast({
            variant: 'success',
            title: 'Success',
            description: (
              <div className="flex flex-col gap-1">
                <p>Transaction sent successfully.</p>
                <Link href={`https://solscan.io/tx/${signature}`}>
                  View on solscan
                </Link>
              </div>
            ),
          });
          //getUserTokens();
          // setIsSending(false);
          // setSuccess(true);
          // setSignature(signature);
        } else {
          //setError("Please enter at least one receiver and one amount!");
        }
      } catch (error) {
        console.log(error);
        // setIsSending(false);
        // setSuccess(false);
        const err = (error as any)?.message;
        if (
          err.includes(
            "Cannot read properties of undefined (reading 'public_keys')"
          )
        ) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'It is not a valid Backpack username',
          });
          //setError("It is not a valid Backpack username");
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: err.message,
          });
          //setError(err);
        }
      }
    }
  };
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //if (!form.formState.isValid) return;
    console.log(values);
    await send(values.receivers);
  };

  return (
    <Form {...form}>
      <SelectToken
        handleSelect={(token: any) => setSelectedToken(token)}
        selectedToken={selectedToken}
      />

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 pb-6">
        <div className="flex items-center  flex-col gap-2 md:flex-row md:justify-between md:gap-8 "></div>
        {fields.map((f, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 gap-2  md:grid-cols-3 md:gap-8  "
          >
            <FormField
              control={form.control}
              name={`receivers.${idx}.receiver`}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className=" uppercase">
                    Reciver {idx + 1} Wallet Address
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
              name={`receivers.${idx}.amount`}
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className=" uppercase">Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <div className="flex items-center  flex-col gap-2 md:flex-row md:justify-center md:gap-8 ">
          <Button
            onClick={() => {
              append({
                amount: 1,
                receiver: '',
              });
            }}
            className="w-max"
          >
            <BsPersonAdd />
          </Button>
          {fields.length > 1 && (
            <Button
              onClick={() => {
                remove(fields.length - 1);
              }}
              className="w-max"
              variant="destructive"
            >
              <BsTrash />
            </Button>
          )}
        </div>
        <Button type="submit" className="!mt-6 w-full py-4 font-medium">
          Send Tokens To Addresses
        </Button>
      </form>
    </Form>
  );
};

export default TokenToManyWalletsForm;
