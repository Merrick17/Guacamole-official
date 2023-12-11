import BurnSplToken from '@/components/views/tools/burn-spl-token';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Burn Solana SPL Tokens | Guacamole',
  description:
    'Burn those worthless tokens and scam airdrops taking up space in your Solana wallet for more SOL. Connect your wallet, choose the tokens to burn, and get SOL back in return!',
    openGraph: {
      images: ["images/seo/tools.png"],
    },
};
const Page = () => {
  return <BurnSplToken />;
};

export default Page;
