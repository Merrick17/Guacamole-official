'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

interface InfoCardProps {
  image: string;
  name: string;
  description: string;
  connectWallet?: boolean;
  href?: string;
  openNewTab?: boolean;
}

const InfoCard: FC<InfoCardProps> = ({
  image,
  name,
  description,
  connectWallet = false,
  href,
  openNewTab = false,
}) => {
  return (
    <Link
      href={href || '#'}
      target={openNewTab ? '_blank' : undefined}
      className="flex  flex-col items-center gap-6 rounded-lg bg-white px-8 py-16 max-w-sm"
    >
      <div className="relative aspect-square w-28">
        <Image src={image} alt={name} fill />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-lg font-medium uppercase leading-7 text-black">
          {name}
        </h1>
        <p className="text-center text-sm leading-7">{description}</p>
      </div>
      {connectWallet && (
        <WalletMultiButtonDynamic
          className="rounded-full uppercase"
          startIcon={undefined}
        >
          Connect Wallet
        </WalletMultiButtonDynamic>
      )}
    </Link>
  );
};

export default InfoCard;
