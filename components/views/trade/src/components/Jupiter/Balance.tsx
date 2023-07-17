import { TokenInfo } from '@solana/spl-token-registry';
import { TokenAccounts } from '@bonfida/hooks';
import round from 'lodash/round';
import { PublicKey } from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { NATIVE_MINT } from '@solana/spl-token';

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
    <div className="mr-1 flex flex-row items-center">
      <span className="mr-1 text-sm font-bold text-black">Balance: </span>
      <span className="mr-1 text-sm font-bold text-black opacity-40">
        {round(wSol ? solBalance?.uiAmount || 0 : balance, 2)}
      </span>

      {setInput && !!balance && (
        <>
          <div
            onClick={() => setInput((balance / 2).toString())}
            className="mr-1 w-[50px] cursor-pointer rounded-[20px] border-[2px] border-solid border-sky-500 text-center text-xs font-bold uppercase"
          >
            Half
          </div>
          <div
            onClick={() => setInput(balance.toString())}
            className="w-[50px] cursor-pointer rounded-[20px] border-[2px] border-solid border-sky-500 text-center text-xs font-bold uppercase"
          >
            Max
          </div>
        </>
      )}
    </div>
  );
};
