"use client";
import React from "react";

import Script from "next/script";
import { useEffect, useRef } from "react";

const RipeRottenCandleChart = () => {
  const containerId = useRef(
    `tv_container_${Math.random().toString(36).substring(7)}`
  );

 

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
          symbol: `PYTH:SOLUSD`, // Update the symbol
          //@ts-ignore
          interval: "1",
          container_id: containerId.current,
          backgroundColor: "#141414",
        });
      }
    }

    // Call the initializeChart function when productSelect changes
    initializeChart();
  }, []);
  function removeWidget() {
    try {
      tradingViewWidget.current?.remove();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div id={containerId.current} style={{ height: "100%", width: "100%" }} className="border"/>
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
            symbol: `PYTH:SOLUSD`,
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

export default RipeRottenCandleChart;
