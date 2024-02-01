import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface MainTradeContentCardProps extends React.HTMLAttributes<any> {}

const MainTradeContentCard: FunctionComponent<MainTradeContentCardProps> = ({
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
      <Button className="max-w-[140px] absolute right-2 z-30 trade-bg h-[32px] top-3 font-[500]">
        Fast And Simple!
      </Button>
      <Image
        src="/images/trade/bg/main.gif"
        width={582}
        height={582}
        alt="guac background"
        className="-z-0 absolute sm:translate-x-1/2 rotate-45 opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="none"
          >
            <path
              d="M4.8 6H16.8V9.6L21.6 4.8L16.8 0V3.6H2.4V10.8H4.8V6ZM16.8 18H4.8V14.4L0 19.2L4.8 24V20.4H19.2V13.2H16.8V18Z"
              fill="url(#paint0_linear_3275_6668)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3275_6668"
                x1="10.8"
                y1="0"
                x2="10.8"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#BBB0DB" />
                <stop offset="1" stop-color="#8D6BEE" />
              </linearGradient>
            </defs>
          </svg>
          {/* <Image
            src="/images/trade/swap.svg"
            width={24}
            height={24}
            alt="guac logo"
          /> */}
        </div>
        <h1 className="trade-text-color text-lg md:text-2xl lg:text-[32px] font-medium">
          Swap With Guacamole
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        Looking to make a trade? Our swap interface provides a simple and fast
        way to get from one token to another with the best fees and trade
        routing through multiple DEXs at once.
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#BBB0DB" />
          <p>Simple And Straightforward</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#BBB0DB" />
          <p>Built-in Data Comparisons</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#BBB0DB" />
          <p>Best Routing With Jup v6</p>
        </li>
      </ul>
    </Link>
  );
};

export default MainTradeContentCard;
