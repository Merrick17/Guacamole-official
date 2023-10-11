import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { useWebSocket } from "@/context/websocket";

const CandleChart = () => {
  const { candles } = useWebSocket();
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !candles.length) {
      return;
    }

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth, // Set initial width based on container size
      height: 530,
      layout: {
        textColor: "#FFFF",
        background: {
          color: "#121212",
          bottomColor: "rgba(252, 252, 252, 0.1)",
        },
      },
      grid: {
        vertLines: {
          color: "rgba(252, 252, 252, 0.1)",
        },
        horzLines: {
          color: "rgba(252, 252, 252, 0.1)",
        },
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
      },
    });

    const candlestickSeries = chart.addCandlestickSeries();
    const seriesData = candles.map((candle) => ({
      time: new Date(candle.timestamp).getTime() / 1000,
      open: Number(Number(candle.o).toFixed(4)),
      high: Number(Number(candle.h).toFixed(4)),
      low: Number(Number(candle.l).toFixed(4)),
      close: Number(Number(candle.c).toFixed(4)),
    }));

    candlestickSeries.setData(seriesData as any);
    
    // Handle chart resizing when the container size changes
    const handleResize = () => {
      chart.resize(chartRef.current.clientWidth, 650); // Set the height as needed
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [candles]);

  return (
    <div>
      <div ref={chartRef} style={{ maxWidth: "800px", height: "100%" }}></div>
    </div>
  );
};

export default CandleChart;