'use client';
import { ToastContainer, toast } from 'react-toastify';
import Footer from './components/navigation-frame/Footer';
import TopBar from './components/navigation-frame/TopBar';
import { JupiterApiProvider } from './contexts/jupiter';
import { Buffer } from 'buffer';
import JupiterForm from './components/Jupiter';
import { useLocalStorageState } from 'ahooks';
import { Warning } from './components/Warning';

import 'react-toastify/dist/ReactToastify.css';

// Override @solana/wallet-adapter-react-ui/styles.css
// import './wallet.css';

// window.Buffer = Buffer;

const Trade = () => {
  const [customRpc, setCustomRpc] = useLocalStorageState<string>('customRpc');
  const [visible, setVisible] = useLocalStorageState<boolean>('warning', {
    defaultValue: true,
  });

  return (
    <>
      <JupiterApiProvider>
        <div className="bg-white">
          <TopBar setCustomRpc={setCustomRpc} />
          <div className="flex  flex-col items-center justify-center bg-white">
            <JupiterForm />
          </div>
          {/* <Footer /> */}
        </div>
        {/* <Warning visible={visible} setVisible={setVisible} /> */}
      </JupiterApiProvider>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
};

export default Trade;
