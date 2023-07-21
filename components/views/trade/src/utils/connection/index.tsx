import { Connection } from '@solana/web3.js';
import { RPC_GEN_URL } from '../../settings/rpc';

export const GENESYS_GO_CONNECTIONS = new Connection(
  'https://rpc.helius.xyz/?api-key=29e96b19-8797-4b1a-94e3-54100dd3f6d8',
  'processed'
);
