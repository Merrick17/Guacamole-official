import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaCheck } from "react-icons/fa6";

interface EarnRewardShopProps extends React.HTMLAttributes<any> {}

const EarnRewardShop: FunctionComponent<EarnRewardShopProps> = ({
  className,

  ...props
}) => {
  return (
    <Link
      href={"/explore/shop"}
      className={cn(
        "flex flex-col p-4 bg-[#141414] md:p-8 transition-all duration-300 ease-in-out  border border-transparen hover:border-primary rounded-xl shadow-md gap-12 relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* <Button className="guac-btn w-[131px]  absolute z-20 top-5 right-3 p-3">
        Indepth Insights
      </Button> */}
      <Image
        src="/images/explore/bg/av_card.png"
        width={582}
        height={582}
        alt="guac background"
        className="-z-0 absolute sm:translate-x-1/2 bottom-[-100px] opacity-30  "
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
              d="M33.7368 17.0526H30.9832C31.1221 16.6611 31.2105 16.2316 31.2105 15.7895C31.2105 13.6926 29.5179 12 27.4211 12C26.0947 12 24.9453 12.6821 24.2632 13.7053L23.6316 14.5516L23 13.6926C22.3179 12.6821 21.1684 12 19.8421 12C17.7453 12 16.0526 13.6926 16.0526 15.7895C16.0526 16.2316 16.1411 16.6611 16.28 17.0526H13.5263C12.1242 17.0526 11.0126 18.1768 11.0126 19.5789L11 33.4737C11 34.8758 12.1242 36 13.5263 36H33.7368C35.1389 36 36.2632 34.8758 36.2632 33.4737V19.5789C36.2632 18.1768 35.1389 17.0526 33.7368 17.0526ZM27.4211 14.5263C28.1158 14.5263 28.6842 15.0947 28.6842 15.7895C28.6842 16.4842 28.1158 17.0526 27.4211 17.0526C26.7263 17.0526 26.1579 16.4842 26.1579 15.7895C26.1579 15.0947 26.7263 14.5263 27.4211 14.5263ZM19.8421 14.5263C20.5368 14.5263 21.1053 15.0947 21.1053 15.7895C21.1053 16.4842 20.5368 17.0526 19.8421 17.0526C19.1474 17.0526 18.5789 16.4842 18.5789 15.7895C18.5789 15.0947 19.1474 14.5263 19.8421 14.5263ZM33.7368 33.4737H13.5263V30.9474H33.7368V33.4737ZM33.7368 27.1579H13.5263V19.5789H19.9432L17.3158 23.1537L19.3621 24.6316L23.6316 18.8211L27.9011 24.6316L29.9474 23.1537L27.32 19.5789H33.7368V27.1579Z"
              fill="url(#paint0_linear_3124_365)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3124_365"
                x1="23.6316"
                y1="12"
                x2="23.6316"
                y2="36"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#A8D8AC" />
                <stop offset="1" stop-color="#73D880" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className=" text-lg md:text-2xl lg:text-[32px] font-medium">
          Earn Rewards & Shop
        </h1>
      </header>
      <p className="max-w-xs text-muted-foreground text-sm z-10">
        GUAC.GG helps you earn and redeem rewards, enter raffles and giveaways,
        or easily purchase tons of game keys, gift cards, subscriptions, merch,
        and more!
      </p>
      <ul className="flex flex-col gap-2 z-10 text-sm text-[#fcfcfc]">
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Earn Rewards And Giveaways</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Buy Games And More With Crypto</p>
        </li>
        <li className="flex items-center gap-1">
          <FaCheck color="#ACD8AF" />
          <p>Partnered with Bybit, OKX, And More!</p>
        </li>
      </ul>
    </Link>
  );
};

export default EarnRewardShop;
