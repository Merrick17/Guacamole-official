import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface EarnMainContentCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const EarnMainContentCard: FunctionComponent<EarnMainContentCardProps> = ({
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
        src="/images/earn/bg/earn.png"
        width={582}
        height={562}
        alt="guac background"
        className="-z-0 absolute sm:translate-x-[60%] rotate-45 opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
          <Image
            src="/images/earn/earn_header.svg"
            width={24}
            height={24}
            alt="guac logo"
          />
        </div>
        <h1 className="earn-text-color text-lg md:text-2xl lg:text-[32px] font-medium">
          Lend In Dynamic Vaults
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        Vault assets are automatically rebalanced every minute between top
        lending protocols for the safest, most optimized yields. Available for
        several liquid staking tokens and stable coins.
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#FF8585" />
          <p>Aggregates Several Platforms</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FF8585" />
          <p>Helps Spread Risk Threshold</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FF8585" />
          <p>Advanced Data & Details</p>
        </li>
      </ul>
    </div>
  );
};

export default EarnMainContentCard;
