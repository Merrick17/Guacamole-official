import Featured from "@/components/views/play/featured";
import RecentPlays from "@/components/common/recent-plays";

import type { Metadata, ResolvingMetadata } from "next";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
        title: "Roll The Dice | Guacamole",
      };
    case "Flip":
      return {
        title: "Double Your SOL With A Coin Flip | Guacamole",
      };
    case "Hilo":
      return {
        title: "Try To Keep Your Streak Going | Guacamole",
      };
    case "Mines":
      return {
        title: "Navigate The Mine Field To Win | Guacamole",
      };
    case "Roulette":
      return {
        title: "Place Your Chips And Spin The Wheel | Guacamole",
      };
    case "Slots":
      return {
        title: "Pull The Lever And Test Your Luck With Slots | Guacamole",
      };
    case "Plinko":
      return {
        title: "Play Plinko | Guacamole",
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
    // <div className="flex flex-col items-center gap-4  px-8 py-6 md:px-16 md:py-12 ">
    //   {children}
    //   {/* <Featured /> */}

    //   {/* <RecentPlays /> */}
    // </div>
    <main
      className={cn(
        "container mx-auto my-auto flex flex-col justify-center items-center min-h-[calc(100vh-160px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
      )}
    >
      {" "}
      {children}
      <RecentPlays />
      <Link
        href={"https://v2.gamba.so/#/user"}
        className="text-[#A8A8A8] text-[16px] font-[400]"
      >
        Debug Current User
      </Link>
    </main>
  );
}
