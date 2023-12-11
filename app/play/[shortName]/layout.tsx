import Featured from "@/components/views/play/featured";
import RecentPlays from "@/components/common/recent-plays";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { shortName: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const shortName = params.shortName;

  switch (shortName) {
    case "Dice":
      return {
        title: "Play On-Chain Dice | Guacamole",
        description:
          "Roll into excitement with our on-chain Solana dice game, where you control the stakes. Adjust your settings, place your bet, and let the dice decide your fate. Experience the thrill of a random roll and the chance to win big on Guacamole.",
        openGraph: {
          images: "/images/seo/play.png",
        },
      };
    case "Flip":
      return {
        title: "Play On-Chain Dice | Guacamole",
        description:
          "Roll into excitement with our on-chain Solana dice game, where you control the stakes. Adjust your settings, place your bet, and let the dice decide your fate. Experience the thrill of a random roll and the chance to win big on Guacamole.",
        openGraph: {
          images: "/images/seo/play.png",
        },
      };
    case "Hilo":
      return {
        title: "Play On-Chain Hilo | Guacamole",
        description:
          "Looking for an invigorating experience? Bet on whether the next number will be higher or lower in the sequence! All fresh and fair on the Solana network!",
        openGraph: {
          images: "/images/seo/play.png",
        },
      };
    case "Mines":
      return {
        title: "Play On-Chain Mines | Guacamole",
        description:
          "Choose your steps wisely! Play a game of mines on the Solana network and see if you can survive the mine field for a prize.",
        openGraph: {
          images: "/images/seo/play.png",
        },
      };
    case "Roulette":
      return {
        title: "Play On-Chain Roulette | Guacamole",
        description:
          "Place your bets on the digital board, predict where the ball will land on the spinning wheel, and experience the rush of blockchain gaming. Spin your way to potential rewards in a transparent and fair environment, all on the Solana network.",
        openGraph: {
          images: "/images/seo/play.png",
        },
      };
    case "Slots":
      return {
        title: "Play On-Chain Slots  | Guacamole",
        description:
          "Bet on a combination of symbols with the goal of receiving specific winning combinations. All fresh and fair on the Solana network!",
        openGraph: {
          images: "/images/seo/play.png",
        },
      };

    default:
      return {
        title: "Play On-Chain Dice | Guacamole",
        description:
          "Roll into excitement with our on-chain Solana dice game, where you control the stakes. Adjust your settings, place your bet, and let the dice decide your fate. Experience the thrill of a random roll and the chance to win big on Guacamole.",
        openGraph: {
          images: "/images/seo/play.png",
        },
      };
  }
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-4  px-8 py-6 md:px-16 md:py-12 ">
      {children}
      <Featured />

      <RecentPlays />
    </div>
  );
}
