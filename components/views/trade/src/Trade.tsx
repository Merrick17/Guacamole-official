'use client';
import { ToastContainer, toast } from 'react-toastify';
import TopBar from './components/navigation-frame/TopBar';
import { JupiterApiProvider } from './contexts/jupiter';
import JupiterForm from './components/Jupiter';
import { useLocalStorageState } from 'ahooks';

import 'react-toastify/dist/ReactToastify.css';
import { FC } from 'react';
import { cn } from '@/lib/utils';

type TradeProps = {
  showDetails?: boolean;
  className?: string;
};
const Trade: FC<TradeProps> = ({ showDetails = true, className }) => {
  return (
    <div
      className={cn(
        'flex w-full z-20 lg:max-w-lg flex-col gap-[10px] rounded-lg bg-foreground px-5 py-7  min-w-full',
        className
      )}
    >
      <div className="flex  flex-col items-center justify-center ">
        <JupiterForm showDetails={showDetails} />
      </div>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </div>
  );
};

export default Trade;
