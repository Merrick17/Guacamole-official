"use client";

import { cn } from "@/lib/utils";
import { abbreviate } from "@bonfida/hooks";
import { PublicKey } from "@solana/web3.js";
import { GameResult, lamportsToSol } from "gamba";
import { useGamba, useGambaEvents } from "gamba/react";
import { formatLamports } from "gamba/react-ui";
import Image from "next/image";
import React, { useEffect } from "react";

const VERIFY_URL = "https://explorer.gamba.so/tx";

const TimeDiff: React.FC<{ time: number }> = ({ time }) => {
  const diff = Date.now() - time;
  return React.useMemo(() => {
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours >= 1) {
      return hours + "h ago";
    }
    if (minutes >= 1) {
      return minutes + "m ago";
    }
    return "Just now";
  }, [diff]);
};

interface RecentPlayProps {
  result: GameResult;
  isSelf: boolean;
  signature: string;
  time: number;
  player: PublicKey;
}

function RecentPlay({
  time,
  signature,
  result,
  isSelf,
  player,
}: RecentPlayProps) {
  useEffect(() => {
    console.log("Player", player.toBase58());
  });
  const wager = result.wager;
  const multiplier = result.multiplier;
  const payout = wager * multiplier;
  const isRekt = payout === 0;
  const whaleScore = Math.log10(lamportsToSol(wager) / 0.1);
  const litScore = multiplier - 1;
  const outcome = whaleScore > 0 || litScore > 0 ? "won" : isRekt ? "lost" : "";
  return (
    // <a
    //   className="flex gap-1 p-[10px] justify-between bg-background rounded-lg"
    //   href={`${VERIFY_URL}/${signature}`}
    //   target="_blank"
    //   rel="noreferrer"
    // >
    //   <div className="flex gap-1">
    //     <span>
    //       {(whaleScore > 0 || litScore > 0) && '🎉'}
    //       {isRekt && '💀'}
    //     </span>
    //     <span>{isSelf ? 'You ' : 'Someone '}</span>
    //     {(whaleScore > 0 || litScore > 0) && 'won'}
    //     {isRekt && 'lost'}

    //     {(whaleScore > 0 || litScore > 0) && (
    //       <span className="text-[#8BD796]"> {formatLamports(payout)}</span>
    //     )}
    //     {isRekt && (
    //       <span className="text-destructive">{formatLamports(wager)}</span>
    //     )}
    //   </div>
    //   <span>
    //     <TimeDiff time={time} />
    //   </span>
    // </a>
    <a
      className="flex gap-1 p-[10px] justify-between bg-[#0F0F0F] rounded-lg border-[1px] border-[rgba(168, 168, 168, 0.10)]"
      href={`${VERIFY_URL}/${signature}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex gap-2">
        <span>
          {(whaleScore > 0 || litScore > 0) && "🎉"}
          {isRekt && "💀"}
        </span>
        <span className="text-[#FFEA25]">
          {isSelf ? "You " : `${player.toBase58().slice(0, 4)}...`}
        </span>
        {outcome && `${outcome} `}
        {outcome &&
          (outcome === "won" ? (
            <div className="flex gap-1">
              <Image
                src={"/icons/earn/sol.svg"}
                alt="sol"
                height={15}
                width={15}
              />{" "}
              <span className="text-[#8BD796]"> {formatLamports(payout)}</span>
            </div>
          ) : (
            <div className="flex gap-1">
              <Image
                src={"/icons/earn/sol.svg"}
                alt="sol"
                height={15}
                width={15}
              />{" "}
              <span className="text-destructive">{formatLamports(wager)}</span>
            </div>
          ))}
      </div>
      <span>
        <TimeDiff time={time} />
      </span>
    </a>
  );
}

export default function RecentPlays({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const gamba = useGamba();
  const events = useGambaEvents();

  // React.useEffect(() => {
  //   events.fetch({ signatureLimit: 40 });
  //   return events.listen();
  // }, [events]);

  // const results = React.useMemo(() => {
  //   return events.transactions.filter((x) => !!x.event.gameResult);
  // }, [events.transactions]);

  return (
    <div
      className={cn(
        "flex max-w-[512px] w-full flex-col  gap-4 rounded-lg bg-foreground p-5 shadow-md border-[1px] border-[rgba(168, 168, 168, 0.10)]",
        className
      )}
    >
      <div>
        <div className="flex flex-col gap-5">
          {events.map((transaction) => (
            <RecentPlay
              key={transaction.signature}
              time={transaction.time}
              signature={transaction.signature}
              result={transaction.event.gameResult!}
              isSelf={transaction.event.gameResult!.player.equals(
                gamba.wallet.publicKey
              )}
              player={transaction.event.gameResult!.player}
            />
          ))}
        </div>
        {/* {!events.latestSig
          ? Array.from({ length: 5 }).map((_, i) => <div key={i} />)
          : !results.length && <div>No events</div>} */}
      </div>
    </div>
  );
}
