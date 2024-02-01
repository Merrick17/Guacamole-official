import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

interface EmergencyCardContentProps extends React.HTMLAttributes<any> {}

const EmergencyCardContent: FunctionComponent<EmergencyCardContentProps> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/tools/emergency-send"}
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
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <rect width="48" height="48" rx="8" fill="#0F0F0F" />
              <path
                d="M36 16.4C36 15.08 34.92 14 33.6 14H14.4C13.08 14 12 15.08 12 16.4V30.8C12 32.12 13.08 33.2 14.4 33.2H33.6C34.92 33.2 36 32.12 36 30.8V16.4ZM33.6 16.4L24 22.4L14.4 16.4H33.6ZM33.6 30.8H14.4V18.8L24 24.8L33.6 18.8V30.8Z"
                fill="url(#paint0_linear_3293_7888)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3293_7888"
                  x1="24"
                  y1="14"
                  x2="24"
                  y2="33.2"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFEDD7" />
                  <stop offset="1" stop-color="#FFC683" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className=" text-lg md:text-xl font-medium">Emergency Send</h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Fear that your wallet may be compromised? Send everything to a new
          wallet quickly.
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/tools/bg/emergency.png"
          height={300}
          width={300}
          alt="guac background"
          className="absolute top-0 left-0 h-[300px] w-full p-4 opacity-30 "
        />
      </div>
    </Link>
  );
};

export default EmergencyCardContent;
