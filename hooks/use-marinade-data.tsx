import { useState, useEffect } from "react";
import axios from "axios";

const useMarinadeData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Define the API endpoints you want to call
    const apyUrl = "https://api.marinade.finance/msol/apy/1y";
    const msolPriceUrl = "https://api.marinade.finance/msol/price_sol";
    const tlvUrl = "https://api.marinade.finance/tlv";
    const mSolSupply = "https://api.marinade.finance/msol/supply";

    // Create Axios requests for each API call
    const request1 = axios.get(apyUrl);
    const request2 = axios.get(msolPriceUrl);
    const request3 = axios.get(tlvUrl);
    const request4 = axios.get(mSolSupply);

    // Use Promise.all to make all requests in parallel
    Promise.all([request1, request2, request3, request4])
      .then((responses) => {
        // Extract data from responses
        const [data1, data2, data3, data4] = responses.map(
          (response) => response.data
        );

        // Combine the data as needed
        const combinedData = {
          apy: data1,
          currentPrice: data2,
          tlv: data3,
          totalSupply: data4,
        };

        // Set the combined data in the state
        setData(combinedData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return { isLoading, error, data };
};

export default useMarinadeData;
