import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface StakeGuacContentCardProps extends React.HTMLAttributes<any> {}

const StakeGuacContentCard: FunctionComponent<StakeGuacContentCardProps> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href="/earn/guac-staking"
      className={cn(
        "flex flex-col p-4 bg-[#141414] md:p-8 transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-12 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <Image
        src="/images/earn/bg/stake.png"
        width={582}
        height={582}
        alt="launch background"
        className="-z-0 absolute sm:translate-x-1/2 sm:-translate-y-1/4 opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
          <Image
            src="/images/earn/guac_stake.svg"
            width={24}
            height={24}
            alt="launch logo"
          />
        </div>
        <h1 className="text-lg md:text-2xl lg:text-[32px] font-medium">
          Stake Your GUAC
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        Stake or deposit your GUAC in one of the available options to earn
        rewards, staking options, and fees while helping to grow the ecosystem
        and protocol liquidity.
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#FF8585" />
          <p>Staking Option Availability</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FF8585" />
          <p>Provide Program Liquidity</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FF8585" />
          <p>Earn Fees And Rewards</p>
        </li>
      </ul>
    </Link>
  );
};

export default StakeGuacContentCard;
