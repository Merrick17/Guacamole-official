'use client';

import { GameResult, lamportsToSol } from 'gamba';
import { useEventFetcher, useGamba } from 'gamba/react';
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
      className="flex gap-1 p-2 justify-between"
      href={`${VERIFY_URL}/${signature}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex gap-1">
        <span>{isSelf ? 'You ' : 'Someone '}</span>
        made
        <span>
          <span>
            {formatLamports(payout)} from {formatLamports(wager)}
          </span>
        </span>
        <span>
          {whaleScore > 0 && '🐋'.repeat(whaleScore)}
          {isRekt && '💀'}
          {litScore > 0 && '🌶️'.repeat(litScore)}
        </span>
      </div>
      <span>
        <TimeDiff time={time} />
      </span>
    </a>
  );
}

export default function RecentPlays({ className }: { className?: string }) {
  const gamba = useGamba();
  const events = useEventFetcher();

  React.useEffect(() => {
    events.fetch({ signatureLimit: 40 });
    return events.listen();
  }, [events]);

  const results = React.useMemo(() => {
    return events.transactions.filter((x) => !!x.event.gameResult);
  }, [events.transactions]);

  return (
    <div
      className={cn(
        'flex max-w-[512px] w-full flex-col p-2 gap-4 rounded-lg bg-foreground ',
        className
      )}
    >
      <div>
        {results.map((transaction) => (
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
        {!events.latestSig
          ? Array.from({ length: 5 }).map((_, i) => <div key={i} />)
          : !results.length && <div>No events</div>}
      </div>
    </div>
  );
}
