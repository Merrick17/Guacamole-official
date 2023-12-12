import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";

interface PeerToPeerContentCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const PeerToPeerContentCard: FunctionComponent<PeerToPeerContentCardProps> = ({
  className,

  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col  min-h-[400px]   bg-[#141414] transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-2 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <Button className="trade-bg w-[35px] h-[35px] absolute top-5 right-1 p-3">
        <Image src={"/images/trade/clock.svg"} alt="" width={20} height={20} />
      </Button>
      <div className="flex flex-col gap-2  p-4 md:p-8">
        <header className="flex flex-col items-center  gap-3 ">
          <div className="bg-background h-12 w-12 p-3 rounded-md flex items-center justify-center">
            <Image
              src="/images/trade/peer_to_peer.svg"
              width={24}
              height={24}
              alt="manage logo"
            />
          </div>
          <h1 className=" text-lg md:text-xl font-medium">
            Peer-To-Peer Swaps
          </h1>
        </header>
        <p className=" text-center sm:max-w-xs text-muted-foreground text-sm  h-9 overflow-hidden text-ellipsis  ">
          Safely swap tokens and NFTs in a peer to peer setting.
        </p>
      </div>
      <div className="relative ">
        <Image
          src="/images/trade/bg/peer.png"
          height={398}
          width={300}
          alt="guac background"
          className="absolute top-0 left-0 h-[398] w-full p-4 opacity-30"
        />
      </div>
    </div>
  );
};

export default PeerToPeerContentCard;
