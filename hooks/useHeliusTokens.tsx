import { useState, useEffect } from "react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";

interface FungibleAsset {
  interface: string;
  id: string;
  content: Content;
  authorities: Authority[];
  compression: Compression;
  grouping: any[]; // Specify the type if grouping has a known structure
  royalty: Royalty;
  creators: Creator[];
  ownership: Ownership;
  supply: any; // Specify the type if supply has a known structure
  mutable: boolean;
  burnt: boolean;
  token_info: TokenInfo;
}

interface Content {
  $schema: string;
  json_uri: string;
  files: File[];
  metadata: Metadata;
  links: Links;
}

interface File {
  uri: string;
  cdn_uri: string;
  mime: string;
}

interface Metadata {
  attributes: Attribute[];
  name: string;
  symbol: string;
  token_standard: string;
}

interface Attribute {
  value: string;
  trait_type: string;
}

interface Links {
  external_url: string;
  image: string;
}

interface Authority {
  address: string;
  scopes: string[];
}

interface Compression {
  eligible: boolean;
  compressed: boolean;
  data_hash: string;
  creator_hash: string;
  asset_hash: string;
  tree: string;
  seq: number;
  leaf_id: number;
}

interface Royalty {
  royalty_model: string;
  target: any; // Specify the type if target has a known structure
  percent: number;
  basis_points: number;
  primary_sale_happened: boolean;
  locked: boolean;
}

interface Creator {
  address: string;
  share: number;
  verified: boolean;
}

interface Ownership {
  frozen: boolean;
  delegated: boolean;
  delegate: any; // Specify the type if delegate has a known structure
  ownership_model: string;
  owner: string;
}

interface TokenInfo {
  balance: number;
  supply: number;
  decimals: number;
  token_program: string;
  associated_token_address: string;
}

const useHeliusTokens = () => {
  const [tokenList, setTokenList] = useState<FungibleAsset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    const fetchUserTokens = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.post(
          "https://rpc.helius.xyz/?api-key=9591f472-d97d-435c-a19c-d2514202d6d7",
          {
            jsonrpc: "2.0",
            id: "helius-test",
            method: "searchAssets",
            params: {
              ownerAddress: publicKey.toBase58(),
              tokenType: "fungible",
            },
          }
        );

        if (data && data.result && Array.isArray(data.result.items)) {
          setTokenList(data.result.items as FungibleAsset[]);
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (publicKey) {
      fetchUserTokens();
    }
  }, [publicKey, connected]);

  return { tokenList, isLoading, error };
};

export default useHeliusTokens;
