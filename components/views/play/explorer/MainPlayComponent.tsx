import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface MainPlayComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

const MainPlayComponent: FunctionComponent<MainPlayComponentProps> = ({
  className,

  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col p-4 bg-[#141414] md:p-8 transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-12 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <Button className="game-btn z-30 absolute right-3 top-3">Community Favorite!</Button>
      <Image
        src="/images/play/bg/main.gif"
        width={582}
        height={562}
        alt="guac background"
        className="-z-0 absolute sm:translate-x-[60%] rotate-45 opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
          <Image
            src="/images/play/play.png"
            width={24}
            height={24}
            alt="guac logo"
          />
        </div>
        <h1 className="play-text-color text-lg md:text-2xl lg:text-[32px] font-medium">
          Play Roulette
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        Connect your wallet and jump right into the fun! Place your chips and
        play some roulette in this on-chain and verifiably random
        implementation. Make sure to boast those winnings on social!
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#FFF281" />
          <p>Easily Connect and Play</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FFF281" />
          <p>Use SOL and GUAC bets</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FFF281" />
          <p>Free Plays and Jackpots</p>
        </li>
      </ul>
    </div>
  );
};

export default MainPlayComponent;
