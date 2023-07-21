import { StylelessButton } from '@/components/styles';
import { GambaUiContext, useGambaUi } from '@/context/gamba-ui';
import { Wallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getTokenBalance } from 'gamba';
import { useGamba } from 'gamba/react';
import { formatLamports } from 'gamba/react-ui';
import { Info, RefreshCcw } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flash } from './Flash';
import { HexColor } from './HexColor';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

function useCallbacks() {
  const { onError = () => null, onWithdraw = () => null } =
    useContext(GambaUiContext);
  return { onError, onWithdraw };
}

const statusMapping = {
  none: 'None',
  playing: 'Ready',
  seedRequested: 'Initializing Account',
  hashedSeedRequested: 'Generating Results',
};

function ConnectWallet() {
  const { onError } = useCallbacks();
  const { wallets, select } = useWallet();
  const [loading, setLoading] = useState(false);

  const selectWallet = async (wallet: Wallet) => {
    try {
      setLoading(true);
      select(wallet.adapter.name);
      await wallet.adapter.connect();
    } catch (err) {
      console.error('Modal Error', err);
      setLoading(false);
      onError(err);
    } finally {
      // setLoading(false)
    }
  };

  return (
    <>
      <div className="w-full p-5 text-2xl pt-5 text-center">
        <h1>Connect Wallet</h1>
      </div>
      <div className="flex flex-col gap-3">
        {wallets.length === 0 && <>You need a Solana wallet to connect</>}
        {wallets.map((wallet, i) => (
          <Button
            key={i}
            onClick={() => selectWallet(wallet)}
            disabled={loading}
            className="flex items-center justify-between"
          >
            {wallet.adapter.name}
            <Image
              src={wallet.adapter.icon}
              width="20"
              height="20"
              alt={wallet.adapter.name}
            />
          </Button>
        ))}
      </div>
    </>
  );
}

function CreateAccount() {
  const { onError } = useCallbacks();
  const { tos } = useGambaUi();
  const gamba = useGamba();
  const [loading, setLoading] = useState(false);
  const [showTnc, setShowTnc] = useState(false);

  const createAccount = async () => {
    try {
      setLoading(true);
      const res = await gamba.createAccount();
      const response = await res.result();
      return response;
    } catch (err) {
      console.error('Modal Error', err);
      onError(err);
    } finally {
      setLoading(false);
    }
  };
  const createAccountOrShowTnc = () => {
    if (tos) {
      setShowTnc(true);
    } else {
      createAccount();
    }
  };

  if (tos && showTnc) {
    return (
      <>
        <div className="w-full p-5 text-2xl pt-5 text-center">
          <h1>Terms of Service</h1>
        </div>
        <div style={{ padding: 20, fontSize: '12px' }}>{tos}</div>
        <div
          style={{
            padding: 20,
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Button disabled={loading} onClick={createAccount}>
            Accept
          </Button>
          <Button disabled={loading} onClick={() => setShowTnc(false)}>
            Cancel
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full p-5 text-2xl pt-5 text-center">
        <h1>Create Account</h1>
      </div>
      <div className="w-full flex flex-col overflow-hidden p-5 gap-4 ">
        <Button
          className="primary"
          disabled={loading}
          onClick={createAccountOrShowTnc}
        >
          Create account
        </Button>
      </div>
      <>
        <Button className="list" onClick={() => gamba.disconnect()}>
          Change wallet
        </Button>
      </>
    </>
  );
}
export async function copyTextToClipboard(text: string) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}
function Account() {
  const { onError, onWithdraw } = useCallbacks();
  const gamba = useGamba();
  const [loading, setLoading] = useState<string>();

  const closeUserAccount = async () => {
    try {
      setLoading('close');
      const res = await gamba.closeAccount();
      const response = await res.result();
      return response;
    } catch (err) {
      console.error('Modal Error', err);
      onError(err);
    } finally {
      setLoading(undefined);
    }
  };

  const withdraw = async () => {
    try {
      setLoading('withdraw');
      const res = await gamba.withdraw();
      const response = await res.result();
      onWithdraw(response.status);
      return response;
    } catch (err) {
      console.error('Modal Error', err);
      onError(err);
    } finally {
      setLoading(undefined);
    }
  };

  const refreshAccount = async () => {
    try {
      setLoading('refresh');
      await gamba.refresh();
    } catch (err) {
      console.error('Modal Error', err);
      onError(err);
    } finally {
      setLoading(undefined);
    }
  };

  const [bonusTokens, setBonusTokens] = useState(0);
  const { connection } = useConnection();

  useEffect(() => {
    const fetchBonusTokens = async () => {
      console.debug('Fetching bonus tokens');
      const balance = await getTokenBalance(
        connection,
        gamba.wallet!.publicKey,
        gamba.house!.state!.bonusMint
      );
      setBonusTokens(balance);
    };
    fetchBonusTokens();
  }, [gamba.user]);

  if (!gamba.user || !gamba.wallet) {
    return null;
  }

  const accountStatus =
    loading === 'refresh' ? 'Fetching' : statusMapping[gamba.user.status];

  return (
    <>
      <div className="w-full p-5 text-2xl pt-5 text-center">
        <h1>
          <Flash>
            {formatLamports(gamba.balances.total - gamba.balances.user)}
          </Flash>
        </h1>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          textAlign: 'center',
        }}
      >
        {/* <div>
          <Flash>
            {formatLamports(gamba.balances.wallet)}
          </Flash>
          <div style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Wallet</div>
        </div> */}
        {gamba.balances.user > 0 && (
          <div>
            <Flash>{formatLamports(gamba.balances.user)}</Flash>
            <div style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              Claimable
            </div>
          </div>
        )}
        {gamba.balances.bonus > 0 && (
          <div>
            <Flash>{formatLamports(gamba.balances.bonus)}</Flash>
            <div style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              Bonus
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col overflow-hidden p-5 gap-4 ">
          <Button
            variant="ghost"
            onClick={() =>
              copyTextToClipboard(gamba.wallet!.publicKey.toBase58())
            }
          >
            <p className="text-black">{gamba.wallet.publicKey.toBase58()}</p>
          </Button>
          {gamba.balances.user > 0 && (
            <Button
              className="primary"
              disabled={loading === 'withdraw'}
              onClick={withdraw}
            >
              Claim {formatLamports(gamba.balances.user)}
            </Button>
          )}
          {bonusTokens > 0 && (
            <Button
              className="primary"
              onClick={() => gamba.redeemBonusToken()}
            >
              Redeem Bonus +{formatLamports(bonusTokens, '')} gSOL
            </Button>
          )}
        </div>
        <Button
          className="list"
          disabled={loading === 'close'}
          onClick={() => closeUserAccount()}
        >
          Close account
        </Button>
        <Button className="list" onClick={() => gamba.disconnect()}>
          Switch wallet
        </Button>
        <div className="text-black flex items-center justify-between">
          <div>Status: {accountStatus}</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <StylelessButton
              disabled={loading === 'refresh'}
              onClick={refreshAccount}
            >
              <RefreshCcw />
            </StylelessButton>
            <a
              target="_blank"
              href="https://gamba.so/docs/account"
              rel="noreferrer"
            >
              <Info />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export const GambaModal = () => {
  const { session, user } = useGamba();
  const { connected } = useWallet();
  const { connection } = useConnection();

  return (
    <>
      {!connection ? (
        <>No Connection...</>
      ) : !connected || !session?.wallet.publicKey ? (
        <ConnectWallet />
      ) : !user?.created ? (
        <CreateAccount />
      ) : (
        <Account />
      )}
    </>
  );
};
