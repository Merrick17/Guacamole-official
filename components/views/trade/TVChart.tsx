'use client';
import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import Script from 'next/script';
import { FC, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { BsChevronDown } from 'react-icons/bs';

const TVChart = ({ productSelect }: { productSelect: string }) => {
  console.log('Product SELECT', productSelect);
  const [SelectedProduct, setSelectedProduct] = useState<SelectedCoinProps>({
    high: '25,901.41',
    low: '25,534.37',
    coin: ['BTC', 'Bitcoin', 'PYTH:BTCUSD'],
  });

  const containerId = useRef(
    `tv_container_${Math.random().toString(36).substring(7)}`
  );

  const handleReturnCoin = (product: string | null): string => {
    if (!product) {
      return 'BTCUSD';
    }
    if (`${product}`.toLowerCase().includes('eth')) {
      return 'ETHUSD';
    }
    if (`${product}`.toLowerCase().includes('sol')) {
      return 'SOLUSD';
    }
    return 'BTCUSD';
  };

  const disabledFeatures: string[] = [
    'use_localstorage_for_settings',
    // "timeframes_toolbar",
    // "left_toolbar", // left sidebar
    'header_undo_redo', // undo, redo button
    'header_fullscreen_button', // full screen button
    // 'header_chart_type', // chart type button
    // "header_screenshot", // screenshot button
    // "header_symbol_search", // head search button
    'header_compare', // compare button
    // "header_indicators", // display indicator button
    // "header_saveload", // save, load button
    'header_settings', // setting button
    // 'header_widget_dom_node', // top toolbar
    // 'border_around_the_chart', // border surround
    'countdown', // countdown
    // "compare_symbol",
    'symbol_info', // product information
    // "main_series_scale_menu",
    // "study_dialog_search_control",
    'control_bar', // associated with the navigation button at the bottom of the chart
    // 'hide_left_toolbar_by_default', // hide the left toolbar when the user opens the chart for the first time
    'go_to_date', // lower left date range
    // "edit_buttons_in_legend",
  ];

  const defaultConfig = {
    theme: 'Dark',
    colorTheme: 'transparent',
    debug: true,
    autosize: true,
    // disabled_features: disabledFeatures,
    hidevolume: true,
    locale: 'en',
    // enabled_features: ['hide_left_toolbar_by_default'],
    time_frames: [
      { text: '1m', resolution: '1', description: '1 Minute' },
      { text: '5m', resolution: '5', description: '5 Minutes' },
    ],
    toolbar_bg: '#transparent',
  };

  const onLoadScriptRef = useRef<() => void>();
  const tradingViewWidget = useRef<any>();

  function removeWidget() {
    try {
      tradingViewWidget.current?.remove();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full ">
      <Container className="w-full flex justify-between items-center bg-background py-6 px-9">
        <div className="flex  flex-row items-center gap-3">
          <img
            src="https://s3-alpha-sig.figma.com/img/06d4/7896/9aaaf2099933ebf7f9bdfbc97b0ce80b?Expires=1694995200&Signature=IP0TeXLpzWxKotY1t9R-3FG5w4HvgGEEWhmWP6iMtrP9NEW-NSACybcTW0d7cqqb~NvFLgoveDItaaiGScH8Fr9Hlq2j5oRzLqtKS09QKqK670363Sbb9BabbeX~SW6sjPDWOvfg9cN3~lVhtDTtWKU79H-6q2P4wqCkjdYlapZcpToEqMQQKyrcRJovMcZFKaOfFdWhZcDP0hw-osdjVJsgoIChxh~8vfz5VWwuBw7DNLdYTYUrHYpfiLsc4MfjDjgdWQHJwgG3Cev9xjp3HqmscAE4daTibQD2Zg~iPBw7~vkObBdufr5tqir3wVno~PEPrqtKtkMnB23BFSAbSw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt="bitcoin"
            className="w-10 h-10"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
              <SelectedCoin {...SelectedProduct} />
              <Button size="icon">
                <BsChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem>
                <SelectedCoin
                  coin={['BTC', 'Bitcoin', 'PYTH:BTCUSD']}
                  high="25,901.41"
                  low="25,534.37"
                  onClick={() => {
                    setSelectedProduct({
                      high: '25,901.41',
                      low: '25,534.37',
                      coin: ['BTC', 'Bitcoin', 'PYTH:BTCUSD'],
                    });
                  }}
                />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SelectedCoin
                  coin={['ETH', 'Ethereum', 'PYTH:ETHUSD']}
                  high="25,901.41"
                  low="25,534.37"
                  onClick={() => {
                    setSelectedProduct({
                      high: '25,901.41',
                      low: '25,534.37',
                      coin: ['ETH', 'Ethereum', 'PYTH:ETHUSD'],
                    });
                  }}
                />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SelectedCoin
                  coin={['SOL', 'Solana', 'PYTH:SOLUSD']}
                  high="25,901.41"
                  low="25,534.37"
                  onClick={() => {
                    setSelectedProduct({
                      high: '25,901.41',
                      low: '25,534.37',
                      coin: ['SOL', 'Solana', 'PYTH:SOLUSD'],
                    });
                  }}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-[#8BD796] text-3xl font-medium">
          $25,620<span className="text-lg">.31</span>
        </p>
      </Container>
      <div id={containerId.current} style={{ height: 512, width: '100%' }} />
      <Script
        src="https://s3.tradingview.com/tv.js"
        strategy="lazyOnload"
        crossOrigin="anonymous"
        onLoad={() => {
          // @ts-ignore
          removeWidget();
          tradingViewWidget.current = new window.TradingView.widget({
            ...defaultConfig,
            studies_overrides: {
              // 'Overlay.candleStyle.upColor': '#47C5D8',
              // 'Overlay.candleStyle.downColor': '#E3627D',
              'Overlay.candleStyle.barColorsOnPrevClose': true,
            },
            overrides: {
              'mainSeriesProperties.candleStyle.upColor': '#32CD99',
              'mainSeriesProperties.candleStyle.downColor': '#F23B69',
              'mainSeriesProperties.candleStyle.borderUpColor': '#32CD99',
              'mainSeriesProperties.candleStyle.borderDownColor': '#F23B69',
              'mainSeriesProperties.candleStyle.wickUpColor': '#32CD99',
              'mainSeriesProperties.candleStyle.wickDownColor': '#F23B69',
              'paneProperties.background': 'rgba(0,0,0,0)',
              'paneProperties.backgroundType': 'solid',
              // 'scalesProperties.lineColor': '#262c2e',
            },
            symbol: `PYTH:${handleReturnCoin(productSelect)}`,
            interval: '1',
            container_id: containerId.current,
            backgroundColor: '#000000',
          });
        }}
      />
    </div>
  );
};

export default TVChart;

type SelectedCoinProps = {
  high: string;
  low: string;
  coin: string[];
  onClick?: () => void;
};
const SelectedCoin: FC<SelectedCoinProps> = ({ high, low, coin, onClick }) => {
  return (
    <div className="flex flex-col items-start w-full" onClick={onClick}>
      <p className="text-muted-foreground font-medium">
        {coin.map((item, index) => (
          <>
            {index !== 0 && index !== coin.length && <span> | </span>}
            <span key={index} className={cn(index === 0 && 'text-[#fcfcfc]')}>
              {item}
            </span>
          </>
        ))}
      </p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <p>
          H: <span className="text-[#8BD796]">{high}</span>
        </p>
        <p>
          L: <span className="text-[#FF4949]">{low}</span>
        </p>
      </div>
    </div>
  );
};
