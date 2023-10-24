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
      height: 130,
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
      name: "mSOL ",
      data: [],
    },
    {
      name: "stSOL",
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
  const initChartData = useCallback(async () => {
    try {
      let data = await getTrendingTokensCharts(convertParams(selection));

      setMarketInfo([
        {
          name: "SOL",
          data: mapPrecentageChange(data.solanaChart.prices),
          color: "#21e9ac",
        },
        {
          name: "mSOL ",
          data: mapPrecentageChange(data.msSolChart.prices),
          color: "#c8ece1",
        },
        {
          name: "stSOL",
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
  }, [selection]);
  useEffect(() => {
    initChartData();
  }, [initChartData]);
  const setChartType = (dataType) => {
    //setSelection(dataType);
  };

  return (
    <>
      {/* <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          height: "100%",
        
        }}
      >
     
        <div className="duration-option text-right" id="chart-btns">
          <button
            id="one_month"
            className={`swap-chart-btn ${
              selection === "1D" ? "active-chart" : ""
            }`}
            onClick={() => setChartType("1D")}
          >
            <span>1D</span>
          </button>
          &nbsp;
          <button
            id="six_months"
            className={`swap-chart-btn ${
              selection === "1W" ? "active-chart" : ""
            }`}
            onClick={() => setChartType("1W")}
          >
            <span>1W</span>
          </button>
          &nbsp;
          <button
            id="one_year"
            className={`swap-chart-btn ${
              selection === "1M" ? "active-chart" : ""
            }`}
            onClick={() => setChartType("1M")}
          >
            <span>1M</span>
          </button>
          &nbsp;
          <button
            id="ytd"
            className={`swap-chart-btn ${
              selection === "1Y" ? "active-chart" : ""
            }`}
            onClick={() => setChartType("1Y")}
          >
            <span>1Y</span>
          </button>
          <img src="/assets/img/coingecko.webp" alt="" className="coingecko" />
        </div>
      </div> */}

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
          height={480}
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
