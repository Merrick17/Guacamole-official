import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface LiquidityCardContentProps extends React.HTMLAttributes<any> {}

const LiquidityCardContent: FunctionComponent<LiquidityCardContentProps> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/explore/guac-token"}
      className={cn(
        "flex flex-col p-4 bg-[#141414] md:p-8 transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-12 relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* <Button className="guac-btn w-[131px]  absolute z-50 top-5 right-3 p-3">
        Indepth Insights
      </Button> */}
      <Image
        src="/images/launch/bg/liquidity.png"
        width={543}
        height={582}
        alt="guac background"
        className="-z-0 absolute sm:translate-x-1/2 bottom-[-200px] opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12 p-1 rounded-md flex items-center justify-center">
          {/* <Image
            src="/images/themes/green.png"
            width={24}
            height={24}
            alt="guac logo"
          /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              d="M25 14H23.8571V11.7143C23.8571 8.56 21.2971 6 18.1429 6C14.9886 6 12.4286 8.56 12.4286 11.7143V14H11.2857C10.0286 14 9 15.0286 9 16.2857V27.7143C9 28.9714 10.0286 30 11.2857 30H25C26.2571 30 27.2857 28.9714 27.2857 27.7143V16.2857C27.2857 15.0286 26.2571 14 25 14ZM14.7143 11.7143C14.7143 9.81714 16.2457 8.28571 18.1429 8.28571C20.04 8.28571 21.5714 9.81714 21.5714 11.7143V14H14.7143V11.7143ZM25 27.7143H11.2857V16.2857H25V27.7143ZM18.1429 24.2857C19.4 24.2857 20.4286 23.2571 20.4286 22C20.4286 20.7429 19.4 19.7143 18.1429 19.7143C16.8857 19.7143 15.8571 20.7429 15.8571 22C15.8571 23.2571 16.8857 24.2857 18.1429 24.2857Z"
              fill="url(#paint0_linear_2901_13113)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2901_13113"
                x1="18.1429"
                y1="6"
                x2="18.1429"
                y2="30"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D77568" />
                <stop offset="1" stop-color="#E05A48" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className=" text-lg md:text-2xl lg:text-[32px] font-medium">
          Liquidity Lockers
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        A simple approach to store liquidity pool tokens in a easy-to-use
        time-lock program. We’re building the tools tokenized Solana communities
        need to grow while building trust with their communities.
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#D6776A" />
          <p>Explore All Locked Liquidity</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#D6776A" />
          <p>Create & Manage Your Own Lockers</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#D6776A" />
          <p>Expanding DEX & Token Support</p>
        </li>
      </ul>
    </Link>
  );
};

export default LiquidityCardContent;
