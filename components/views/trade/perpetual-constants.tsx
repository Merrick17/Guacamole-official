export interface Product {
  index: number;
  exponent: number;
  priceTrim: number;
  minSize: number;
  name: string;
  base: string;
  quote: string;
  baseLogo: string;
  quoteLogo: string;
  mapType: "num" | "str";
}

export interface Group {
  productsIndex: number;
  pubkey: string;
  name: string;
}

export const GroupPubkeyMap = new Map<number, Group>([
  [
    0,
    {
      productsIndex: 0,
      pubkey: "LSTqd6kXfMcMmVj63TdFfXvwSEYSkQVcT6GrwH4Ki3h",
      name: "StakeChip",
    },
  ],
]);

export const ProductMap = new Map<number, Map<string | number, Product>>([
  [
    0,
    new Map<string | number, Product>([
      [
        "SOLUSD-PERP",
        {
          index: 0,
          exponent: 1,
          minSize: 0.1,
          priceTrim: 4,
          name: "SOL/USD-PERP",
          base: "SOL",
          quote: "USDC",
          baseLogo:
            "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
          quoteLogo: "/icons/earn/usd-coin-usdc-logo.svg",
          mapType: "str",
        },
      ],
      [
        "MSOLUSD-PERP",
        {
          index: 2,
          exponent: 1,
          minSize: 0.1,
          priceTrim: 4,
          name: "MSOL/USD-PERP",
          base: "SOL",
          quote: "USDC",
          baseLogo:
            "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png",
          quoteLogo: "/icons/earn/usd-coin-usdc-logo.svg",
          mapType: "str",
        },
      ],
      [
        "JITOSOLUSD-PERP",
        {
          index: 4,
          exponent: 1,
          minSize: 0.1,
          priceTrim: 4,
          name: "JitoSOL/USD-PERP",
          base: "SOL",
          quote: "USDC",
          baseLogo:
            "https://storage.googleapis.com/token-metadata/JitoSOL-256.png",
          quoteLogo: "/icons/earn/usd-coin-usdc-logo.svg",
          mapType: "str",
        },
      ],
      [
        0,
        {
          index: 0,
          exponent: 1,
          minSize: 0.1,
          priceTrim: 4,
          name: "SOL/USD-PERP",
          base: "SOL",
          quote: "USDC",
          baseLogo:
            "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
          quoteLogo: "/icons/earn/usd-coin-usdc-logo.svg",
          mapType: "num",
        },
      ],
      [
        2,
        {
          index: 2,
          exponent: 1,
          minSize: 0.1,
          priceTrim: 4,
          name: "MSOL/USD-PERP",
          base: "SOL",
          quote: "USDC",
          baseLogo:
            "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png",
          quoteLogo: "/icons/earn/usd-coin-usdc-logo.svg",
          mapType: "num",
        },
      ],
      [
        4,
        {
          index: 4,
          exponent: 1,
          minSize: 0.1,
          priceTrim: 4,
          name: "JitoSOL/USD-PERP",
          base: "SOL",
          quote: "USDC",
          baseLogo:
            "https://storage.googleapis.com/token-metadata/JitoSOL-256.png",
          quoteLogo: "/icons/earn/usd-coin-usdc-logo.svg",
          mapType: "num",
        },
      ],
    ]),
  ],
]);
