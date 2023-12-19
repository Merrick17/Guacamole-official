"use client";
import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getTrendingTokensCharts } from "@/lib/token-api";
import { cn } from "@/lib/utils";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface MarketData {
  name: string;
  data: [number, number, number][];
  color: string;
}

const MarketPulseChart = ({ selection }: { selection: string }) => {
  const [options, setOptions] = useState<any>({
    chart: {
      height: 100,
      type: "line",
      zoom: {
        enabled: false,
      },

      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false, // This hides the legend
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: [
        "#21e9ac",
        "#c8ece1",
        "#1fc1ff",
        "#3770f8",
        "#3770f8",
        "#ffd15c",
        "#fec400",
        "#a949e2",
      ],
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: false,
      x: {
        format: "dd MMM yyyy",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "dd MMM",
      },
      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
        borderType: "solid",
        color: "#78909C",
        height: 6,
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      // labels: {
      //   show: false,
      // },
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
    },
  });
  const [marketInfo, setMarketInfo] = useState<any[]>([
    {
      name: "SOL",
      data: [],
    },
    {
      name: "BTC ",
      data: [],
    },
    {
      name: "ETH",
      data: [],
    },
    {
      name: "RAY",
      data: [],
    },
    {
      name: "ORCA",
      data: [],
    },
    {
      name: "BONK",
      data: [],
    },
    {
      name: "GUAC",
      data: [],
    },
  ]);
  const convertParams = (param) => {
    switch (param) {
      case "1D":
        return 1;
      case "1W":
        return 7;
      case "1M":
        return 30;
      case "1Y":
        return 365;
      default:
        return 1;
    }
  };
  const mapPrecentageChange = (pricesArray) => {
    let previousPrice = pricesArray[0][1];

    // Use map() to iterate through the array and calculate the percentage change for each price
    const percentagePrices = pricesArray.map(([timestamp, price]) => {
      // Calculate the percentage change
      const change = Number(
        (((price - previousPrice) / previousPrice) * 100).toFixed(2)
      );
      // Update the previousPrice variable
      //previousPrice = price;
      // Return an array with the timestamp, price, and percentage change
      return [timestamp, price, change];
    });
    return percentagePrices;
  };
  const initChartData = async () => {
    try {
      let data = await getTrendingTokensCharts(convertParams(selection));

      setMarketInfo([
        {
          name: "SOL",
          data: mapPrecentageChange(data.solanaChart.prices),
          color: "#21e9ac",
        },
        {
          name: "BTC",
          data: mapPrecentageChange(data.msSolChart.prices),
          color: "#f7931a",
        },
        {
          name: "ETH",
          data: mapPrecentageChange(data.stSolChart.prices),
          color: "#1fc1ff",
        },
        {
          name: "RAY",
          data: mapPrecentageChange(data.rayChart.prices),
          color: "#3770f8",
        },
        {
          name: "ORCA",
          data: mapPrecentageChange(data.orcaChart.prices),
          color: "#ffd15c",
        },
        {
          name: "BONK",
          data: mapPrecentageChange(data.bonkChart.prices),
          color: "#fec400",
        },
        {
          name: "GUAC",
          data: mapPrecentageChange(data.cmfiChart.prices),
          color: "#8bd796",
        },
      ]);
    } catch (error) {}
  };
  useEffect(() => {
    initChartData();
  }, [selection]);

  return (
    <>
      <div id="chart-timeline" className="bg-[#0F0F0F] rounded-xl ">
        <ReactApexChart
          options={options}
          series={marketInfo.map((elm) => {
            return {
              name: elm.name,
              data: elm.data.map(([timestamp, price, change]) => ({
                x: timestamp,
                y: Number(change.toFixed(2)),
              })),
              color: elm.color,
            };
          })}
          type="line"
          height={450}
        />
      </div>
      <div className="bg-[#0F0F0F] w-max flex p-2 mx-auto sm:w-full max-sm:w-[100%] max-sm:flex-wrap items-center gap-4 rounded-lg">
        {marketInfo.map((elm) => (
          <div className="flex w-full justify-center items-center">
            <div
              style={{
                backgroundColor: elm.color,
              }}
              className={cn(` h-[12px] w-[12px] rounded-full mr-1 `)}
            />
            <span className="text-muted-foreground">{elm.name}</span>
          </div>
        ))}{" "}
      </div>
    </>
  );
};

export default MarketPulseChart;
