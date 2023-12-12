import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface MainTradeContentCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const MainTradeContentCard: FunctionComponent<MainTradeContentCardProps> = ({
  className,

  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col p-4 bg-[#141414] md:p-8 transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-12 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <Button className="max-w-[134.75px] absolute right-2 z-30 trade-bg ">fast And Simple!</Button>
      <Image
        src="/images/trade/bg/main.gif"
        width={582}
        height={582}
        alt="guac background"
        className="-z-0 absolute sm:translate-x-1/2 rotate-45 opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
          <Image
            src="/images/trade/swap.svg"
            width={24}
            height={24}
            alt="guac logo"
          />
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
    </div>
  );
};

export default MainTradeContentCard;
