import { useProduct } from "@/context/dexterity";
import { useWebSocket } from "@/context/websocket";
import { cn } from "@/lib/utils";
import { FC, Fragment, useMemo, useState } from "react";

type SelectedCoinProps = {
  coin: string[];
  onClick?: () => void;
};
const SelectedCoin: FC<SelectedCoinProps> = ({ coin, onClick }) => {
  const { selectedMarket } = useWebSocket();
  const { productLeverage } = useProduct();
  const [levDisplay, setLevDisplay] = useState(null);
  useMemo(() => {
    if (productLeverage) {
      const res = productLeverage.find((elm) => elm.index == Number(coin[3]));
      if (res) {
        setLevDisplay(res.lev.toString());
      }
    }
  }, [productLeverage]);
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
        Effective Leverage:{" "}
        <span>{levDisplay ? `${levDisplay}(X)` : "N/A"} </span>
      </p>
    </div>
  );
};

export { SelectedCoin };
