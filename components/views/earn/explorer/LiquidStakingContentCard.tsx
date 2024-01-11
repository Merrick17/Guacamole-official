import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface LiquidStakingContentCardProps extends React.HTMLAttributes<any> {}

const LiquidStakingContentCard: FunctionComponent<
  LiquidStakingContentCardProps
> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/earn/liquidity-staking"}
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
        <div className="bg-background h-12 w-12  rounded-md flex items-center justify-center">
          {/* <Image
            src="/images/earn/liquid_staking.svg"
            width={24}
            height={24}
            alt="launch logo"
          /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <rect width="48" height="48" rx="8" fill="#0F0F0F" />
            <path
              d="M28.188 21.156C27.972 17.808 26.616 14.544 24.072 12C21.504 14.568 20.088 17.832 19.812 21.156C21.348 21.972 22.764 23.028 24 24.312C25.236 23.04 26.652 21.984 28.188 21.156ZM24.06 15.828C24.816 17.064 25.344 18.444 25.62 19.884C25.056 20.244 24.528 20.64 24.012 21.06C23.508 20.652 22.968 20.256 22.416 19.896C22.716 18.456 23.268 17.076 24.06 15.828ZM24 28.14C23.016 26.64 21.768 25.332 20.328 24.3C20.172 24.192 20.004 24.108 19.848 23.988C20.004 24.096 20.172 24.192 20.316 24.288C17.976 22.596 15.108 21.6 12 21.6C12 27.984 16.032 33.384 21.636 35.388C22.392 35.664 23.184 35.868 24 36C24.816 35.856 25.596 35.652 26.364 35.388C31.968 33.384 36 27.984 36 21.6C30.984 21.6 26.58 24.204 24 28.14ZM25.584 33.12C25.056 33.3 24.528 33.444 23.988 33.564C23.46 33.456 22.944 33.312 22.452 33.132C18.504 31.716 15.612 28.344 14.712 24.312C16.032 24.624 17.292 25.164 18.456 25.908L18.432 25.92C18.588 26.028 18.744 26.136 18.9 26.22L18.984 26.268C20.172 27.132 21.192 28.2 21.996 29.448L24 32.52L26.004 29.46C26.832 28.2 27.864 27.12 29.04 26.268L29.124 26.208C29.232 26.148 29.34 26.076 29.448 26.004L29.436 25.98C30.612 25.2 31.92 24.624 33.288 24.3C32.388 28.344 29.508 31.716 25.584 33.12ZM20.388 24.336C20.364 24.324 20.34 24.3 20.328 24.288C20.328 24.288 20.34 24.288 20.34 24.3C20.352 24.312 20.364 24.324 20.388 24.336Z"
              fill="url(#paint0_linear_2872_8676)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2872_8676"
                x1="24"
                y1="12"
                x2="24"
                y2="36"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FF8D8D" />
                <stop offset="1" stop-color="#FF5F5F" />
              </linearGradient>
            </defs>
          </svg>
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
    </Link>
  );
};

export default LiquidStakingContentCard;
