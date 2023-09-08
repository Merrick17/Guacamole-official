'use client';
import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
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
import * as z from 'zod';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { cn } from '@/lib/utils';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
const formSchema = z.object({
  upOrDown: z.boolean(),
  tradeQuantity: z.string(),
  slippage: z.string(),
  size: z.string(),
});
const PerpetualsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upOrDown: true,
      tradeQuantity: '0',
      slippage: '0',
      size: '0',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Container className="bg-foreground px-5 py-7  flex flex-col gap-5 col-span-2 ">
      <div className="flex items-center justify-between">
        <Button className=" h-7 rounded-lg text-sm">Bridge Swap</Button>
        <WalletMultiButtonDynamic
          startIcon={undefined}
          className="!rounded-lg  h-7 px-3 py-[6px] font-normal text-sm hidden lg:flex bg-primary text-primary-foreground hover:!bg-primary"
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" bg-background space-y-8 "
        >
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Will the price go up or down?
            </p>
            <div className="flex items-center justify-between gap-4">
              <Button
                className={cn(
                  ' rounded-lg text-sm w-full flex items-center justify-center gap-2',
                  form.watch('upOrDown')
                    ? 'bg-[#8bd796] hover:!bg-[#8bd796]'
                    : 'bg-background hover:!bg-background text-white'
                )}
                size="lg"
                onClick={() => form.setValue('upOrDown', true)}
              >
                <BiUpArrowAlt />
                Up
              </Button>

              <Button
                className={cn(
                  ' rounded-lg text-sm w-full  flex items-center justify-center gap-2',
                  !form.watch('upOrDown')
                    ? 'bg-[#8bd796] hover:!bg-[#8bd796]'
                    : 'bg-background hover:!bg-background text-white'
                )}
                size="lg"
                onClick={() => form.setValue('upOrDown', false)}
              >
                <BiDownArrowAlt />
                Down
              </Button>
            </div>
          </div>
          <FormField
            control={form.control}
            name="tradeQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Trade Quantity
                </FormLabel>
                <FormControl className="bg-foreground">
                  <div className="flex items-center justify-between gap-4">
                    <Input type="number" placeholder="0" {...field} />
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        className="text-accent bg-background text-xs"
                        onClick={() =>
                          form.setValue(
                            'tradeQuantity',
                            String(Number(form.watch('tradeQuantity')) / 2)
                          )
                        }
                      >
                        1/2
                      </Button>
                      <Button
                        size="icon"
                        className="text-accent bg-background text-xs"
                        onClick={() =>
                          form.setValue(
                            'tradeQuantity',
                            String(Number(form.watch('tradeQuantity')) * 2)
                          )
                        }
                      >
                        x2
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slippage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Slippage Tolerance
                </FormLabel>
                <FormControl className="bg-foreground">
                  <Input
                    min={0}
                    max={1}
                    step="0.01"
                    type="number"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-muted-foreground justify-between">
                  <p>trade Size (USDC)</p>{' '}
                  <p className="text-accent">View Margin Requirements</p>
                </FormLabel>
                <FormControl className="bg-foreground">
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full " size="lg">
            Place Trade
          </Button>
        </form>
      </Form>
      <p className="text-muted-foreground text-xs">
        View market details and manage all open positions below. Trading fee of
        15bps is applied to all trades.
      </p>
      <div className="text-muted-foreground text-sm flex items-center justify-between gap-4">
        <p>
          GUAC/Avotar Discount:{' '}
          <span className="text-[#8bd796] ">Save up to 50%</span>
        </p>

        <BsFillInfoCircleFill />
      </div>
    </Container>
  );
};

export default PerpetualsForm;
