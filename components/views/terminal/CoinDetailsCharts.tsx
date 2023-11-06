import { cn } from "@/lib/utils";
import { FC, useCallback, useEffect, useState } from "react";

import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelectedToken } from "@/context/coin-details";
import { convert2, isScientificNotation } from "@/lib/numbers";
import axios from "axios";
import { Raleway } from "next/font/google";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { BsChevronDown } from "react-icons/bs";
import { useJupiterApiContext } from "../trade/src/contexts";
import { CoinSelect } from "./Coin-Select";
interface CoinDetailsChartProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  selectedMint?: string;
}

const RalewayFont = Raleway({
  weight: "700",
  subsets: ["latin"],
});
const CoinDetailsChart: FC<CoinDetailsChartProps> = ({
  className,
  children,
  selectedMint,
}) => {
  const [currentMarketPrice, setCurrentMarketPrice] = useState(0);
  const { tokenList, tokenMap } = useJupiterApiContext();
  const searchParams = useSearchParams();
  const params = useParams();

  const { selectedToken, tokenDetails } = useSelectedToken();
  const router = useRouter();
  const fetchPrice = async () => {
    try {
      if (selectedToken) {
        const { data } = await axios.get(
          `https://price.jup.ag/v4/price?ids=${selectedToken.symbol}`
        );
        setCurrentMarketPrice(data["data"][selectedToken.symbol]["price"]);
       
      }
    } catch (error) {}
  };
  const getTokenPrice = useCallback(() => {
    if (currentMarketPrice == 0) {
      fetchPrice();
    }
    setTimeout(() => {
      fetchPrice();
    }, 60 * 1000);
  }, [selectedToken]);
  useEffect(() => {
  
    getTokenPrice();
  }, [selectedToken]);

  return (
    <Container
      className={cn(
        "flex lg:w-full flex-col gap-10 rounded-lg bg-foreground  max-sm:w-[100%] font-medium",
        className
      )}
    >
      {/* <div className="w-full flex items-center justify-between text-black bg-[#0F0F0F] p-2 rounded-lg"> */}
        {/* <div className="flex  flex-row items-center gap-3">
          {selectedToken && (
            <img
              src={selectedToken.logoURI}
              alt="bitcoin"
              className="w-10 h-10 rounded-full"
            />
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-col px-2 py-2 rounded-lg bg-[#141414] lg:flex-row items-center justify-between gap-4 w-full">
              <CoinSelect
                onClick={() => {}}
                token={selectedToken}
                selectedToken={selectedToken}
              />
              <Button size="icon">
                <BsChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full max-h-[500px] overflow-y-auto">
              {tokenList.map((tkn) => (
                <DropdownMenuItem>
                  <CoinSelect
                    token={tkn}
                    onClick={() => {
                      //selectToken(tkn);
                      router.push(
                        `/terminal/coin/${tkn.address}?outputMint=${tkn.address}`
                      );
                    }}
                    selectedToken={selectedToken}
                  />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
        {/* <div>
          <p className="text-[#BBB0DB] text-3xl font-medium">
            ${" "}
            {tokenDetails
              ? isScientificNotation(currentMarketPrice)
                ? convert2(currentMarketPrice)
                : currentMarketPrice
              : 0}
          </p>
        </div> */}
      {/* </div> */}

      {children}
    </Container>
  );
};

export default CoinDetailsChart;
