import routes from '@/config/routes';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type ListItemProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  disabled?: boolean;
};
interface HomeListProps {
  listItems: ListItemProps[];
}

const HomeList: FC<HomeListProps> = ({ listItems }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10  rounded-lg bg-white px-14 py-6  border border-[#E5E7EB] backdrop:blur-sm">
      {listItems.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </div>
  );
};

export default HomeList;

const ListItem: FC<ListItemProps> = ({
  title,
  description,
  image,
  href,
  disabled,
}) => {
  return (
    <Link
      href={href}
      aria-disabled={disabled}
      className={cn(
        'w-full lg:max-w-[322px] flex flex-col gap-2  transition-colors p-4 border-[#E5E7EB] border rounded-lg cursor-pointer',
        disabled && 'bg-[#E5E7EB80] cursor-not-allowed pointer-events-none',
        !disabled && 'hover:bg-[#F0FDF4]'
      )}
    >
      <header>
        <Image src={image} alt={title} width={36} height={36} />
      </header>
      <h1 className="text-2xl font-medium text-black">{title}</h1>
      <p className="text-lg font-normal text-black">{description}</p>
    </Link>
  );
};
