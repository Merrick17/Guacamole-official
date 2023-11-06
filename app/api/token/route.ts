import { Metaplex, TokenMetadataGpaBuilder } from "@metaplex-foundation/js";
import { TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
const { get } = require("lodash");
const connection = new Connection(
  "https://radial-delicate-layer.solana-mainnet.discover.quiknode.pro/124d30642a313843475e1ac3f67e59d11d55d943"
);
const getTokenOwners = async (address, decimals) => {
  const filters = [
    {
      memcmp: {
        offset: 0,
        bytes: address,
      },
    },
    {
      dataSize: 165,
    },
  ];
  const programAccountsConfig = {
    filters,
    encoding: "jsonParsed",
  };
  const listOfTokens = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    programAccountsConfig
  );

  return listOfTokens
    .map((token) => {
      const address = get(token, "account.data.parsed.info.owner");
      const amountString = get(
        token,
        "account.data.parsed.info.tokenAmount.amount"
      );
      const amount = parseInt(amountString, 10) / Math.pow(10, decimals);

      console.log();

      return {
        address,
        amount,
      };
    })
    .sort((a, b) => b.amount - a.amount);
};

export async function GET(request: Request) {
  const metaplex = new Metaplex(connection);
  const { searchParams } = new URL(request.url);

  const mint = searchParams.get("mint");
  const decimals = searchParams.get("decimals");
  const token = await connection.getTokenSupply(new PublicKey(mint));
  let metadata;
  try {
    metadata = await metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(mint) });
  } catch (error) {}
  console.log("metada", metadata);
  const holders = (await getTokenOwners(mint, decimals)).filter(
    (elm) => elm.amount !== 0
  );
  return Response.json({
    mint,
    holders,
    totalSupply: token.value,
    updateAuthority: metadata
      ? metadata.updateAuthorityAddress.toBase58()
      : null,
  });
}
