"use client";
import { Button } from "@/components/ui/button";
import Trade from "@/components/views/trade/src/Trade";
import SwapCharts from "@/components/views/trade/swap-charts";
import TrendingSwap from "@/components/views/trade/trending-swap";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";

const Swap = () => {
  const [showCharts, setShowCharts] = useState(false);
  return (
    <>
      <main className="container mx-auto  items-center flex flex-col  gap-14 p-3 lg:px-8 py-6 md:px-16 md:py-12 w-full  max-w-[1200px] sm:px-3">
        <div
          className={cn(
            "grid grid-cols-1 gap-[40px] max-w-[462px] w-full place-content-center",
            showCharts && "lg:grid-cols-2 max-w-none"
          )}
        >
          <TrendingSwap
            className={cn("col-span-1", showCharts && "lg:col-span-2 ")}
          />

          <div className="relative w-full">
            <Trade />
            <div className="border-2 border-[rgba(168, 168, 168, 0.10)] shadow-md lg:max-w-lg flex-col gap-[15px] rounded-lg bg-foreground bg-cover px-5 py-7 bg-[url('/images/trade/bg/Terminal_On_Swap_Guacamole_Compressed.png')]  mt-10 flex ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="37"
                height="28"
                viewBox="0 0 37 28"
                fill="none"
              >
                <path
                  d="M0 0V28H36.6154V0H0ZM4.30769 23.6923V4.30769H10.7692V23.6923H4.30769ZM15.0769 23.6923V16.1538H21.5385V23.6923H15.0769ZM32.3077 23.6923H25.8462V16.1538H32.3077V23.6923ZM15.0769 11.8462V4.30769H32.3077V11.8462H15.0769Z"
                  fill="url(#paint0_linear_2892_9998)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2892_9998"
                    x1="18.3077"
                    y1="0"
                    x2="18.3077"
                    y2="28"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#A9D8AC" />
                    <stop offset="1" stop-color="#74D881" />
                  </linearGradient>
                </defs>
              </svg>
              <h1 className="text-[24px]">Solana Data Terminal</h1>
              <p className="text-[#A8A8A8] text-[18px]">
                Explore DeFi, Token, and NFT statistics on one convenient panel.
              </p>
              <Button className="max-w-[150px] text-[14px] guac-btn">
                Open Terminal{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <g clip-path="url(#clip0_2892_10004)">
                    <path
                      d="M1.76489 7.88086H13.7649M13.7649 7.88086L9.76489 3.88086M13.7649 7.88086L9.76489 11.8809"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2892_10004">
                      <rect
                        width="14"
                        height="14"
                        fill="white"
                        transform="translate(0.764893 0.880859)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Button>
            </div>
            {/* <Button
              size="icon"
              className="absolute top-1/2 w-6 h-12 -translate-y-1/2 left-full rounded-lg rounded-tl-none rounded-bl-none  z-10"
              onClick={() => setShowCharts((s) => !s)}
            >
              <AiFillCaretRight className={cn(showCharts && "rotate-180 ")} />
            </Button> */}
          </div>
          {/* {showCharts && <SwapCharts />} */}
        </div>
      </main>
    </>
  );
};

export default Swap;
