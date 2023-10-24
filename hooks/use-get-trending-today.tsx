import axios from "axios";
import { useEffect, useState } from "react";

const NotIncluded = (symbol: string) => {
  return (
    symbol === "USDC" ||
    symbol === "USDT" ||
    symbol === "SOL" ||
    symbol === "USDCet" ||
    symbol === "mSOL" ||
    symbol === "bSOL" ||
    symbol === "JitoSOL" ||
    symbol === "stSOL" ||
    symbol === "UXD" ||
    symbol === "ETH" ||
    symbol === "USDTet"
  );
};

type props = {
  maxNumberOfTokens?: number;
};

export function useGetTrendingToday({ maxNumberOfTokens = 3 }: props) {
  const [trending, setTreding] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getTrending = async () => {
      setLoading(true);
      const data = await fetch("https://stats.jup.ag/info/day");
      const json = await data.json();
      const Guac = json.lastXTopBuy.filter(
        (x: any) => x.symbol === "GUAC"
      )[0] as {
        symbol: string;
        amount: number;
        mint: string;
      };

      const treding: {
        symbol: string;
        amount: number;
        mint: string;
      }[] = json.lastXTopBuy
        .filter((x: any) => !NotIncluded(x.symbol) && x.symbol !== "GUAC")
        .slice(0, maxNumberOfTokens);

      setTreding([Guac, ...treding]);
      setLoading(false);
    };
    getTrending();
  }, []);

  return { trending, loading };
}
export function useGetTrendingTodayFull({ page = 1 }: { page?: number }) {
  const ITEMS_PER_PAGE = 7; // Number of items to display per page
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1); // State to hold the total number of pages

  useEffect(() => {
    const getTrending = async () => {
      setLoading(true);
      const data = await fetch(`https://stats.jup.ag/info/day?page=${page}`);
      const json = await data.json();
      console.log("JSON", json);

      const treding: {
        symbol: string;
        amount: number;
        mint: string;
      }[] = json.lastXTopTokens;

      // Calculate pagination range
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      const paginatedData = treding
        .sort((a, b) => b.amount - a.amount)
        .slice(startIndex, endIndex);

      const mappedData = paginatedData.map((elm) => {
        let topBuy = json.lastXTopBuy.find((tkn) => tkn.symbol == elm.symbol);
        let topSell = json.lastXTopSell.find((tkn) => tkn.symbol == elm.symbol);
        return {
          ...elm,
          buyVolume: topBuy?.amount || 0,
          sellVolume: topSell?.amount || 0,
        };
      });
      const promiseList = mappedData.map(async (elm) => {
        const resp = await axios.get(
          `https://price.jup.ag/v4/price?ids=${elm.symbol}`
        );
        const { data } = resp;
        return { ...elm, usdPrice: data.data[elm.symbol].price };
      });
      
      const dataToStore = await Promise.all(promiseList);
      console.log("DATA TO STORE",dataToStore)
      setTrending([...dataToStore]);
      setLoading(false);

      // Calculate total number of pages
      const totalItems = treding.length; // Total number of items in your dataset
      const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      setTotalPages(totalPages);
    };

    getTrending();
  }, [page]);

  return { trending, loading, totalPages }; // Return totalPages in the hook's response
}
