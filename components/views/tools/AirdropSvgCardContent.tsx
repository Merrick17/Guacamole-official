import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

interface AirdropSvgCardContentProps extends React.HTMLAttributes<any> {}

const AirdropSvgCardContent: FunctionComponent<AirdropSvgCardContentProps> = ({
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
              <rect x="0.980011" width="48" height="48" rx="8" fill="#0F0F0F" />
              <path
                d="M15.2967 17.4629L23.8795 21.1429L15.2853 20L15.2967 17.4629ZM23.8681 27.4286L15.2853 31.1086V28.5714L23.8681 27.4286ZM13.011 14L12.9995 22L30.1424 24.2857L12.9995 26.5714L13.011 34.5714L36.9995 24.2857L13.011 14Z"
                fill="url(#paint0_linear_3293_7877)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3293_7877"
                  x1="24.9995"
                  y1="14"
                  x2="24.9995"
                  y2="34.5714"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFEDD8" />
                  <stop offset="1" stop-color="#FFC582" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className=" text-lg md:text-xl font-medium">Airdrop via CSV</h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Send tokens to addresses via an uploadable .csv template
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/tools/bg/airdrop.png"
          height={300}
          width={300}
          alt="guac background"
          className="absolute top-0 left-0 h-[300px] w-full p-4 opacity-30 "
        />
      </div>
    </Link>
  );
};

export default AirdropSvgCardContent;
