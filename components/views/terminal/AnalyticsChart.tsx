"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { abbreviateNumber } from "js-abbreviation-number";
import numeral from "numeral";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface TokenData {
  name: string;
  data: number[][];
}

const AnalyticsChart: React.FC = () => {
  const [tokenInfo, setTokenInfo] = useState<TokenData[]>([
    {
      name: "",
      data: [],
    },
  ]);

  const [options, setOptions] = useState<any>({
    chart: {
      type: "area",
      height: 300,
      foreColor: "#8C87C2",
      fontFamily: "Rubik, sans-serif",
      stacked: true,
      dropShadow: {
        enabled: true,
        enabledSeries: [0],
        top: -2,
        left: 2,
        blur: 5,
        opacity: 0.06,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#7B6FFF", "#1652F0"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },

    markers: {
      size: 0,
      strokeColor: "#fff",
      strokeWidth: 3,
      strokeOpacity: 1,
      fillOpacity: 1,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 6,
      max: 6,
      labels: {
        offsetX: -10,
        offsetY: 0,
        formatter: function (value) {
          return numeral(value).format("0,0.0000");
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    grid: {
      show: false,
      padding: {
        left: -5,
        right: 5,
      },
    },
    tooltip: {
      x: {
        format: "dd MM yyyy",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100, 100],
      },
    },
  });

  const fetchData = async () => {
    try {
      const { data } = await axios.get("https://api.llama.fi/charts/Solana");
      const mappedData = data.map((elm: any) => [Number(elm.date) * 1000, elm.totalLiquidityUSD]);
      setTokenInfo([
        {
          name: "",
          data: mappedData,
        },
      ]);
      updateChartOptions(mappedData);
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  const updateChartOptions = (prices: number[][]) => {
    const filteredPrices = prices.map((elm) => elm[1]);
    const maxNumber = Math.max(...filteredPrices);
    const minNumber = Math.min(...filteredPrices);

    setOptions({
      ...options,
      yaxis: {
        ...options.yaxis,
        min: minNumber,
        max: maxNumber,
        labels: {
          ...options.yaxis.labels,
          formatter: function (value: number) {
            return `$${abbreviateNumber(value, 2, {
              symbols: ["", "k", "M", "B", "T", "P", "E"],
            })}`;
          },
        },
      },
      annotations: {
        yaxis: [
          {
            y: filteredPrices[filteredPrices.length - 1],
            borderColor: "#355dff",
            label: {
              borderColor: "#355dff",
              style: {
                color: "#FFF",
                background: "#355dff",
              },
              text: filteredPrices[filteredPrices.length - 1].toFixed(4),
            },
          },
        ],
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ width: "100%", padding: "10px" }}>
        <h1 style={{ color: "rgb(226, 232, 240)", fontSize: "24px", fontWeight: 400 }}>
          Historical Solana TVL
        </h1>
      </div>
      <div id="chart-timeline">
        <ReactApexChart
          options={options}
          series={tokenInfo}
          type="area"
          height={530}
          width={"100%"}
        />
      </div>
    </>
  );
};

export default AnalyticsChart;
