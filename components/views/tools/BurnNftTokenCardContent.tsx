import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

interface BurnNftTokenCardContentProps extends React.HTMLAttributes<any> {}

const BurnNftTokenCardContent: FunctionComponent<
  BurnNftTokenCardContentProps
> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/tools/burn-nft-token"}
      className={cn(
        "flex flex-col  min-h-[400px]  bg-[#141414] transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-2 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2  p-4 md:p-8">
        <header className="flex flex-col items-center  gap-3 ">
          <div className="bg-background  p-3 rounded-md flex items-center justify-center">
            {/* <Image
              src="/images/trade/bridge_icon.svg"
              width={24}
              height={24}
              alt="play logo"
            /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
            >
              <rect x="0.97998" width="48" height="48" rx="8" fill="#0F0F0F" />
              <path
                d="M15.3995 14.4H23.7995V12H15.3995C14.0795 12 12.9995 13.08 12.9995 14.4V22.8H15.3995V14.4ZM22.5995 25.2L17.7995 31.2H32.1995L28.5995 26.4L26.1635 29.652L22.5995 25.2ZM30.9995 19.8C30.9995 18.804 30.1955 18 29.1995 18C28.2035 18 27.3995 18.804 27.3995 19.8C27.3995 20.796 28.2035 21.6 29.1995 21.6C30.1955 21.6 30.9995 20.796 30.9995 19.8ZM34.5995 12H26.1995V14.4H34.5995V22.8H36.9995V14.4C36.9995 13.08 35.9195 12 34.5995 12ZM34.5995 33.6H26.1995V36H34.5995C35.9195 36 36.9995 34.92 36.9995 33.6V25.2H34.5995V33.6ZM15.3995 25.2H12.9995V33.6C12.9995 34.92 14.0795 36 15.3995 36H23.7995V33.6H15.3995V25.2Z"
                fill="url(#paint0_linear_3293_7855)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3293_7855"
                  x1="24.9995"
                  y1="12"
                  x2="24.9995"
                  y2="36"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFEBD4" />
                  <stop offset="1" stop-color="#FFC785" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className=" text-lg md:text-xl font-medium">
            Burn NFTs & Tokens
          </h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Burn worthless tokens and NFTs to receive GUAC back in return!
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/tools/bg/token_burn.png"
          height={300}
          width={300}
          alt="guac background"
          className="absolute top-0 left-0 h-[300px] w-full p-4 opacity-30 "
        />
      </div>
    </Link>
  );
};

export default BurnNftTokenCardContent;
