import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

interface MultiSenderCardContentProps extends React.HTMLAttributes<any> {}

const MultiSenderCardContent: FunctionComponent<
  MultiSenderCardContentProps
> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/tools/token-multi-sender"}
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
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <rect width="48" height="48" rx="8" fill="#0F0F0F" />
              <path
                d="M25.3333 18H32V20.6667H25.3333V18ZM25.3333 27.3333H32V30H25.3333V27.3333ZM33.3333 12H14.6667C13.2 12 12 13.2 12 14.6667V33.3333C12 34.8 13.2 36 14.6667 36H33.3333C34.8 36 36 34.8 36 33.3333V14.6667C36 13.2 34.8 12 33.3333 12ZM33.3333 33.3333H14.6667V14.6667H33.3333V33.3333ZM22.6667 16H16V22.6667H22.6667V16ZM21.3333 21.3333H17.3333V17.3333H21.3333V21.3333ZM22.6667 25.3333H16V32H22.6667V25.3333ZM21.3333 30.6667H17.3333V26.6667H21.3333V30.6667Z"
                fill="url(#paint0_linear_3293_7866)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3293_7866"
                  x1="24"
                  y1="12"
                  x2="24"
                  y2="36"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFEDD8" />
                  <stop offset="1" stop-color="#FFC582" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className=" text-lg md:text-xl font-medium">Use Multi-Sender</h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Easily send tokens to several different Solana wallets at one time.
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/tools/bg/multi_sender.png"
          height={300}
          width={300}
          alt="guac background"
          className="absolute top-0 left-0 h-[300px] w-full p-4 opacity-30 "
        />
      </div>
    </Link>
  );
};

export default MultiSenderCardContent;
