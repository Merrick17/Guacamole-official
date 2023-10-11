'use client';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import Container from '../common/container';

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

interface ConnectWalletCardProps {
  name: string;
  description: string;
}

const ConnectWalletCard: FC<ConnectWalletCardProps> = ({
  name,
  description,
}) => {
  return (
    <Container className="rounded-lg max-w-xs text-center bg-foreground border border-transparent  hover:border-primary transition-all duration-500 ease-in-out flex items-center flex-col gap-7">
      <div className="relative aspect-square w-9">
        <Image src={'/icons/tools/connect-wallet.svg'} alt={name} fill />
      </div>
      <h1 className="text-lg font-medium uppercase leading-7 ">{name}</h1>
      <p className=" text-sm leading-7 text-muted-foreground ">{description}</p>
      <WalletMultiButtonDynamic
        className="rounded-full uppercase text-black bg-primary hover:!bg-primary"
        startIcon={undefined}
      >
        Connect Wallet
      </WalletMultiButtonDynamic>
    </Container>
  );
};

export default ConnectWalletCard;
