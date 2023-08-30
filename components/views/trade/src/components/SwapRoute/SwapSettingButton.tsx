import { Input } from '@/components/ui/input';
import React, { HTMLAttributes, useMemo } from 'react';

interface ISwapSettingButton {
  idx: number;
  itemsCount: number;
  className?: HTMLAttributes<HTMLButtonElement>['className'];
  onClick(): void;
  highlighted: boolean;
  roundBorder?: 'left' | 'right';
  children: React.ReactNode;
}

const SwapSettingButton = ({
  idx,
  itemsCount,
  className = '',
  onClick,
  highlighted,
  roundBorder,
  children,
}: ISwapSettingButton) => {
  const classes = `relative flex-1 py-4 px-1 text-muted-foreground  bg-[#E5E7EB59]  `;
  const roundBorderClass = (() => {
    if (roundBorder === 'left') return 'border-white rounded-l-xl ';
    if (roundBorder === 'right') return 'border-white rounded-r-xl';
  })();

  const borderClassName = useMemo(() => {
    if (idx === 0) return 'rounded-l-xl border-white';
    if (idx === itemsCount - 1) return 'rounded-r-xl border-white';
  }, [idx, itemsCount]);

  return (
    <button
      type="button"
      className={`${
        highlighted ? `border-white ${roundBorderClass} !bg-background  ` : ''
      } ${borderClassName} ${classes} ${className} relative`}
      onClick={onClick}
    >
      <div
        className={`h-full w-full leading-none flex justify-center items-center`}
      >
        {children}
      </div>
    </button>
  );
};

export default SwapSettingButton;
