import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

interface FutureContentCardProps extends React.HTMLAttributes<any> {}

const FutureContentCard: FunctionComponent<FutureContentCardProps> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/trade/perpetuals"}
      className={cn(
        "flex flex-col min-h-[400px]  bg-[#141414] transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-2 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2  p-4 md:p-8">
        <header className="flex flex-col items-center  gap-3 ">
          <div className="bg-background h-12 w-12  rounded-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <rect width="48" height="48" rx="8" fill="#0F0F0F" />
              <path
                d="M8.7735 36.04L19.8675 24.9276L27.2635 32.3236L42.98 14.6471L40.3729 12.04L27.2635 26.7766L19.8675 19.3806L6 33.2665L8.7735 36.04Z"
                fill="url(#paint0_linear_3275_6703)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3275_6703"
                  x1="24.49"
                  y1="12.04"
                  x2="24.49"
                  y2="36.04"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#BBB0DB" />
                  <stop offset="1" stop-color="#8E6DEE" />
                </linearGradient>
              </defs>
            </svg>
            {/* <Image
              src="/images/trade/futures.svg"
              width={24}
              height={24}
              alt="trade logo"
            /> */}
          </div>
          <h1 className=" text-lg md:text-xl font-medium">Crypto Futures</h1>
        </header>
        <p className=" text-center max-w-xs text-muted-foreground text-sm h-9 overflow-hidden text-ellipsis ">
          Use margin to trade gamified perpetual futures markets for BTC, ETH,
          SOL, and more.
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/trade/bg/futures.png"
          height={426}
          width={300}
          alt="guac background"
          className="absolute top-0 left-0 h-[426px] w-full p-4 opacity-30"
        />
      </div>
    </Link>
  );
};

export default FutureContentCard;
