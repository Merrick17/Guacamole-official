"use client";

import { JupiterApiProvider } from "@/components/views/trade/src/contexts";
import { JupStatsProvider } from "@/context/jup.stats";

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JupStatsProvider>
      <JupiterApiProvider>{children}</JupiterApiProvider>{" "}
    </JupStatsProvider>
  );
}