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
      <div
        className={cn(
          " w-full h-full absolute top-0 right-0 bg-hover z-30 justify-center items-center flex-col gap-4 flex opacity-0 hover:opacity-100"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            d="M39.96 0C17.88 0 0 17.92 0 40C0 62.08 17.88 80 39.96 80C62.08 80 80 62.08 80 40C80 17.92 62.08 0 39.96 0ZM40 72C22.32 72 8 57.68 8 40C8 22.32 22.32 8 40 8C57.68 8 72 22.32 72 40C72 57.68 57.68 72 40 72ZM42 20H36V44L57 56.6L60 51.68L42 41V20Z"
            fill="url(#paint0_linear_2924_13496)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2924_13496"
              x1="40"
              y1="0"
              x2="40"
              y2="80"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#BAAEDC" />
              <stop offset="1" stop-color="#8A67EF" />
            </linearGradient>
          </defs>
        </svg>
        <h3 className="trade-text-color">Coming Soon</h3>
      </div>
      <Button className="trade-bg w-[37px] h-[26px] absolute top-2  right-2 p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M7.24112 4.29222H6.201V8.4527L9.49471 10.4289L10.0148 9.57603L7.24112 7.93264V4.29222ZM10.5952 0L13.7897 2.66617L12.9021 3.73056L9.70551 1.06578L10.5952 0ZM3.19368 0L4.08263 1.06508L0.887385 3.73056L-0.000183105 2.66548L3.19368 0ZM6.89442 1.51857C3.44816 1.51857 0.653705 4.31303 0.653705 7.75929C0.653705 11.2055 3.44816 14 6.89442 14C10.3407 14 13.1351 11.2055 13.1351 7.75929C13.1351 4.31303 10.3407 1.51857 6.89442 1.51857ZM6.89442 12.6132C4.21785 12.6132 2.04053 10.4359 2.04053 7.75929C2.04053 5.08271 4.21785 2.9054 6.89442 2.9054C9.57099 2.9054 11.7483 5.08271 11.7483 7.75929C11.7483 10.4359 9.57099 12.6132 6.89442 12.6132Z"
            fill="black"
          />
        </svg>
        {/* <Image src={"/images/trade/clock.svg"} alt="" width={20} height={20} /> */}
      </Button>
      <div className="flex flex-col gap-2  p-4 md:p-8">
        <header className="flex flex-col items-center  gap-3 ">
          <div className="bg-background h-12 w-12  rounded-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
            >
              <rect x="0.97998" width="48" height="48" rx="8" fill="#0F0F0F" />
              <path
                d="M33.0196 33.2454H35.9141V35.6575H28.6779V28.4213H31.09V31.7138C33.297 29.9409 34.7081 27.2394 34.7081 24.2002C34.7081 19.2917 31.0176 15.2273 26.2658 14.6364V12.2002C32.3563 12.8032 37.1201 17.9409 37.1201 24.2002C37.1201 27.8062 35.5282 31.0384 33.0196 33.2454ZM15.4116 24.2002C15.4116 21.161 16.8226 18.4474 19.0297 16.6866V19.9791H21.4417V12.7429H14.2055V15.155H17.1C14.5915 17.362 12.9995 20.5942 12.9995 24.2002C12.9995 30.4595 17.7633 35.5972 23.8538 36.2002V33.764C19.102 33.1731 15.4116 29.1087 15.4116 24.2002ZM30.1734 19.5087L23.3472 26.3349L19.9342 22.9218L18.2337 24.6223L23.3472 29.7359L31.8739 21.2092L30.1734 19.5087Z"
                fill="url(#paint0_linear_3275_6750)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3275_6750"
                  x1="25.0598"
                  y1="12.2002"
                  x2="25.0598"
                  y2="36.2002"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#BBB0DB" />
                  <stop offset="1" stop-color="#9578EB" />
                </linearGradient>
              </defs>
            </svg>
            {/* <Image
              src="/images/trade/peer_to_peer.svg"
              width={24}
              height={24}
              alt="manage logo"
            /> */}
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
