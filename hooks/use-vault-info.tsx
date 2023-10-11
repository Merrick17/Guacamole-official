"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const useVaultInfo = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "https://merv2-api.mercurial.finance/vault_info";

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const vaultInfoData = response.data;

        // Set the fetched data in the state
        setData(vaultInfoData);
        setIsLoading(false);
      } catch (error) {
        // Handle errors here
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useVaultInfo;
