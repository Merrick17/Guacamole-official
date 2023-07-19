'use client';
import { Kanit } from 'next/font/google';
import Featured from '@/components/views/play/featured';
import RecentPlay from '@/components/views/play/recent-play';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@/components/styles';
import { Gamba } from 'gamba/react';
import { GambaUi } from 'gamba/react-ui';

const kanit = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Gamba
          connection={{
            endpoint:
              'https://radial-delicate-layer.solana-mainnet.discover.quiknode.pro/124d30642a313843475e1ac3f67e59d11d55d943',
            config: {
              wsEndpoint:
                'wss://radial-delicate-layer.solana-mainnet.discover.quiknode.pro/124d30642a313843475e1ac3f67e59d11d55d943',
            },
          }}
        >
          <GambaUi>{children}</GambaUi>
        </Gamba>
      </ThemeProvider>

      <Featured />
      <RecentPlay />
    </>
  );
}
