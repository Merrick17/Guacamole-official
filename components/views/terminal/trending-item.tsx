import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useJupiterApiContext } from "../trade/src/contexts";
import { Loader2 } from "lucide-react";
import numeral from "numeral";

type TrendingItemProps = {
  className?: string;
  sellTokenSymbol: string;
  buyTokenSymbol: string;
  volume?: number;
};

const TrendingItem: React.FC<TrendingItemProps> = ({
  className,
  sellTokenSymbol,
  buyTokenSymbol,
  volume,
}) => {
  const { tokenMap } = useJupiterApiContext();
  const sellToken = tokenMap.get(sellTokenSymbol);
  const buyToken = tokenMap.get(buyTokenSymbol);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  return (
    <div className="p-6 hover:border-2 rounded-lg backdrop:blur-sm lg:shadow-lg hover:border-primary lg:drop-shadow-[0_2px_12px_12px_rgba(0,0,0,0.75)] px-3 py-[10px] bg-background flex items-center justify-between gap-4 w-full cursor-pointer">
      <div className="flex flex-row items-center gap-1 lg:gap-3">
        {sellToken && buyToken && (
          <>
            {imagesLoaded < 2 ? (
              <Loader2 className="w-5 h-5 lg:w-10 lg:h-10 rounded-full animate-spin" />
            ) : (
              <>
                <img
                  src={sellToken.logoURI}
                  className="w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] rounded-full"
                  alt="logo"
                  onLoad={handleImageLoad}
                />
                <img
                  src={buyToken.logoURI}
                  className="w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] rounded-full"
                  alt="logo"
                  onLoad={handleImageLoad}
                />
              </>
            )}
          </>
        )}

        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center text-xs gap-1 lg:gap-2">
            <h1 className="font-medium">
              {sellToken?.symbol}/ {buyToken?.symbol}
            </h1>
          </div>
          <p className="text-muted-foreground text-ellipsis overflow-hidden">
            {"$" + numeral(volume).format("0,0.000")}
          </p>
        </div>
      </div>
      <Link
        href={`/terminal?outputMint=${buyTokenSymbol}&inputMint=${sellTokenSymbol}`}
      >
        <Button className="h-6 px-3 lg:h-6 lg:px-4 lg:py-2 guac-bg">Trade</Button>
      </Link>
    </div>
  );
};

export default TrendingItem;
