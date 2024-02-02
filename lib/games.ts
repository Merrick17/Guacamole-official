import { GAMES } from "@/components/games-v2";
import { GambaTransaction } from "gamba-core-v2";

export const truncateString = (s: string, startLen = 4, endLen = startLen) =>
  s.slice(0, startLen) + "..." + s.slice(-endLen);

export const extractMetadata = (event: GambaTransaction<"GameSettled">) => {
  try {
    const [version, ...parts] = event.data.metadata.split(":");
    const [gameId] = parts;
    console.log("Game ID", gameId);
    const game = GAMES.find((x) => x.id === gameId);
    return  { game };
  } catch {
    return {};
  }
};
