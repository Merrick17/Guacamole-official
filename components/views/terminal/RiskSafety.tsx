"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FC } from "react";
import Container from "../../common/container";
import { JupiterApiProvider } from "../trade/src/contexts";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";
import { useSelectedToken } from "@/context/coin-details";
import { abbreviate } from "../trade/src/utils/abbreviate";
import numeral from "numeral";
import { Skeleton } from "@/components/ui/skeleton";
interface RiskSafetyProps {
  className?: string;
}
// USDC, USDT, USDCet, mSOL, bSOL, JitoSOL, stSOL, UXD, ETH, USDTet

const RiskSafety: FC<RiskSafetyProps> = ({ className }) => {
  const { tokenInfo, selectedToken } = useSelectedToken();
  const calculateTotalPercentage = () => {
    let totalPercentage = 0;

    try {
      if (tokenInfo) {
        totalPercentage = tokenInfo.holders
          .slice(0, 10)
          .reduce((accumulator, elm) => {
            const percentage =
              (elm.amount / tokenInfo.totalSupply.uiAmount) * 100;
            return accumulator + percentage;
          }, 0);
      }
    } catch (error) {}
    return totalPercentage;
  };
  return (
    <JupiterApiProvider>
      <Container
        className={cn(
          "flex flex-col max-h-[580px] bg-foreground gap-5  ",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className=" text-black">
            <Badge>Risks & Safety</Badge>
          </div>
          <div className=" text-black">
            <Badge
              className="bg-[#BBB0DB] cursor-pointer"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open(
                    `https://solscan.io/token/${selectedToken.address}`
                  );
                }
              }}
            >
              View Explorer
            </Badge>
          </div>
        </div>
        {/* <div className="flex flex-col items-start justify-start space-y-4 border border-background rounded-xl p-3">
          <h1 className="text-[12px] text-[#FCFCFC] ">
            Risk Analysis (Ripe Or Rotten)
          </h1>
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Risk Score
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Guacamole
            </div>
          </div>
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Mintable
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Guacamole
            </div>
          </div>
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Mutable Info
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Guacamole
            </div>
          </div>
          <div className="flex items-center justify-between text-xs  text-muted-foreground w-full ">
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Ownership Renounced
            </div>
            <div className="text-muted-foreground max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              Guacamole
            </div>
          </div>
        </div> */}
        {tokenInfo ? (
          <div className="flex flex-col items-start justify-start space-y-4 border border-background rounded-xl p-3">
            <h1 className="text-[12px] text-[#FCFCFC] ">
              Top 10 Holders ({calculateTotalPercentage().toFixed(3)})
            </h1>
            <div className="grid grid-cols-3 gap-1 p-1 w-full max-h-[440px] overflow-y-auto no-scrollbar">
              <div className="col-span-1  p-2 text-left">
                <span className="text-muted-foreground text-[12px]">
                  Account
                </span>
              </div>
              <div className="col-span-1  p-2 text-center">
                <span className="text-muted-foreground  text-[12px]">
                  Amount
                </span>{" "}
              </div>
              <div className="col-span-1  p-2 text-right">
                {" "}
                <span className="text-muted-foreground  text-[12px]">
                  Percentage
                </span>
              </div>

              {tokenInfo.holders.slice(0, 10).map((elm) => (
                <>
                  {" "}
                  <div className="col-span-1 p-2 text-left">
                    <div className="text-xs flex items-center bg-[#0F0F0F] text-primary  rounded-sm px-2 py-1 ">
                      <Link
                        href={`https://explorer.solana.com/address/${elm.address}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-xs flex items-center text-primary  rounded-[4px] px-2 py-[2px] "
                      >
                        <span className=" max-w-[22px]  lg:max-w-[44px] text-ellipsis overflow-hidden">
                          {abbreviate(elm.address)}
                        </span>
                        <BiLinkExternal />
                      </Link>
                    </div>
                  </div>
                  <div className="col-span-1 p-2 text-center">
                    {" "}
                    <span className="text-muted-foreground  text-[12px]">
                      {numeral(elm.amount).format("0,0")}
                    </span>
                  </div>
                  <div className="col-span-1 p-2 text-right">
                    <span className="text-muted-foreground  text-[12px]">
                      {(
                        (elm.amount / tokenInfo.totalSupply.uiAmount) *
                        100
                      ).toFixed(3)}
                      %
                    </span>
                  </div>
                </>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-[10px] w-full max-h-[530px] overflow-auto no-scrollbar">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="w-full min-h-[92px]" />
            ))}
          </div>
        )}
      </Container>
    </JupiterApiProvider>
  );
};

export default RiskSafety;
