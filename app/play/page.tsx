import Play from '@/components/views/play';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Let's Play Some Games | Guacamole",
  description:
    'Take a chance in fun games where you can win some Solana and some of your favorite coins and tokens. Flips, mines, and more await for you to play on Guacamole!',
};

const Page = () => {
  return <Play />;
};

export default Page;
