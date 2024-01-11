import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchTokenPrice = async (tokenSymbol) => {
    const url = `https://price.jup.ag/v4/price?ids=${tokenSymbol}`;
    const response = await axios.get(url);
    return response.data;
};

export const useTokenPrice = (tokenSymbol:string) => {
    return useQuery({
        queryKey: [tokenSymbol], queryFn: () => fetchTokenPrice(tokenSymbol)
    });
};