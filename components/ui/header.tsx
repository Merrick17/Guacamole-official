"use client";
import Image from "next/image";
import { FC, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BsDiscord } from "react-icons/bs";
import { Logo } from "../views/trade/src/components/navigation-frame/TopBar/Logo";
import Hamburger from "./hamburger";
import { MenuItems } from "./menu-items";
import { DrawerMenu } from "./drawer-menu";
import routes from "@/config/routes";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
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
      <nav className="fixed top-0 bg-foreground px-10 py-4 z-40 w-full ">
        <div className="mx-auto max-w-[1840px] flex flex-row items-center justify-between ">
          <HeaderLeftArea />
          <div className={"hidden lg:block"}>
            <MenuItems />
          </div>
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
const HeaderLeftArea = () => {
  return (
    <Link href={routes.home} className="flex items-center gap-2 mr-16">
      <Logo />
      <h1 className="hidden lg:block text-2xl font-medium uppercase">
        Guacamole
      </h1>
    </Link>
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
      <div className="hidden gap-6 lg:flex 2xl:gap-8">
        <Link
          href="https://guac.gg/"
          rel="noopener noreferrer"
          target="_blank"
          className="shrink-0"
        >
          <Image src="/icons/shop.svg" alt="search" width={48} height={48} />
        </Link>
        <Link
          href="https://docs.guacamole.gg/"
          rel="noopener noreferrer"
          target="_blank"
          className="shrink-0"
        >
          <Image src="/images/Link.png" alt="search" width={48} height={48} />
        </Link>

        <WalletMultiButtonDynamic
          className={" text-black rounded-lg  "}
          style={{
            backgroundColor: "#8bd796",
          }}
          startIcon={undefined}
        />
      </div>

      <div className="flex items-center gap-2 lg:hidden ">
        <Link href={routes.shop.root} className="shrink-0">
          <Image src="/icons/shop.svg" alt="search" width={48} height={48} />
        </Link>
        <Link
          href="https://docs.guacamole.gg/"
          rel="noopener noreferrer"
          target="_blank"
          className="shrink-0"
        >
          <Image src="/icons/account.svg" alt="search" width={48} height={48} />
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
