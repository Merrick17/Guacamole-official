import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";

interface LaunchNftFarmCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const LaunchNftFarmCard: FunctionComponent<LaunchNftFarmCardProps> = ({
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
              d="M33.3333 14.6667V33.3333H14.6667V14.6667H33.3333ZM33.3333 12H14.6667C13.2 12 12 13.2 12 14.6667V33.3333C12 34.8 13.2 36 14.6667 36H33.3333C34.8 36 36 34.8 36 33.3333V14.6667C36 13.2 34.8 12 33.3333 12ZM26.8533 23.8133L22.8533 28.9733L20 25.52L16 30.6667H32L26.8533 23.8133Z"
              fill="url(#paint0_linear_2901_13173)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2901_13173"
                x1="24"
                y1="12"
                x2="24"
                y2="36"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D77466" />
                <stop offset="1" stop-color="#E05A48" />
              </linearGradient>
            </defs>
          </svg>

          <h1 className=" text-lg md:text-xl font-medium">Launch NFT Farm</h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Create your own Tokenized NFT Farm to reward token stakers with NFTs.
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/launch/bg/nft.png"
          height={800}
          width={600}
          alt="guac background"
          className="absolute top-0 left-0 h-[600px] w-full p-4 opacity-30"
        />
      </div>
    </div>
  );
};

export default LaunchNftFarmCard;
