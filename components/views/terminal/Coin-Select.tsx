import { useSelectedToken } from "@/context/coin-details";
import { useProduct } from "@/context/dexterity";
import { useWebSocket } from "@/context/websocket";
import { cn } from "@/lib/utils";
import { TokenInfo } from "@solana/spl-token-registry";
import { FC, Fragment, useMemo, useState } from "react";

type CoinSelectProps = {
  token: TokenInfo;
  onClick?: () => void;
  selectedToken: TokenInfo;
};
const CoinSelect: FC<CoinSelectProps> = ({ token, onClick, selectedToken }) => {
  const { poolDetails } = useSelectedToken();

  function getUniqueDexIds(poolInfoArray) {
    // Create a Set to store unique dex IDs
    const uniqueDexIds = new Set();

    // Loop through the poolInfoArray and add unique dex IDs to the Set
    poolInfoArray.forEach((poolInfo) => {
      console.log(poolInfo.relationships.dex.data.id)
      const dexId = poolInfo.relationships.dex.data.id
        ? poolInfo.relationships.dex.data.id.charAt(0).toUpperCase() +
          poolInfo.relationships.dex.data.id.slice(1)
        : "";
      uniqueDexIds.add(dexId);
    });

    // Convert the Set back to an array and return it
    return Array.from(uniqueDexIds);
  }
  return (
    <div className="flex flex-col items-start w-full" onClick={onClick}>
      <div className="flex items-center justify-center gap-1">
        {/* <img src={token.logoURI} className="h-[25px] w-[25px] rounded-full" /> */}
        <p className="left-align  font-medium text-[#FCFCFC]">
          {token ? token.name : ""} ({token ? token.symbol : ""})
        </p>
      </div>

      {selectedToken == token ? (
        <p className="text-muted-foreground text-[10px] ">
          {poolDetails.length != 0 && (getUniqueDexIds(poolDetails)[0] as any)}{" "}
          ({poolDetails.length != 0 && poolDetails[0].attributes.name})
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export { CoinSelect };
