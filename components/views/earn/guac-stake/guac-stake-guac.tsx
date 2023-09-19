'use client';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import Image from 'next/image';

const formSchema = z.object({
  stake: z.boolean(),
});

const GuacStakeForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stake: true,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-6 rounded-lg border border-[#1A1E1D]"
      >
        <div className="flex items-center gap-4 w-full">
          <Button className="w-full">Stake GUAC</Button>
          <Button className="w-full">Unstake GUAC</Button>
        </div>

        <p className="text-muted-foreground">Enter deposit amount:</p>

        <div className="rounded-lg p-4 flex flex-row gap-4 items-center bg-background ">
          <Image
            src="/icons/earn/sol.svg"
            width={32}
            height={32}
            alt="solana"
          />
          <div className="w-full">
            <h1 className="font-semibold">SOL</h1>
            <p className="text-muted-foreground  text-xs ">
              Balance 22.936590397
            </p>
          </div>
          <Input
            placeholder="0.00"
            className="w-full  h-full  text-right  laceholder:text-xl text-xl font-semibold"
            type="number"
          />
        </div>
        <Button disabled>GUAC Staking Is Not Available Yet</Button>
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <p>You Will Receive</p>
          <p>--</p>
        </div>
      </form>
    </Form>
  );
};

export default GuacStakeForm;
