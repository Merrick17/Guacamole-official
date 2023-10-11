"use client";
import CandleChart from "@/components/common/CandleChart";
import PerceptualMarketHeader from "@/components/common/perceptual-market-header";
import { cn } from "@/lib/utils";
import { FC, useRef, useState } from "react";

const TVChart = ({ productSelect }: { productSelect: string }) => {

  const tradingViewWidget = useRef<any>();

  return (
    <div className="flex flex-col gap-5 w-full ">
      <PerceptualMarketHeader />

      <CandleChart />
      {/* <div id={containerId.current} style={{ height: 512, width: '100%' }} />
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
      /> */}
    </div>
  );
};

export default TVChart;

type SelectedCoinProps = {
  high: string;
  low: string;
  coin: string[];
  marketName: string;
  onClick?: () => void;
};
const SelectedCoin: FC<SelectedCoinProps> = ({ high, low, coin, onClick }) => {
  return (
    <div className="flex flex-col items-start w-full" onClick={onClick}>
      <p className="text-muted-foreground font-medium">
        {coin.map((item, index) => (
          <>
            {index !== 0 && index !== coin.length && <span> | </span>}
            <span key={index} className={cn(index === 0 && "text-[#fcfcfc]")}>
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
// "use client";
// import PerceptualMarketHeader from "@/components/common/perceptual-market-header";
// import { useProduct } from "@/context/dexterity";
// import { useWebSocket } from "@/context/websocket";
// import Script from "next/script";
// import { useEffect, useRef } from "react";

// const TVChart = ({ productSelect }: { productSelect: string }) => {
//   //const { selectedMarket } = useWebSocket();
//   const { selectedProduct } = useProduct();
//   const containerId = useRef(
//     `tv_container_${Math.random().toString(36).substring(7)}`
//   );

//   const handleReturnCoin = (product: string | null): string => {
//     console.log("PRODUCT", product);
//     if (!product) {
//       return "BTCUSD";
//     }
//     if (`${product}`.toLowerCase().includes("eth")) {
//       return "ETHUSD";
//     }
//     if (`${product}`.toLowerCase().includes("sol")) {
//       return "SOLUSD";
//     }
//     return "BTCUSD";
//   };

//   const disabledFeatures: string[] = [
//     "use_localstorage_for_settings",
//     // "timeframes_toolbar",
//     // "left_toolbar", // left sidebar
//     "header_undo_redo", // undo, redo button
//     "header_fullscreen_button", // full screen button
//     // 'header_chart_type', // chart type button
//     // "header_screenshot", // screenshot button
//     // "header_symbol_search", // head search button
//     "header_compare", // compare button
//     // "header_indicators", // display indicator button
//     // "header_saveload", // save, load button
//     "header_settings", // setting button
//     // 'header_widget_dom_node', // top toolbar
//     // 'border_around_the_chart', // border surround
//     "countdown", // countdown
//     // "compare_symbol",
//     "symbol_info", // product information
//     // "main_series_scale_menu",
//     // "study_dialog_search_control",
//     "control_bar", // associated with the navigation button at the bottom of the chart
//     // 'hide_left_toolbar_by_default', // hide the left toolbar when the user opens the chart for the first time
//     "go_to_date", // lower left date range
//     // "edit_buttons_in_legend",
//   ];

//   const defaultConfig = {
//     theme: "Dark",
//     colorTheme: "transparent",
//     debug: true,
//     autosize: true,
//     // disabled_features: disabledFeatures,
//     hidevolume: true,
//     locale: "en",
//     // enabled_features: ['hide_left_toolbar_by_default'],
//     time_frames: [
//       { text: "1m", resolution: "1", description: "1 Minute" },
//       { text: "5m", resolution: "5", description: "5 Minutes" },
//     ],
//     toolbar_bg: "#transparent",
//   };

//   const onLoadScriptRef = useRef<() => void>();
//   const tradingViewWidget = useRef<any>();

//   useEffect(() => {
//     // Function to reinitialize the chart
//     function initializeChart() {
//       // Remove the existing widget if it exists
//       removeWidget();

//       if (typeof window !== "undefined" && window.TradingView) {
//         // Create a new TradingView widget with updated symbol
//         tradingViewWidget.current = new window.TradingView.widget({
//           ...defaultConfig,
//           studies_overrides: {
//             // 'Overlay.candleStyle.upColor': '#47C5D8',
//             // 'Overlay.candleStyle.downColor': '#E3627D',
//             "Overlay.candleStyle.barColorsOnPrevClose": true,
//           },
//           overrides: {
//             "mainSeriesProperties.candleStyle.upColor": "#32CD99",
//             "mainSeriesProperties.candleStyle.downColor": "#F23B69",
//             "mainSeriesProperties.candleStyle.borderUpColor": "#32CD99",
//             "mainSeriesProperties.candleStyle.borderDownColor": "#F23B69",
//             "mainSeriesProperties.candleStyle.wickUpColor": "#32CD99",
//             "mainSeriesProperties.candleStyle.wickDownColor": "#F23B69",
//             "paneProperties.background": "rgba(0,0,0,0)",
//             "paneProperties.backgroundType": "solid",
//             // 'scalesProperties.lineColor': '#262c2e',
//           },
//           symbol: `PYTH:${handleReturnCoin(selectedProduct.name)}`, // Update the symbol
//           interval: "1",
//           container_id: containerId.current,
//           backgroundColor: "#141414",
//         });
//       }
//     }

//     // Call the initializeChart function when productSelect changes
//     initializeChart();
//   }, [selectedProduct]);
//   function removeWidget() {
//     try {
//       tradingViewWidget.current?.remove();
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   return (
//     <div className="flex flex-col gap-5 w-full ">
//       {" "}
//       <PerceptualMarketHeader />
//       <div 
//         id={containerId.current}
//         style={{
//           height: "90%",
//           width: "100%",
//           borderRadius: 20,
//           marginRight: 20,
//         }}
//       />
//       <Script
//         src="https://s3.tradingview.com/tv.js"
//         strategy="lazyOnload"
//         crossOrigin="anonymous"
//         onLoad={() => {
//           // @ts-ignore
//           removeWidget();
//           tradingViewWidget.current = new window.TradingView.widget({
//             ...defaultConfig,
//             studies_overrides: {
//               // 'Overlay.candleStyle.upColor': '#47C5D8',
//               // 'Overlay.candleStyle.downColor': '#E3627D',
//               "Overlay.candleStyle.barColorsOnPrevClose": true,
//             },
//             overrides: {
//               "mainSeriesProperties.candleStyle.upColor": "#32CD99",
//               "mainSeriesProperties.candleStyle.downColor": "#F23B69",
//               "mainSeriesProperties.candleStyle.borderUpColor": "#32CD99",
//               "mainSeriesProperties.candleStyle.borderDownColor": "#F23B69",
//               "mainSeriesProperties.candleStyle.wickUpColor": "#32CD99",
//               "mainSeriesProperties.candleStyle.wickDownColor": "#F23B69",
//               "paneProperties.background": "rgba(0,0,0,0)",
//               "paneProperties.backgroundType": "solid",
//               // 'scalesProperties.lineColor': '#262c2e',
//             },
//             symbol: `PYTH:${handleReturnCoin(
//               selectedProduct.name.toLocaleLowerCase()
//             )}`,
//             interval: "1" as any,
//             container_id: containerId.current,
//             backgroundColor: "#141414",
//           });
//         }}
//       />
//     </div>
//   );
// };

// export default TVChart;
