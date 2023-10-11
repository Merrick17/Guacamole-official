"use client"
import { useEffect, useState } from "react";
import axios from "axios";

function useTokenPrice(tokenSymbol:string) {
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTokenPrice() {
      try {
        const response = await axios.get(
          `https://price.jup.ag/v4/price?ids=${tokenSymbol}`
        );
        const { data } = response;
        setPriceData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    // Fetch token price when the component mounts
    fetchTokenPrice();
  }, [tokenSymbol]);

  return { loading, priceData, error };
}

export default useTokenPrice;
