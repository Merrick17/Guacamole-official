'use client';
import Image from 'next/image';
import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { Links } from '@/config/links';
import NavItem from './nav-item';
import { GrClose, GrMenu } from 'react-icons/gr';
import { usePathname } from 'next/navigation';

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="sticky top-0 bg-white px-10 py-4 z-50 w-full">
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
      <div className="hidden sm:block">
        <Navigation />
      </div>
    </div>
  );
};

const HeaderRight: FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="sm:block hidden">
        <WalletMultiButtonDynamic className="rounded-full" />
      </div>
      <div className="sm:hidden block">
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="focus:outline-none cursor-pointer p-2 rounded-full bg-white text-black shadow-openMenuShadow flex items-center justify-center w-10 aspect-square"
        >
          {open ? <GrClose /> : <GrMenu />}
        </div>

        {open && (
          <div className="absolute top-0 right-0 mt-14 bg-white rounded-lg shadow-lg p-4 w-full">
            <div className="flex flex-col gap-4">
              <Navigation />
              <WalletMultiButtonDynamic
                startIcon={undefined}
                className="h-full flex items-center justify-center w-full "
                style={{ borderRadius: '12px' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8 text-[#4B5563] text-base font-medium capitalize">
        {Links.map((link, index) => (
          <NavItem key={index} {...link} isActive={pathname === link.href} />
        ))}
      </ul>
    </nav>
  );
};

export default Header;
