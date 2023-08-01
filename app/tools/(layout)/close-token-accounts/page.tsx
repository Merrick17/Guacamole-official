import CloseTokenAccount from '@/components/views/tools/close-token-accounts';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Close Empty Token Accounts | Guacamole',
  description:
    'Your wallet may have some unused token accounts! Use this interface to close these accounts and get SOL back in return.',
};
const page = () => {
  return <CloseTokenAccount />;
};

export default page;
