import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";

interface TokenLocksContentCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const TokenLocksContentCard: FunctionComponent<TokenLocksContentCardProps> = ({
  className,

  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col  min-h-[400px]  bg-[#141414] transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-2 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2  p-4 md:p-8">
        <header className="flex flex-col items-center  gap-3 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect width="48" height="48" rx="8" fill="#0F0F0F" />
            <g clip-path="url(#clip0_2901_13158)">
              <path
                d="M17.9995 16L21.9995 12L17.9995 8V11H12.9395C12.5995 7.9 10.6795 5.28 7.99953 3.95C7.95953 2.31 6.63953 1 4.99953 1C3.33953 1 1.99953 2.34 1.99953 4C1.99953 5.66 3.33953 7 4.99953 7C5.94953 7 6.77953 6.55 7.32953 5.86C9.22953 6.9 10.5995 8.77 10.9195 11H7.81953C7.39953 9.84 6.29953 9 4.99953 9C3.33953 9 1.99953 10.34 1.99953 12C1.99953 13.66 3.33953 15 4.99953 15C6.29953 15 7.39953 14.16 7.81953 13H10.9195C10.5995 15.23 9.22953 17.1 7.33953 18.14C6.77953 17.45 5.94953 17 4.99953 17C3.33953 17 1.99953 18.34 1.99953 20C1.99953 21.66 3.33953 23 4.99953 23C6.63953 23 7.95953 21.69 7.98953 20.05C10.6695 18.72 12.5895 16.1 12.9295 13H17.9995V16Z"
                fill="url(#paint0_linear_2901_13158)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_2901_13158"
                x1="11.9995"
                y1="1"
                x2="11.9995"
                y2="23"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D77568" />
                <stop offset="1" stop-color="#DF5B49" />
              </linearGradient>
              <clipPath id="clip0_2901_13158">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(-0.000473022)"
                />
              </clipPath>
            </defs>
          </svg>

          <h1 className=" text-lg md:text-xl font-medium">
            Token Locks & Vesting
          </h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Manage your token details, authorities, and tokenomics from one
          integrated panel.
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/launch/bg/vesting.png"
          height={600}
          width={600}
          alt="guac background"
          className="absolute top-0 left-0 h-[600px] w-full p-4 opacity-30"
        />
      </div>
    </div>
  );
};

export default TokenLocksContentCard;
