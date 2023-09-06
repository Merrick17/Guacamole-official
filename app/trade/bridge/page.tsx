'use client';
import Script from 'next/script';

const config = {
  appIdentity: {
    name: 'My Project',
    icon: './logo.png',
    uri: 'https://myproject.io',
  },
};
const page = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <div id="swap_widget" />
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
