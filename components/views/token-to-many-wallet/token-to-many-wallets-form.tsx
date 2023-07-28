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

const formSchema = z
  .object({
    reciverWallet1: z
      .string()
      .min(26, {
        message: 'wallet address must be at least 26 characters.',
      })
      .max(35, {
        message: 'wallet address must not be longer than 35 characters.',
      })
      .optional(),
    amount1: z
      .number()
      .min(1, {
        message: 'amount must be at least 1.',
      })
      .optional(),
    reciverWallet2: z
      .string()
      .min(26, {
        message: 'wallet address must be at least 26 characters.',
      })
      .max(35, {
        message: 'wallet address must not be longer than 35 characters.',
      })
      .optional(),
    amount2: z
      .number()
      .min(1, {
        message: 'amount must be at least 1 characters.',
      })
      .optional(),
    reciverWallet3: z
      .string()
      .min(26, {
        message: 'wallet address must be at least 26 characters.',
      })
      .max(35, {
        message: 'wallet address must not be longer than 35 characters.',
      })
      .optional(),
    amount3: z
      .number()
      .min(1, {
        message: 'amount must be at least 1 characters.',
      })
      .optional(),
    reciverWallet4: z
      .string()
      .min(26, {
        message: 'wallet address must be at least 26 characters.',
      })
      .max(35, {
        message: 'wallet address must not be longer than 35 characters.',
      })
      .optional(),
    amount4: z
      .number()
      .min(1, {
        message: 'amount must be at least 1 characters.',
      })
      .optional(),
    reciverWallet5: z
      .string()
      .min(26, {
        message: 'wallet address must be at least 26 characters.',
      })
      .max(35, {
        message: 'wallet address must not be longer than 35 characters.',
      })
      .optional(),
    amount5: z
      .number()
      .min(1, {
        message: 'amount must be at least 1 characters.',
      })
      .optional(),
    reciverWallet6: z
      .string()
      .min(26, {
        message: 'wallet address must be at least 26 characters.',
      })
      .max(35, {
        message: 'wallet address must not be longer than 35 characters.',
      })
      .optional(),
    amount6: z
      .number()
      .min(1, {
        message: 'amount must be at least 1 characters.',
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

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SelectToken } from '../../common/select-token';

interface TokenToManyWalletsFormProps {}

const TokenToManyWalletsForm: FC<TokenToManyWalletsFormProps> = () => {
  // 1- form.
  const [selectedToken, setSelectedToken] = useState<any>(null);
  // 2- form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reciverWallet1: '',
      amount1: 1,
      reciverWallet2: '',
      amount2: 1,
      reciverWallet3: '',
      amount3: 1,
      reciverWallet4: '',
      amount4: 1,
      reciverWallet5: '',
      amount5: 1,
      reciverWallet6: '',
      amount6: 1,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!form.formState.isValid) return;
    console.log(values);
  }

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
      </form>
      <Button type="submit" className=" w-full py-4 font-medium">
        Send Tokens To Addresses
      </Button>
    </Form>
  );
};

export default TokenToManyWalletsForm;
