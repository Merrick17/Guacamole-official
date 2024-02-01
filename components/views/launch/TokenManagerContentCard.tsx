import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

interface TokenManagerContentCardProps extends React.HTMLAttributes<any> {}

const TokenManagerContentCard: FunctionComponent<
  TokenManagerContentCardProps
> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/launch/token-creator?active=2"}
      className={cn(
        "flex flex-col  min-h-[400px]  bg-[#141414] transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-2 relative overflow-hidden",
        className
      )}
      {...props}
    >
      {" "}
      <Button className="launch-bg w-[37px] h-[26px] absolute top-2  right-2 p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M7.24112 4.29222H6.201V8.4527L9.49471 10.4289L10.0148 9.57603L7.24112 7.93264V4.29222ZM10.5952 0L13.7897 2.66617L12.9021 3.73056L9.70551 1.06578L10.5952 0ZM3.19368 0L4.08263 1.06508L0.887385 3.73056L-0.000183105 2.66548L3.19368 0ZM6.89442 1.51857C3.44816 1.51857 0.653705 4.31303 0.653705 7.75929C0.653705 11.2055 3.44816 14 6.89442 14C10.3407 14 13.1351 11.2055 13.1351 7.75929C13.1351 4.31303 10.3407 1.51857 6.89442 1.51857ZM6.89442 12.6132C4.21785 12.6132 2.04053 10.4359 2.04053 7.75929C2.04053 5.08271 4.21785 2.9054 6.89442 2.9054C9.57099 2.9054 11.7483 5.08271 11.7483 7.75929C11.7483 10.4359 9.57099 12.6132 6.89442 12.6132Z"
            fill="black"
          />
        </svg>
        {/* <Image src={"/images/trade/clock.svg"} alt="" width={20} height={20} /> */}
      </Button>
      <div className="flex flex-col gap-2  p-4 md:p-8">
        <header className="flex flex-col items-center  gap-3 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <rect width="48" height="48" rx="8" fill="#0F0F0F" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M35 12H13.6667C12.2 12 11 13.2 11 14.6667V33.3333C11 34.8 12.2 36 13.6667 36H35C36.4667 36 37.6667 34.8 37.6667 33.3333V14.6667C37.6667 13.2 36.4667 12 35 12ZM35 33.3333H13.6667V14.6667H35V33.3333Z"
              fill="url(#paint0_linear_2901_13137)"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M34.2133 21.8933L32.32 20L28.0933 24.2267L26.2133 22.3333L24.3333 24.2133L28.0933 28L34.2133 21.8933Z"
              fill="url(#paint1_linear_2901_13137)"
            />
            <path
              d="M21.6667 17.334H15V20.0007H21.6667V17.334Z"
              fill="url(#paint2_linear_2901_13137)"
            />
            <path
              d="M21.6667 22.666H15V25.3327H21.6667V22.666Z"
              fill="url(#paint3_linear_2901_13137)"
            />
            <path
              d="M21.6667 28H15V30.6667H21.6667V28Z"
              fill="url(#paint4_linear_2901_13137)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2901_13137"
                x1="24.3333"
                y1="12"
                x2="24.3333"
                y2="36"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D77668" />
                <stop offset="1" stop-color="#E05846" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2901_13137"
                x1="29.2733"
                y1="20"
                x2="29.2733"
                y2="28"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D77668" />
                <stop offset="1" stop-color="#E05846" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2901_13137"
                x1="18.3333"
                y1="17.334"
                x2="18.3333"
                y2="20.0007"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D77668" />
                <stop offset="1" stop-color="#E05846" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_2901_13137"
                x1="18.3333"
                y1="22.666"
                x2="18.3333"
                y2="25.3327"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D77668" />
                <stop offset="1" stop-color="#E05846" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_2901_13137"
                x1="18.3333"
                y1="28"
                x2="18.3333"
                y2="30.6667"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D77668" />
                <stop offset="1" stop-color="#E05846" />
              </linearGradient>
            </defs>
          </svg>

          <h1 className=" text-lg md:text-xl font-medium">Token Manager</h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Manage your token details, authorities, and tokenomics from one
          integrated panel.
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/launch/bg/tokenmanager.png"
          height={700}
          width={600}
          alt="guac background"
          className="absolute top-0 left-0 h-[600px] w-full p-4 opacity-30"
        />
      </div>
    </Link>
  );
};

export default TokenManagerContentCard;
