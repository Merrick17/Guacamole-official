import Trade from '@/components/views/trade/src/Trade';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Easily Swap Solana Based Tokens | Guacamole',
  description:
    'Guacamole Swap allows you to trade any tokens on Solana in just a few clicks with no hassle and the best fees.',
};

const Page: FC = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      {/* <Tabs defaultValue="swap" value={menuValue} className="w-full">
            <div className="flex flex-row justify-between items-center">
              <TabsList>
                <TabsTrigger value="swap" onClick={() => setMenuValue('swap')}>
                  Swap
                </TabsTrigger>
                <TabsTrigger
                  value="twamm"
                  onClick={() => setMenuValue('twamm')}
                >
                  Twamm
                </TabsTrigger>
              </TabsList>
              <WalletMultiButtonDynamic className="rounded-full" />
            </div>
            <TabsContent value="swap"> */}
      <Trade />
      {/* </TabsContent>
            <TabsContent value="twamm">Comming Soon</TabsContent>
          </Tabs> */}
    </main>
  );
};

export default Page;
