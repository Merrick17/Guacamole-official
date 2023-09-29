import React, { useState, useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { useWebSocket } from "@/context/websocket";

interface Candle {
  h: string;
  l: string;
  o: string;
  c: string;
  timestamp: Date;
}

const list = ["btcusd-perp", "solusd-perp", "ethusd-perp"];
const times = ["1_m", "10_m", "1_h", "1_d"];

const CandleChart = ({}) => {
  const { candles } = useWebSocket();
  const chartContainer = document.getElementById("chart-container");

  //   const [asset, setAsset] = useState(initialAsset);
  //   const [timeFrame, setTimeFrame] = useState(initialTimeFrame);
  //const [candles, setCandles] = useState<Candle[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const chartRef = useRef<any>(null);
  const apiKey = "4031cf86-bfff-4483-a12d-7be0cd06769c-guac";
  //   useEffect(() => {
  //     ws.current = new WebSocket(
  //       "ws://hloc-dexterity.up.railway.app/" + market + "?api-key=" + apiKey
  //     );

  //     ws.current.onmessage = (message) => {
  //       console.log({ message });
  //       const data = JSON.parse(message.data);
  //       console.log({ data });
  //       if (data.candles) {
  //         setCandles(data.candles);
  //       }
  //     };

  //     ws.current.onopen = () => {
  //       ws.current?.send(JSON.stringify({ command: "stream", params: {} }));
  //     };

  //     return () => {
  //       ws.current?.close();
  //     };
  //   }, [market]);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    if (chartRef.current) {
      if (chartRef && chartRef.current) {
        chartRef.current.innerHTML = "";
      }
    }

    const chart = createChart(chartRef.current, {
      width: 800,
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
    return () => {
      if (chartRef.current) {
        if (chartRef && chartRef.current) {
          chartRef.current.innerHTML = "";
        }
      }
    };
  }, [candles]);

  //   const handleAssetChange = (newAsset: string) => {
  //     setAsset(newAsset);
  //     ws.current?.send(
  //       JSON.stringify({ command: "change-asset", params: { newAsset } })
  //     );
  //     setTimeFrame("1_m");
  //   };

  //   const handleTimeFrameChange = (newTime: string) => {
  //     setTimeFrame(newTime);
  //     ws.current?.send(
  //       JSON.stringify({ command: "change-time", params: { newTime } })
  //     );
  //   };

  return (
    <div>
      <div ref={chartRef} style={{ width: "800px", height: "100%" }}></div>
    </div>
  );
};

export default CandleChart;
