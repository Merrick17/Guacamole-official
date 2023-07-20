import {
  WalletMultiButton,
  WalletDisconnectButton,
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSmallScreen, useSolanaCongested } from '../../../hooks';
import { Logo } from './Logo';
import { RpcSettings } from '../../RpcSettings';
import clsx from 'clsx';

const TopBar = ({ setCustomRpc }: { setCustomRpc: (url: string) => void }) => {
  const { connected } = useWallet();
  const smallScreen = useSmallScreen();

  if (smallScreen) {
    return (
      <div className="relative mb-8 h-[40px] bg-white">
        {/* <Congested congested={!!congested} /> */}
      </div>
    );
  }

  return (
    <div className="relative mb-10 w-full  flex flex-row items-center justify-between gap-2 bg-white">
      {/* <Congested congested={!!congested} /> */}

      <div className="flex flex-row items-center">
        <RpcSettings setCustomRpc={setCustomRpc} />
        <WalletModalProvider>
          {connected ? <WalletDisconnectButton /> : <WalletMultiButton />}
        </WalletModalProvider>
      </div>
    </div>
  );
};

export default TopBar;
