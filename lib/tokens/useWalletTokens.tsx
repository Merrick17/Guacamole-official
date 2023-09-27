import { useTokenAccounts } from "@bonfida/hooks";
import { TokenInfo } from "@solana/spl-token-registry";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const useWalletTokens = () => {
  const [walletTokens, setWalletTokens] = useState([]);
  const [tokenList, setTokenList] = useState([]);
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { data: tokenAccounts, loading } = useTokenAccounts(
    connection,
    publicKey
  );

  const getTokens = useMemo(() => {
    return async () => {
      try {
        const { data } = await axios.get("https://cache.jup.ag/tokens");
        return data as TokenInfo[];
      } catch (error) {
        console.error("Error fetching tokens:", error);
        return [];
      }
    };
  }, [publicKey]);

  const initUserTokens = async () => {
    try {
      const tokens: TokenInfo[] = await getTokens();
     

      // Map tokenAccounts and find each token that has the same mint
      const updatedAccounts = tokenAccounts.accounts.map((account) => {
        const foundToken = tokens.find((token) => token.address === account.account.mint.toBase58());
        if (foundToken) {
          return {
            ...account,
            token: {
              name: foundToken.name,
              symbol: foundToken.symbol,
              logoURI: foundToken.logoURI,
              tags: foundToken.tags,
              // Add any other properties you need from the tokens array
            },
          };
        }
        return account;
      });

      setWalletTokens(updatedAccounts);
    } catch (error) {
      console.error("Error initializing user tokens:", error);
    }
  };

  useEffect(() => {
    if (tokenAccounts) {
      initUserTokens();
    }

  }, [publicKey, loading, tokenAccounts]);

  return walletTokens;
};

export default useWalletTokens;
