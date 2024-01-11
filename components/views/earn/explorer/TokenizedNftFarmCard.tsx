import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface TokenizedNftFarmCardProps extends React.HTMLAttributes<any> {}

const TokenizedNftFarmCard: FunctionComponent<TokenizedNftFarmCardProps> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/earn/tokenized-nft-farm"}
      className={cn(
        "flex flex-col p-4 bg-[#141414] md:p-8 transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-12 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <Image
        src="/images/earn/bg/nft_farm.png"
        width={582}
        height={582}
        alt="launch background"
        className="-z-0 absolute sm:translate-x-1/2 sm:-translate-y-1/4 opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12  rounded-md flex items-center justify-center">
          {/* <Image
            src="/images/earn/nft_farm.svg"
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
              d="M33.3333 14.6667V33.3333H14.6667V14.6667H33.3333ZM33.3333 12H14.6667C13.2 12 12 13.2 12 14.6667V33.3333C12 34.8 13.2 36 14.6667 36H33.3333C34.8 36 36 34.8 36 33.3333V14.6667C36 13.2 34.8 12 33.3333 12ZM26.8533 23.8133L22.8533 28.9733L20 25.52L16 30.6667H32L26.8533 23.8133Z"
              fill="url(#paint0_linear_2872_8701)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2872_8701"
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
          Tokenized NFT Farms
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        A fresh way for tokenized communities to reward loyal holders! Stake
        your token and receive points that can be redeemed for randomized NFTs
        out of the prize pool.
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#FF8585" />
          <p>Earn Points For NFTs</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FF8585" />
          <p>Token Management</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#FF8585" />
          <p>Liquidity Lockers</p>
        </li>
      </ul>
    </Link>
  );
};

export default TokenizedNftFarmCard;
