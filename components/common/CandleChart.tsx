"use client";
import React from "react";
import { createChart } from "lightweight-charts";
import { useWebSocket } from "@/context/websocket";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { useProduct } from "@/context/dexterity";
const CandleChart = () => {
  const { selectedProduct } = useProduct();
  //   const { candles } = useWebSocket();
  //   const chartRef = useRef(null);

  //   useEffect(() => {
  //     console.log("Candles",candles);
  //     if (!chartRef.current || !candles.length) {
  //       return;
  //     }

  //     const chart = createChart(chartRef.current, {
  //       width: chartRef.current.clientWidth, // Set initial width based on container size
  //       height: chartRef.current.clientHeight,
  //       layout: {
  //         textColor: "#FFFF",
  //         background: {
  //           color: "#121212",
  //           bottomColor: "rgba(252, 252, 252, 0.1)",
  //         },
  //       },
  //       grid: {
  //         vertLines: {
  //           color: "rgba(252, 252, 252, 0.1)",
  //         },
  //         horzLines: {
  //           color: "rgba(252, 252, 252, 0.1)",
  //         },
  //       },
  //       rightPriceScale: {
  //         scaleMargins: {
  //           top: 0.3,
  //           bottom: 0.25,
  //         },
  //       },
  //     });

  //     const candlestickSeries = chart.addCandlestickSeries();
  //     const seriesData = candles.map((candle) => ({
  //       time: new Date(candle.timestamp).getTime() / 1000,
  //       open: Number(Number(candle.o).toFixed(4)),
  //       high: Number(Number(candle.h).toFixed(4)),
  //       low: Number(Number(candle.l).toFixed(4)),
  //       close: Number(Number(candle.c).toFixed(4)),
  //     }));
  // console.log("Series Data",seriesData);
  //     candlestickSeries.setData(seriesData as any);

  //     // Handle chart resizing when the container size changes
  //     const handleResize = () => {
  //       chart.resize(chartRef.current.clientWidth, 650); // Set the height as needed
  //     };

  //     window.addEventListener("resize", handleResize);

  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //       chart.remove();
  //     };
  //   }, [candles]);

  //   return (
  //     <div>
  //       <div
  //         ref={chartRef}
  //         style={{ maxWidth: "850px", height: "100%", minHeight: 620 }}
  //       ></div>
  //     </div>
  //   );
  const containerId = useRef(
    `tv_container_${Math.random().toString(36).substring(7)}`
  );

  const handleReturnCoin = (product: string | null): string => {
    if (!product) {
      return "BTCUSD";
    }
    if (`${product}`.toLowerCase().includes("eth")) {
      return "ETHUSD";
    }
    if (`${product}`.toLowerCase().includes("sol")) {
      return "SOLUSD";
    }
    return "BTCUSD";
  };

  const disabledFeatures: string[] = [
    "use_localstorage_for_settings",
    // "timeframes_toolbar",
    // "left_toolbar", // left sidebar
    "header_undo_redo", // undo, redo button
    "header_fullscreen_button", // full screen button
    // 'header_chart_type', // chart type button
    // "header_screenshot", // screenshot button
    // "header_symbol_search", // head search button
    "header_compare", // compare button
    // "header_indicators", // display indicator button
    // "header_saveload", // save, load button
    "header_settings", // setting button
    // 'header_widget_dom_node', // top toolbar
    // 'border_around_the_chart', // border surround
    "countdown", // countdown
    // "compare_symbol",
    "symbol_info", // product information
    // "main_series_scale_menu",
    // "study_dialog_search_control",
    "control_bar", // associated with the navigation button at the bottom of the chart
    // 'hide_left_toolbar_by_default', // hide the left toolbar when the user opens the chart for the first time
    "go_to_date", // lower left date range
    // "edit_buttons_in_legend",
  ];

  const defaultConfig = {
    theme: "Dark",
    colorTheme: "transparent",
    debug: true,
    autosize: true,
    // disabled_features: disabledFeatures,
    hidevolume: true,
    locale: "en",
    // enabled_features: ['hide_left_toolbar_by_default'],
    time_frames: [
      { text: "1m", resolution: "1", description: "1 Minute" },
      { text: "5m", resolution: "5", description: "5 Minutes" },
    ],
    toolbar_bg: "#transparent",
  };

  const onLoadScriptRef = useRef<() => void>();
  const tradingViewWidget = useRef<any>();

  useEffect(() => {
    // Function to reinitialize the chart
    function initializeChart() {
      // Remove the existing widget if it exists
      removeWidget();

      if (typeof window !== "undefined" && window.TradingView) {
        // Create a new TradingView widget with updated symbol
        tradingViewWidget.current = new window.TradingView.widget({
          ...defaultConfig,
          studies_overrides: {
            // 'Overlay.candleStyle.upColor': '#47C5D8',
            // 'Overlay.candleStyle.downColor': '#E3627D',
            "Overlay.candleStyle.barColorsOnPrevClose": true,
          },
          overrides: {
            "mainSeriesProperties.candleStyle.upColor": "#32CD99",
            "mainSeriesProperties.candleStyle.downColor": "#F23B69",
            "mainSeriesProperties.candleStyle.borderUpColor": "#32CD99",
            "mainSeriesProperties.candleStyle.borderDownColor": "#F23B69",
            "mainSeriesProperties.candleStyle.wickUpColor": "#32CD99",
            "mainSeriesProperties.candleStyle.wickDownColor": "#F23B69",
            "paneProperties.background": "rgba(0,0,0,0)",
            "paneProperties.backgroundType": "solid",
            // 'scalesProperties.lineColor': '#262c2e',
          },
          symbol: `PYTH:${handleReturnCoin(selectedProduct.name)}`, // Update the symbol
          //@ts-ignore
          interval: "1",
          container_id: containerId.current,
          backgroundColor: "#141414",
        });
      }
    }

    // Call the initializeChart function when productSelect changes
    initializeChart();
  }, [selectedProduct]);
  function removeWidget() {
    try {
      tradingViewWidget.current?.remove();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div id={containerId.current} style={{ height: "100%", width: "100%" }} />
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
              "Overlay.candleStyle.barColorsOnPrevClose": true,
            },
            overrides: {
              "mainSeriesProperties.candleStyle.upColor": "#32CD99",
              "mainSeriesProperties.candleStyle.downColor": "#F23B69",
              "mainSeriesProperties.candleStyle.borderUpColor": "#32CD99",
              "mainSeriesProperties.candleStyle.borderDownColor": "#F23B69",
              "mainSeriesProperties.candleStyle.wickUpColor": "#32CD99",
              "mainSeriesProperties.candleStyle.wickDownColor": "#F23B69",
              "paneProperties.background": "rgba(0,0,0,0)",
              "paneProperties.backgroundType": "solid",
              // 'scalesProperties.lineColor': '#262c2e',
            },
            symbol: `PYTH:${handleReturnCoin(selectedProduct.name)}`,
            //@ts-ignore
            interval: "1",
            container_id: containerId.current,
            backgroundColor: "#141414",
          });
        }}
      />
    </>
  );
};

export default CandleChart;
