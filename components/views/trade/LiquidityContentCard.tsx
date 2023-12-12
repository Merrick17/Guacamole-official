import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface LiquidityContentCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const LiquidityContentCard: FunctionComponent<LiquidityContentCardProps> = ({
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
        src="/images/trade/bg/pools.png"
        width={543.502}
        height={860.981}
        alt="launch background"
        className="-z-0 absolute sm:translate-x-1/2 sm:-translate-y-1/4 opacity-30  "
      />
      <Button className="trade-bg w-[35px] h-[35px] absolute top-5 right-1 p-3">
        <Image src={"/images/trade/clock.svg"} alt="" width={20} height={20} />
      </Button>
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
          <Image
            src="/images/trade/liquidity.svg"
            width={24}
            height={24}
            alt="launch logo"
          />
        </div>
        <h1 className="text-lg md:text-2xl lg:text-[32px] font-medium">
          Liquidity Pools
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        Easily create liquidity pools for your project or supply liquidity on a
        variety of different Solana-based AMM protocols in order to earn trading
        fees and extra incentives.
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#BBB0DB" />
          <p>Pools From Multiple Platforms</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#BBB0DB" />
          <p>Create & Manage Positions</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#BBB0DB" />
          <p>Native Guacamole AMM Support</p>
        </li>
      </ul>
    </div>
  );
};

export default LiquidityContentCard;
