"use client";

import { useRecentPlays } from "@/hooks/useRecentPlays";
import { cn } from "@/lib/utils";
import { abbreviate } from "@bonfida/hooks";
import { PublicKey } from "@solana/web3.js";
import { GameResult, lamportsToSol } from "gamba";
//import { useGamba, useGambaEvents } from "gamba/react";
import { useGamba, useGambaEvents } from "gamba-react-v2";
import { formatLamports } from "gamba/react-ui";
import Image from "next/image";
import React, { useEffect } from "react";
import { Jackpot, Profit, Recent } from "../games-v2/recent.styles";
import { TokenValue, useTokenMeta } from "gamba-react-ui-v2";
import { BPS_PER_WHOLE, GambaTransaction } from "gamba-core-v2";
import { extractMetadata } from "@/lib/games";
import { useMediaQuery } from "@/hooks/use-media-query";
import FallbackImage from "./FallbackImage";

const VERIFY_URL = "https://explorer.gamba.so/tx";

// const TimeDiff: React.FC<{ time: number }> = ({ time }) => {
//   const diff = Date.now() - time;
//   return React.useMemo(() => {
//     const seconds = Math.floor(diff / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     if (hours >= 1) {
//       return hours + "h ago";
//     }
//     if (minutes >= 1) {
//       return minutes + "m ago";
//     }
//     return "Just now";
//   }, [diff]);
// };

// interface RecentPlayProps {
//   result: GameResult;
//   isSelf: boolean;
//   signature: string;
//   time: number;
//   player: PublicKey;
// }

// function RecentPlay({
//   time,
//   signature,
//   result,
//   isSelf,
//   player,
// }: RecentPlayProps) {
//   useEffect(() => {
//     console.log("Player", player.toBase58());
//   });
//   const wager = result.wager;
//   const multiplier = result.multiplier;
//   const payout = wager * multiplier;
//   const isRekt = payout === 0;
//   const whaleScore = Math.log10(lamportsToSol(wager) / 0.1);
//   const litScore = multiplier - 1;
//   const outcome = whaleScore > 0 || litScore > 0 ? "won" : isRekt ? "lost" : "";
//   return (
//     // <a
//     //   className="flex gap-1 p-[10px] justify-between bg-background rounded-lg"
//     //   href={`${VERIFY_URL}/${signature}`}
//     //   target="_blank"
//     //   rel="noreferrer"
//     // >
//     //   <div className="flex gap-1">
//     //     <span>
//     //       {(whaleScore > 0 || litScore > 0) && '🎉'}
//     //       {isRekt && '💀'}
//     //     </span>
//     //     <span>{isSelf ? 'You ' : 'Someone '}</span>
//     //     {(whaleScore > 0 || litScore > 0) && 'won'}
//     //     {isRekt && 'lost'}

//     //     {(whaleScore > 0 || litScore > 0) && (
//     //       <span className="text-[#8BD796]"> {formatLamports(payout)}</span>
//     //     )}
//     //     {isRekt && (
//     //       <span className="text-destructive">{formatLamports(wager)}</span>
//     //     )}
//     //   </div>
//     //   <span>
//     //     <TimeDiff time={time} />
//     //   </span>
//     // </a>
//     <a
//       className="flex gap-1 p-[10px] justify-between bg-[#0F0F0F] rounded-lg border-[1px] border-[rgba(168, 168, 168, 0.10)]"
//       href={`${VERIFY_URL}/${signature}`}
//       target="_blank"
//       rel="noreferrer"
//     >
//       <div className="flex gap-2">
//         <span>
//           {(whaleScore > 0 || litScore > 0) && "🎉"}
//           {isRekt && "💀"}
//         </span>
//         <span className="text-[#FFEA25]">
//           {isSelf ? "You " : `${player.toBase58().slice(0, 4)}...`}
//         </span>
//         {outcome && `${outcome} `}
//         {outcome &&
//           (outcome === "won" ? (
//             <div className="flex gap-1">
//               <Image
//                 src={"/icons/earn/sol.svg"}
//                 alt="sol"
//                 height={15}
//                 width={15}
//               />{" "}
//               <span className="text-[#8BD796]"> {formatLamports(payout)}</span>
//             </div>
//           ) : (
//             <div className="flex gap-1">
//               <Image
//                 src={"/icons/earn/sol.svg"}
//                 alt="sol"
//                 height={15}
//                 width={15}
//               />{" "}
//               <span className="text-destructive">{formatLamports(wager)}</span>
//             </div>
//           ))}
//       </div>
//       <span>
//         <TimeDiff time={time} />
//       </span>
//     </a>
//   );
// }
function TimeDiff({ time, suffix = "ago" }: { time: number; suffix?: string }) {
  const diff = Date.now() - time;
  return React.useMemo(() => {
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours >= 1) {
      return hours + "h " + suffix;
    }
    if (minutes >= 1) {
      return minutes + "m " + suffix;
    }
    return "Just now";
  }, [diff]);
}

function RecentPlay({ event }: { event: GambaTransaction<"GameSettled"> }) {
  const data = event.data;
  const token = useTokenMeta(data.tokenMint);
  const md = useMediaQuery("md");

  const multiplier = data.bet[data.resultIndex.toNumber()] / BPS_PER_WHOLE;
  const wager = data.wager.toNumber();
  const payout = multiplier * wager;
  const profit = payout - wager;

  const { game } = extractMetadata(event);
  console.log("Game", game);

  return (
    <>
      <span>{profit >= 0 ? "🎉" : "💀"}</span>
      <div className="text-primary">
        {data.user.toBase58().substring(0, 4)}...
      </div>
      {md && (profit >= 0 ? " won " : " lost ")}
      <Profit $win={profit > 0}>
        <FallbackImage
          src={token.image}
          height={15}
          width={15}
          className="rounded-full"
        />
        <TokenValue amount={Math.abs(profit)} mint={data.tokenMint} />
      </Profit>

      {md && (
        <>
          {profit > 0 && <div>({multiplier.toFixed(2)}x)</div>}
          {data.jackpotPayoutToUser.toNumber() > 0 && (
            <Jackpot>
              +
              <TokenValue
                mint={data.tokenMint}
                amount={data.jackpotPayoutToUser.toNumber()}
              />
            </Jackpot>
          )}
        </>
      )}
      <span>in {game ? game.meta.name : "Unknow Game"}</span>
    </>
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
  const events = useRecentPlays();
  const md = useMediaQuery("md");

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
        "flex  w-full flex-col  gap-4 rounded-lg bg-foreground p-5 shadow-md border-[1px] border-[rgba(168, 168, 168, 0.10)]",
        className
      )}
    >
      <div>
        <div className="flex flex-col gap-5">
          {/* {events.map((transaction) => (
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
          ))} */}
          {events.slice(0, 10).map((tx) => (
            <Recent key={tx.signature} href={`${VERIFY_URL}/${tx.signature}`}>
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <RecentPlay event={tx} />
              </div>
              <TimeDiff time={tx.time} suffix={md ? "ago" : ""} />
            </Recent>
          ))}
        </div>
        {/* {!events.latestSig
          ? Array.from({ length: 5 }).map((_, i) => <div key={i} />)
          : !results.length && <div>No events</div>} */}
      </div>
    </div>
  );
}
