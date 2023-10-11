'use client';
import { Button } from '@/components/ui/button';
import routes from '@/config/routes';
import { convert, formatNumber } from '@/lib/numbers';
import { cn } from '@/lib/utils';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

type EarnListItemProps = {
  title: string;
  description: string;
  btnText: string;
  href: string;
  disabled?: boolean;
};
interface EarnListProps {}

const EarnList: FC<EarnListProps> = () => {
  const [marketCap, setMarketCap] = useState(0);
  const [marketPrice, setMarketPrice] = useState(0);

  useEffect(() => {
    const getMarketCap = async () => {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/guacamole'
      );

      setMarketCap(data.market_data.fully_diluted_valuation.usd);
      setMarketPrice(data.market_data.current_price.usd);
    };
    getMarketCap();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 rounded-lg bg-white px-14 py-6  border border-[#E5E7EB] backdrop:blur-sm">
      <EarnListItem {...earnListItems[0]} />
      <EarnListItem {...earnListItems[1]} />
      <EarnListItem
        {...earnListItems[2]}
        description={new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(marketCap)}
      />
      <EarnListItem
        {...earnListItems[3]}
        description={'$' + convert(marketPrice)}
      />
    </div>
  );
};

export default EarnList;

const EarnListItem: FC<EarnListItemProps> = ({
  title,
  description,
  btnText,
  href,
}) => {
  return (
    <div
      className={cn(
        ' w-full lg:max-w-[322px] flex flex-col gap-2  transition-colors p-4 border-[#E5E7EB] border rounded-lg cursor-pointer bg-[#F0FDF4]'
      )}
    >
      <p className="text-sm  text-muted-foreground">{title}</p>
      <h1 className="text-2xl font-medium ">{description}</h1>
      <Link
        href={href}
        className="text-sm font-semibold uppercase bg-black text-white py-2 px-5 text-center rounded-md w-max  "
      >
        {btnText}
      </Link>
    </div>
  );
};

const earnListItems: EarnListItemProps[] = [
  {
    title: 'Total Circulating Supply',
    description: '94% of All Tokens',
    btnText: 'View Guacenomics',
    href: 'https://docs.guacamole.gg/guacamole-guac/guac-token',
  },
  {
    title: 'Initially Locked In Liquidity',
    description: '99 Trillion GUAC',
    btnText: 'VIEW TRANSACTION',
    href: 'https://solscan.io/tx/2CiP2qyYpq1vtuL2R1Vu8HE8xRgRFAEFxEEiQ1q3GCPeWenuX8jZANPuXhexqtCWtNPPghNQSkSEnLn4z3pnEjDk',
  },
  {
    title: 'Current Market Cap',
    btnText: 'View COINGECKO',
    description: '$357,036.89',
    href: 'https://www.coingecko.com/en/coins/guacamole',
  },
  {
    title: 'Current Market Price',
    description: '$0.0₈3606',
    btnText: 'SWAP FOR GUAC',
    href: routes.trade.root,
  },
];
