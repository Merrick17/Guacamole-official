import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Function to fetch data
const fetchJupStats = async () => {
  const { data } = await axios.get(
    "https://tradingview.compendex.xyz/caching/"
  );
  if (data && data.success) {
    return {
      volumeByPairs: convertObjectToArray(data.result.lastXVolumeByAddresses),
      topTokens: data.result.lastXTopTokens,
      topBuys: data.result.lastXTopBuy,
      topSells: data.result.lastXTopSell,
    };
  } else {
    throw new Error("Failed to fetch data");
  }
};

// Custom hook using useQuery
export const useJupStat = () => {
  return useQuery({ queryKey: ["jupStats"], queryFn: fetchJupStats });
};

// Helper function to convert object to array
const convertObjectToArray = (obj) => {
  return Object.keys(obj).map((key) => ({
    value: obj[key],
    name: key,
  }));
};
