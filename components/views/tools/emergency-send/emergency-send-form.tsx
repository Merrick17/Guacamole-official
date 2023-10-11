'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from '@solana/spl-token-v1';

const formSchema = z.object({
  walletAddress: z.string().refine((val) => isValidSolanaAddress(val), {
    message: 'Invalid Solana address',
  }),
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

import {
  getAllDomains,
  performReverseLookup,
  transferNameOwnership,
} from '@bonfida/spl-name-service';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'lucide-react';

interface EmergencySendFormProps {}

const EmergencySendForm: FC<EmergencySendFormProps> = () => {
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [receiver, setReceiver] = useState<string>('');
  const [currentTx, setCurrentTx] = useState<number | undefined>();
  const [nbTotalTx, setNbTotalTx] = useState<number | undefined>();
  const { toast } = useToast();

  const nbTransferPerTx = 5;
  // ^- form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: '',
    },
  });
  async function send(receiver: string) {
    if (publicKey != null) {
      try {
        const { value: splAccounts } =
          await connection.getParsedTokenAccountsByOwner(publicKey, {
            programId: new PublicKey(
              'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
            ),
          });
        const userTokens = splAccounts
          .filter((m) => {
            const amount = m.account?.data?.parsed?.info?.tokenAmount?.uiAmount;
            return amount != 0;
          })
          .map((m) => {
            const mintAddress = m.account?.data?.parsed?.info?.mint;
            const account = m.pubkey.toBase58();
            const amount = parseInt(
              m.account?.data?.parsed?.info?.tokenAmount?.amount
            );
            return { mintAddress, account, amount };
          });

        const domains = await getAllDomains(connection, publicKey);
        for (let i = 0; i < domains.length; i++) {
          const domainName = await performReverseLookup(
            connection,
            new PublicKey(domains[i])
          );
          const domain = domainName + '.sol';
          userTokens.push({ mintAddress: domain, account: '', amount: 1 });
        }

        userTokens.push({
          mintAddress: 'So11111111111111111111111111111111111111112',
          account: '',
          amount: 0,
        });

        const nbTokens = userTokens.length;

        let nbTx: number;

        if (nbTokens % nbTransferPerTx == 0) {
          nbTx = nbTokens / nbTransferPerTx;
        } else {
          nbTx = Math.floor(nbTokens / nbTransferPerTx) + 1;
        }

        setNbTotalTx(nbTx);

        const receiverPubkey = new PublicKey(receiver);

        for (let i = 0; i < nbTx; i++) {
          const Tx = new Transaction();

          let bornSup: number;

          if (i == nbTx - 1) {
            bornSup = nbTokens;
          } else {
            bornSup = nbTransferPerTx * (i + 1);
          }

          setCurrentTx(i + 1);
          for (let j = nbTransferPerTx * i; j < bornSup; j++) {
            if (
              userTokens[j].mintAddress ==
              'So11111111111111111111111111111111111111112'
            ) {
              const SOLBalance = await connection.getBalance(publicKey);
              Tx.add(
                SystemProgram.transfer({
                  fromPubkey: publicKey,
                  toPubkey: receiverPubkey,
                  lamports:
                    SOLBalance - (0.00001 + 0.00203928) * LAMPORTS_PER_SOL,
                })
              );
            } else if (userTokens[j].mintAddress.includes('.sol')) {
              const domain = userTokens[j].mintAddress.replace('.sol', '');
              const transferDomainIx = await transferNameOwnership(
                connection,
                domain,
                receiverPubkey,
                undefined,
                new PublicKey('58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx')
              );
              Tx.add(transferDomainIx);
            } else {
              const mint = new PublicKey(userTokens[j].mintAddress);
              const source_account = new PublicKey(userTokens[j].account);
              const amount = userTokens[j].amount;

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

              const TransferIx = Token.createTransferInstruction(
                TOKEN_PROGRAM_ID,
                source_account,
                destination_account,
                publicKey,
                [],
                amount
              );
              Tx.add(TransferIx);
            }
          }
          const signature = await sendTransaction(Tx, connection);
          const confirmed = await connection.confirmTransaction(
            signature,
            'processed'
          );
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
            variant: 'destructive',
            title: 'Error',
            description: <p>It is not a valid Backpack username.</p>,
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: err.message,
          });
        }
      }
    }
  }

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Here');
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // if (!form.formState.isValid) return;
    // console.log(values);
    await send(values.walletAddress);
  };

  return (
    <Form {...form}>
      {/* <SelectToken
        handleSelect={(token: any) => setSelectedToken(token)}
        selectedToken={selectedToken}
      /> */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-6">
        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Wallet Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the wallet address to receive all tokens"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full  !py-4">
          <span className="text-base font-medium capitalize">
            Send All Tokens To New Address
          </span>
        </Button>
      </form>
    </Form>
  );
};

export default EmergencySendForm;
