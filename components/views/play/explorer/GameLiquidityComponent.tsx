import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface GameLiquidityComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const GameLiquidityComponent: FunctionComponent<
  GameLiquidityComponentProps
> = ({
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
      <Button className="game-btn w-[35px] h-[35px] absolute z-50 top-5 right-1 p-3">
        <Image src={"/images/trade/clock.svg"} alt="" width={20} height={20} />
      </Button>
      <Image
        src="/images/play/bg/game_pool.png"
        width={582}
        height={582}
        alt="launch background"
        className="-z-0 absolute sm:translate-x-1/2 sm:-translate-y-1/4 opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
          {/* <Image
            src="/images/earn/liquid_staking.svg"
            width={24}
            height={24}
            alt="launch logo"
          /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              d="M24 23.996C22.38 23.996 21.36 24.5 20.46 24.956C19.68 25.352 19.044 25.676 18 25.676C16.92 25.676 16.32 25.376 15.54 24.956C14.64 24.5 13.656 23.996 12 23.996C10.344 23.996 9.36 24.5 8.46 24.956C7.68 25.352 7.056 25.676 6 25.676V28.016C7.62 28.016 8.64 27.512 9.54 27.056C10.32 26.66 10.944 26.336 12 26.336C13.056 26.336 13.68 26.636 14.46 27.056C15.36 27.512 16.344 28.016 18 28.016C19.656 28.016 20.64 27.512 21.54 27.056C22.32 26.66 22.956 26.336 24 26.336C25.08 26.336 25.68 26.636 26.46 27.056C27.36 27.512 28.356 28.016 30 28.016V25.676C28.92 25.676 28.32 25.376 27.54 24.956C26.64 24.5 25.62 23.996 24 23.996ZM24 18.656C22.38 18.656 21.36 19.172 20.46 19.616C19.68 20 19.044 20.336 18 20.336C16.92 20.336 16.32 20.036 15.54 19.616C14.64 19.16 13.656 18.656 12 18.656C10.344 18.656 9.36 19.172 8.46 19.616C7.68 20 7.056 20.336 6 20.336V22.676C7.62 22.676 8.64 22.16 9.54 21.716C10.32 21.296 10.92 20.996 12 20.996C13.08 20.996 13.68 21.296 14.46 21.716C15.36 22.172 16.344 22.676 18 22.676C19.656 22.676 20.64 22.16 21.54 21.716C22.32 21.296 22.92 20.996 24 20.996C25.08 20.996 25.68 21.296 26.46 21.716C27.36 22.172 28.356 22.676 30 22.676V20.336C28.92 20.336 28.32 20.036 27.54 19.616C26.64 19.16 25.62 18.656 24 18.656ZM27.54 8.96C26.64 8.504 25.644 8 24 8C22.356 8 21.36 8.504 20.46 8.96C19.68 9.344 19.044 9.68 18 9.68C16.92 9.68 16.32 9.38 15.54 8.96C14.64 8.516 13.656 8 12 8C10.344 8 9.36 8.504 8.46 8.96C7.68 9.356 7.056 9.68 6 9.68V11.996C7.62 11.996 8.64 11.48 9.54 11.036C10.32 10.64 10.944 10.316 12 10.316C13.056 10.316 13.68 10.616 14.46 11.036C15.36 11.492 16.344 11.996 18 11.996C19.656 11.996 20.64 11.48 21.54 11.036C22.32 10.652 22.956 10.316 24 10.316C25.08 10.316 25.68 10.616 26.46 11.036C27.36 11.492 28.356 11.996 30 11.996V9.656C28.92 9.656 28.32 9.356 27.54 8.96ZM24 13.316C22.38 13.316 21.36 13.832 20.46 14.276C19.68 14.696 19.08 14.996 18 14.996C16.92 14.996 16.32 14.696 15.54 14.276C14.64 13.82 13.656 13.316 12 13.316C10.344 13.316 9.36 13.832 8.46 14.276C7.68 14.696 7.08 14.996 6 14.996V17.336C7.62 17.336 8.64 16.82 9.54 16.376C10.32 15.992 10.956 15.656 12 15.656C13.044 15.656 13.68 15.956 14.46 16.376C15.36 16.832 16.344 17.336 18 17.336C19.656 17.336 20.64 16.82 21.54 16.376C22.32 15.992 22.956 15.656 24 15.656C25.08 15.656 25.68 15.956 26.46 16.376C27.36 16.832 28.356 17.336 30 17.336V14.996C28.92 14.996 28.32 14.696 27.54 14.276C26.64 13.82 25.62 13.316 24 13.316Z"
              fill="url(#paint0_linear_2872_8904)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2872_8904"
                x1="18"
                y1="8"
                x2="18"
                y2="28.016"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FBED80" />
                <stop offset="1" stop-color="#FFE60A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="text-lg md:text-2xl lg:text-[32px] font-medium">
          Provide Game Liquidity
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        By providing liquidity for games across the network, you become the
        house and earn the fees! Deposit liquidity in a supported token and earn
        a percentage of each play!
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#FCED7B" />
          <p>Supply liquidity for token bets</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FCED7B" />
          <p>Earn fees collected on games</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FCED7B" />
          <p>Expanding DEX & Token Support</p>
        </li>
      </ul>
    </div>
  );
};

export default GameLiquidityComponent;
