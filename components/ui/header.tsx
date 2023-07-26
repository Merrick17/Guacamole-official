'use client';
import Image from 'next/image';
import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { Links } from '@/config/links';
import NavItem from './nav-item';
import { GrClose, GrMenu } from 'react-icons/gr';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BsDiscord } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="relative w-scree ">
      <div className="fixed top-0 bg-white px-10 py-4 z-50 w-full ">
        <div className="mx-auto max-w-[1840px] flex flex-row items-center justify-between ">
          <HeaderLeft />
          <HeaderRight />
        </div>
      </div>
    </div>
  );
};

const HeaderLeft: FC = () => {
  return (
    <div className="flex flex-row items-center gap-16">
      <div className="flex items-center gap-2">
        <div className="w-8 aspect-square relative">
          <Image src="/images/logo.png" alt="logo" fill />
        </div>
        <h1 className="hidden lg:block text-2xl font-medium text-black">
          Guacamole
        </h1>
      </div>
      <div className="hidden lg:block">
        <Navigation />
      </div>
    </div>
  );
};

const HeaderRight: FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const changePage = (path: string) => {
    setOpen(false);
    router.push(path);
  };
  return (
    <div>
      <div className="lg:flex  items-center justify-end gap-8 hidden">
        <Link
          href="https://docs.guacamole.gg/"
          rel="noopener noreferrer"
          target="_blank"
          className="focus:outline-none cursor-pointer p-3 rounded-full bg-white text-black shadow-openMenuShadow flex items-center justify-center w-12 aspect-square "
        >
          <Image
            src="/images/documentation.png"
            alt="search"
            width={25}
            height={25}
          />
        </Link>
        <Link
          href="https://discord.com/invite/guac"
          rel="noopener noreferrer"
          target="_blank"
          className="focus:outline-none cursor-pointer p-3 rounded-full bg-white text-black shadow-openMenuShadow flex items-center justify-center w-12 aspect-square "
        >
          <BsDiscord color="#7289DA" className="w-full h-full" />
        </Link>
        <WalletMultiButtonDynamic className="rounded-full" />
      </div>

      <div className="lg:hidden flex items-center justify-end gap-2">
        <Link
          href="https://docs.guacamole.gg/"
          rel="noopener noreferrer"
          target="_blank"
          className="focus:outline-none cursor-pointer p-3 rounded-full bg-white text-black shadow-openMenuShadow flex items-center justify-center w-12 aspect-square "
        >
          <Image
            src="/images/documentation.png"
            alt="search"
            width={25}
            height={25}
          />
        </Link>
        <Link
          href="https://discord.com/invite/guac"
          rel="noopener noreferrer"
          target="_blank"
          className="focus:outline-none cursor-pointer p-3 rounded-full bg-white text-black shadow-openMenuShadow flex items-center justify-center w-12 aspect-square "
        >
          <BsDiscord color="#7289DA" className="w-full h-full" />
        </Link>
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="focus:outline-none cursor-pointer p-2 rounded-full bg-white text-black shadow-openMenuShadow flex items-center justify-center w-10 aspect-square"
        >
          {open ? <GrClose /> : <GrMenu />}
        </div>

        {open && (
          <div className="absolute top-full w-screen left-0 bg-white rounded-lg shadow-lg p-4 ">
            <div className="flex flex-col gap-4">
              <Navigation changePage={changePage} />
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

type NavigationProps = {
  changePage?: (path: string) => void;
};
const Navigation: FC<NavigationProps> = ({ changePage }) => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-8 text-[#4B5563] text-base font-medium capitalize">
        {Links.map((link, index) => (
          <NavItem
            changePage={changePage}
            key={index}
            {...link}
            isActive={pathname === link.href}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Header;
