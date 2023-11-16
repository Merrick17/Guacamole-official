"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Container from "../../common/container";
import { JupiterApiProvider } from "../trade/src/contexts";
import { useSelectedToken } from "@/context/coin-details";
import numeral from "numeral";
import { useJupStat } from "@/context/jup.stats";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";
import { useConnection } from "@solana/wallet-adapter-react";
import { Metaplex, PublicKey } from "@metaplex-foundation/js";
import axios from "axios";
import { abbreviate } from "../trade/src/utils/abbreviate";
import Loading from "../trade/src/components/Loading";
import { Skeleton } from "@/components/ui/skeleton";
interface TokenInformationProps {
  className?: string;
}
// USDC, USDT, USDCet, mSOL, bSOL, JitoSOL, stSOL, UXD, ETH, USDTet

const TokenInformation: FC<TokenInformationProps> = ({ className }) => {
  const { poolDetails, selectedToken, tokenDetails, tokenInfo } =
    useSelectedToken();
  const [currentMarketPrice, setCurrentMarketPrice] = useState(0);

  const fetchPrice = async () => {
    try {
      if (selectedToken) {
        const { data } = await axios.get(
          `https://price.jup.ag/v4/price?ids=${selectedToken.symbol}`
        );
      
        setCurrentMarketPrice(data["data"][selectedToken.symbol]["price"]);
      }
    } catch (error) {}
  };
  const getPrice = useCallback(() => {
    fetchPrice();
  }, [selectedToken]);
  useEffect(() => {
    getPrice();
  }, [selectedToken, tokenInfo]);
  const { topBuys, topSells } = useJupStat();
  const topBuy = selectedToken
    ? topBuys.find((elm) => elm.symbol == selectedToken.symbol)
    : null;
  const topSell = selectedToken
    ? topSells.find((elm) => elm.symbol == selectedToken.symbol)
    : null;

  return (
    <JupiterApiProvider>
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
              {selectedToken ? selectedToken.name : "-"}
            </div>
          </div>
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Token Mint
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              <Link
                href={`https://explorer.solana.com/address/`}
                rel="noopener noreferrer"
                target="_blank"
                className="text-xs flex items-center text-primary  rounded-[4px] px-2 py-[2px] "
              >
                <span className=" max-w-full  lg:max-w-[44px] text-ellipsis overflow-hidden">
                  {selectedToken ? abbreviate(selectedToken.address) : "-"}
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
                  tokenInfo ? tokenInfo.updateAuthority : ""
                }`}
                rel="noopener noreferrer"
                target="_blank"
                className="text-xs flex items-center text-primary  rounded-[4px] px-2 py-[2px] "
              >
                <span className=" max-w-full  lg:max-w-[44px] text-ellipsis overflow-hidden">
                  {tokenInfo && tokenInfo.updateAuthority
                    ? abbreviate(tokenInfo.updateAuthority)
                    : "-"}
                </span>
                <BiLinkExternal />
              </Link>
            </div>
          </div>
          {tokenInfo ? (
            <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
              <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                Token Supply
              </div>
              <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {tokenInfo
                  ? numeral(tokenInfo.totalSupply.uiAmount).format("0,0.000")
                  : 0}
              </div>
            </div>
          ) : (
            <Skeleton className="w-full min-h-[10px]" />
          )}
          {tokenInfo ? (
            <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
              <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                Fully Diluted Market Cap
              </div>
              <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                $
                {tokenInfo && currentMarketPrice != 0
                  ? numeral(
                      tokenInfo.totalSupply.uiAmount * currentMarketPrice
                    ).format("0,0")
                  : 0}
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
                {tokenInfo ? tokenInfo.holders.length : 0}
              </div>
            </div>
          ) : (
            <Skeleton className="w-full min-h-[10px]" />
          )}
        </div>
        <div className="flex flex-col items-start justify-start space-y-4 border border-background rounded-xl p-3">
          <h1 className="text-[12px] text-[#FCFCFC] mb-2">
            Market Information
          </h1>
          {poolDetails.length!=0 ? (
            <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
              <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                Tracked Markets
              </div>
              <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {poolDetails.length}
              </div>
            </div>
          ) : (
            <Skeleton className="w-full min-h-[10px]" />
          )}
          {poolDetails.length!=0 ? (
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
                ${topBuy ? numeral(topBuy.amount).format("0,0.000") : 0}
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
                ${topSell ? numeral(topSell.amount).format("0,0.000") : 0}
              </div>
            </div>
          ) : (
            <Skeleton className="w-full min-h-[10px]" />
          )}
        </div>
      </Container>
    </JupiterApiProvider>
  );
};

export default TokenInformation;
