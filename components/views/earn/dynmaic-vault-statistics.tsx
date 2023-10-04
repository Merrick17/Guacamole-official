"use client";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetVaultStatistics } from "@/hooks/use-get-vault-statistics";
import { cn, fromLamports } from "@/lib/utils";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import {
  JupiterApiProvider,
  useJupiterApiContext,
} from "../trade/src/contexts";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import numeral from "numeral";
interface DynamicVaultStatisticsProps {
  className?: string;
}

const DynamicVaultStatistics: FC<DynamicVaultStatisticsProps> = ({
  className,
}) => {
  const { loading, vaultData } = useGetVaultStatistics({
    maxNumberOfTokens: 10,
  });
  useEffect(() => {
    console.log("Vault Data", vaultData);
  }, [loading]);
  return (
    <JupiterApiProvider>
      <Container
        className={cn(
          "flex flex-col  gap-5 overflow-y-auto h-[560px]",
          className
        )}
      >
        <div className="flex flex-row gap-2 items-center">
          <div className="shrink-0 w-5 aspect-square">
            <Image
              src="/images/themes/orange.png"
              width={20}
              height={20}
              alt="trending"
            />
          </div>
          <h1 className="text-xl capitalize">Dynamic Vault Statistics</h1>
        </div>
        <div className="flex flex-col  gap-5 overflow-y-auto no-scrollbar">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="w-full  min-h-[92px]" />
            ))
          ) : (
            <>
              {vaultData
                .sort((itema, itemb) => {
                  return itemb.average_apy - itema.average_apy;
                })
                .map((item, index) => (
                  <DynamicVaultStatisticsItem
                    key={index}
                    apy={item.average_apy}
                    symbol={item.symbol}
                    tvl={item.lp_supply}
                    token_address={item.token_address}
                    vaultInfo={item}
                  />
                ))}
            </>
          )}
        </div>
      </Container>
    </JupiterApiProvider>
  );
};

export default DynamicVaultStatistics;

type DynamicVaultStatisticsItemProps = {
  className?: string;
  tvl: number;
  apy: number;
  symbol: string;
  token_address: string;
  vaultInfo?: any;
};

const DynamicVaultStatisticsItem: FC<DynamicVaultStatisticsItemProps> = ({
  className,
  tvl,
  apy,
  symbol,
  token_address,
  vaultInfo,
}) => {
  const router = useRouter();
  const { tokenMap } = useJupiterApiContext();
  const token = tokenMap.get(token_address);
  const [loading, setLoading] = useState(true);

  return (
    <div className="p-5 flex flex-row justify-between items-center rounded-lg bg-background ">
      <div className="flex flex-row items-center gap-2 lg:gap-5">
        <img
          src={token?.logoURI}
          className="w-5 h-5 lg:w-10 lg:h-10 rounded-full hidden"
          alt="logo"
          onLoad={(e) => {
            setLoading(false);
            e.currentTarget.classList.remove("hidden");
          }}
        />
        {loading && (
          <Loader2 className="w-5 h-5 lg:w-10 lg:h-10rounded-full animate-spin" />
        )}

        <div className="flex flex-col gap-1">
          <p className="uppercase text-xs lg:text-sm">{symbol}</p>
          <p className="text-xs  text-ellipsis overflow-hidden text-muted-foreground">
            TVL:{" "}
            {token && vaultInfo
              ? numeral(
                  vaultInfo.usd_rate *
                    fromLamports(Number(vaultInfo.token_amount), token.decimals)
                ).format("0,0.00")
              : 0}{" "}
            {token && token.symbol}
            {/* {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              compactDisplay: "short",
              notation: "compact",
            }).format(tvl)} */}
          </p>
        </div>
      </div>
      <Button
        className="h-8 px-3 lg:h-10 lg:px-4 lg:py-2"
        onClick={() => {
          router.push(`/earn/single-vault/${token_address}`);
        }}
      >
        {apy.toFixed(2)}% APY
      </Button>
    </div>
  );
};
