import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface EarnMainContentCardProps extends React.HTMLAttributes<any> {}

const EarnMainContentCard: FunctionComponent<EarnMainContentCardProps> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/earn/dynamic-vault"}
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
        <div className="bg-background h-12 w-12  rounded-md flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
          >
            <path
              d="M9.81818 0L0 4.36364V10.9091C0 16.9636 4.18909 22.6255 9.81818 24C15.4473 22.6255 19.6364 16.9636 19.6364 10.9091V4.36364L9.81818 0ZM17.4545 10.9091C17.4545 12.9273 16.8982 14.8909 15.9491 16.5927L14.3673 15.0109C15.7745 12.8945 15.5345 10.0145 13.6691 8.14909C11.5418 6.02182 8.08364 6.02182 5.95636 8.14909C3.82909 10.2764 3.82909 13.7345 5.95636 15.8618C7.82182 17.7273 10.7018 17.9564 12.8182 16.56L14.6945 18.4364C13.3964 19.9855 11.7164 21.1745 9.81818 21.7527C5.43273 20.3891 2.18182 15.84 2.18182 10.9091V5.78182L9.81818 2.38909L17.4545 5.78182V10.9091ZM9.81818 15.2727C8.00727 15.2727 6.54545 13.8109 6.54545 12C6.54545 10.1891 8.00727 8.72727 9.81818 8.72727C11.6291 8.72727 13.0909 10.1891 13.0909 12C13.0909 13.8109 11.6291 15.2727 9.81818 15.2727Z"
              fill="url(#paint0_linear_2872_8627)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2872_8627"
                x1="9.81818"
                y1="0"
                x2="9.81818"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FF8F8F" />
                <stop offset="1" stop-color="#FF5F5F" />
              </linearGradient>
            </defs>
          </svg>
          {/* <Image
            src="/images/earn/earn_header.svg"
            width={24}
            height={24}
            alt="guac logo"
          /> */}
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
    </Link>
  );
};

export default EarnMainContentCard;
