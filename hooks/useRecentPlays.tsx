"use client";
// import { useConnection } from '@solana/wallet-adapter-react';
// import { RecentPlayEvent, getRecentEvents } from 'gamba';
// import { useGamba, useGambaEvent } from 'gamba/react';

// import { useEffect, useRef, useState } from 'react';

// export function useRecentPlays() {
//   const { connection } = useConnection();
//   const gamba = useGamba();
//   const [recentPlays, setRecentPlays] = useState<RecentPlayEvent[]>([]);
//   const fetched = useRef(false);

//   useEffect(() => {
//     if (fetched.current || !gamba.house?.state.rng) {
//       return;
//     }
//     fetched.current = true;
//     getRecentEvents(connection, {
//       signatureLimit: 20,
//       rngAddress: gamba.house.state.rng,
//     })
//       .then((events) => {
//         setRecentPlays(events);
//       })
//       .catch((err) => {
//         console.error('Failed to get events', err);
//       });
//   }, [gamba.house]);

//   useGambaEvent(
//     (event) => {
//       const isPlayer = gamba.wallet?.publicKey?.equals(event.player);
//       setTimeout(
//         () => {
//           setRecentPlays((x) => [event, ...x]);
//         },
//         isPlayer ? 5000 : 0
//       );
//     },
//     [gamba.wallet]
//   );

//   return recentPlays;
// }
import { GambaTransaction } from "gamba-core-v2";
import {
  useGambaEventListener,
  useGambaEvents,
  useWalletAddress,
} from "gamba-react-v2";
import { usePathname } from "next/navigation";
import React from "react";

/*
  Note:
  "useGambaEvents" fetches the last couple of transactions made on this app's "creator" address,
  and tries to find any Gamba-related events happening in them (e.g. GameSettled).
  Fetching this way doesn't require any off-chain service, but comes at the cost of being slow, and often unreliable.
*/
export function useRecentPlays() {
  const pathname = usePathname();
  const userAddress = useWalletAddress();

  // Fetch previous events
  const previousEvents = useGambaEvents("GameSettled");

  const [newEvents, setEvents] = React.useState<
    GambaTransaction<"GameSettled">[]
  >([]);

  // Listen for new events
  useGambaEventListener(
    "GameSettled",
    (event) => {
      // Todo handle delays in platform library
      const delay =
        event.data.user.equals(userAddress) &&
        ["plinko", "slots"].some((x) => location.pathname.includes(x))
          ? 3000
          : 1;
      setTimeout(() => {
        setEvents((events) => [event, ...events]);
      }, delay);
    },
    [pathname, userAddress]
  );

  // Merge previous & new events
  return React.useMemo(() => {
    return [...newEvents, ...previousEvents];
  }, [newEvents, previousEvents]);
}
