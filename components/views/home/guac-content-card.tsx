import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface GuacContentCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const GuacContentCard: FunctionComponent<GuacContentCardProps> = ({
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
        src="/images/home/bg.png"
        width={582}
        height={582}
        alt="guac background"
        className="-z-0 absolute sm:translate-x-1/2 rotate-45 opacity-30  "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
          <Image
            src="/images/themes/green.png"
            width={24}
            height={24}
            alt="guac logo"
          />
        </div>
        <h1 className="guac-text-color text-lg md:text-2xl lg:text-[32px] font-medium">
          Explore With Guacamole
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        Experience a fresh take on Solana DeFi with Guacamole. Explore the
        greater Solana ecosystem with our terminal or take a deep dive into the
        GUAC ecosystem and applications.
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Analytics On The Solana Ecosystem</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Take A Guacamole Deep Dive</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Explore New Ways To Interact</p>
        </li>
      </ul>
    </div>
  );
};

export default GuacContentCard;
