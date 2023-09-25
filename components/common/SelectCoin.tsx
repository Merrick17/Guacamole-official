import { cn } from "@/lib/utils";
import { FC, Fragment } from "react";

type SelectedCoinProps = {
  high: string;
  low: string;
  coin: string[];
  onClick?: () => void;
};
const SelectedCoin: FC<SelectedCoinProps> = ({ high, low, coin, onClick }) => {
  return (
    <div className="flex flex-col items-start w-full" onClick={onClick}>
      <p className="text-muted-foreground font-medium">
        {coin.map((item, index) => (
          <Fragment key={index.toString()}>
            {index !== 0 && index !== coin.length && <span> | </span>}
            <span key={index} className={cn(index === 0 && "text-[#fcfcfc]")}>
              {item}
            </span>
          </Fragment>
        ))}
      </p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {high != "" && low != "" && (
          <>
            {" "}
            <p>
              H: <span className="text-[#8BD796]">{high}</span>
            </p>
            <p>
              L: <span className="text-[#FF4949]">{low}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export { SelectedCoin };
