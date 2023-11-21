import axios from "axios";
const initPoolList = async () => {
  try {
    const pairResp = await axios.get("https://api.raydium.io/v2/main/pairs");

    const {
      data: { official, unOfficial },
    } = await axios.get("https://api.raydium.io/v2/sdk/liquidity/mainnet.json");

    const mapPools = (pools, provider) =>
      pools.map((elm) => {
        const pairInfo = pairResp.data.find((p) => p.lpMint === elm.lpMint);
        return {
          poolId: elm.id,
          baseMint: elm.baseMint,
          quoteMint: elm.quoteMint,
          lpMint: elm.lpMint,
          lpDecimals: elm.lpDecimals,
          provider,
          lpPrice: pairInfo ? pairInfo.lpPrice : 0,
          liquidity: pairInfo ? pairInfo.liquidity : 0,
          tokenAmount: pairInfo ? pairInfo.tokenAmountLp : 0,
        };
      });

    const mappedOfficial = mapPools(official, "RAYDIUM");
    const mappedUnOfficial = mapPools(unOfficial, "RAYDIUM");

    const { data } = await axios.get("https://app.meteora.ag/amm/pools");

    const mappedPools = data.map((elm) => {
      return {
        poolId: elm.pool_address,
        baseMint: elm.pool_token_mints[0],
        quoteMint: elm.pool_token_mints[1],
        lpMint: elm.lp_mint,
        lpDecimals: elm.lp_decimal,
        provider: "METEORA",
        liquidity: elm.pool_tvl,
        tokenAmount: elm.pool_tvl ? elm.pool_tvl / elm.pool_lp_price_in_usd : 0,
        lpPrice: elm.pool_lp_price_in_usd ? elm.pool_lp_price_in_usd : 0,
      };
    });

    const result = [...mappedOfficial, ...mappedUnOfficial, ...mappedPools];
    return result;
  } catch (error) {
    console.log("Error", error);
  }
};
export async function GET(request: Request) {
  const pools = await initPoolList();
  return Response.json({
    pools,
  });
}
