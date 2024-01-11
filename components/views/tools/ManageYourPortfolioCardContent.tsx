import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface ManageYourPortfolioCardContentProps
  extends React.HTMLAttributes<any> {}

const ManageYourPortfolioCardContent: FunctionComponent<
  ManageYourPortfolioCardContentProps
> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/trade/swap"}
      className={cn(
        "flex flex-col p-4 bg-[#141414] md:p-8 transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-12 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <Button className="max-w-[134.75px] absolute right-2 z-30 tools-bg ">
        All-In-One
      </Button>
      <Image
        src="/images/tools/bg/portfolio.png"
        width={582}
        height={582}
        alt="guac background"
        className="-z-0 absolute sm:translate-x-1/2 rotate-45 opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12  rounded-md flex items-center justify-center">
          {/* <Image
            src="/images/trade/swap.svg"
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
              d="M33.8182 16H36V31.2727H33.8182V16ZM29.4545 16H31.6364V31.2727H29.4545V16ZM26.1818 16H13.0909C12.4909 16 12 16.4909 12 17.0909V30.1818C12 30.7818 12.4909 31.2727 13.0909 31.2727H26.1818C26.7818 31.2727 27.2727 30.7818 27.2727 30.1818V17.0909C27.2727 16.4909 26.7818 16 26.1818 16ZM25.0909 29.0909H14.1818V18.1818H25.0909V29.0909Z"
              fill="url(#paint0_linear_3293_7797)"
            />
            <path
              d="M19.6362 23.5163C20.811 23.5163 21.7634 22.5639 21.7634 21.389C21.7634 20.2141 20.811 19.2617 19.6362 19.2617C18.4613 19.2617 17.5089 20.2141 17.5089 21.389C17.5089 22.5639 18.4613 23.5163 19.6362 23.5163Z"
              fill="url(#paint1_linear_3293_7797)"
            />
            <path
              d="M23.8799 27.2913C23.8799 25.8732 21.0544 25.1641 19.6362 25.1641C18.218 25.1641 15.3926 25.8732 15.3926 27.2913V28.0004H23.8799V27.2913Z"
              fill="url(#paint2_linear_3293_7797)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3293_7797"
                x1="24"
                y1="16"
                x2="24"
                y2="31.2727"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FFEDD8" />
                <stop offset="1" stop-color="#FFC582" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_3293_7797"
                x1="19.6362"
                y1="19.2617"
                x2="19.6362"
                y2="23.5163"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FFEDD8" />
                <stop offset="1" stop-color="#FFC582" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_3293_7797"
                x1="19.6362"
                y1="25.1641"
                x2="19.6362"
                y2="28.0004"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FFEDD8" />
                <stop offset="1" stop-color="#FFC582" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="tools-text-color  text-lg md:text-2xl lg:text-[32px] font-medium">
          Manage Your Portfolio
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        An all-inclusive panel to clean up and view your connected wallet’s
        holdings. View and trade your token balances, NFTs, and cNFTs. You can
        also query and share other wallet address profiles!
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#FFEFDC" />
          <p>View All And Manage All Holdings</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FFEFDC" />
          <p>Indepth Details And Statistics</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FFEFDC" />
          <p>Share Your Wallet Or View Others</p>
        </li>
      </ul>
    </Link>
  );
};

export default ManageYourPortfolioCardContent;
