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
  accent?: string;
};
interface HomeListProps {
  listItems: ListItemProps[];
}

const HeroList: FC<HomeListProps> = ({ listItems }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10  rounded-lg bg-foreground px-14 py-6  backdrop:blur-sm">
      {listItems.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </div>
  );
};

export default HeroList;

const ListItem: FC<ListItemProps> = ({
  title,
  description,
  image,
  href,
  disabled,
  accent,
}) => {
  return (
    <Link
      href={href}
      aria-disabled={disabled}
      style={
        {
          '--accent': accent,
        } as React.CSSProperties
      }
      className={cn(
        'w-full lg:max-w-[322px] flex flex-col gap-2  transition-colors p-4 rounded-lg cursor-pointer bg-background  border border-transparent  duration-500 ease-in-out',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        !disabled && ` hover:border-[var(--accent)]  hover:border`
      )}
    >
      <header>
        <Image src={image} alt={title} width={36} height={36} />
      </header>
      <h1 className="text-2xl font-medium">{title}</h1>
      <p className="text-lg font-normal text-muted-foreground ">
        {description}
      </p>
    </Link>
  );
};
