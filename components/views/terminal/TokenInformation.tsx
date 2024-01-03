// "use client";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useSelectedToken } from "@/context/coin-details";
// import { useJupStat } from "@/context/jup.stats";
// import { useTokenData } from "@/hooks/use-token-data";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import numeral from "numeral";
// import { FC, useCallback, useEffect, useState } from "react";
// import { BiLinkExternal } from "react-icons/bi";
// import Container from "../../common/container";
// import { abbreviate } from "../trade/src/utils/abbreviate";
// import axios from "axios";
// interface TokenInformationProps {
//   className?: string;
// }
// // USDC, USDT, USDCet, mSOL, bSOL, JitoSOL, stSOL, UXD, ETH, USDTet

// const TokenInformation: FC<TokenInformationProps> = ({ className }) => {
//   const { poolDetails, selectedToken, tokenDetails, tokenInfo } =
//     useSelectedToken();
//   const params = useParams();
//   let adr: any = params["address"];
//   const { isLoading, data } = useTokenData(adr as string);
//   const [currentMarketPrice, setCurrentMarketPrice] = useState(0);

//   const fetchPrice = async () => {
//     console.log("ADR", adr);
//     try {
//       if (selectedToken) {
//         const { data } = await axios.get(
//           `https://price.jup.ag/v4/price?ids=${selectedToken.symbol}`
//         );

//         setCurrentMarketPrice(data["data"][selectedToken.symbol]["price"]);
//       }
//     } catch (error) {}
//   };
//   const getPrice = useCallback(() => {
//     fetchPrice();
//   }, [selectedToken]);
//   useEffect(() => {
//     getPrice();
//   }, [selectedToken, tokenInfo]);
//   const { topBuys, topSells } = useJupStat();
//   const topBuy = selectedToken
//     ? topBuys.find((elm) => elm.symbol == selectedToken.symbol)
//     : null;
//   const topSell = selectedToken
//     ? topSells.find((elm) => elm.symbol == selectedToken.symbol)
//     : null;

//   return (
//     <>
//       <Container
//         className={cn(
//           "flex flex-col max-h-[580px] bg-foreground gap-5 overflow-y-auto",
//           className
//         )}
//       >
//         <div className="flex items-center justify-between">
//           <div className=" text-black">
//             <Badge>Token Information</Badge>
//           </div>
//           <div className=" text-black">
//             <Badge
//               className="bg-[#BBB0DB] cursor-pointer"
//               onClick={() => {
//                 if (typeof window !== "undefined") {
//                   window.open(
//                     `https://www.coingecko.com/en/coins/${selectedToken.extensions.coingeckoId}`,
//                     "_blank"
//                   );
//                 }
//               }}
//             >
//               View CoinGecko
//             </Badge>
//           </div>
//         </div>
//         <div className="flex flex-col items-start justify-start space-y-4 border border-background rounded-xl p-3">
//           <h1 className="text-[12px] text-[#FCFCFC] mb-2">Token Overview</h1>
//           <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
//             <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//               Token Name
//             </div>
//             <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//               {!isLoading ? data.report.metadata["_data"].Name : "-"}
//             </div>
//           </div>
//           <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
//             <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//               Token Mint
//             </div>
//             <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//               <Link
//                 href={`https://explorer.solana.com/address/${adr}`}
//                 rel="noopener noreferrer"
//                 target="_blank"
//                 className="text-xs flex items-center text-primary  rounded-[4px] px-2 py-[2px] "
//               >
//                 <span className=" max-w-full  lg:max-w-[44px] text-ellipsis overflow-hidden">
//                   {!isLoading ? abbreviate(adr) : "-"}
//                 </span>
//                 <BiLinkExternal />
//               </Link>
//             </div>
//           </div>
//           <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
//             <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//               Creator
//             </div>
//             <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//               <Link
//                 href={`https://explorer.solana.com/address/${
//                   !isLoading ? data.report.creator.account : ""
//                 }`}
//                 rel="noopener noreferrer"
//                 target="_blank"
//                 className="text-xs flex items-center text-primary  rounded-[4px] px-2 py-[2px] "
//               >
//                 <span className=" max-w-full  lg:max-w-[44px] text-ellipsis overflow-hidden">
//                   {!isLoading && data.report.creator.account
//                     ? abbreviate(data.report.creator.account)
//                     : "-"}
//                 </span>
//                 <BiLinkExternal />
//               </Link>
//             </div>
//           </div>
//           {!isLoading ? (
//             <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 Token Supply
//               </div>
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 {!isLoading && data
//                   ? numeral(data["_mint"].Supply).format("0,0.000")
//                   : 0}
//               </div>
//             </div>
//           ) : (
//             <Skeleton className="w-full min-h-[10px]" />
//           )}
//           {!isLoading ? (
//             <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 Decimals
//               </div>
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 {!isLoading && data ? data["_mint"].Decimals : 0}
//               </div>
//             </div>
//           ) : (
//             <Skeleton className="w-full min-h-[10px]" />
//           )}
//           {!isLoading ? (
//             <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 FDMC
//               </div>
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 $
//                 {isLoading && currentMarketPrice != 0
//                   ? numeral(data["_mint"].Supply * currentMarketPrice).format(
//                       "0,0"
//                     )
//                   : 0}
//               </div>
//             </div>
//           ) : (
//             <Skeleton className="w-full min-h-[10px]" />
//           )}
//           {tokenInfo ? (
//             <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 Holders
//               </div>
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 {tokenInfo ? tokenInfo.holders.length : 0}
//               </div>
//             </div>
//           ) : (
//             <Skeleton className="w-full min-h-[10px]" />
//           )}
//         </div>
//         <div className="flex flex-col items-start justify-start space-y-4 border border-background rounded-xl p-3">
//           <h1 className="text-[12px] text-[#FCFCFC] mb-2">
//             Market Information
//           </h1>
//           {poolDetails.length != 0 ? (
//             <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 Tracked Markets
//               </div>
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 {poolDetails.length}
//               </div>
//             </div>
//           ) : (
//             <Skeleton className="w-full min-h-[10px]" />
//           )}
//           {poolDetails.length != 0 ? (
//             <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 Tracked TVL
//               </div>
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 $
//                 {numeral(
//                   poolDetails.reduce((accumulator, currentValue) => {
//                     // Parsing the reserve_in_usd from string to float and adding it to the accumulator
//                     return (
//                       accumulator +
//                       parseFloat(currentValue.attributes.reserve_in_usd)
//                     );
//                   }, 0)
//                 ).format("0,0.000")}
//               </div>
//             </div>
//           ) : (
//             <Skeleton className="w-full min-h-[10px]" />
//           )}
//           {poolDetails.length != 0 ? (
//             <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 24H Volume
//               </div>
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 $
//                 {numeral(
//                   poolDetails.reduce((accumulator, currentValue) => {
//                     return (
//                       accumulator +
//                       parseFloat(currentValue.attributes.volume_usd.h24)
//                     );
//                   }, 0)
//                 ).format("0,0.000")}
//               </div>
//             </div>
//           ) : (
//             <Skeleton className="w-full min-h-[10px]" />
//           )}
//           {poolDetails.length != 0 ? (
//             <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 24H Buy Volume
//               </div>
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 ${topBuy ? numeral(topBuy.amount).format("0,0.000") : 0}
//               </div>
//             </div>
//           ) : (
//             <Skeleton className="w-full min-h-[10px]" />
//           )}
//           {poolDetails.length != 0 ? (
//             <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 24H Sell Volume
//               </div>
//               <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 ${topSell ? numeral(topSell.amount).format("0,0.000") : 0}
//               </div>
//             </div>
//           ) : (
//             <Skeleton className="w-full min-h-[10px]" />
//           )}
//         </div>
//       </Container>
//     </>
//   );
// };

//export default TokenInformation;
"use client";
import React, { useCallback, useEffect, useState, memo } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import numeral from "numeral";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";

import { useSelectedToken } from "@/context/coin-details";

import { useTokenData } from "@/hooks/use-token-data";
import { cn } from "@/lib/utils";
import { abbreviate } from "../trade/src/utils/abbreviate";
import Container from "../../common/container";

import { useJupStat } from "@/hooks/use-jup-stat";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const TokenInfoSection = memo(
  ({ title, children }: { title: string; children: any }) => (
    <div className="flex items-center justify-between text-xs text-muted-foreground w-full">
      {children}
    </div>
  )
);

const TokenInformation = ({ className }) => {
  const { poolDetails, selectedToken, tokenInfo } = useSelectedToken();
  const {
    isLoading: isDataLoading,
    data: { topBuys, topSells, topTokens } = {
      topBuys: [],
      topSells: [],
      topTokens: [],
    }, // Providing a default empty object
  } = useJupStat();
  const params = useParams();
  const adr: any = params["address"];
  const { isLoading, data } = useTokenData(adr);
  const [currentMarketPrice, setCurrentMarketPrice] = useState(0);

  const fetchPrice = useCallback(async () => {
    if (selectedToken) {
      //console.log("Selected Token", selectedToken);
      try {
        const response = await axios.get(
          `https://price.jup.ag/v4/price?ids=${selectedToken.symbol}`
        );
        setCurrentMarketPrice(
          response.data["data"][selectedToken.symbol]["price"]
        );
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    }
  }, [selectedToken]);

  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  const topBuy = topBuys.find((elm) => elm.symbol === selectedToken?.symbol);
  const topSell = topSells.find((elm) => elm.symbol === selectedToken?.symbol);

  return (
    <Container
      className={cn(
        "flex flex-col max-h-[580px] bg-foreground gap-5 overflow-y-auto",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className=" text-black">
          <Badge>Token Information</Badge>
        </div>
        <div className=" text-black">
          <Badge
            className="bg-[#BBB0DB] cursor-pointer"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open(
                  `https://www.coingecko.com/en/coins/${selectedToken.extensions.coingeckoId}`,
                  "_blank"
                );
              }
            }}
          >
            View CoinGecko
          </Badge>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start space-y-4 border border-background rounded-xl p-3">
        <h1 className="text-[12px] text-[#FCFCFC] mb-2">Token Overview</h1>
        <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
          <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            Token Name
          </div>
          <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {!isLoading && data && data.report.metadata["_data"]
              ? data.report.metadata["_data"].Name
              : selectedToken
              ? selectedToken.name
              : "-"}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
          <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            Token Mint
          </div>
          <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            <Link
              href={`https://explorer.solana.com/address/${adr}`}
              rel="noopener noreferrer"
              target="_blank"
              className="text-xs flex items-center text-primary  rounded-[4px] px-2 py-[2px] "
            >
              <span className=" max-w-full  lg:max-w-[44px] text-ellipsis overflow-hidden">
                {!isLoading ? abbreviate(adr) : "-"}
              </span>
              <BiLinkExternal />
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
          <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            Creator
          </div>
          <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            <Link
              href={`https://explorer.solana.com/address/${
                !isLoading && data && data.report.creator
                  ? data.report.creator.account
                  : ""
              }`}
              rel="noopener noreferrer"
              target="_blank"
              className="text-xs flex items-center text-primary  rounded-[4px] px-2 py-[2px] "
            >
              <span className=" max-w-full  lg:max-w-[44px] text-ellipsis overflow-hidden">
                {!isLoading && data && data.report.creator
                  ? abbreviate(data.report.creator.account)
                  : "-"}
              </span>
              <BiLinkExternal />
            </Link>
          </div>
        </div>
        {!isLoading ? (
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Token Supply
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {!isLoading && data
                ? numeral(
                    data["_mint"].Supply / Math.pow(10, data["_mint"].Decimals)
                  ).format("0,0.000")
                : 0}
            </div>
          </div>
        ) : (
          <Skeleton className="w-full min-h-[10px]" />
        )}
        {!isLoading ? (
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Decimals
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {!isLoading && data ? data["_mint"].Decimals : 0}
            </div>
          </div>
        ) : (
          <Skeleton className="w-full min-h-[10px]" />
        )}
        {!isLoading ? (
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              FDMC
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              $
              {!isLoading && currentMarketPrice != 0 && data
                ? numeral(
                    (data["_mint"].Supply /
                      Math.pow(10, data["_mint"].Decimals)) *
                      currentMarketPrice
                  ).format("0,0")
                : "N/A"}
            </div>
          </div>
        ) : (
          <Skeleton className="w-full min-h-[10px]" />
        )}
        {tokenInfo ? (
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Holders
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {tokenInfo ? tokenInfo.holders.length : "N/A"}
            </div>
          </div>
        ) : (
          <Skeleton className="w-full min-h-[10px]" />
        )}
      </div>
      <div className="flex flex-col items-start justify-start space-y-4 border border-background rounded-xl p-3">
        <h1 className="text-[12px] text-[#FCFCFC] mb-2">Market Information</h1>
        {!isLoading && data && data.report ? (
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Tracked Markets
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {data.report.markets.length}
            </div>
          </div>
        ) : (
          <Skeleton className="w-full min-h-[10px]" />
        )}
        {poolDetails.length != 0 ? (
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Tracked TVL
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              $
              {numeral(
                poolDetails.reduce((accumulator, currentValue) => {
                  // Parsing the reserve_in_usd from string to float and adding it to the accumulator
                  return (
                    accumulator +
                    parseFloat(currentValue.attributes.reserve_in_usd)
                  );
                }, 0)
              ).format("0,0.000")}
            </div>
          </div>
        ) : (
          <Skeleton className="w-full min-h-[10px]" />
        )}
        {poolDetails.length != 0 ? (
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              24H Volume
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              $
              {numeral(
                poolDetails.reduce((accumulator, currentValue) => {
                  return (
                    accumulator +
                    parseFloat(currentValue.attributes.volume_usd.h24)
                  );
                }, 0)
              ).format("0,0.000")}
            </div>
          </div>
        ) : (
          <Skeleton className="w-full min-h-[10px]" />
        )}
        {poolDetails.length != 0 ? (
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              24H Buy Volume
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              ${topBuy ? numeral(topBuy.amount).format("0,0.000") : "N/A"}
            </div>
          </div>
        ) : (
          <Skeleton className="w-full min-h-[10px]" />
        )}
        {poolDetails.length != 0 ? (
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              24H Sell Volume
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              ${topSell ? numeral(topSell.amount).format("0,0.000") : "N/A"}
            </div>
          </div>
        ) : (
          <Skeleton className="w-full min-h-[10px]" />
        )}
      </div>
    </Container>
  );
};

export default TokenInformation;
