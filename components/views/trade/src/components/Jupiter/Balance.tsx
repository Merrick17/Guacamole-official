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
  amount,
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
  amount: number;
}) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const wSol = token?.address === NATIVE_MINT.toBase58();

  const [inUsd, setInUsd] = useState(0);
  useEffect(() => {
    const getValueInUsd = async () => {
      const { data } = await axios.get(
        'https://price.jup.ag/v4/price?ids=' + token.symbol
      );
      for (var prop in data.data) {
        const value = data.data[prop].price;
        setInUsd(value * amount);
        break;
      }
    };
    getValueInUsd();
  }, [token, amount]);

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
    <div className=" flex flex-row items-center justify-between text-black/50 text-xs w-full">
      <div className=" flex flex-row items-center gap-1">
        <span>
          <BiWallet />
        </span>
        <span>{round(wSol ? solBalance?.uiAmount || 0 : balance, 6)}</span>
        <span>{wSol ? ' SOL' : ` ${token?.symbol}`}</span>

        {setInput && !!balance && (
          <>
            <Button
              className="h-5 bg-[#E5E7EB]"
              variant="secondary"
              onClick={() => setInput((balance / 2).toString())}
            >
              Half
            </Button>
            <Button
              variant="secondary"
              className="h-5 bg-[#E5E7EB]"
              onClick={() => setInput(balance.toString())}
            >
              Max
            </Button>
          </>
        )}
      </div>

      <span>{inUsd || 0} USD</span>
    </div>
  );
};
