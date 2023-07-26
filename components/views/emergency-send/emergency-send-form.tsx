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

const formSchema = z.object({
  walletAddress: z
    .string()
    .min(26, {
      message: 'wallet address must be at least 26 characters.',
    })
    .max(35, {
      message: 'wallet address must not be longer than 35 characters.',
    }),
});

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

interface EmergencySendFormProps {}

const EmergencySendForm: FC<EmergencySendFormProps> = () => {
  // ^- form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: '',
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
