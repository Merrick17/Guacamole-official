'use client';
import { ToastContainer, toast } from 'react-toastify';
import TopBar from './components/navigation-frame/TopBar';
import { JupiterApiProvider } from './contexts/jupiter';
import JupiterForm from './components/Jupiter';
import { useLocalStorageState } from 'ahooks';

import 'react-toastify/dist/ReactToastify.css';

// Override @solana/wallet-adapter-react-ui/styles.css
// import './wallet.css';

// window.Buffer = Buffer;

const Trade = () => {
  const [customRpc, setCustomRpc] = useLocalStorageState<string>('customRpc');

  return (
    <>
      <JupiterApiProvider>
        <div className="bg-white w-full">
          <TopBar setCustomRpc={setCustomRpc} />
          <div className="flex  flex-col items-center justify-center bg-white">
            <JupiterForm />
          </div>
        </div>
      </JupiterApiProvider>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
};

export default Trade;
