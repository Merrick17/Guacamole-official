import Image from 'next/image';
import { FC } from 'react';

interface HomeListProps {}

const HomeList: FC<HomeListProps> = () => {
  return (
    <div className="flex  flex-row items-center justify-between gap-10 rounded-lg bg-white px-14 py-6">
      {listItems.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </div>
  );
};

export default HomeList;

type ListItemProps = {
  title: string;
  description: string;
  image: string;
};
const ListItem: FC<ListItemProps> = ({ title, description, image }) => {
  return (
    <div className="flex max-w-[224px] flex-col gap-2">
      <header>
        <Image src={image} alt={title} width={36} height={36} />
      </header>
      <h1 className="text-2xl font-medium text-black">{title}</h1>
      <p className="text-lg font-normal text-black">{description}</p>
    </div>
  );
};

const listItems: ListItemProps[] = [
  {
    title: 'Trade',
    description:
      'Trade any tokens on Solana in just a few clicks with no hassle and the best fees.',
    image: '/icons/trade.svg',
  },
  {
    title: 'Earn',
    description:
      'Put your crypto to work for you in various ways and enjoy the fruit of its labor.',
    image: '/icons/earn.svg',
  },
  {
    title: 'Play',
    description:
      'Take a chance in fun games where you can win some of your favorite tokens.',
    image: '/icons/play.svg',
  },
  {
    title: 'Manage',
    description:
      'Helpful tools make it easy to navigate every step of your journey through crypto.',
    image: '/icons/manage.svg',
  },
];
