'use client';
import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const config = {
  appIdentity: {
    name: 'Start Bridge Swap',
    icon: './logo.png',
    uri: 'https://myproject.io',
  },
  colors: {
    N000: '#141414',
    N100: '#141414',
    N300: '#141414',
    N500: '#2B2E3C',
    N600: '#A8A8A8',
    N700: '#C9CACC',
    N900: '#FCFCFC',
    background: '#0f0f0f',
    primary: '#141414',
    primaryGradient: '#141414',
    mainBox: '#141414',
    green: '#8bd796',
    lightGreen: '#8bd796',
    red: '#ff8f8f',
    toastBgRed: '#ff8f8f',
    toastBgNatural: '#141414',
    toastBgGreen: '#8bd796;',
    buttonBackground: '#bbb0db',
  },
};
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

const page = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <Container className="bg-foreground px-5 py-7 w-max flex flex-col gap-5 ">
        <div className="flex items-center justify-between">
          <Button className=" h-7 rounded-lg text-sm">Bridge Swap</Button>
          <WalletMultiButtonDynamic
            startIcon={undefined}
            className="!rounded-lg  h-7 px-3 py-[6px] font-normal text-sm hidden lg:flex bg-primary text-primary-foreground hover:!bg-primary"
          />
        </div>
        <div id="swap_widget" />
      </Container>
      <Script
        src="https://cdn.mayan.finance/widget_ultimate-0-4-5.js"
        integrity="sha256-Dem40VAlLsczlbgJyd9U20HCZiihA1UFQy96wdDqVYQ="
        crossOrigin="anonymous"
        onLoad={() => {
          // @ts-ignore
          MayanSwap.init('swap_widget', config);
        }}
      />
    </main>
  );
};

export default page;
