"use client";

import { Button } from "@/components/ui/button";
import CoinDetailsChart from "@/components/views/terminal/CoinDetailsCharts";
import TokenInformation from "@/components/views/terminal/TokenInformation";
import SolanaTvlRanking from "@/components/views/terminal/solana-tvl-ranking";
import TopNftCollections from "@/components/views/terminal/top-nft-collections";
import Trade from "@/components/views/trade/src/Trade";
import { useJupiterApiContext } from "@/components/views/trade/src/contexts";
import TrendingSwap from "@/components/views/trade/trending-swap";
import { useSelectedToken } from "@/context/coin-details";
import { cn } from "@/lib/utils";
import { TokenInfo } from "@solana/spl-token-registry";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import TerminalLayout from "../../terminal";
import RiskSafety from "@/components/views/terminal/RiskSafety";
import YieldInfo from "@/components/views/terminal/YieldInfos";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CoinSelect } from "@/components/views/terminal/Coin-Select";
import { BsChevronDown } from "react-icons/bs";
export default function CoinDetails() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [selectedSearch, setSelectedSearch] = useState<TokenInfo | undefined>(
    undefined
  );
  const { selectedToken, poolDetails, selectToken } = useSelectedToken();
  const { tokenList } = useJupiterApiContext();
  const inputRef = useRef(null);
  const router = useRouter();

  return (
    <TerminalLayout>
      <main
        className={cn(
          "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
        )}
      >
        <section className="grid sm:grid-cols-1 lg:grid-cols-6 gap-10 ">
          <div className="sm:col-span-1 lg:col-span-2 px-3  bg-foreground h-full p-1 rounded-lg">
            <div className="flex  flex-row items-center gap-3">
              {selectedToken && (
                <img
                  src={selectedToken.logoURI}
                  alt="bitcoin"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-col px-2 py-2 rounded-lg bg-[#141414] lg:flex-row items-center justify-between gap-4 w-full">
                  <CoinSelect
                    onClick={() => {}}
                    token={selectedToken}
                    selectedToken={selectedToken}
                  />
                  <Button size="icon" className="bg-[#BBB0DB]">
                    <BsChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full max-h-[500px] overflow-y-auto">
                  {tokenList.map((tkn) => (
                    <DropdownMenuItem>
                      <CoinSelect
                        token={tkn}
                        onClick={() => {
                          //selectToken(tkn);
                          router.push(
                            `/terminal/coin/${tkn.address}?outputMint=${tkn.address}`
                          );
                        }}
                        selectedToken={selectedToken}
                      />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* <div className="flex items-center justify-between w-full h-full p-1 relative">
              <AiOutlineSearch className="h-[50px] w-[50px] px-3 text-white" />
              <input
                value={search || ""}
                onChange={(e) => {
                  setIsFocused(true);
                  setSearch(e.target.value);
                }}
                type="text"
                id="search-token"
                placeholder="Search For Tokens Here"
                className=" bg-transparent w-full rounded-xl !border-none   text-xs placeholder:text-muted-foreground !outline-none sm:text-lg p-2"
                spellCheck={false}
               
                ref={inputRef}
              />
              <Button
                className="h-[17px] w-[46px] py-3 px-10"
                onClick={() => {
                  router.push(
                    `/terminal/coin/${selectedSearch.address}?outputMint=${selectedSearch.address}`
                  );
                }}
              >
                {" "}
                Search
              </Button>
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
                  .map((tkn) => (
                    <div
                      className="flex items-center justify-start rounded-md gap-2 p-2 cursor-pointer hover:border-primary hover:border-2 w-full"
                      onClick={(e) => {
                        setSearch(tkn.name);
                        setSelectedSearch(tkn);
                        setIsFocused(false);
                        // console.log("SEARCH", search);
                      }}
                    >
                      <img
                        src={tkn.logoURI}
                        className="h-[30px] w-[30px] rounded-full"
                      />
                      <div className="text-xs  flex flex-col gap-2">
                        <h1 className="font-medium">{tkn.symbol}</h1>
                        <p className="text-muted-foreground ">{tkn.name}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div> */}
          </div>

          <TrendingSwap
            className={cn("sm:col-span-1 lg:col-span-4   bg-foreground ")}
          />
          <Trade className="sm:col-span-1 lg:col-span-2  lg:h-full bg-foreground" />
          <CoinDetailsChart
            className="sm:col-span-1 lg:col-span-4 bg-[#131722] "
            selectedMint="7qbRF6YsyGuLUVs6Y1q64bdVrfe4ZcUUz1JRdoVNUJnm"
          >
            {selectedToken && poolDetails && poolDetails.length !== 0 && (
              <iframe
                height="100%"
                width="100%"
                id="geckoterminal-embed"
                title="GeckoTerminal Embed"
                src={`https://www.geckoterminal.com/solana/pools/${selectedToken.address}?embed=1&info=0&swaps=0`}
                frameBorder="0"
                allow="clipboard-write"
                allowFullScreen
              ></iframe>
            )}
          </CoinDetailsChart>
          <TokenInformation className="sm:col-span-1 lg:col-span-2 lg:h-full bg-foreground" />
          <RiskSafety className=" sm:col-span-1 lg:col-span-2 w-full" />
          <YieldInfo className="sm:col-span-1 lg:col-span-2 w-full" />
        </section>
      </main>
    </TerminalLayout>
  );
}
