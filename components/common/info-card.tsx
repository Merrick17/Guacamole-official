'use client';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import Container from './container';

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

interface InfoCardProps {
  image: string;
  name: string;
  description: string;
  href?: string;
  openNewTab?: boolean;
  disabled?: boolean;
}

const InfoCard: FC<InfoCardProps> = ({
  image,
  name,
  description,
  href,
  openNewTab = false,
  disabled = false,
}) => {
  return (
    <Container className="rounded-lg max-w-xs  border border-transparent  hover:border-primary transition-all duration-500 ease-in-out">
      <Link
        href={!disabled ? href : '#'}
        target={openNewTab ? '_blank' : undefined}
        className={cn(
          'flex  flex-col items-start gap-2   p-4 h-full bg-background rounded-lg  ',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <div className="relative aspect-square w-9">
          <Image src={image} alt={name} fill />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-medium uppercase leading-7 ">{name}</h1>
          <p className=" text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      </Link>
    </Container>
  );
};

export default InfoCard;
