import { formatLamports, useGambaUi } from 'gamba/react-ui';
import { useGamba } from 'gamba/react';
import { RecentPlayEvent, solToLamports } from 'gamba';
import { Time } from './Time';
import { Skeleton } from '../ui/skeleton';

function RecentPlay({ event }: { event: RecentPlayEvent }) {
  const { wallet } = useGamba();
  const you = !!wallet && event.player.equals(wallet.publicKey);
  const wager = event.wager;
  const multiplier = event.resultMultiplier;
  const profit = wager * multiplier - wager;
  const win = profit >= 0;

  const who = <span>{you ? 'You ' : 'Someone '}</span>;

  const content = (() => {
    if (multiplier >= 2) {
      return (
        <>
          {who} bet {formatLamports(event.wager)} and{' '}
          <span
            style={{
              color: win ? '#4E8341' : '#A63B3D',
            }}
          >
            {multiplier}x
          </span>
        </>
      );
    }

    if (profit < solToLamports(-0.01)) {
      return (
        <>
          {who} bet{' '}
          <span className="text-[#A63B3D]">{formatLamports(event.wager)} </span>{' '}
          and lost
        </>
      );
    }

    return (
      <>
        {who} {win ? 'won' : 'lost'}{' '}
        <span
          style={{
            color: profit >= 0 ? '#4E8341' : '#A63B3D',
          }}
        >
          {formatLamports(Math.abs(profit))}
        </span>
      </>
    );
  })();

  return (
    <div className="p-[10px] border border-solid border-[#E5E7EB] rounded-[5px] flex flex-row items-center justify-between gap-1 h-10 ">
      <div>{content}</div>
      <span>
        <a
          target="_blank"
          href={`https://solscan.io/tx/${event.signature}`}
          rel="noreferrer"
        >
          <Time time={event.estimatedTime} />
        </a>
      </span>
    </div>
  );
}

export function RecentPlays() {
  const { recentPlays } = useGambaUi();

  return (
    <>
      {!recentPlays.length ? (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton className="h-10 w-full" key={i} />
          ))}
        </>
      ) : (
        recentPlays
          .slice(0, 10)
          .map((event, i) => <RecentPlay key={i} event={event} />)
      )}
      <div style={{ opacity: 0.5, fontSize: 12 }}>
        Some transactions may be too old to load
      </div>
    </>
  );
}
