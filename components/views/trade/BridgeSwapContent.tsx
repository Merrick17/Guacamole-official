import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

interface BridgeSwapContentProps extends React.HTMLAttributes<any> {}

const BridgeSwapContent: FunctionComponent<BridgeSwapContentProps> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/trade/bridge"}
      className={cn(
        "flex flex-col  min-h-[400px]  bg-[#141414] transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-2 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2  p-4 md:p-8">
        <header className="flex flex-col items-center  gap-3 ">
          <div className="bg-background h-12 w-12 rounded-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
            >
              <rect x="0.470001" width="48" height="48" rx="8" fill="#0F0F0F" />
              <path
                d="M21.8843 19.755L14.1143 12L11.9993 14.115L19.7543 21.87L21.8843 19.755ZM27.7493 12L30.8093 15.06L11.9993 33.885L14.1143 36L32.9393 17.19L35.9993 20.25V12H27.7493ZM28.2443 26.115L26.1293 28.23L30.8243 32.925L27.7493 36H35.9993V27.75L32.9393 30.81L28.2443 26.115Z"
                fill="url(#paint0_linear_3275_6715)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3275_6715"
                  x1="23.9993"
                  y1="12"
                  x2="23.9993"
                  y2="36"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#BBB0DB" />
                  <stop offset="1" stop-color="#8F6FED" />
                </linearGradient>
              </defs>
            </svg>
            {/* <Image
              src="/images/trade/bridge_icon.svg"
              width={24}
              height={24}
              alt="play logo"
            /> */}
          </div>
          <h1 className=" text-lg md:text-xl font-medium">Bridge Swap</h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Bridge your ETH, BNB, AVAX, and ARB to Solana and pick up tokens like
          GUAC.
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/trade/bg/bridge.png"
          height={300}
          width={300}
          alt="guac background"
          className="absolute top-0 left-0 h-[300px] w-full p-4 opacity-30 "
        />
      </div>
    </Link>
  );
};

export default BridgeSwapContent;
