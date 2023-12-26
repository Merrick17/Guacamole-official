import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface NoCodeTokenCreatorCardProps extends React.HTMLAttributes<any> {}

const NoCodeTokenCreatorCard: FunctionComponent<
  NoCodeTokenCreatorCardProps
> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/terminal"}
      className={cn(
        "flex flex-col p-4 bg-[#141414] md:p-8 transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-12 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <Button className="launch-bg w-[full]  absolute z-20 top-5 right-3 p-3">
        New And Improved
      </Button>
      <Image
        src="/images/launch/bg/nocode.gif"
        width={382}
        height={362}
        alt="guac background"
        className="-z-0 absolute sm:translate-x-[40%] bottom-[-250px] right-0 opacity-30 rotate-45 "
      />
      <header className="flex flex-col  gap-3 z-10">
        <div className="bg-background h-12 w-12 p-1 rounded-md flex items-center justify-center">
          {/* <Image
            src="/images/themes/green.png"
            width={24}
            height={24}
            alt="guac logo"
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
              d="M35 15.816L21.308 29.52L16.22 24.432L17.912 22.74L21.308 26.136L33.308 14.136L35 15.816ZM23 33.6C17.708 33.6 13.4 29.292 13.4 24C13.4 18.708 17.708 14.4 23 14.4C24.884 14.4 26.648 14.952 28.136 15.9L29.876 14.16C27.92 12.804 25.556 12 23 12C16.376 12 11 17.376 11 24C11 30.624 16.376 36 23 36C25.076 36 27.032 35.472 28.736 34.536L26.936 32.736C25.736 33.288 24.404 33.6 23 33.6ZM31.4 27.6H27.8V30H31.4V33.6H33.8V30H37.4V27.6H33.8V24H31.4V27.6Z"
              fill="url(#paint0_linear_2901_13087)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2901_13087"
                x1="24.2"
                y1="12"
                x2="24.2"
                y2="36"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D6776A" />
                <stop offset="1" stop-color="#DF5C4A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="launch-text-color text-lg md:text-2xl lg:text-[32px] font-medium">
          No-Code Token Creator
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        Looking to create your own SPL or Super Token on Solana? Our no-code
        creation suite allows anyone to create and mint their own token in just
        a matter of two minutes.
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#D6776A" />
          <p>No-Code Creation Tool</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#D6776A" />
          <p>Creates Associated Metadata</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#D6776A" />
          <p>Easy To Understand Inputs</p>
        </li>
      </ul>
    </Link>
  );
};

export default NoCodeTokenCreatorCard;
