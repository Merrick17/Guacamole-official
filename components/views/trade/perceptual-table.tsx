import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Price, dexterity, useManifest, useProduct, useTrader } from '@/context/dexterity';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Product, ProductMap } from './perpetual-constants';

export function PerceptualTable() {
  const {
    lastUpdated,
    updated,
    trader,
    positionsData,
  } = useTrader();
  const [requested, setRequested] = useState(false);
  const { markPrice } = useProduct();

  const callbacks = {
    onGettingBlockHashFn: () =>
      toast({ variant: 'default', title: 'Fetching BlockHash...' }),
    onGotBlockHashFn: () =>
      toast({ variant: 'success', title: 'Got BlockHash!' }),
    onConfirm: (txn: string) =>
      toast({
        variant: 'success',
        title: 'Order Placed Successfully!',
        description: (
          <div className="flex flex-col gap-1">
            <p>Transaction sent successfully.</p>
            <Link href={`https://solscan.io/tx/${txn}`}>View on solscan</Link>
          </div>
        ),
      }),
  };

  const { manifest } = useManifest();
  const { publicKey } = useWallet();

  useEffect(() => {
  }, [markPrice, manifest, publicKey, trader])

  const handleCloseOrder = async (
    selectedProduct: Product,
    orderType: boolean,
    size: number,
  ) => {
    let slippage = selectedProduct.index === 6 ? 5 : 0.5
    console.log(
      markPrice,
      0.5,
      size,
      publicKey.toBase58(),
      manifest,
      selectedProduct
    );
    if (
      !markPrice ||
      !size ||
      !publicKey ||
      !manifest ||
      !selectedProduct
    ) {
      console.log('Market Price', markPrice);
      if (!markPrice) {
        console.log('markPrice is falsy');
      }

      if (!size) {
        console.log('size is falsy');
      }

      if (!publicKey) {
        console.log('publicKey is falsy');
      }

      if (!manifest) {
        console.log('manifest is falsy');
      }

      if (!selectedProduct) {
        console.log('selectedProduct is falsy');
        console.log({selectedProduct})
      }
      return;
    }

    const IndexMap = {
      0: 1,
      1: 2,
      2: 4
    }

    const selectedMarketPrice = (markPrice.find((p) => p.index === selectedProduct.index)).price

    const priceFraction = dexterity.Fractional.New(
      !orderType
      ? (Number((selectedMarketPrice - ((selectedMarketPrice * slippage) / 100)).toFixed(IndexMap[selectedProduct.index])) * 10 ** 10)
      : (Number((selectedMarketPrice + ((selectedMarketPrice * slippage) / 100)).toFixed(IndexMap[selectedProduct.index])) * 10 ** 10),
        10
    );
    const sizeFraction = dexterity.Fractional.New(
      Math.abs(size) * 10 ** selectedProduct.exponent,
      selectedProduct.exponent
    );
    const referralTrg =
      process.env.NEXT_PUBLIC_REFERRER_TRG_MAINNET ||
      'EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC';

    console.log(JSON.stringify({close: {
      index: selectedProduct.index,
      orderType,
      priceFraction,
      sizeFraction,
      isIOC: false,
      referPubkey: new PublicKey(referralTrg),
      bpsfee: Number(process.env.NEXT_PUBLIC_REFERRER_BPS!),
      clientOrderId: null,
      matchLimit: null,
      callbacks
    }})
    )

    try {
      await trader.newOrder(
        selectedProduct.index,
        orderType,
        priceFraction,
        sizeFraction,
        true,
        new PublicKey(referralTrg),
        Number(process.env.NEXT_PUBLIC_REFERRER_BPS!),
        null,
        null,
        callbacks
      );

      toast({
        variant: 'success',
        title: `Successfully closed ${!orderType? 'LONG' : 'SHORT'} Position!`,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Placing order failed!',
        description: error?.message,
      });
    } finally {
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-background text-xs">
          <TableHead>Market</TableHead>
          <TableHead>Type</TableHead>

          <TableHead>Quantity</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {updated &&
          positionsData &&
          positionsData.map((position, ind) => {
            if (!markPrice) return
            if (Math.abs(parseFloat(position[1].m)) > 0) {
              const qty =
                parseFloat(position[1].m) /
                Math.pow(10, parseInt(position[1].exp));
                const product = position[0].includes('OPOS0D') ? ProductMap.get('OPOS0D') : ProductMap.get(position[0].trim())
              const selectedMarketPrice = (markPrice.find((p) => p.index === product.index)).price

              const value = qty * selectedMarketPrice;

              return (
                <TableRow key={ind.toString()}>
                  <TableCell className="font-medium">{position[0]}</TableCell>
                  <TableCell
                    className={cn(
                      position[1].m > 0 ? 'text-[#8BD796]' : 'text-destructive'
                    )}
                  >
                    {position[1].m > 0 ? 'Long' : 'Short'}
                  </TableCell>
                  <TableCell>{qty}</TableCell>
                  <TableCell>${value.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="default" className='bg-[#bbb0db]' onClick={() => {
                      handleCloseOrder(product, !(position[1].m > 0), qty)
                    }}>Close </Button>
                  </TableCell>
                </TableRow>
              );
            } else {
              return null;
            }
          })}
      </TableBody>
    </Table>
  );
}
