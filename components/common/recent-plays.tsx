'use client';

import { GameResult, lamportsToSol } from 'gamba';
import { useEventFetcher, useGamba,useGambaEvents } from 'gamba/react';
import { formatLamports } from 'gamba/react-ui';
import React from 'react';
import { Section } from '../styles';
import { cn } from '@/lib/utils';

const VERIFY_URL = 'https://explorer.gamba.so/tx';

const TimeDiff: React.FC<{ time: number }> = ({ time }) => {
  const diff = Date.now() - time;
  return React.useMemo(() => {
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours >= 1) {
      return hours + 'h ago';
    }
    if (minutes >= 1) {
      return minutes + 'm ago';
    }
    return 'Just now';
  }, [diff]);
};

interface RecentPlayProps {
  result: GameResult;
  isSelf: boolean;
  signature: string;
  time: number;
}

function RecentPlay({ time, signature, result, isSelf }: RecentPlayProps) {
  const wager = result.wager;
  const multiplier = result.multiplier;
  const payout = wager * multiplier;
  const isRekt = payout === 0;
  const whaleScore = Math.log10(lamportsToSol(wager) / 0.1);
  const litScore = multiplier - 1;

  return (
    <a
      className="flex gap-1 p-[10px] justify-between bg-background rounded-lg"
      href={`${VERIFY_URL}/${signature}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex gap-1">
        <span>
          {(whaleScore > 0 || litScore > 0) && '🎉'}
          {isRekt && '💀'}
        </span>
        <span>{isSelf ? 'You ' : 'Someone '}</span>
        {(whaleScore > 0 || litScore > 0) && 'won'}
        {isRekt && 'lost'}

        {(whaleScore > 0 || litScore > 0) && (
          <span className="text-[#8BD796]"> {formatLamports(payout)}</span>
        )}
        {isRekt && (
          <span className="text-destructive">{formatLamports(wager)}</span>
        )}
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
        'flex max-w-[512px] w-full flex-col  gap-4 rounded-lg bg-foreground p-5',
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
