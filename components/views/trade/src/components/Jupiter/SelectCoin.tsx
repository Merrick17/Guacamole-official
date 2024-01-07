import FallbackImage from "@/components/common/FallbackImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTokenAccounts } from "@bonfida/hooks";
import { TokenInfo } from "@solana/spl-token-registry";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiChevronDown, BiLinkExternal } from "react-icons/bi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { useJupiterApiContext } from "../../contexts";

const Row = ({
  info,
  handleSelect,
  isInput,
}: {
  info: TokenInfo;
  handleSelect: (e: TokenInfo) => void;
  isInput: boolean;
}) => {
  const [userBalance, setUserBalance] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { connection } = useConnection();
  //const userTokens = useWalletTokens();
  const { connected, publicKey } = useWallet();
  const { data: tokenAccounts, refresh: refreshToken } = useTokenAccounts(
    connection,
    publicKey
  );
  useMemo(() => {
    // console.log("User TOekn", userTokens);
    //let token = userTokens.find((elm) => elm.account.mint == info.address);
    if (tokenAccounts && connected) {
      const tokenAccount = tokenAccounts.getByMint(new PublicKey(info.address));
      const balance =
        tokenAccount && tokenAccount.decimals
          ? Number(tokenAccount.account.amount) /
            Math.pow(10, tokenAccount.decimals)
          : 0;
      setUserBalance(balance);
    }
    //console.log("Tk", token);
    // if (tokenAccount) {
    //   setUserBalance(
    //     Number(token.account.amount) / Math.pow(10, token.decimals)
    //   );
    // }
  }, [tokenAccounts, connected, publicKey]);
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as any);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <button
      key={info.address}
      onClick={() => {
        handleSelect(info);
        isInput
          ? router.push(
              pathname + "?" + createQueryString("inputMint", info.address)
            )
          : router.push(
              pathname + "?" + createQueryString("outputMint", info.address)
            );
      }}
      className="flex items-center justify-start gap-4 w-full rounded-xl p-3 bg-background  "
    >
      <FallbackImage
        src={info.logoURI as string}
        alt={info.name}
        height={24}
        width={24}
        className="h-[24px] w-[24px] "
      />
      <div className=" flex flex-col items-start  ">
        <div className="flex items-center gap-2">
          <h1 className="text-sm text-[#FCFCFC]">{info.symbol}</h1>
          <Link
            href={`https://explorer.solana.com/address/${info.address}`}
            rel="noopener noreferrer"
            target="_blank"
            className="text-xs flex items-center text-accent   rounded-[4px] px-2 py-1 "
          >
            <span className="  max-w-[44px] text-ellipsis overflow-hidden">
              {info.address}
            </span>
            <BiLinkExternal />
          </Link>
        </div>
        <span className="text-sm text-muted-foreground">{info.name}</span>
        {connected && (
          <span className="text-xs text-muted-foreground">
            Balance: {userBalance} {info.symbol}{" "}
          </span>
        )}
      </div>
    </button>
  );
};

const Coin = ({ tokenInfo }: { tokenInfo: TokenInfo }) => {
  return (
    <div className="flex flex-row items-center justify-start rounded-xl  bg-foreground text-white px-3 py-2">
      <FallbackImage
        src={tokenInfo?.logoURI as string}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = "/images/default-coin.png";
        }}
        width={20}
        height={20}
        className="h-[20px] w-[20px]"
        alt="coin logo"
      />
      <div className="flex flex-row items-center">
        <span className="ml-4 text-base  ">{tokenInfo.symbol}</span>
        <BiChevronDown className=" ml-2 w-[20px]" />
      </div>
    </div>
  );
};

export const SelectCoin = ({
  tokenInfo,
  setCoin,
  isInput = false,
}: {
  tokenInfo: TokenInfo | null | undefined;
  setCoin: React.Dispatch<React.SetStateAction<TokenInfo | null | undefined>>;
  isInput?: boolean;
}) => {
  const { tokenMap } = useJupiterApiContext();
  const [search, setSearch] = useState("");
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { data: tokenAccounts, refresh: refreshToken } = useTokenAccounts(
    connection,
    publicKey
  );
  // const originalList = useMemo(
  //   () =>
  //     Array.from(tokenMap.values()).filter(
  //       (e) =>
  //         e.address.includes(search) ||
  //         e.name.toLowerCase().includes(search.toLowerCase()) ||
  //         e.symbol.toLowerCase().includes(search.toLowerCase())
  //     ),
  //   [search, tokenInfo]
  // );
  const originalList = useMemo(() => {
    // Filter tokens based on search criteria
    const filteredTokens = Array.from(tokenMap.values()).filter(
      (e) =>
        e.address.includes(search) ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.symbol.toLowerCase().includes(search.toLowerCase())
    );

    // Sort tokens where userBalance is > 0 to come first
    const sortedTokens = filteredTokens.sort((a, b) => {
      let balanceA = 0;
      let balanceB = 0;

      if (tokenAccounts && publicKey) {
        const tokenAccountA = tokenAccounts.getByMint(new PublicKey(a.address));
        const tokenAccountB = tokenAccounts.getByMint(new PublicKey(b.address));

        balanceA =
          tokenAccountA && tokenAccountA.decimals
            ? Number(tokenAccountA.account.amount) /
              Math.pow(10, tokenAccountA.decimals)
            : 0;
        balanceB =
          tokenAccountB && tokenAccountB.decimals
            ? Number(tokenAccountB.account.amount) /
              Math.pow(10, tokenAccountB.decimals)
            : 0;
      }

      if (balanceA > 0 && balanceB === 0) {
        return -1; // a comes first
      } else if (balanceA === 0 && balanceB > 0) {
        return 1; // b comes first
      }

      return 0; // keep original order
    });

    return sortedTokens;
  }, [search, tokenMap, tokenAccounts, publicKey]);

  const handleSelect = (e: TokenInfo) => {
    setCoin(e);
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-max cursor-pointer">
        <Coin tokenInfo={tokenInfo} />
      </DialogTrigger>

      <DialogContent closeBtn={false}>
        <DialogHeader>
          <DialogTitle>
            <div className="relative">
              <h2 className="text-base  text-center ">Select Route</h2>
              <DialogTrigger asChild>
                <AiOutlineArrowLeft className=" absolute w-4 h-4 top-1/2 -left-2 -translate-y-1/2 cursor-pointer" />
              </DialogTrigger>
            </div>
          </DialogTitle>
          <DialogDescription>
            <input
              value={search || ""}
              onChange={(e) => {
                setSearch(e.target.value.trim());
              }}
              type="text"
              id="search-token"
              placeholder="Search"
              className=" mt-4  w-full rounded-xl !border-none !bg-background  text-xs placeholder:text-muted-foreground !outline-none sm:text-lg p-2"
              spellCheck={false}
            />
          </DialogDescription>
        </DialogHeader>

        <PaginatedItems
          items={originalList}
          handleSelect={handleSelect}
          itemsPerPage={50}
          isInput={isInput}
        />
      </DialogContent>
    </Dialog>
  );
};

const Rows = ({ currentItems, handleSelect, isInput }) => {
  return (
    <div className="flex flex-col gap-4">
      {currentItems.map((e) => (
        <Row
          key={e.address}
          info={e}
          handleSelect={handleSelect}
          isInput={isInput}
        />
      ))}
    </div>
  );
};

function PaginatedItems({ itemsPerPage, items, handleSelect, isInput }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <DialogDescription className="h-[50vh] max-h-[50vh] overflow-auto">
        <Rows
          currentItems={currentItems}
          handleSelect={handleSelect}
          isInput={isInput}
        />
      </DialogDescription>
      <DialogFooter className="w-full">
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <Button
              variant="ghost"
              disabled={itemOffset + itemsPerPage >= items.length}
              className="w-8 h-8 pl-1 pr-1"
            >
              <IoChevronForward />
            </Button>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel={
            <Button
              variant="ghost"
              disabled={itemOffset === 0}
              className="w-8 h-8 pl-1 pr-1"
            >
              <IoChevronBack />
            </Button>
          }
          renderOnZeroPageCount={null}
          className="flex justify-end items-center max-w-[512px] w-full mx-auto mt-4 "
          pageClassName={
            "flex justify-center items-center h-8 p-2 rounded-xl  cursor-pointer hover:bg-slate-100 hover:text-slate-900 "
          }
          activeClassName="bg-slate-100 text-slate-900"
        />
      </DialogFooter>
    </>
  );
}
