'use client';
import Image from 'next/image';
import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { BsDiscord } from 'react-icons/bs';
import { useIsMounted } from 'usehooks-ts';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { Logo } from '../views/trade/src/components/navigation-frame/TopBar/Logo';
import Hamburger from './hamburger';
import { MenuItems } from './menu-items';
import { DrawerMenu } from './drawer-menu';

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openDrawer = () => {
    setIsOpen(true);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <DrawerMenu closeDrawer={closeDrawer} />}
      <nav className="fixed top-0 bg-white px-10 py-4 z-40 w-full ">
        <div className="mx-auto max-w-[1840px] flex flex-row items-center justify-between ">
          <HeaderLeftArea
            isOpen={isOpen}
            openDrawer={openDrawer}
            closeDrawer={closeDrawer}
          />
          <HeaderRightArea
            isOpen={isOpen}
            openDrawer={openDrawer}
            closeDrawer={closeDrawer}
          />
        </div>
      </nav>
    </>
  );
};
const HeaderLeftArea = ({
  isOpen,
  openDrawer,
  closeDrawer,
}: {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}) => {
  const breakpoint = useBreakpoint();
  const isMounted = useIsMounted();
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2 mr-16">
        <Logo />
        <h1 className="hidden lg:block text-2xl font-medium text-black">
          Guacamole
        </h1>
      </div>
      <div className={'hidden lg:block'}>
        <MenuItems />
      </div>
    </div>
  );
};

function HeaderRightArea({
  isOpen,
  openDrawer,
  closeDrawer,
}: {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}) {
  return (
    <div className="order-last flex shrink-0 items-center">
      <div className="ltr:mr-3.5 rtl:ml-3.5 ltr:sm:mr-5 rtl:sm:ml-5 xl:hidden"></div>

      <div className="hidden gap-6 lg:flex 2xl:gap-8">
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
        <WalletMultiButtonDynamic
          className={
            'bg-primary rounded-full px-4 py-2 font-bold text-white hover:bg-blue-700 '
          }
          startIcon={undefined}
        />
      </div>

      <div className="flex items-center gap-2 lg:hidden ">
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

        <Hamburger
          isOpen={isOpen}
          onClick={() => (isOpen ? closeDrawer() : openDrawer())}
          color="white"
        />
      </div>
    </div>
  );
}

export default Header;
