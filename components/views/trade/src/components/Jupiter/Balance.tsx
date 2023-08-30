import { TokenInfo } from '@solana/spl-token-registry';
import { TokenAccounts } from '@bonfida/hooks';
import round from 'lodash/round';
import { PublicKey } from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { NATIVE_MINT } from '@solana/spl-token';
import { BiWallet } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import axios from 'axios';
export const Balance = ({
  token,
  tokenAccounts,
  setInput,
  solBalance,
}: {
  token: TokenInfo | null | undefined;
  tokenAccounts: TokenAccounts | undefined;
  setInput?: (value: React.SetStateAction<string>) => void;
  solBalance:
    | {
        amount: number;
        uiAmount: number;
      }
    | undefined;
}) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const wSol = token?.address === NATIVE_MINT.toBase58();

  const tokenAccount = token
    ? tokenAccounts?.getByMint(new PublicKey(token?.address))
    : null;

  if (!token) {
    return null;
  }

  const balance =
    tokenAccount && tokenAccount.decimals
      ? Number(tokenAccount.account.amount) /
        Math.pow(10, tokenAccount.decimals)
      : 0;

  return (
    <div className=" flex flex-row items-center gap-1 text-muted-foreground  text-xs">
      <span>
        <BiWallet />
      </span>
      <span>{round(wSol ? solBalance?.uiAmount || 0 : balance, 6)}</span>
      <span>{wSol ? ' SOL' : ` ${token?.symbol}`}</span>

      {setInput && !!balance && (
        <>
          <Button
            className="!h-5 text-[10px] "
            onClick={() => setInput((balance / 2).toString())}
          >
            50%
          </Button>
          <Button
            className="!h-5 text-[10px] "
            onClick={() => setInput(balance.toString())}
          >
            100%
          </Button>
        </>
      )}
    </div>
  );
};
