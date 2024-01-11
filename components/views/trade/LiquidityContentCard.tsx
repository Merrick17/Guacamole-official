import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";

interface LiquidityContentCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const LiquidityContentCard: FunctionComponent<LiquidityContentCardProps> = ({
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
      <div
        className={cn(
          " w-full h-full absolute top-0 right-0 bg-hover z-30 justify-center items-center flex-col gap-4 flex opacity-0 hover:opacity-100"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            d="M39.96 0C17.88 0 0 17.92 0 40C0 62.08 17.88 80 39.96 80C62.08 80 80 62.08 80 40C80 17.92 62.08 0 39.96 0ZM40 72C22.32 72 8 57.68 8 40C8 22.32 22.32 8 40 8C57.68 8 72 22.32 72 40C72 57.68 57.68 72 40 72ZM42 20H36V44L57 56.6L60 51.68L42 41V20Z"
            fill="url(#paint0_linear_2924_13496)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2924_13496"
              x1="40"
              y1="0"
              x2="40"
              y2="80"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#BAAEDC" />
              <stop offset="1" stop-color="#8A67EF" />
            </linearGradient>
          </defs>
        </svg>
        <h3 className="trade-text-color">Coming Soon</h3>
      </div>
      <div className="flex flex-col gap-2  p-4 md:p-8">
        <header className="flex flex-col items-center  gap-3 ">
          <div className="bg-background h-12 w-12  rounded-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
            >
              <rect x="0.980011" width="48" height="48" rx="8" fill="#0F0F0F" />
              <path
                d="M32.5823 31.8205C30.6398 31.8205 29.4168 32.4248 28.3377 32.9716C27.4024 33.4464 26.6398 33.8349 25.388 33.8349C24.0931 33.8349 23.3736 33.4752 22.4384 32.9716C21.3593 32.4248 20.1794 31.8205 18.1938 31.8205C16.2082 31.8205 15.0283 32.4248 13.9492 32.9716C13.0139 33.4464 12.2657 33.8349 10.9995 33.8349V36.6406C12.942 36.6406 14.165 36.0363 15.2441 35.4895C16.1794 35.0147 16.9276 34.6262 18.1938 34.6262C19.46 34.6262 20.2082 34.9859 21.1434 35.4895C22.2226 36.0363 23.4024 36.6406 25.388 36.6406C27.3736 36.6406 28.5535 36.0363 29.6326 35.4895C30.5679 35.0147 31.3305 34.6262 32.5823 34.6262C33.8772 34.6262 34.5967 34.9859 35.5319 35.4895C36.6111 36.0363 37.8053 36.6406 39.7765 36.6406V33.8349C38.4816 33.8349 37.7621 33.4752 36.8269 32.9716C35.7477 32.4248 34.5247 31.8205 32.5823 31.8205ZM32.5823 25.4176C30.6398 25.4176 29.4168 26.0363 28.3377 26.5687C27.4024 27.0291 26.6398 27.432 25.388 27.432C24.0931 27.432 23.3736 27.0723 22.4384 26.5687C21.3593 26.0219 20.1794 25.4176 18.1938 25.4176C16.2082 25.4176 15.0283 26.0363 13.9492 26.5687C13.0139 27.0291 12.2657 27.432 10.9995 27.432V30.2377C12.942 30.2377 14.165 29.619 15.2441 29.0867C16.1794 28.5831 16.8988 28.2234 18.1938 28.2234C19.4888 28.2234 20.2082 28.5831 21.1434 29.0867C22.2226 29.6334 23.4024 30.2377 25.388 30.2377C27.3736 30.2377 28.5535 29.619 29.6326 29.0867C30.5679 28.5831 31.2873 28.2234 32.5823 28.2234C33.8772 28.2234 34.5967 28.5831 35.5319 29.0867C36.6111 29.6334 37.8053 30.2377 39.7765 30.2377V27.432C38.4816 27.432 37.7621 27.0723 36.8269 26.5687C35.7477 26.0219 34.5247 25.4176 32.5823 25.4176ZM36.8269 13.7917C35.7477 13.2449 34.5535 12.6406 32.5823 12.6406C30.6111 12.6406 29.4168 13.2449 28.3377 13.7917C27.4024 14.2521 26.6398 14.655 25.388 14.655C24.0931 14.655 23.3736 14.2953 22.4384 13.7917C21.3593 13.2593 20.1794 12.6406 18.1938 12.6406C16.2082 12.6406 15.0283 13.2449 13.9492 13.7917C13.0139 14.2665 12.2657 14.655 10.9995 14.655V17.432C12.942 17.432 14.165 16.8133 15.2441 16.2809C16.1794 15.8061 16.9276 15.4176 18.1938 15.4176C19.46 15.4176 20.2082 15.7773 21.1434 16.2809C22.2226 16.8277 23.4024 17.432 25.388 17.432C27.3736 17.432 28.5535 16.8133 29.6326 16.2809C30.5679 15.8205 31.3305 15.4176 32.5823 15.4176C33.8772 15.4176 34.5967 15.7773 35.5319 16.2809C36.6111 16.8277 37.8053 17.432 39.7765 17.432V14.6262C38.4816 14.6262 37.7621 14.2665 36.8269 13.7917ZM32.5823 19.0147C30.6398 19.0147 29.4168 19.6334 28.3377 20.1658C27.4024 20.6694 26.683 21.0291 25.388 21.0291C24.0931 21.0291 23.3736 20.6694 22.4384 20.1658C21.3593 19.619 20.1794 19.0147 18.1938 19.0147C16.2082 19.0147 15.0283 19.6334 13.9492 20.1658C13.0139 20.6694 12.2945 21.0291 10.9995 21.0291V23.8349C12.942 23.8349 14.165 23.2162 15.2441 22.6838C16.1794 22.2234 16.942 21.8205 18.1938 21.8205C19.4456 21.8205 20.2082 22.1802 21.1434 22.6838C22.2226 23.2306 23.4024 23.8349 25.388 23.8349C27.3736 23.8349 28.5535 23.2162 29.6326 22.6838C30.5679 22.2234 31.3305 21.8205 32.5823 21.8205C33.8772 21.8205 34.5967 22.1802 35.5319 22.6838C36.6111 23.2306 37.8053 23.8349 39.7765 23.8349V21.0291C38.4816 21.0291 37.7621 20.6694 36.8269 20.1658C35.7477 19.619 34.5247 19.0147 32.5823 19.0147Z"
                fill="url(#paint0_linear_3275_6738)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3275_6738"
                  x1="25.388"
                  y1="12.6406"
                  x2="25.388"
                  y2="36.6406"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#BBB0DB" />
                  <stop offset="1" stop-color="#9578EB" />
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
          <h1 className=" text-lg md:text-xl font-medium">Liquidity Pools</h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Supply liquidity in aggregated pools to earn trading fees and
          incentives.
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/trade/bg/pools.png"
          height={300}
          width={300}
          alt="guac background"
          className="absolute top-0 left-0 h-[300px] w-full p-4 opacity-30 "
        />
      </div>
    </div>
  );
};

export default LiquidityContentCard;
