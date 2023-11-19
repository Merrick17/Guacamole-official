"use client";

import TerminalLayout from "@/app/terminal/terminal";
import LockerList from "@/components/views/launch/locker-list";
import MarketPulseChart from "@/components/views/terminal/MarketPulseChart";
import TerminalGraph from "@/components/views/terminal/TerminalGraph";
import TokenRanking from "@/components/views/terminal/TokenRanking";
import TrendingSwaps from "@/components/views/terminal/TredingSwaps";
import WatchList from "@/components/views/terminal/WatchList";
import SolanaTvlRanking from "@/components/views/terminal/solana-tvl-ranking";
import TopNftCollections from "@/components/views/terminal/top-nft-collections";
import Trade from "@/components/views/trade/src/Trade";
import { JupiterApiProvider } from "@/components/views/trade/src/contexts";
import { PoolProvider, usePool } from "@/hooks/use-pool-list";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Lock() {
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
      <PoolProvider>
        <main
          className={cn(
            "container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
          )}
        >
          <section className="flex flex-1 justify-center items-center">
            <LockerList />
          </section>
        </main>
      </PoolProvider>
    </TerminalLayout>
  );
}
