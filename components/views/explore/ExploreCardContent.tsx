import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface ExploreCardContentProps
  extends React.HTMLAttributes<any> {}

const ExploreCardContent: FunctionComponent<ExploreCardContentProps> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/terminal"}
      className={cn(
        "flex flex-col p-4 bg-[#141414] md:p-8 transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-12 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <Button className="guac-btn w-[131px] h-[32px] absolute z-20 top-3 right-3 p-3">
        Indepth Insights
      </Button>
      <Image
        src="/images/explore/bg/explore_card.png"
        width={582}
        height={582}
        alt="guac background"
        className="-z-0 absolute sm:translate-x-1/2 bottom-[-100px] opacity-30  "
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
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <rect width="48" height="48" rx="8" fill="#0F0F0F" />
            <path
              d="M9 12V34.9412H39V12H9ZM12.5294 31.4118V15.5294H17.8235V31.4118H12.5294ZM21.3529 31.4118V25.2353H26.6471V31.4118H21.3529ZM35.4706 31.4118H30.1765V25.2353H35.4706V31.4118ZM21.3529 21.7059V15.5294H35.4706V21.7059H21.3529Z"
              fill="url(#paint0_linear_3124_288)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3124_288"
                x1="24"
                y1="12"
                x2="24"
                y2="34.9412"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#A8D8AC" />
                <stop offset="1" stop-color="#71D87F" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="guac-text-color text-lg md:text-2xl lg:text-[32px] font-medium">
          Solana Data Terminal
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        Vault assets are automatically rebalanced every minute between top
        lending protocols for the safest, most optimized yields. Available for
        several liquid staking tokens and stable coins.
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Aggregates Several Platforms</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Helps Spread Risk Threshold</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Advanced Data & Details</p>
        </li>
      </ul>
    </Link>
  );
};

export default ExploreCardContent;
