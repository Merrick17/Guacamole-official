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
import { useProduct, useTrader } from '@/context/dexterity';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useCallback, useState } from 'react';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
];

export function PerceptualTable() {
  const {
    orderData, // ordeData: OrderData[]
    lastUpdated,
    updated,
    trader,
    positionsData,
  } = useTrader();
  const { selectedProduct } = useProduct();
  const [requested, setRequested] = useState(false);
  const { markPrice } = useProduct();
  const cancelOrders = useCallback(async () => {
    setRequested(true);
    let ordersArr: any[];
    try {
      ordersArr = await trader.cancelAllOrders([selectedProduct.name]);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Error canceling all orders, ${error}`,
      });
    } finally {
      toast({
        variant: 'success',
        description: `Canceled all orders`,
        title: 'Success',
        // txid: ordersArr[0],
      });
    }
    setRequested(false);
  }, []);
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
            if (Math.abs(parseFloat(position[1].m)) > 0) {
              const qty =
                parseFloat(position[1].m) /
                Math.pow(10, parseInt(position[1].exp));
              const value = qty * markPrice;

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
                    <Button variant="ghost" onClick={async ()=>{
                      console.log("Position",position); 
                     // await trader.cancelOrder(selectedProduct.index,position.)
                    }}>Close Trade</Button>
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
