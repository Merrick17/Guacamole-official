import { useQuery } from "@tanstack/react-query";
const fetchTokenData = async (token) => {
  const response = await fetch(
    `https://bot-api.fluxbeam.xyz/risk/${token}?key=c241d1b1-4645-4116-b42d-983523534101`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function useTokenData(token: string) {
  return useQuery({
    queryKey: ["tokenData", token],
    queryFn: () => fetchTokenData(token),
  });
}
