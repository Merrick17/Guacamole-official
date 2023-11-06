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
import { SearchInput } from "./search-input";

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
          <div className={"hidden xl:block"}>
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
    <div className=" flex items-center gap-8 ">
      <Link href={routes.home} className="flex items-center gap-2 ">
        <Logo />
        <h1 className="hidden lg:block text-2xl font-medium uppercase">
          Guacamole
        </h1>
      </Link>
      <SearchInput />
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
      <div className="hidden gap-6 lg:flex 2xl:gap-8">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center">
            <Link
              href="https://docs.guacamole.gg/"
              rel="noopener noreferrer"
              target="_blank"
              className="shrink-0 "
            >
              <BsDiscord className="text-[#A8A8A8]" />
            </Link>
          </div>
          <Link
            href="https://guac.gg/shop"
            rel="noopener noreferrer"
            target="_blank"
            className="shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M27.4711 13.4118C26.557 13.1235 25.5523 13 24.5887 13C22.9828 13 21.2534 13.3294 20.0593 14.2353C18.8652 13.3294 17.1358 13 15.5299 13C13.924 13 12.1946 13.3294 11.0005 14.2353V26.3C11.0005 26.5059 11.2064 26.7118 11.4123 26.7118C11.4946 26.7118 11.5358 26.6706 11.6181 26.6706C12.7299 26.1353 14.3358 25.7647 15.5299 25.7647C17.1358 25.7647 18.8652 26.0941 20.0593 27C21.1711 26.3 23.1887 25.7647 24.5887 25.7647C25.9475 25.7647 27.3475 26.0118 28.5005 26.6294C28.5828 26.6706 28.624 26.6706 28.7064 26.6706C28.9123 26.6706 29.1181 26.4647 29.1181 26.2588V14.2353C28.624 13.8647 28.0887 13.6176 27.4711 13.4118ZM27.4711 24.5294C26.5652 24.2412 25.577 24.1176 24.5887 24.1176C23.1887 24.1176 21.1711 24.6529 20.0593 25.3529V15.8824C21.1711 15.1824 23.1887 14.6471 24.5887 14.6471C25.577 14.6471 26.5652 14.7706 27.4711 15.0588V24.5294Z"
                fill="#A8A8A8"
              />
              <path
                d="M24.5882 17.9423C25.3129 17.9423 26.0129 18.0164 26.647 18.1564V16.9047C25.9964 16.7811 25.2964 16.707 24.5882 16.707C23.1882 16.707 21.92 16.9459 20.8823 17.3906V18.7576C21.8129 18.2306 23.1059 17.9423 24.5882 17.9423Z"
                fill="#A8A8A8"
              />
              <path
                d="M20.8823 19.581V20.948C21.8129 20.421 23.1059 20.1328 24.5882 20.1328C25.3129 20.1328 26.0129 20.2069 26.647 20.3469V19.0951C25.9964 18.9716 25.2964 18.8975 24.5882 18.8975C23.1882 18.8975 21.92 19.1445 20.8823 19.581Z"
                fill="#A8A8A8"
              />
              <path
                d="M24.5882 21.0967C23.1882 21.0967 21.92 21.3355 20.8823 21.7802V23.1473C21.8129 22.6202 23.1059 22.332 24.5882 22.332C25.3129 22.332 26.0129 22.4061 26.647 22.5461V21.2943C25.9964 21.1626 25.2964 21.0967 24.5882 21.0967Z"
                fill="#A8A8A8"
              />
            </svg>
          </Link>
          <Link
            href="https://docs.guacamole.gg/"
            rel="noopener noreferrer"
            target="_blank"
            className="shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M12.0005 13L17.5194 20.8872L12.2906 27H14.3445L18.4384 22.2012L21.7956 27H27.1702L21.3976 18.7361L26.2906 13H24.2687L20.4816 17.4236L17.3918 13H12.0005ZM14.987 14.5556H16.5806L24.1852 25.4444H22.6053L14.987 14.5556Z"
                fill="#A8A8A8"
              />
            </svg>
          </Link>
          <Link
            href="https://docs.guacamole.gg/"
            rel="noopener noreferrer"
            target="_blank"
            className="shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M26.4434 13.0083C26.1849 12.9809 25.9039 13.0212 25.6215 13.1329C25.2715 13.2705 19.7869 15.5777 14.6743 17.7299L12.9849 18.4409C12.3308 18.7061 12.0005 19.1375 12.0005 19.7185C12.0005 20.1253 12.1727 20.6771 12.994 21.0022L15.8456 22.1447C16.0921 22.8844 16.6648 24.6019 16.8087 25.0585C16.8943 25.3292 17.1104 26.0111 17.6564 26.1705C17.7684 26.2086 17.8853 26.2283 18.0043 26.2283C18.3489 26.2283 18.597 26.0679 18.7183 25.9745L20.5307 24.4417L22.732 26.4774C22.8168 26.5637 23.2656 27 23.8684 27C24.6205 27 25.1911 26.3739 25.3101 25.7679C25.3746 25.4358 27.4977 14.7781 27.4977 14.7797C27.6883 13.9248 27.3456 13.4814 27.1255 13.2924C26.9369 13.131 26.7019 13.0357 26.4434 13.0083ZM25.9284 14.6885C25.6352 16.1586 24.0366 24.1829 23.7939 25.3395L20.5763 22.3634L18.3932 24.2123L18.9979 21.8469C18.9979 21.8469 23.169 17.6248 23.4202 17.379C23.6224 17.1822 23.6648 17.1132 23.6648 17.0448C23.6648 16.9538 23.618 16.8883 23.5098 16.8883C23.4126 16.8883 23.2806 16.9815 23.2106 17.025C22.3212 17.5795 18.5344 19.7369 16.6705 20.7972L13.9663 19.717L15.2789 19.1656C18.6228 17.7577 24.5781 15.2501 25.9284 14.6885Z"
                fill="#A8A8A8"
              />
            </svg>
          </Link>
        </div>

        <WalletMultiButtonDynamic
          className={" text-black rounded-lg  "}
          style={{
            backgroundColor: "#8bd796",
          }}
          startIcon={undefined}
        />
      </div>

      <div className="flex items-center gap-2 lg:hidden ">
        {/* <Link href={routes.shop.root} className="shrink-0">
          <Image src="/icons/shop.svg" alt="search" width={48} height={48} />
        </Link> */}
        <div className=" hidden sm:flex items-center">
          <div className="w-10 h-10  flex items-center justify-center">
            <Link
              href="https://docs.guacamole.gg/"
              rel="noopener noreferrer"
              target="_blank"
              className="shrink-0 "
            >
              <BsDiscord className="text-[#A8A8A8]" />
            </Link>
          </div>
          <Link
            href="https://guac.gg/shop"
            rel="noopener noreferrer"
            target="_blank"
            className="shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M27.4711 13.4118C26.557 13.1235 25.5523 13 24.5887 13C22.9828 13 21.2534 13.3294 20.0593 14.2353C18.8652 13.3294 17.1358 13 15.5299 13C13.924 13 12.1946 13.3294 11.0005 14.2353V26.3C11.0005 26.5059 11.2064 26.7118 11.4123 26.7118C11.4946 26.7118 11.5358 26.6706 11.6181 26.6706C12.7299 26.1353 14.3358 25.7647 15.5299 25.7647C17.1358 25.7647 18.8652 26.0941 20.0593 27C21.1711 26.3 23.1887 25.7647 24.5887 25.7647C25.9475 25.7647 27.3475 26.0118 28.5005 26.6294C28.5828 26.6706 28.624 26.6706 28.7064 26.6706C28.9123 26.6706 29.1181 26.4647 29.1181 26.2588V14.2353C28.624 13.8647 28.0887 13.6176 27.4711 13.4118ZM27.4711 24.5294C26.5652 24.2412 25.577 24.1176 24.5887 24.1176C23.1887 24.1176 21.1711 24.6529 20.0593 25.3529V15.8824C21.1711 15.1824 23.1887 14.6471 24.5887 14.6471C25.577 14.6471 26.5652 14.7706 27.4711 15.0588V24.5294Z"
                fill="#A8A8A8"
              />
              <path
                d="M24.5882 17.9423C25.3129 17.9423 26.0129 18.0164 26.647 18.1564V16.9047C25.9964 16.7811 25.2964 16.707 24.5882 16.707C23.1882 16.707 21.92 16.9459 20.8823 17.3906V18.7576C21.8129 18.2306 23.1059 17.9423 24.5882 17.9423Z"
                fill="#A8A8A8"
              />
              <path
                d="M20.8823 19.581V20.948C21.8129 20.421 23.1059 20.1328 24.5882 20.1328C25.3129 20.1328 26.0129 20.2069 26.647 20.3469V19.0951C25.9964 18.9716 25.2964 18.8975 24.5882 18.8975C23.1882 18.8975 21.92 19.1445 20.8823 19.581Z"
                fill="#A8A8A8"
              />
              <path
                d="M24.5882 21.0967C23.1882 21.0967 21.92 21.3355 20.8823 21.7802V23.1473C21.8129 22.6202 23.1059 22.332 24.5882 22.332C25.3129 22.332 26.0129 22.4061 26.647 22.5461V21.2943C25.9964 21.1626 25.2964 21.0967 24.5882 21.0967Z"
                fill="#A8A8A8"
              />
            </svg>
          </Link>
          <Link
            href="https://docs.guacamole.gg/"
            rel="noopener noreferrer"
            target="_blank"
            className="shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M12.0005 13L17.5194 20.8872L12.2906 27H14.3445L18.4384 22.2012L21.7956 27H27.1702L21.3976 18.7361L26.2906 13H24.2687L20.4816 17.4236L17.3918 13H12.0005ZM14.987 14.5556H16.5806L24.1852 25.4444H22.6053L14.987 14.5556Z"
                fill="#A8A8A8"
              />
            </svg>
          </Link>
          <Link
            href="https://docs.guacamole.gg/"
            rel="noopener noreferrer"
            target="_blank"
            className="shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M26.4434 13.0083C26.1849 12.9809 25.9039 13.0212 25.6215 13.1329C25.2715 13.2705 19.7869 15.5777 14.6743 17.7299L12.9849 18.4409C12.3308 18.7061 12.0005 19.1375 12.0005 19.7185C12.0005 20.1253 12.1727 20.6771 12.994 21.0022L15.8456 22.1447C16.0921 22.8844 16.6648 24.6019 16.8087 25.0585C16.8943 25.3292 17.1104 26.0111 17.6564 26.1705C17.7684 26.2086 17.8853 26.2283 18.0043 26.2283C18.3489 26.2283 18.597 26.0679 18.7183 25.9745L20.5307 24.4417L22.732 26.4774C22.8168 26.5637 23.2656 27 23.8684 27C24.6205 27 25.1911 26.3739 25.3101 25.7679C25.3746 25.4358 27.4977 14.7781 27.4977 14.7797C27.6883 13.9248 27.3456 13.4814 27.1255 13.2924C26.9369 13.131 26.7019 13.0357 26.4434 13.0083ZM25.9284 14.6885C25.6352 16.1586 24.0366 24.1829 23.7939 25.3395L20.5763 22.3634L18.3932 24.2123L18.9979 21.8469C18.9979 21.8469 23.169 17.6248 23.4202 17.379C23.6224 17.1822 23.6648 17.1132 23.6648 17.0448C23.6648 16.9538 23.618 16.8883 23.5098 16.8883C23.4126 16.8883 23.2806 16.9815 23.2106 17.025C22.3212 17.5795 18.5344 19.7369 16.6705 20.7972L13.9663 19.717L15.2789 19.1656C18.6228 17.7577 24.5781 15.2501 25.9284 14.6885Z"
                fill="#A8A8A8"
              />
            </svg>
          </Link>
        </div>
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
