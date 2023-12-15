import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface AvocadoCardContentProps extends React.HTMLAttributes<any> {}

const AvocadoCardContent: FunctionComponent<AvocadoCardContentProps> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/explore/avotars"}
      className={cn(
        "flex flex-col p-4 bg-[#141414] md:p-8 transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-12 relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* <Button className="guac-btn w-[131px]  absolute z-50 top-5 right-3 p-3">
        Indepth Insights
      </Button> */}
      <Image
        src="/images/explore/bg/avocado.png"
        width={451}
        height={570}
        alt="guac background"
        className="-z-0 absolute sm:translate-x-[60%] bottom-[-100px] opacity-30  "
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
              d="M24 12C17.376 12 12 17.376 12 24C12 30.624 17.376 36 24 36C30.624 36 36 30.624 36 24C36 17.376 30.624 12 24 12ZM18.084 31.536C18.6 30.456 21.744 29.4 24 29.4C26.256 29.4 29.412 30.456 29.916 31.536C28.284 32.832 26.232 33.6 24 33.6C21.768 33.6 19.716 32.832 18.084 31.536ZM31.632 29.796C29.916 27.708 25.752 27 24 27C22.248 27 18.084 27.708 16.368 29.796C15.144 28.188 14.4 26.184 14.4 24C14.4 18.708 18.708 14.4 24 14.4C29.292 14.4 33.6 18.708 33.6 24C33.6 26.184 32.856 28.188 31.632 29.796ZM24 16.8C21.672 16.8 19.8 18.672 19.8 21C19.8 23.328 21.672 25.2 24 25.2C26.328 25.2 28.2 23.328 28.2 21C28.2 18.672 26.328 16.8 24 16.8ZM24 22.8C23.004 22.8 22.2 21.996 22.2 21C22.2 20.004 23.004 19.2 24 19.2C24.996 19.2 25.8 20.004 25.8 21C25.8 21.996 24.996 22.8 24 22.8Z"
              fill="url(#paint0_linear_3124_340)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3124_340"
                x1="24"
                y1="12"
                x2="24"
                y2="36"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#A8D8AC" />
                <stop offset="1" stop-color="#75D881" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className=" text-lg md:text-2xl lg:text-[32px] font-medium">
          Avotar Collection
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        More than a community! Your AVOtar becomes a gateway to features, social
        loyalty programs, unique giveaways, raffles, merchandise, and so much
        more.
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>A Fresher Way To Represent</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Unlock Special Rewards & Features</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Rebates, Bonuses, And More!</p>
        </li>
      </ul>
    </Link>
  );
};

export default AvocadoCardContent;
