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
    <main className="container mx-auto min-h-[calc(100vh-80px)] justify-center flex flex-col items-center gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <div className="flex w-full max-w-lg flex-col gap-[10px] rounded-lg bg-white px-5 py-7">
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
      </div>
    </main>
  );
};

export default Page;
