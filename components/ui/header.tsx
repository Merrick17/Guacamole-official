"use client";
import routes from "@/config/routes";
import { useTokenPrice } from "@/hooks/use-token-price";
import { TokenInfo } from "@solana/spl-token-registry";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";
import { BsDiscord, BsTwitterX } from "react-icons/bs";
import { FaBookOpen, FaTelegramPlane } from "react-icons/fa";
import FallbackImage from "../FallBackImage";
import { Logo } from "../views/trade/src/components/navigation-frame/TopBar/Logo";
import { useJupiterApiContext } from "../views/trade/src/contexts";
import { DrawerMenu } from "./drawer-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./dropdown-menu";
import Hamburger from "./hamburger";
import { MenuItems } from "./menu-items";
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
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

 
  const { tokenList } = useJupiterApiContext();
  const [selectedSearch, setSelectedSearch] = useState<TokenInfo | undefined>(
    undefined
  );

  const inputRef = useRef(null);

  return (
    <>
      {isOpen && <DrawerMenu closeDrawer={closeDrawer} />}
  
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

  const { data, isLoading } = useTokenPrice("GUAC");

  return (
    <div className="order-last flex shrink-0 items-center">
      <div className="hidden gap-2 lg:flex 2xl:gap-2">
      
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

      <div className="flex items-center  lg:hidden  ">
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
