import axios from "axios";

const fetchMarinadeData = async () => {
  const apyUrl = "https://api.marinade.finance/msol/apy/7d";
  const msolPriceUrl = "https://api.marinade.finance/msol/price_sol";
  const tlvUrl = "https://api.marinade.finance/tlv";

  try {
    // Create Axios requests for each API call
    const request1 = axios.get(apyUrl);
    const request2 = axios.get(msolPriceUrl);
    const request3 = axios.get(tlvUrl);

    // Use Promise.all to make all requests in parallel
    const [response1, response2, response3] = await Promise.all([
      request1,
      request2,
      request3,
    ]);

    // Extract data from responses
    const data1 = response1.data;
    const data2 = response2.data;
    const data3 = response3.data;

    // Combine the data as needed
    const combinedData = {
      apy: data1,
      currentPrice: data2,
      tlv: data3,
    };

    // Return the combined data or do something with it
    return combinedData;
  } catch (error) {
    // Handle errors here
    throw error; // You can choose to throw the error or handle it differently
  }
};

export default fetchMarinadeData;
