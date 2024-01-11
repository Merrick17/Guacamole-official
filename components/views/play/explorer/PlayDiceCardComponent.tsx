import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

interface PlayDiceCardComponentProps extends React.HTMLAttributes<any> {}

const PlayDiceCardComponent: FunctionComponent<PlayDiceCardComponentProps> = ({
  className,

  ...props
}) => {
  return (
    <Link href={"/play/dice"}
      className={cn(
        "flex flex-col  min-h-[400px]  bg-[#141414] transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-2 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2  p-4 md:p-8">
        <header className="flex flex-col items-center  gap-3 ">
          <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
            <Image
              src="/images/play/dice.svg"
              width={24}
              height={24}
              alt="trade logo"
            />
          </div>
          <h1 className=" text-lg md:text-xl font-medium">Play Dice</h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Adjust your slider and roll the dice.
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/play/bg/dice_bg.png"
          height={295}
          width={300}
          alt="guac background"
          className="absolute top-0 left-0 h-[295px] w-full p-4 opacity-30"
        />
      </div>
    </Link>
  );
};

export default PlayDiceCardComponent;