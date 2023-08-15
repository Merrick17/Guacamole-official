'use client';
import { ToastContainer, toast } from 'react-toastify';
import TopBar from './components/navigation-frame/TopBar';
import { JupiterApiProvider } from './contexts/jupiter';
import JupiterForm from './components/Jupiter';
import { useLocalStorageState } from 'ahooks';

import 'react-toastify/dist/ReactToastify.css';
import { FC } from 'react';

type TradeProps = {
  showDetails?: boolean;
};
const Trade: FC<TradeProps> = ({ showDetails = true }) => {
  return (
    <div className="flex w-full lg:max-w-lg flex-col gap-[10px] rounded-lg bg-white px-5 py-7 border border-[#E5E7EB]">
      <JupiterApiProvider>
        <div className="bg-white w-full">
          {/* <TopBar setCustomRpc={setCustomRpc} /> */}
          <div className="flex  flex-col items-center justify-center bg-white">
            <JupiterForm showDetails={showDetails} />
          </div>
        </div>
      </JupiterApiProvider>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </div>
  );
};

export default Trade;
