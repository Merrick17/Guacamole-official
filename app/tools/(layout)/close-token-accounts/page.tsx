import CloseTokenAccount from '@/components/views/tools/close-token-accounts';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Close Token Accounts | Guacamole',
  description:
    'Have empty token accounts in your Solana wallet? Close these unused token and NFT accounts to easily reclaim Solana from open rent accounts.    ',
    openGraph: {
      images: ["images/seo/tools.png"],
    },
};
const page = () => {
  return <CloseTokenAccount />;
};

export default page;
