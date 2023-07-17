import { abbreviate } from '../views/trade/src/utils/abbreviate';
import { PublicKey } from '@solana/web3.js';
import Urls from '../views/trade/src/settings/urls';

export const ExplorerButton = ({
  pubkey,
  tx,
}: {
  pubkey?: string | PublicKey;
  tx?: string;
}) => {
  return (
    <a
      className="flex flex-row hover:opacity-50"
      rel="noopener noreferrer"
      target="_blank"
      href={
        pubkey ? Urls.solscanAddress + pubkey?.toString() : Urls.solscanTx + tx
      }
    >
      {abbreviate(pubkey || (tx as string), 4)}
      <img src={'/images/solscan.png'} className="ml-1 mt-1 h-4" />
    </a>
  );
};
