"use client";

import { JupiterApiProvider } from "@/components/views/trade/src/contexts";

export default function EarnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <JupiterApiProvider>{children}</JupiterApiProvider>;
}
