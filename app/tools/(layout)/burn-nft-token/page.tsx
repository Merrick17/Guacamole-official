import BurnNftToken from '@/components/views/tools/burn-nft-token';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Burn Solana NFTs | Guacamole',
  description:
    'Burn those worthless airdrop and "rugged" NFTs taking up space in your Solana wallet for more SOL. Connect your wallet, choose the NFTs to burn, and get SOL back in return!',
};
const Page = () => {
  return <BurnNftToken />;
};

export default Page;
