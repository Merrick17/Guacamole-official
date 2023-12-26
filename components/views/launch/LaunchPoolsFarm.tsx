import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";

interface LaunchPoolsFarmProps extends React.HTMLAttributes<HTMLDivElement> {}

const LaunchPoolsFarm: FunctionComponent<LaunchPoolsFarmProps> = ({
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
        

          <h1 className=" text-lg md:text-xl font-medium">
            Launch Pools & Farms
          </h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Create liquidity pools and farms on Guacamole and other platforms.
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/launch/bg/pools.png"
          height={224}
          width={311}
          alt="guac background"
          className="absolute top-0 left-0 h-[600px] w-full p-4 opacity-30"
        />
      </div>
    </div>
  );
};

export default LaunchPoolsFarm;
