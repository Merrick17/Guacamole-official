import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

interface BridgeSwapContentProps extends React.HTMLAttributes<any> {}

const BridgeSwapContent: FunctionComponent<BridgeSwapContentProps> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/trade/bridge"}
      className={cn(
        "flex flex-col  min-h-[400px]  bg-[#141414] transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-2 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2  p-4 md:p-8">
        <header className="flex flex-col items-center  gap-3 ">
          <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
            <Image
              src="/images/trade/bridge_icon.svg"
              width={24}
              height={24}
              alt="play logo"
            />
          </div>
          <h1 className=" text-lg md:text-xl font-medium">Bridge Swap</h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Bridge your ETH, BNB, AVAX, and ARB to Solana and pick up tokens like
          GUAC.
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/trade/bg/bridge.png"
          height={300}
          width={300}
          alt="guac background"
          className="absolute top-0 left-0 h-[300px] w-full p-4 opacity-30 "
        />
      </div>
    </Link>
  );
};

export default BridgeSwapContent;
