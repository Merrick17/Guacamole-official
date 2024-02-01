import { useProduct } from "@/context/dexterity";
import { useSetting } from "@/context/setting";
import { cn } from "@/lib/utils";
import { FC, Fragment, useMemo, useState } from "react";

type RipeRottenSelectCoinProps = {
  coin: string[];
  onClick?: () => void;
};

const RipeRottenSelectCoin: FC<RipeRottenSelectCoinProps> = ({
  coin,
  onClick,
}) => {
  const { selectedNetwork, selectedParimutuel } = useSetting();
  return (
    <div className="flex flex-col items-start w-full " onClick={onClick}>
      <p className="left-align text-muted-foreground font-medium">
        {coin.map((item, index) => (
          <Fragment key={index.toString()}>
            {index !== 0 && index !== coin.length && <span> | </span>}
            <span key={index} className={cn(index === 0 && "text-[#fcfcfc]")}>
              {item}
            </span>
          </Fragment>
        ))}
      </p>

      <p className="text-muted-foreground text-[10px] ">
        SETTLLEMENT: <span>{selectedNetwork} </span>
      </p>
    </div>
  );
};

export { RipeRottenSelectCoin };
