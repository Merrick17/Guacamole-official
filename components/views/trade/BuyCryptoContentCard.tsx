import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

interface BuyCryptoContentCardProps
  extends React.HTMLAttributes<any> {}

const BuyCryptoContentCard: FunctionComponent<BuyCryptoContentCardProps> = ({
  className,

  ...props
}) => {
  return (
    <Link href={"/trade/buyandsell"}
      className={cn(
        "flex flex-col  min-h-[400px]  bg-[#141414] transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-2 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2  p-4 md:p-8">
        <header className="flex flex-col items-center  gap-3 ">
          <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              viewBox="0 0 30 24"
              fill="none"
            >
              <path
                d="M26.9995 0H2.99953C1.33453 0 0.014527 1.335 0.014527 3L-0.000473022 21C-0.000473022 22.665 1.33453 24 2.99953 24H26.9995C28.6645 24 29.9995 22.665 29.9995 21V3C29.9995 1.335 28.6645 0 26.9995 0ZM26.9995 21H2.99953V12H26.9995V21ZM26.9995 6H2.99953V3H26.9995V6Z"
                fill="url(#paint0_linear_3275_6727)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3275_6727"
                  x1="14.9995"
                  y1="0"
                  x2="14.9995"
                  y2="24"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#A395C4" />
                  <stop offset="1" stop-color="#8F6EEE" />
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
          <h1 className=" text-lg md:text-xl font-medium">Buy & Use Crypto</h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Providing simple ways to onboard or spend funds in the real world.
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/trade/bg/credit_card.png"
          height={300}
          width={300}
          alt="guac background"
          className="absolute top-0 left-0 h-[300px] w-full p-4 opacity-30 "
        />
      </div>
    </Link>
  );
};

export default BuyCryptoContentCard;
