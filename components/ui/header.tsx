'use client';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Links } from '@/config/links';
import NavItem from './nav-item';

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="sticky top-0 bg-white px-10 py-4 ">
      <div className="mx-auto max-w-[1840px] flex flex-row items-center justify-between ">
        <HeaderLeft />
        <HeaderRight />
      </div>
    </div>
  );
};

const HeaderLeft: FC = () => {
  return (
    <div className="flex flex-row items-center gap-16">
      <div className="flex items-center gap-2">
        <div className="w-8 aspect-square relative">
          <Image src="/logo.png" alt="logo" layout="fill" />d
        </div>
        <h1 className="text-2xl font-medium text-black">Guacamole</h1>
      </div>
      <nav>
        <ul className="flex flex-row items-center gap-8 text-[#4B5563] text-base font-medium capitalize">
          {Links.map((link, index) => (
            <NavItem key={index} {...link} />
          ))}
        </ul>
      </nav>
    </div>
  );
};
const HeaderRight: FC = () => {
  return <WalletMultiButtonDynamic className="rounded-full" />;
};

export default Header;
