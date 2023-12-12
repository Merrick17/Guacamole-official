import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface LaunchContentCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const LaunchContentCard: FunctionComponent<LaunchContentCardProps> = ({
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
      <Image
        src="/images/home/launch-bg.png"
        width={582}
        height={582}
        alt="launch background"
        className="-z-0 absolute sm:translate-x-1/2 sm:translate-y-1/4 opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
          <Image
            src="/images/themes/red.png"
            width={24}
            height={24}
            alt="launch logo"
          />
        </div>
        <h1 className="text-lg md:text-2xl lg:text-[32px] font-medium">
          Launch And Lock
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        Introducing a fresh and spicy way to launch your token or NFT project
        with easy-to-follow walk-throughs. The no-code interfaces make it easier
        to get off the ground, lock liquidity, and start token distribution.
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#D6776A" />
          <p>No-Code Token Creator</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#D6776A" />
          <p>Token Management</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#D6776A" />
          <p>Liquidity Lockers</p>
        </li>
      </ul>
    </div>
  );
};

export default LaunchContentCard;
