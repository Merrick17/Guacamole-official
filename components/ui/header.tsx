"use client";
import routes from "@/config/routes";
import { TokenInfo } from "@solana/spl-token-registry";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { BsDiscord } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaBookOpen } from "react-icons/fa";
import FallbackImage from "../FallBackImage";
import { Logo } from "../views/trade/src/components/navigation-frame/TopBar/Logo";
import { DrawerMenu } from "./drawer-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Hamburger from "./hamburger";
import { MenuItems } from "./menu-items";
import { SearchInput } from "./search-input";
import { useJupiterApiContext } from "../views/trade/src/contexts";
import { useTokenPrice } from "@/hooks/use-token-price";
import { convert } from "@/lib/numbers";

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
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const { data, isLoading } = useTokenPrice("GUAC");
  //const [tokenList, setTokenList] = useState<TokenInfo[]>([]);
  const { tokenList } = useJupiterApiContext();
  const [selectedSearch, setSelectedSearch] = useState<TokenInfo | undefined>(
    undefined
  );

  const inputRef = useRef(null);

  return (
    <>
      {isOpen && <DrawerMenu closeDrawer={closeDrawer} />}
      {/* <nav className="fixed top-0 bg-foreground px-10 py-4 z-40 w-full ">
        <div className="mx-auto max-w-[1840px] flex flex-row items-center justify-between ">
          <HeaderLeftArea />
          <div className="flex flex-1"></div>
          <div className={"hidden lg:block"}>
            <MenuItems />
          </div>
          
          <HeaderRightArea
            isOpen={isOpen}
            openDrawer={openDrawer}
            closeDrawer={closeDrawer}
          />
        </div>
      </nav> */}
      <header className="sticky top-0 z-40 flex-none w-full mx-auto bg-foreground border-b ">
        <div
          id="banner"
          tabIndex={-1}
          className="z-50 flex bg-foreground justify-center w-full px-4 py-3 border border-b  lg:py-4"
        >
          <div className="items-center md:flex">
            <p className="text-sm font-medium text-muted-foreground md:my-0 ">
              <span className="bg-primary text-black text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  hidden md:inline">
                New
              </span>
              Earn and redeem rewards or purchase games and more with your
              Phantom Wallet!
              <Link
                href={`https://guac.gg/`}
                target="_blank"
                className="inline-flex items-center ml-2 text-sm font-medium text-primary hover:underline"
              >
                Check it out
                <svg
                  className="w-3 h-3 ml-1.5 text-primary "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full px-3 py-3 mx-auto max-w-8xl lg:px-4 max-w-[1400px]">
          <div className="flex items-center">
            <div className="flex items-center justify-between">
              <Link href={routes.home} className="flex items-center gap-2 ">
                <Logo />
                <h1 className="hidden xl:block lg:block text-2xl font-medium uppercase">
                  Guacamole
                </h1>
              </Link>
            </div>

            <div
              id="docsearch"
              className="hidden md:flex ml-2 xl:ml-6 min-w-[300px]"
            >
              <div className="relative">
                <SearchInput
                  value={search || ""}
                  onChange={(e) => {
                    setIsFocused(true);
                    setSearch(e.target.value);
                  }}
                  ref={inputRef}
                  placeholder="Search For Tokens, Markets, & More"
                />
                <div
                  className={`absolute bg-foreground border border-[#141414] shadow-sm mt-10 top-2 z-50 py-2 rounded-lg w-64 max-h-[300px] items-start gap-2 flex flex-col overflow-y-auto ${
                    !isFocused ? "hidden" : ""
                  } `}
                >
                  {tokenList
                    .filter((tkn) => {
                      if (search === "") return tkn;
                      if (
                        tkn.symbol
                          .toUpperCase()
                          .includes(search.toUpperCase()) ||
                        tkn.name.toUpperCase().includes(search.toUpperCase())
                      ) {
                        return tkn;
                      }
                    })
                    .map((tkn, ind) => (
                      <div
                        key={ind.toString()}
                        className="flex items-center justify-start rounded-md gap-2 p-2 cursor-pointer hover:border-primary hover:border-2 w-full"
                        onClick={(e) => {
                          setSearch(tkn.name);
                          setSelectedSearch(tkn);
                          setIsFocused(false);
                          router.push(
                            `/terminal/coin/${tkn.address}?outputMint=${tkn.address}`
                          );
                          // console.log("SEARCH", search);
                        }}
                      >
                        <FallbackImage
                          src={tkn.logoURI}
                          width={30}
                          height={30}
                          className=" rounded-full"
                        />
                        <div className="text-xs  flex flex-col gap-2">
                          <h1 className="font-medium">{tkn.symbol}</h1>
                          <p className="text-muted-foreground ">{tkn.name}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div
            id="docsearch-mobile"
            className="md:hidden lg:hidden xl:hidden ml-3  "
          >
            {" "}
            <div className="relative">
              <SearchInput
                className="w-full "
                value={search || ""}
                onChange={(e) => {
                  setIsFocused(true);
                  setSearch(e.target.value);
                }}
                ref={inputRef}
                placeholder="Search For Tokens, Markets, & More"
              />
              <div
                className={`absolute bg-foreground border border-[#141414] shadow-sm mt-10 top-2 z-50 py-2 rounded-lg w-64 max-h-[300px] items-start gap-2 flex flex-col overflow-y-auto ${
                  !isFocused ? "hidden" : ""
                } `}
              >
                {tokenList
                  .filter((tkn) => {
                    if (search === "") return tkn;
                    if (
                      tkn.symbol.toUpperCase().includes(search.toUpperCase()) ||
                      tkn.name.toUpperCase().includes(search.toUpperCase())
                    ) {
                      return tkn;
                    }
                  })
                  .map((tkn, ind) => (
                    <div
                      key={ind.toString()}
                      className="flex items-center justify-start rounded-md gap-2 p-2 cursor-pointer hover:border-primary hover:border-2 w-full"
                      onClick={(e) => {
                        setSearch(tkn.name);
                        setSelectedSearch(tkn);
                        setIsFocused(false);
                        router.push(
                          `/terminal/coin/${tkn.address}?outputMint=${tkn.address}`
                        );
                        // console.log("SEARCH", search);
                      }}
                    >
                      <FallbackImage
                        src={tkn.logoURI}
                        width={30}
                        height={30}
                        className=" rounded-full"
                      />
                      <div className="text-xs  flex flex-col gap-2">
                        <h1 className="font-medium">{tkn.symbol}</h1>
                        <p className="text-muted-foreground ">{tkn.name}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className={"hidden lg:block"}>
              <MenuItems />
            </div>
            <HeaderRightArea
              isOpen={isOpen}
              openDrawer={openDrawer}
              closeDrawer={closeDrawer}
            />
            {/* ... (Menu items and icons here) ... */}
          </div>
        </div>
      </header>
    </>
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
  const { tokenList } = useJupiterApiContext();
  const { data, isLoading } = useTokenPrice("GUAC");

  return (
    <div className="order-last flex shrink-0 items-center">
      <div className="hidden gap-6 lg:flex 2xl:gap-8">
        {/* <div className="flex items-center gap-1">
          <div className="w-10 h-10 flex items-center justify-center">
            <Link
              href="https://discord.com/invite/MjdtaGXCVY"
              rel="noopener noreferrer"
              target="_blank"
              className="shrink-0 "
            >
              <BsDiscord className="text-[#A8A8A8]" />
            </Link>
          </div>
          <Link
            href="https://t.me/guacgg"
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

          <Link
            href="https://x.com/guac_gg"
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
        </div> */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M20.3195 16C21.4195 16 22.3195 15.1 22.3195 14C22.3195 12.9 21.4195 12 20.3195 12C19.2195 12 18.3195 12.9 18.3195 14C18.3195 15.1 19.2195 16 20.3195 16ZM20.3195 18C19.2195 18 18.3195 18.9 18.3195 20C18.3195 21.1 19.2195 22 20.3195 22C21.4195 22 22.3195 21.1 22.3195 20C22.3195 18.9 21.4195 18 20.3195 18ZM20.3195 24C19.2195 24 18.3195 24.9 18.3195 26C18.3195 27.1 19.2195 28 20.3195 28C21.4195 28 22.3195 27.1 22.3195 26C22.3195 24.9 21.4195 24 20.3195 24Z"
                fill="#A8A8A8"
              />
            </svg>
            {/* <CiMenuKebab /> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                href="https://discord.com/invite/MjdtaGXCVY"
                rel="noopener noreferrer"
                target="_blank"
                className="shrink-0 flex items-center justify-center gap-2"
              >
                <BsDiscord className="text-[#A8A8A8]" />
                <span className="text-[#A8A8A8]">Discord</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Link
                href="https://t.me/guacgg"
                rel="noopener noreferrer"
                target="_blank"
                className="shrink-0 flex items-center justify-center  gap-2"
              >
                <FaTelegramPlane className="text-[#A8A8A8]" />
                {/* <svg
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
              </svg> */}
                <span className="text-[#A8A8A8]">Telegram</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Link
                href="https://x.com/guac_gg"
                rel="noopener noreferrer"
                target="_blank"
                className="shrink-0 flex items-center justify-center  gap-2"
              >
                <BsTwitterX className="text-[#A8A8A8]" />
                <span className="text-[#A8A8A8]">Twitter (X) </span>
                {/* <svg
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
                </svg> */}
              </Link>{" "}
          
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Link
                href="https://docs.guacamole.gg/"
                rel="noopener noreferrer"
                target="_blank"
                className="shrink-0 flex items-center justify-center  gap-2"
              >
                <FaBookOpen className="text-[#A8A8A8]" />
                {/* <svg
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
                </svg> */}
                <span className="text-[#A8A8A8]">Docs </span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="p-[9px] flex justify-center items-center gap-1 rounded-lg bg-[#0F0F0F] border-[1px] border-[rgba(168, 168, 168, 0.10)]">
          <Image width={18} height={18} alt="logo" src={"/images/logo.png"} />
          <span className="text-muted-foreground text-xs">
            $ {!isLoading && data ? data["data"]["GUAC"].price : 0}
          </span>
        </div>
        <WalletMultiButtonDynamic
          className={" text-black rounded-lg guac-btn h-[40px]"}
          startIcon={undefined}
        />
      </div>

      <div className="flex items-center gap-2 lg:hidden  ">
        <div className=" hidden sm:flex items-center">
          <div className="p-[9px] flex justify-center items-center gap-1 rounded-lg bg-[#0F0F0F] border-[1px] border-[rgba(168, 168, 168, 0.10)]">
            <Image width={18} height={18} alt="logo" src={"/images/logo.png"} />
            <span className="text-muted-foreground text-xs">
              $ {!isLoading && data ? data["data"]["GUAC"].price : 0}
            </span>
          </div>
          <WalletMultiButtonDynamic
            className={" text-black rounded-lg guac-btn h-[40px]"}
            startIcon={undefined}
          />
        </div>

        {/* <div className=" hidden sm:flex items-center">
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
        </div> */}
        <Hamburger
          isOpen={isOpen}
          onClick={() => (isOpen ? closeDrawer() : openDrawer())}
          color="black"
        />
      </div>
    </div>
  );
}

export default Header;
