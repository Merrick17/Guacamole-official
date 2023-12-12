import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface LiquidStakingContentCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const LiquidStakingContentCard: FunctionComponent<
  LiquidStakingContentCardProps
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
      <Image
        src="/images/earn/bg/liquid_staking.png"
        width={582}
        height={582}
        alt="launch background"
        className="-z-0 absolute sm:translate-x-1/2 sm:-translate-y-1/4 opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
          <Image
            src="/images/earn/liquid_staking.svg"
            width={24}
            height={24}
            alt="launch logo"
          />
        </div>
        <h1 className="text-lg md:text-2xl lg:text-[32px] font-medium">
          Liquid Staking
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        Stake your Solana in liquid staking protocols to unlock unlimited
        possibilities across DeFi while still earning staking rewards.
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#FF8585" />
          <p>One-Click Liquid Stake</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FF8585" />
          <p>Earn Marinade Rewards</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FF8585" />
          <p>Use mSOL in DeFi protocols</p>
        </li>
      </ul>
    </div>
  );
};

export default LiquidStakingContentCard;
