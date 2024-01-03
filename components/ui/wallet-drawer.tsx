"use client";
import routes from "@/config/routes";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Metaplex } from "@metaplex-foundation/js";
import { TokenInfo } from "@solana/spl-token-registry";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BiLinkExternal, BiSolidLeftArrow } from "react-icons/bi";
import { Skeleton } from "./skeleton";
import FallbackImage from "../common/FallbackImage";
import { useJupiterApiContext } from "../views/trade/src/contexts";
interface CustomTokenInfo {
  balance: number;
  balanceInUSD: number;
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  associatedTokenAddress: string;
  price: number;
  logoURI: string;
}
const WalletDrawer = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { connection } = useConnection();
  const { connected, publicKey } = useWallet();
  const { tokenList } = useJupiterApiContext();
  //const [tokenList, setTokenList] = useState<TokenInfo[]>([]);
  const metaplex = new Metaplex(connection);
  // const fetchTokenList = useCallback(async () => {
  //   try {
  //     const { data } = await axios.get("https://token.jup.ag/all");

  //     setTokenList(data);
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // }, []);
  const [tokenData, setTokenData] = useState([]); // Store token data including USD values

  useEffect(() => {
   
    const getUserTokens = async () => {
      if (publicKey && connected) {
        const { data } = await axios.post(
          "https://rpc.helius.xyz/?api-key=9591f472-d97d-435c-a19c-d2514202d6d7",
          {
            jsonrpc: "2.0",
            id: "helius-test",
            method: "searchAssets",
            params: {
              ownerAddress: publicKey.toBase58(),
              tokenType: "fungible",
            },
          }
        );

        const tokenInfo = data.result.items.map(async (tkn) => {
          const balance =
            tkn.content && tkn.token_info ? tkn.token_info.balance : 0;
          const name =
            tkn.content && tkn.content.metadata
              ? tkn.content.metadata.name
              : "Unknown Name";
          const symbol =
            tkn.content && tkn.content.metadata
              ? tkn.content.metadata.symbol
              : "Unknown Symbol";
          const decimals =
            tkn.content && tkn.token_info ? tkn.token_info.decimals : 0;
          const address = tkn.id || "Unknown Address";
          const price =
            tkn.token_info && tkn.token_info.price_info
              ? tkn.token_info.price_info.price_per_token
              : 0;
          const associatedTokenAddress =
            tkn.content && tkn.token_info
              ? tkn.token_info.associated_token_address
              : "Unknown Associated Address";
          // const logoURI =
          //   tkn.content && tkn.content.links && tkn.content.links.image
          //     ? tkn.content.links.image
          //     : null;
          const logoURI = tokenList.find((elm) => elm.address)?.logoURI || "";
          return {
            balance: balance / Math.pow(10, decimals),
            balanceInUSD: (balance / Math.pow(10, decimals)) * price,
            name,
            symbol,
            decimals,
            address,
            associatedTokenAddress,
            price,
            logoURI: logoURI,
          };
        });
        const mappedResp = await Promise.all(tokenInfo);
        //console.log("Mapped", mappedResp);
        setTokenData(mappedResp);
      }
    };
    getUserTokens();
    // const fetchTokenData = async () => {
    //   console.log("Token Accounts", tokenAccounts.accounts);

    //   const tokenDataWithPrices = await Promise.all(
    //     walletTokens.map(async (token) => {
    //       const elm = token;
    //       if (token.token && token.account) {
    //         const { data } = await axios.get(
    //           "https://price.jup.ag/v4/price?ids=" + token.token.symbol
    //         );
    //         for (var prop in data.data) {
    //           const price = data.data[prop].price;
    //           const amount = token.account.amount
    //             ? Number(token.account.amount) / Math.pow(10, token.decimals)
    //             : 0;
    //           return {
    //             ...token,
    //             price,
    //             amount,
    //           };
    //         }
    //       } else {
    //         const amount =
    //           token && token.account && token.account.amount
    //             ? Number(token.account.amount) / Math.pow(10, token.decimals)
    //             : 0;
    //         return {
    //           ...elm,
    //           token: {
    //             logoURI: "/images/Guacamole_Image_Unknown.png",
    //             name: "Unknown Token",
    //             symbol: "Unknown Token",
    //           },
    //           price: 0,
    //           amount,
    //         };
    //       }
    //     })
    //   );

    //   setTokenData(tokenDataWithPrices);
    // };

    // fetchTokenData();
  }, [publicKey, connected]);
  return (
    <>
      <button
        className="fixed z-50 top-1/3 left-0 w-12 h-12 p-[6px] bg-[#8BD796] rounded-tr-lg rounded-br-lg "
        onClick={() =>
          connected
            ? setOpen(true)
            : toast({
                variant: "destructive",
                title: "Wallet not connected",
                description: "Please connect your wallet to continue",
              })
        }
      >
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="28"
            viewBox="0 0 29 28"
            fill="none"
          >
            <path
              d="M27.5 6.92V3.5C27.5 1.85 26.15 0.5 24.5 0.5H3.5C1.835 0.5 0.5 1.85 0.5 3.5V24.5C0.5 26.15 1.835 27.5 3.5 27.5H24.5C26.15 27.5 27.5 26.15 27.5 24.5V21.08C28.385 20.555 29 19.61 29 18.5V9.5C29 8.39 28.385 7.445 27.5 6.92ZM26 9.5V18.5H15.5V9.5H26ZM3.5 24.5V3.5H24.5V6.5H15.5C13.85 6.5 12.5 7.85 12.5 9.5V18.5C12.5 20.15 13.85 21.5 15.5 21.5H24.5V24.5H3.5Z"
              fill="black"
            />
          </svg>
        </div>
      </button>
      {open && (
        <div className={cn("fixed w-full h-full top-0 z-50 ")}>
          <div
            className=" fixed bg-black/50 w-screen h-screen cursor-pointer "
            onClick={() => setOpen(false)}
          />

          <div className="relative px-4 py-3 top-1/3 -translate-y-1/3 h-2/3 flex flex-col gap-2  w-full max-w-full md:max-w-sm bg-foreground xs:w-80   rounded-tr-lg rounded-br-lg ">
            <header className="flex items-center justify-between overflow-hidden ">
              <h1 className=" block text-lg font-medium w-full pt-3 pb-5 ">
                Your Wallet
              </h1>
              <div className="flex items-center gap-2">
                <Link
                  href={routes.trade.root}
                  className="w-9 h-8 p-1  flex items-center justify-center rounded-lg bg-background"
                >
                  <Image
                    src="/images/themes/violet.png"
                    width={20}
                    height={20}
                    alt="swap"
                  />
                </Link>
                <Link
                  href={routes.earn.root}
                  className="w-9 h-8 p-1  flex items-center justify-center rounded-lg  bg-background"
                >
                  <Image
                    src="/icons/earn/dynamic-vault.png"
                    width={20}
                    height={20}
                    alt="vault"
                  />
                </Link>
              </div>
            </header>
            <div
              className="overflow-y-auto"
              style={{ height: "calc(100% - 96px)" }}
            >
              <ul className="flex flex-col gap-4">
                {tokenData
                  ? tokenData.length > 0 &&
                    tokenData
                      .sort((a, b) =>
                        b.balanceInUsd - a.balanceInUsd ? -1 : 1
                      )
                      .map((token, index) => <Row key={index} token={token} />)
                  : Array(5).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-16 w-full rounded-xl "
                      />
                    ))}
              </ul>
            </div>
            <div
              className="absolute -right-9 top-6 w-9 h-14 flex justify-center items-center shadow-md  rounded-tr-lg rounded-br-lg bg-foreground cursor-pointer text-[#8BD796]"
              onClick={() => setOpen(false)}
            >
              <BiSolidLeftArrow />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletDrawer;

const Row = ({ token }: { token: CustomTokenInfo }) => {
  // const amount = useMemo(() => {
  //   return token && token.account && token.account.amount
  //     ? Number(token.account.amount) / Math.pow(10, token.decimals)
  //     : 0;
  // }, [token]);

  const router = useRouter();

  return (
    <button
      key={token.address}
      className="flex items-center justify-start gap-5 w-full rounded-xl p-3 bg-background"
      onClick={() =>
        router.push(
          routes.trade.swap + `?outputMint=${token ? token.address : ""}`
        )
      }
    >
      <FallbackImage
        src={token.logoURI as string}
        alt={token.name}
        width={24}
        height={24}
        unoptimized
      />
      <div className="w-full">
        <div className=" flex flex-row items-center justify-between gap-4 ">
          <div className="flex items-center gap-2">
            <h1 className="text-sm">{token.symbol}</h1>
            <Link
              href={`https://explorer.solana.com/address/${token.address}`}
              rel="noopener noreferrer"
              target="_blank"
              className="text-xs flex items-center text-[#8BD796] bg-foreground  rounded-sm px-2 py-1 "
            >
              <span className="  max-w-[44px] text-ellipsis overflow-hidden">
                {token.address}
              </span>
              <BiLinkExternal />
            </Link>
          </div>
          <span>${token.price.toFixed(2)}</span>
        </div>
        <div className=" flex flex-row items-center justify-between gap-4 text-muted-foreground text-sm ">
          <span>{token.balance.toFixed(6)}</span>
          <span>${token.balanceInUSD}</span>
        </div>
      </div>
    </button>
  );
};
