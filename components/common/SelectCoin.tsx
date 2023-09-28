import { cn } from '@/lib/utils';
import { FC, Fragment } from 'react';

type SelectedCoinProps = {
  coin: string[];
  onClick?: () => void;
};
const SelectedCoin: FC<SelectedCoinProps> = ({ coin, onClick }) => {
  return (
    <div className="flex flex-col items-start w-full" onClick={onClick}>
      <p className="text-muted-foreground font-medium">
        {coin.map((item, index) => (
          <Fragment key={index.toString()}>
            {index !== 0 && index !== coin.length && <span> | </span>}
            <span key={index} className={cn(index === 0 && 'text-[#fcfcfc]')}>
              {item}
            </span>
          </Fragment>
        ))}
      </p>

      <p className="text-muted-foreground text-[10px] ">
        ID: <span>{'(INSERT MARKET ID HERE)'}</span>
      </p>
    </div>
  );
};

export { SelectedCoin };
