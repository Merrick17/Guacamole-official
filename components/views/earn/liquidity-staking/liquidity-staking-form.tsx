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
  amount: z.number().positive(),
});

const LiquidityStackingForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stake: true,
      amount: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-6 rounded-lg border border-[#1A1E1D]"
        >
          <div className="flex items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="stake"
              render={({ field }) => (
                <FormItem className="w-full p-0">
                  <FormControl>
                    <Button
                      className="w-full"
                      size="sm"
                      type="button"
                      onClick={() => form.setValue('stake', true)}
                      variant={
                        form.watch('stake') === true ? 'default' : 'secondary'
                      }
                    >
                      Stake SOL
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stake"
              render={({ field }) => (
                <FormItem className="w-full p-0">
                  <FormControl>
                    <Button
                      className="w-full"
                      size="sm"
                      type="button"
                      onClick={() => form.setValue('stake', false)}
                      variant={
                        form.watch('stake') === false ? 'default' : 'secondary'
                      }
                    >
                      Unstake mSOL
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />
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
              <p className="text-xs ">
                <span className="text-white/50">Balance </span>
                <span className="text-white/[0.35]">22.936590397</span>
              </p>
            </div>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="0.00"
                      className="w-full  h-full  text-right  placeholder:text-xl text-xl font-semibold"
                      type="number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button>
            {form.watch('stake') === true ? 'Stake' : 'Unstake'} SOL for mSOL
          </Button>
          <div className="flex items-center justify-between text-muted-foreground text-sm">
            <p>You Will Receive</p>
            <p>--</p>
          </div>
        </form>
      </Form>
      <div className="flex flex-col gap-4 p-3 rounded-lg text-sm text-muted-foreground border border-[#1A1E1D]">
        <div className="flex items-center justify-between">
          <p>Total SOL Staked</p>
          <p>5,317,716.15 SOL</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Total mSOL Supply</p>
          <p>4,693,993.01</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Shared Between</p>
          <p>130 Validators</p>
        </div>
      </div>
    </>
  );
};

export default LiquidityStackingForm;
