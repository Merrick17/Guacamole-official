'use client';
import Image from 'next/image';
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
    <div className="sticky top-0 bg-white px-10 py-4 z-50">
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
          <Image src="/logo.png" alt="logo" fill />
        </div>
        <h1 className="text-2xl font-medium text-black">Guacamole</h1>
      </div>
      <Navigation />
    </div>
  );
};

const HeaderRight: FC = () => {
  return <WalletMultiButtonDynamic className="rounded-full" />;
};

const Navigation: FC = () => {
  return (
    <nav className="hidden lg:block">
      <ul className="flex flex-row items-center gap-8 text-[#4B5563] text-base font-medium capitalize">
        {Links.map((link, index) => (
          <NavItem key={index} {...link} />
        ))}
      </ul>
    </nav>
  );
};

export default Header;
