"use client";

import MarketPulseChart from "@/components/views/terminal/MarketPulseChart";
import TerminalGraph from "@/components/views/terminal/TerminalGraph";
import TokenRanking from "@/components/views/terminal/TokenRanking";
import TrendingSwaps from "@/components/views/terminal/TredingSwaps";
import WatchList from "@/components/views/terminal/WatchList";
import SolanaTvlRanking from "@/components/views/terminal/solana-tvl-ranking";
import TopNftCollections from "@/components/views/terminal/top-nft-collections";
import Trade from "@/components/views/trade/src/Trade";
import { cn } from "@/lib/utils";
import { useState } from "react";
import TerminalLayout from "./terminal";
import type { Metadata } from 'next'
 

export default function Terminal() {
  const [selection, setSelection] = useState("1D");
  const [display, setDisplay] = useState<string>("tpp");
  const [activePage, setActivePage] = useState(1);

  const setChartType = (dataType: string) => {
    setSelection(dataType);
  };
  const handleDisplayChange = (value: string) => {
    setDisplay(value);
  };
  const handlePageChange = (page: number) => {
    setActivePage(page);
  };
  return (
    <TerminalLayout>
      <main
        className={cn(
          "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-160px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
        )}
      >
        <section className="grid sm:grid-cols-1 lg:grid-cols-6 gap-10">
          <Trade className="sm:col-span-1 lg:col-span-2  lg:h-full bg-foreground" />
          <TerminalGraph
            activePage={activePage}
            className="sm:col-span-1 lg:col-span-4 border border-[rgba(168, 168, 168, 0.10)]"
            handleSelect={setChartType}
            handleDisplayChange={handleDisplayChange}
            handlePageChange={handlePageChange}
            display={display}
          >
            {display == "tpp" ? (
              <MarketPulseChart selection={selection} />
            ) : display == "vatr" ? (
              <div className="max-sm:w-[20rem] lg:w-full">
                <TokenRanking page={activePage} />
              </div>
            ) : (
              <div className="max-sm:w-[20rem] lg:w-full">
                <WatchList />
              </div>
            )}
          </TerminalGraph>
          <TrendingSwaps className="sm:col-span-1 lg:col-span-2 lg:h-full bg-foreground border border-[rgba(168, 168, 168, 0.10)]" />
          <TopNftCollections className=" sm:col-span-1 lg:col-span-2 w-full border border-[rgba(168, 168, 168, 0.10)]" />
          <SolanaTvlRanking className="sm:col-span-1 lg:col-span-2 w-full border border-[rgba(168, 168, 168, 0.10)]" />
        </section>
      </main>
    </TerminalLayout>
  );
}
