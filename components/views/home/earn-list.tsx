import { Button } from '@/components/ui/button';
import routes from '@/config/routes';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type EarnListItemProps = {
  title: string;
  description: string;
  btnText: string;
  href: string;
  disabled?: boolean;
};
interface EarnListProps {}

const EarnList: FC<EarnListProps> = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 rounded-lg bg-white px-14 py-6  border border-[#E5E7EB] backdrop:blur-sm">
      {earnListItems.map((item, index) => (
        <EarnListItem key={index} {...item} />
      ))}
    </div>
  );
};

export default EarnList;

const EarnListItem: FC<EarnListItemProps> = ({
  title,
  description,
  btnText,
}) => {
  return (
    <div
      className={cn(
        ' max-w-[322px] flex flex-col gap-2  transition-colors p-4 border-[#E5E7EB] border rounded-lg cursor-pointer bg-[#F0FDF4]'
      )}
    >
      <p className="text-sm  text-black/50">{title}</p>
      <h1 className="text-2xl font-medium ">{description}</h1>
      <Button
        variant="default"
        size="sm"
        className="text-sm font-semibold uppercase"
      >
        {btnText}
      </Button>
    </div>
  );
};

const earnListItems: EarnListItemProps[] = [
  {
    title: 'Total Circulating Supply',
    description: '94% of All Tokens',
    btnText: 'View Guacenomics',
    href: '/',
  },
  {
    title: 'Initially Locked In Liquidity',
    description: '99 Trillion GUAC',
    btnText: 'VIEW TRANSACTION',
    href: '/',
  },
  {
    title: 'Current Market Cap',
    btnText: '$357,036.89',
    description: 'View COINGECKO',
    href: '/',
  },
  {
    title: 'Current Market Price',
    description: '$0.0₈3606',
    btnText: 'SWAP FOR GUAC',
    href: '/',
  },
];
